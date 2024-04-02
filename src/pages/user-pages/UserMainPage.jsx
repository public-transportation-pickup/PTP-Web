import { useCallback, useEffect, useState } from "react"
import { getUsers } from "../../api/user-api.js";
import { useNavigate } from "react-router-dom";


export default function UserMainPage() {
  const navigate= useNavigate();
  const [listUser,setListUser]= useState([]);
  console.log("User list",listUser)
  const fetchData= useCallback(
    async ()=>{
        const responseAPI= await getUsers();
        await setListUser(responseAPI);
        console.log("ResponseAPI:",responseAPI);
    },[listUser]
) 

const handleRowClick=(userId)=>{
  navigate(`/user/${userId}`);
}

  useEffect(()=>{
    fetchData
  },[])
  return (
    <div>
      <div>Search</div>
      <div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-40 h-10 items-center">
                    <tr>
                    <th>Họ và tên</th>
                    <th>Số điện thoại</th>
                    <th>Ngày sinh</th>
                    <th>Quyền</th>
                    <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length >0 ? (listUser.map((item,index)=>(
                        <tr key={index} onClick={()=>handleRowClick(item.id)} className=" h-8 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-red-400 text-sm">
                            <td>{item.fullName}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.dateOfBirth}</td>
                            
                            <td>{item.roleName}</td>
                            <td><p>Chỉnh sửa</p> <p>Xem chi tiết</p></td>
                        </tr>
                    ))):(<></>)}
                   
                </tbody>
            </table>
      </div>
      <div>Pagination</div>
    </div>
  )
}
