import { useState } from "react";
import Accordion from "../../components/route-components/route-create-components/Accordion";
import CreateRouteForm from "../../components/route-components/route-create-components/manual-form-components/CreateRouteForm";
import CreateRouteVarForm from "../../components/route-components/route-create-components/manual-form-components/CreateRouteVarForm";
import DuplicateForm from "../../components/route-components/route-create-components/duplicate-form-components/DuplicateForm";
import { DUPLICATE, MANUAL } from "../../lib/enums/RouteEnums";
import CreateTimeTable from "../../components/route-components/route-create-components/manual-form-components/CreateTimeTable";
import CreateTrip from "../../components/route-components/route-create-components/manual-form-components/CreateTrip";
import Modal from "../../components/shared/Modal";
import {ToastContainer} from 'react-toastify'



export default function CreateRoutePage() {
  const [flag, setFlag]= useState(null);
  const [enumRoute, setEnumRoute]=useState('');
  const [routeId,setRouteId]=useState(null);
  const [routeVarId, setRouteVarId]=useState(null);
  console.log("Enum route",enumRoute);
  console.log("Route Id return", routeId);
  const handleDuplicateChoice=async ()=>{
    await setEnumRoute(DUPLICATE);
    setFlag(true);
    
  }
  const routeIdReturn=async (value)=>{
    await setRouteId(value.id);
  }

  const handleManuallyChoice= async()=>{
    await setEnumRoute(MANUAL);
    setFlag(false);
    
  }

  const handleSubmit=async ()=>{
    try {
      
    } catch (error) {
      console.error("handle submit create route page", error);
    }
  }

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
        <Modal buttonValue="Tạo bản sao" title="Tạo mới tuyến dựa trên tuyến có sẵn" EnumHandler={handleDuplicateChoice}/>
        <Modal buttonValue="Tạo thủ công" title="Tạo mới tuyến bằng cách thủ công" EnumHandler={handleManuallyChoice}/>
        </div>
        
      </div>
      {flag===false && (
        <div className="mt-10">
        <div className="py-2 border border-indigo-200 rounded-lg">
          <p className="text-red-400 text-lg">Chú ý: </p>
          <p>- Bạn cần điền đầy đủ thông tin và xác nhận theo thứ tự các bước</p>
        </div>
        <div className="p-4 flex flex-col gap-5">
          <Accordion title="Bước 1: Tạo thông tin tuyến" component={<CreateRouteForm getRouteFunc={routeIdReturn}/>}/> 
          <Accordion title="Bước 2: Tạo thông tin các lượt" component={<CreateRouteVarForm getRouteVarId={setRouteVarId}/>}/>
          <Accordion title="Bước 3: Tạo thời khóa biểu" component={<CreateTimeTable routeId={routeId} routeVarId={routeVarId}/>}/>
          <Accordion title="Bước 4: Tạo thông tin chuyến" component={<CreateTrip/>}/>
        </div>
        <div>
        <button onClick={()=>handleSubmit} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Xác nhận</button>
          
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
