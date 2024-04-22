import { useCallback, useEffect, useState } from "react"
import { deleteUser, getUsers } from "../../api/user-api.js";
import { useNavigate } from "react-router-dom";
import MenuDropDown from "../../components/shared/MenuDropDown.jsx";
import ComboBox from "../../components/shared/ComboBox.jsx";
import PaginationButton from "../../components/shared/PaginationButton.jsx";
import { GetDate } from "../../lib/utils/DateFormat.jsx";
import {ToastContainer, toast} from 'react-toastify'
import classNames from "classnames";


export default function UserMainPage() {
  const navigate= useNavigate();
  const [listUser,setListUser]= useState([]);
  const [roleName,setRoleName]=useState('StoreManager');
  const [currentPage, setCurrentPage] = useState(0);

  console.log("User list",listUser)

  const fetchData= useCallback(
    async (role)=>{
        const responseAPI= await getUsers(role);
        await setListUser(responseAPI);
        // console.log("ResponseAPI:",responseAPI);
    },[listUser]
) 

const ViewDetailFunc=()=>{
  // navigate(`/user/${userId}`);
  toast.info("Tính năng này hiện chưa thể sử dụng")
}

const EditFunc=()=>{
  // navigate(`/user/${userId}`);
  toast.info("Tính năng này hiện chưa thể sử dụng")
}

const DeleteFunc=async (userId)=>{
  // navigate(`/user/${userId}`);
  try {
    const responseAPI= await deleteUser(userId);
    console.log("delete func responseAPI",responseAPI);
    if(responseAPI===204){
      fetchData("Quản lý");
      toast.success ("Xóa người dùng thành công")
      
    } 
    else toast.error("Xóa người dùng thất bại")
  } catch (error) {
    console.error("Delete user main page exception", error)
  }
}

  useEffect(()=>{
    // console.log(roleName);
    fetchData(roleName)
  },[roleName]);
  return (
    <div className="">
      {/* <div>Search</div> */}
      <ToastContainer/>
      <h1 className="text-3xl font-bold text-center font-bold py-8">Danh Sách Người Dùng Trong Hệ Thống</h1>
      <div className="flex flex-row">
      <p className="my-auto pr-3 text-base font-semibold text-center">Bộ lọc: </p>
      <ComboBox setRoleName={setRoleName} ></ComboBox>
      </div>
      <table className=" w-full h-96 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-auto">
                <thead className="text-sm text-gray-700 uppercase bg-blue-400 dark:bg-gray-700 dark:text-gray-40 h-10 items-center">
                    <tr>
                    <th className="px-4">#</th>
                    <th>Họ và tên</th>
                    <th>EMail</th>
                    <th>Số điện thoại</th>
                    <th>Ngày sinh</th>
                    <th>Chức vụ</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody className="overflow-auto">
                    {listUser && listUser.length >0 ? (listUser.slice(currentPage*10, currentPage*10+10).map((item,index)=>(
                        <tr key={index} className= {classNames(index%2!==0?'bg-blue-100':''," border-b dark:bg-gray-800 dark:border-gray-700 text-xs")}>
                             <td className="px-4">{index+1}</td>
                            <td>{item.fullName}</td>
                            <td>{item.email}</td>
                            <td>{item.phoneNumber}</td>
                            <td><GetDate date={item.dateOfBirth}></GetDate></td>
                            
                            <td>{item.roleName==='StoreManager'?
                              'Quản lý'
                              :(item.roleName=='Admin')?'Quản trị viên':'Khách hàng'}</td>
                            <td><MenuDropDown DeleteFunc={()=>DeleteFunc(item.id)} EditFunc={()=>EditFunc()} ViewDetailFunc={()=>ViewDetailFunc()} /></td>
                        </tr>
                    ))):(<></>)}
                   
                </tbody>
            </table>
            {listUser && listUser.length >0?
            <div className="bg-white items-center  align-middle dark:bg-gray-800 dark:border-gray-700 border-0 border-slate-300 ">
            <PaginationButton
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                totalPages={Math.ceil(listUser.length/10)}/>
          </div>:<></>}
          <div>

          </div>

    </div>
  )
}
