import { useCallback, useEffect, useState } from "react";
//import PaginationButton from "../../components/store-components/PaginationButton";
import { HiOutlinePlusSm } from "react-icons/hi";
import {useNavigate} from 'react-router-dom'
import { deleteStore, getStores } from "../../api/store-api";
import classNames from 'classnames'
import MenuDropDown from "../../components/shared/MenuDropDown";
import { ToastContainer,toast } from "react-toastify";
import PaginationButton from "../../components/shared/PaginationButton";
//import { HiOutlineTrash,HiPencil } from "react-icons/hi";

export default function StorePageMain() {
    const navigate=useNavigate();
    const [currentPage, setCurrentPage] = useState(0);

    const handleCreateButtonClick=()=>{
        navigate('/store/create');
    }

    const ViewDetailFunc=(id)=>{
        navigate(`/store/${id}`)
    }
    const DeleteFunc=async(id)=>{
        try {
            const responseAPI= await deleteStore(id);
            console.log("Reponse api delete store",responseAPI);
            if(responseAPI===204){
                toast.success("Xóa cửa hàng thành công")
                fetchData();
            } 
            else toast.error("Xóa thất bại")
        } catch (error) {
            console.error("Delete route store page",error)
        }
    }
    const EditFunc=(id)=>{
        navigate(`/store/update/${id}`)
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
    <ToastContainer/>
        <h1 className="text-center mx-auto text-4xl font-bold pb-8 pt-4">Danh Sách Cửa Hàng</h1>
        <div className="flex justify-end mb-8">
            <button className="text-lg font-semibold rounded-lg bg-gradient-to-r from-cyan-600 to-sky-500 pl-3 pr-4 pt-2 pb-2 flex flex-row items-center hover:from-green-500 hover:to-yellow-500" onClick={handleCreateButtonClick}><HiOutlinePlusSm />Tạo mới cửa hàng</button>
        </div>
        
        <div className="">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                <thead className="text-sm text-gray-700 uppercase bg-blue-400 dark:bg-gray-700 dark:text-gray-40 h-10 items-center">
                    <tr>
                    <th className="px-4">#</th>
                    <th>Tên cửa hàng</th>
                    <th>Số điện thoại</th>
                    <th>Email</th>
                    <th>Địa chỉ</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {listStore && listStore.length >0 ? (listStore.map((item,index)=>(
                        <tr key={index} className= {classNames(index%2!==0?'bg-blue-100':''," h-8 border-b-2  dark:bg-gray-800 dark:border-gray-700 text-xs py-4")}>
                            {/* <div className="hover:bg-red-400"> */}
                            <td className="px-4">{index+1}</td>
                            <td>{item.name}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.email}</td>
                            <td>{item.addressNo}, {item.street==="null"? "":`Đường ${item.street},`} {item.ward}, {item.zone}, TPHCM</td>
                            
                            <td><span className={classNames(item.status==='ACTIVE'?' bg-green-200':'bg-rose-200','p-2 rounded-lg')}>{item.status==='ACTIVE'?'ĐANG HOẠT ĐỘNG':'DỪNG HOẠT ĐỘNG'}</span></td>
                            {/* </div> */}
                            
                            <td><MenuDropDown EditFunc={()=>EditFunc(item.id)} DeleteFunc={()=>DeleteFunc(item.id)} ViewDetailFunc={()=>ViewDetailFunc(item.id)}/></td>
                            {/* <td>
                                <HiPencil/>
                                <HiOutlineTrash/>
                            </td> */}
                        </tr>
                    ))):(<></>)}
                   
                </tbody>
            </table>
            <div>
            {listStore && listStore.length >0?
            <div className="bg-white items-center  align-middle dark:bg-gray-800 dark:border-gray-700 border-0 border-slate-300 ">
            <PaginationButton
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                totalPages={Math.ceil(listStore.length/10)}/>
          </div>:<></>}
            </div>
        </div>
    </>
    
  )
}
