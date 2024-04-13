import { useState } from "react";
import CreateRouteForm from "../../components/route-components/route-create-components/manual-form-components/CreateRouteForm";
import DuplicateForm from "../../components/route-components/route-create-components/duplicate-form-components/DuplicateForm";
import { DUPLICATE, MANUAL } from "../../lib/enums/RouteEnums";
import Modal from "../../components/shared/Modal";
import {ToastContainer} from 'react-toastify'



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
      <div>
        <p className="text-lg">Hiện nay hệ thống hỗ trợ 2 cách để tạo tuyến là <span className="text-xl text-cyan-400">Chỉnh sửa trên tuyến có sẵn</span> và <span className="text-xl text-cyan-400">Tạo thủ công tuyến mới </span></p>
        <p>Chọn cách để tạo: </p>
        {/* <button onClick={handleDuplicateChoice} className="bg-sky-400 hover:bg-opacity-90 p-4 rounded-lg mr-6">Dựa trên bản sao của tuyến có sẵn</button>
        <button onClick={handleManuallyChoice} className="bg-sky-400 hover:bg-opacity-90 p-4 rounded-lg">Tạo mới tuyến thủ công</button> */}
        <div className="flex flex-row gap-4">
        <Modal buttonValue={<p className="bg-amber-400 rounded-lg p-2 hover:bg-amber-200">Tạo bản sao</p>} title="Tạo mới tuyến dựa trên tuyến có sẵn" EnumHandler={handleDuplicateChoice}/>
        <Modal buttonValue={<p className="bg-amber-400 rounded-lg p-2 hover:bg-amber-200">Tạo thủ công</p>} title="Tạo mới tuyến bằng cách thủ công" EnumHandler={handleManuallyChoice}/>
        </div>
        
      </div>
      {flag===false && (
        <div className="mt-10">
        <div className="py-2 border border-indigo-200 rounded-lg">
          <p className="text-red-400 text-lg">Chú ý: </p>
          <p>- Bạn cần điền đầy đủ thông tin và xác nhận. Tuyến sẽ được tạo theo thứ tự Tuyến-Lượt-Thời khóa biểu-Chuyến</p>
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
