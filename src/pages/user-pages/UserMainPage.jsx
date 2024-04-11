import { useCallback, useEffect, useState } from "react"
import { getUsers } from "../../api/user-api.js";
import { useNavigate } from "react-router-dom";
import MenuDropDown from "../../components/shared/MenuDropDown.jsx";


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

const ViewDetailFunc=(userId)=>{
  navigate(`/user/${userId}`);
}

  useEffect(()=>{
    
    fetchData()
  },[])
  return (
    <div className="">
      {/* <div>Search</div> */}

        <h1 className="py-8 text-xl font-bold text-center">Danh Sách Người Dùng Trong Hệ Thống</h1>
      <table className=" w-full h-96 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-auto">
                <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-40 h-10 items-center">
                    <tr>
                    <th className="px-4">#</th>
                    <th>Họ và tên</th>
                    <th>Số điện thoại</th>
                    <th>Ngày sinh</th>
                    <th>Quyền</th>
                    <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody className="h-96 overflow-auto">
                    {listUser && listUser.length >0 ? (listUser.map((item,index)=>(
                        <tr key={index} className=" h-8 border-b dark:bg-gray-800 dark:border-gray-700 text-xs">
                             <td className="px-4">{index+1}</td>
                            <td>{item.fullName}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.dateOfBirth}</td>
                            
                            <td>{item.roleName}</td>
                            <td><MenuDropDown/></td>
                        </tr>
                    ))):(<></>)}
                   
                </tbody>
            </table>
      {/* <div>Pagination</div> */}
    </div>
  )
}
