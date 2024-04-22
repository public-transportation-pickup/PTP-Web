import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getRouteById, updateRoute } from "../../api/route-api";


export default function UpdateRoutePage() {
  const params =useParams();
  const [routeInfo,setRouteInfo]=useState(null);
  const [loading,setLoading]=useState(false);
  const [routeNo,setRouteNo]=useState('');
  const [updateRouteModel, setUpdateRouteModel]=useState({
    name: '',
    routeType: '',
    timeOfTrip: '',
    headWay: '',
    operationTime: '',
    outBoundName: '',
    numOfSeats: '',
    inBoundName: '',
    outBoundDescription: '',
    inBoundDescription: '',
    totalTrip: '',
    orgs: '',
    tickets: ''
  })

  //const [routeId,setRouteId]=useState('');

  //const [buttonSubmit,setButtonSubmit]=useState(false);
  //const [routeInfo,setRouteInfo]=useState({});
console.log("update route model", updateRouteModel)
console.log("route id update ",params.routeId)
console.log("Update route info",routeInfo)
  const handleChange=async(e)=>{
    setUpdateRouteModel({...updateRouteModel,[e.target.id]:e.target.value,})
  }

  // const handleContinueButton=async ()=>{
  //   navigate(`/route/${routeId}/routevar/update`)
  // }

  const handleSubmit=async ()=>{
    try {
      setLoading(true);
      const responseAPI= await updateRoute(params.routeId,updateRouteModel);
      console.log("Reponse api update route form page", responseAPI);
      if (responseAPI===204){
        //setRouteId(responseAPI.id);
        //setButtonSubmit(true);
        toast.success("Cập nhật tuyến thành công")
      } 
      else toast.error("Cập tuyến thất bại")
      setLoading(false)
    } catch (error) {
      console.error("handle submit update route form", error);
    }
  }

  useEffect(()=>{
    const fetchData=async ()=>{
      try {
        const responseAPI= await getRouteById(params.routeId);
        console.log("Res fetch update get route id",responseAPI);
        if(responseAPI===null){
          setRouteInfo({});
        } 
        else{
          setRouteInfo(responseAPI);
          setRouteNo(responseAPI.routeNo)
          setUpdateRouteModel({
            name: responseAPI.name,
            routeType: 'Bus',
            timeOfTrip: responseAPI.timeOfTrip,
            headWay: responseAPI.headWay,
            operationTime: responseAPI.operationTime,
            outBoundName: responseAPI.outBoundName,
            numOfSeats: responseAPI.numOfSeats,
            inBoundName: responseAPI.inboundName,
            outBoundDescription: '',
            inBoundDescription: '',
            totalTrip: responseAPI.totalTrip,
            orgs: responseAPI.orgs,
            tickets: responseAPI.tickets
          })
        } 
      } catch (error) {
        console.error("Exception fetch data update route",error);
      }
    }
    fetchData();
  },[params.routeId])
  

  return (
    <div>   
      <ToastContainer/> 
      <main className="mx-20 mx-auto my-4">
        <h1 className="text-pretty text-xl text-center py-8 uppercase font-semibold">Cập Nhật Cho Mã Tuyến:  {updateRouteModel.routeNo===null?'':routeNo}</h1>
        {/* <div className="relative z-0 w-full mb-5 group">
            <input onChange={handleChange} type="text" name="routeNo" id="routeNo" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="routeNo" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mã số tuyến</label>
        </div> */}
        <div className="relative z-0 w-full mb-5 group">
            <input value={updateRouteModel.name} onChange={handleChange} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tên tuyến</label>
        </div>
         <div className="relative z-0 w-full mb-5 group">
            <input value={updateRouteModel.routeType} type="text" name="routeType" id="routeType" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " readOnly />
            <label htmlFor="routeType" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Loại tuyến</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input value={updateRouteModel.operationTime} onChange={handleChange} type="text" name="operationTime" id="operationTime" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="operationTime" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Thời gian hoạt động</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <textarea value={updateRouteModel.tickets} onChange={handleChange} type="text" name="tickets" id="tickets" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="tickets" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mô tả vé</label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
              <input value={updateRouteModel.timeOfTrip} onChange={handleChange} type="number" name="timeOfTrip" id="timeOfTrip" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="timeOfTrip" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tổng thời gian chuyến</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
              <input value={updateRouteModel.totalTrip} onChange={handleChange} type="text" name="totalTrip" id="totalTrip" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="totalTrip" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tổng số chuyến</label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
              <input value={updateRouteModel.headWay} onChange={handleChange} type="number" name="headWay" id="headWay" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="headWay" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Thời gian giãn cách chuyến</label>
          </div>
        </div>
        {/* <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
              <input onChange={handleChange} type="time"  name="operationTimeStart" id="operationTimeStart" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="operationTimeStart" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Thời gian bắt đầu hoạt động tuyến</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
              <input onChange={handleChange} type="time" name="operationTimeEnd" id="operationTimeEnd" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="operationTimeEnd" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Thời gian kết thúc hoạt động tuyến</label>
          </div>
        </div> */}
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
              <input value={updateRouteModel.numOfSeats} onChange={handleChange} type="text" name="numOfSeats" id="numOfSeats" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="numOfSeats" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Xe mấy chỗ</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
              <input value={updateRouteModel.orgs} onChange={handleChange} type="text" name="orgs" id="orgs" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="orgs" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Thuộc tổ chức nào</label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
              <input value={updateRouteModel.inBoundName} onChange={handleChange} type="text" name="inBoundName" id="inBoundName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="inBoundName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tên lượt đi</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
              <input value={updateRouteModel.inBoundDescription} onChange={handleChange} type="text" name="inBoundDescription" id="inBoundDescription" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="inBoundDescription" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mô tả lượt đi</label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
              <input value={updateRouteModel.outBoundName} onChange={handleChange} type="text" name="outBoundName" id="outBoundName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="outBoundName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tên lượt về</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
              <input value={updateRouteModel.outBoundDescription} onChange={handleChange} type="text" name="outBoundDescription" id="outBoundDescription" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="outBoundDescription" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mô tả lượt về</label>
          </div>
        </div>
        <div className="flex flex-row gap-4">
        <button onClick={handleSubmit} type="button" className="mt-5 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-base bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">{loading===true?'Cập nhật ...':"Cập nhật"}</button>
        {/*
        disabled={buttonSubmit===true ? true :false} 
        {buttonSubmit===true&&(
          <div className="flex flex-row gap-3 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <button  onClick={handleContinueButton} type="button" className="">Tiếp tục tạo lượt </button><HiArrowRight className="" size={20}/>
          </div>
        ) } */}
        </div>
      </main>
    </div>
  )
}
