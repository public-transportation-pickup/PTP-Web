import { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { createTrip } from "../../../../api/trip-api";
import {toast} from 'react-toastify'
import {useParams} from 'react-router-dom'
import { getRouteById } from "../../../../api/route-api";
import { getRouteVarsById } from "../../../../api/route-var-api";
import { getTimeTableByRouteIdandRouteVarId } from "../../../../api/timetable-api";

export default function CreateTripForm() {
  //const navigate=useNavigate();
  const params=useParams();
  const [routeInfo,setRouteInfo]=useState({})
  const [routevarInfo,setRoutevarInfo]=useState({})
  const [timetableInfo,setTimetableInfo]=useState([])
  const [buttonSubmit,setButtonSubmit]=useState(false);

  const [timeTableModel,setTimetableModel]=useState({
    name:'',
    description:'',
    startTime:'',
    timeTableId:''
  })
  console.log("time table id", params.timeTableId)
  console.log("Time table info",timetableInfo)
  const handleChange=async(e)=>{
    setTimetableModel({...timeTableModel,[e.target.id]:e.target.value,})
  }
  const handleSubmit=async ()=>{
    try {
      const responseAPI= await createTrip(timeTableModel);
      await console.log("Reponse api create trip form page", responseAPI);
      if (responseAPI===null){
        toast("Tạo chuyến thất bại")
      } 
      else{
        setButtonSubmit(true);
        toast.success("Tạo chuyến thành công")
      } 
    } catch (error) {
      console.error("handle submit create trip form", error);
    }
  }

  useEffect(()=>{
    const fectchData=async ()=>{
      try {
        const responseRouteInfo= await getRouteById(params.routeId);
        const responseRoutevarInfo=await getRouteVarsById(params.routevarId);
        const responseTimetableInfo=await getTimeTableByRouteIdandRouteVarId(params.routeId, params.routevarId)
        responseRouteInfo===null?setRouteInfo({}): setRouteInfo(responseRouteInfo)
        responseRoutevarInfo===null?setRoutevarInfo({}):setRoutevarInfo(responseRoutevarInfo);
        responseTimetableInfo===null? setTimetableInfo([]):setTimetableInfo(responseTimetableInfo);
      } catch (error) {
        console.error("create trip page fetch data: ", error);
      }
    }
    setTimetableModel({...timeTableModel,timeTableId:params.timetableId})
    fectchData();
  },[params])

  return (
    <main className="mx-20 mx-auto my-4">
      <h1>Tạo chuyến cho tuyến {routeInfo.name} lượt {routevarInfo.routeVarName}</h1>
      <p>Chuyến sẽ được áp dụng thời khóa biểu</p>
      <div className="relative z-0 w-full mb-5 group">
            <input onChange={handleChange} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mã số chuyến</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input onChange={handleChange} type="text" name="startTime" id="startTime" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="startTime" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tên tuyến</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <textarea onChange={handleChange} type="text" name="description" id="description" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mô tả chuyến</label>
        </div>
        {/* <button onClick={handleSubmit} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Xác nhận</button>
         */}
          <div className="mt-4">
        <div className="flex flex-row gap-4">
        <button disabled={buttonSubmit===true ? true :false} onClick={handleSubmit} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Xác nhận</button>
        {/*buttonSubmit===true&&(
          <div className="flex flex-row gap-3 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <button  onClick={handleContinueButton} type="button" className="">Tiếp tục tạo chuyến </button><HiArrowRight className="" size={20}/>
          </div>
        ) */}
        </div>
        </div>

    </main>
  )
}

CreateTripForm.propTypes={
  TimetableIdStr:PropTypes.string
}
