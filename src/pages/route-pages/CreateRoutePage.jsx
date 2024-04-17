import { useState } from "react";
import CreateRouteForm from "../../components/route-components/route-create-components/manual-form-components/CreateRouteForm";
import DuplicateForm from "../../components/route-components/route-create-components/duplicate-form-components/DuplicateForm";
import { DUPLICATE, MANUAL } from "../../lib/enums/RouteEnums";
import Modal from "../../components/shared/Modal";
import {ToastContainer} from 'react-toastify'
import { HiOutlineHand,HiOutlineDuplicate } from "react-icons/hi";



export default function CreateRoutePage() {
  const [flag, setFlag]= useState(null);
  const [enumRoute, setEnumRoute]=useState('');
  //const [routeId,setRouteId]=useState(null);
  // const [routeVarId, setRouteVarId]=useState(null);
  // const [timetableId,setTimetableId]=useState('');
  console.log("Enum route",enumRoute);
  // console.log("Route Id return", routeId);
  const handleDuplicateChoice=async ()=>{
    await setEnumRoute(DUPLICATE);
    setFlag(true);
    
  }

  const handleManuallyChoice= async()=>{
    await setEnumRoute(MANUAL);
    setFlag(false);
    
  }

  // const handleSubmit=async ()=>{
  //   try {
      
  //   } catch (error) {
  //     console.error("handle submit create route page", error);
  //   }
  // }


  return (
    <div>
      <ToastContainer/>
      <h2 className="text-pretty text-xl text-center py-8 uppercase font-semibold">Tạo mới tuyến</h2>
      {/* {enumRoute &&} */}
      <div className="mx-auto items-center">
        <p className="text-lg">Hiện nay hệ thống hỗ trợ 2 cách để tạo tuyến là <span className="text-lg text-cyan-500 uppercase font-bold">Chỉnh sửa trên tuyến có sẵn</span> và <span className="text-lg text-cyan-500 uppercase font-bold">Tạo thủ công tuyến mới </span></p>
        <div className="mx-auto">
          <p className="text-lg">Chọn cách để tạo: </p>
          <div className="flex flex-row gap-4 mt-4">
            <Modal buttonValue={ 
            <p className="bg-orange-400 rounded-lg p-2 hover:bg-amber-200 flex flex-row items-center gap-2"><HiOutlineDuplicate />Tạo bản sao</p>
            } title="Tạo mới tuyến dựa trên tuyến có sẵn" EnumHandler={handleDuplicateChoice}/>
            <Modal buttonValue={<p className="bg-orange-400 rounded-lg p-2 hover:bg-amber-200 flex flex-row items-center gap-2"><HiOutlineHand/>Tạo thủ công</p>} title="Tạo mới tuyến bằng cách thủ công" EnumHandler={handleManuallyChoice}/>
          </div>
        </div>
       
        
      </div>
      {flag===false && (
        <div className="mt-10">
        <div className="px-4 py-2  border-2 border-indigo-200 rounded-lg">
          <p className="text-red-400 text-lg">Hướng dẫn chung: </p>
          <p>- Bạn cần điền đầy đủ thông tin và xác nhận để đến bước tiếp theo. </p>
          <p>- Tuyến sẽ được tạo theo thứ tự các bước Tuyến-Lượt-Thời khóa biểu-Chuyến</p>
        </div>
        <div className="p-4 flex flex-col gap-5">
          <CreateRouteForm/>
        </div>
        <div>          
        </div>
      </div>
      )}
      
      {flag===true &&(
        <div className="mt-10">
        <DuplicateForm/>
        </div>
      )}
      
      
    </div>
  )
}
