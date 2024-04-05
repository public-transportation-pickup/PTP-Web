import { useCallback, useEffect, useState } from "react";
//import PaginationButton from "../../components/store-components/PaginationButton";
import { HiOutlinePlusSm } from "react-icons/hi";
import {useNavigate} from 'react-router-dom'
import { getStores } from "../../api/store-api";
import classNames from 'classnames'
import MenuDropDown from "../../components/shared/MenuDropDown";

export default function StorePageMain() {
    const navigate=useNavigate();

    const handleCreateButtonClick=()=>{
        navigate('/store/create');
    }

    const ViewDetailFunc=(id)=>{
        navigate(`/store/${id}`)
    }
    const DeleteFunc=(id)=>{
        navigate(`/store/${id}`)
    }
    const EditFunc=(id)=>{
        navigate(`/store/${id}`)
    }
    
    

    const [listStore,setListStore]=useState([]);
    console.log("List store", listStore);
    
    const fetchData= useCallback(
        async ()=>{
            const responseAPI= await getStores();
            setListStore(responseAPI);
            console.log("ResponseAPI:",responseAPI);
        },[listStore]
    ) 

    useEffect(()=>{
        fetchData();
    },[])
    

return (
    <>
        <h1 className="text-center mx-auto text-4xl">Danh sách cửa hàng</h1>
        <div className="flex justify-end mb-8">
            <button className="rounded-lg bg-orange-400 pl-3 pr-4 pt-2 pb-2 flex flex-row items-center hover:bg-orange-100" onClick={handleCreateButtonClick}><HiOutlinePlusSm />Create new store</button>
        </div>
        
        <div className="">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-40 h-10 items-center">
                    <tr>
                    <th className="px-4">#</th>
                    <th>Tên cửa hàng</th>
                    <th>Số điện thoại</th>
                    <th>Địa chỉ</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {listStore && listStore.length >0 ? (listStore.map((item,index)=>(
                        <tr key={index} className=" h-8 border-b-2  dark:bg-gray-800 dark:border-gray-700 text-xs py-4">
                            {/* <div className="hover:bg-red-400"> */}
                            <td className="px-4">{index+1}</td>
                            <td>{item.name}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.addressNo}, Đường {item.street}, {item.ward}, {item.zone}, TPHCM</td>
                            
                            <td><span className={classNames(item.status==='ACTIVE'?' bg-green-200':'bg-rose-200','p-2 rounded-lg')}>{item.status}</span></td>
                            {/* </div> */}
                            
                            <td><MenuDropDown EditFunc={()=>EditFunc(item.id)} DeleteFunc={()=>DeleteFunc(item.id)} ViewDetailFunc={()=>ViewDetailFunc(item.id)}/></td>
                        </tr>
                    ))):(<></>)}
                   
                </tbody>
            </table>
            <div>
                {/* <PaginationButton/> */}
            </div>
        </div>
    </>
    
  )
}
