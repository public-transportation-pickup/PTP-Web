import { useCallback, useEffect, useState } from "react";
//import PaginationButton from "../../ptp-web-admin-components/store-components/PaginationButton";
import { HiOutlinePlusSm } from "react-icons/hi";
import {useNavigate} from 'react-router-dom'
import { getStores } from "../../ptp-web-admin-api/store-api";

export default function StorePageMain() {
    const navigate=useNavigate();

    const handleCreateButtonClick=()=>{
        navigate('/store/create-store');
    }

    const handleRowClick=(id)=>{
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
        <h1 className="text-center mx-auto text-4xl">List Store</h1>
        <div className="flex justify-end mb-8">
            <button className="rounded-lg bg-orange-400 pl-3 pr-4 pt-2 pb-2 flex flex-row items-center hover:bg-orange-100" onClick={handleCreateButtonClick}><HiOutlinePlusSm />Create new store</button>
        </div>
        
        <div className="">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-40 h-10 items-center">
                    <tr>
                    <th>Tên cửa hàng</th>
                    <th>Số điện thoại</th>
                    <th>Địa chỉ</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {listStore && listStore.length >0 ? (listStore.map((item,index)=>(
                        <tr key={index} onClick={()=>handleRowClick(item.id)} className=" h-8 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-red-400 text-sm">
                            <td>{item.name}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.addressNo}, Đường {item.street}, {item.ward}, {item.zone}, TPHCM</td>
                            
                            <td>{item.status}</td>
                            <td><p>Chỉnh sửa</p> <p>Xem chi tiết</p></td>
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
