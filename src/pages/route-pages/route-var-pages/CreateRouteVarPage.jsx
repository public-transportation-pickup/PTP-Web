import CreateRouteVarForm1 from "../../../components/route-components/route-create-components/manual-form-components/CreateRouteVarForm1";
import { ToastContainer, toast } from "react-toastify";
import CreateRouteVarForm2 from "../../../components/route-components/route-create-components/manual-form-components/CreateRouteVarForm2";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

export default function CreateRouteVarPage() {
  const params=useParams();
  const navigate=useNavigate()
  //const [routeId,setRouteId]=useState('');
  const [routeVarIdOutBound,setRouteVarIdOutBound]=useState('');
  const [routeVarIdInBound,setRouteVarIdInBound]=useState('');
  console.log("routeVarIdOutBound",routeVarIdOutBound);
  console.log("routeVarIdInBound",routeVarIdInBound)
  const handleContinueButton=async ()=>{
    if(routeVarIdOutBound!=='') navigate(`/route/${params.routeId}/routevar/${routeVarIdOutBound}/timetable/create`)
    else toast("Chưa tạo lượt")
  }

  useEffect(()=>{
    // const fetchData=async ()=>{
    //     setRouteId(params.routeId)
    // }
    // fetchData();
  },[params.routeId])

  return (
    <div>
      <ToastContainer/>
      <div className="border-2 rounded-lg border-amber-200 p-4">
        <p>Hướng dẫn chung:</p>
        <div>
          <p>- Bạn cần tạo đầy đủ 2 lượt để đến bước tiếp theo là áp dụng thời khóa biểu</p>
        </div>
      </div>
      <CreateRouteVarForm1 getRoutevar1={setRouteVarIdOutBound}/>
      <CreateRouteVarForm2 getRoutevar2={setRouteVarIdInBound}/>
      {routeVarIdOutBound==='' && routeVarIdInBound===''&&(
          <div onClick={handleContinueButton} className="flex flex-row gap-3 items-end ml-auto w-64 p-4 rounded-lg my-8 text-white bg-cyan-700 hover:bg-cyan-500">
            <button   type="button" className="">Tiếp tục tạo thời khóa biểu </button><HiArrowRight className="" size={20}/>
          </div>
        ) }
      
    </div>
  )
}
