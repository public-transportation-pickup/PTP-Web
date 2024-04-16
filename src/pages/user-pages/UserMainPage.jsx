import { useCallback, useEffect, useState } from "react"
import { getUsers } from "../../api/user-api.js";
import { useNavigate } from "react-router-dom";
import MenuDropDown from "../../components/shared/MenuDropDown.jsx";
import ComboBox from "../../components/shared/ComboBox.jsx";
import PaginationButton from "../../components/shared/PaginationButton.jsx";
import { GetDate } from "../../lib/utils/DateFormat.jsx";
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

const ViewDetailFunc=(userId)=>{
  navigate(`/user/${userId}`);
}

  useEffect(()=>{
    // console.log(roleName);
    fetchData(roleName)
  },[roleName]);
  return (
    <div className="">
      {/* <div>Search</div> */}

      <h1 className="text-xl font-bold text-center">Danh Sách Người Dùng Trong Hệ Thống</h1>
      <div className="flex flex-row">
      <p className="my-auto pr-3 text-base font-semibold text-center">Bộ lọc: </p>
      <ComboBox setRoleName={setRoleName} ></ComboBox>
      </div>
      <table className=" w-full h-96 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-auto">
                <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-40 h-10 items-center">
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
                        <tr key={index} className=" border-b dark:bg-gray-800 dark:border-gray-700 text-xs">
                             <td className="px-4">{index+1}</td>
                            <td>{item.fullName}</td>
                            <td>{item.email}</td>
                            <td>{item.phoneNumber}</td>
                            <td><GetDate date={item.dateOfBirth}></GetDate></td>
                            
                            <td>{item.roleName==='StoreManager'?
                              'Quản lý'
                              :(item.roleName=='Admin')?'Quản trị viên':'Khách hàng'}</td>
                            <td><MenuDropDown/></td>
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
    </div>
  )
}
