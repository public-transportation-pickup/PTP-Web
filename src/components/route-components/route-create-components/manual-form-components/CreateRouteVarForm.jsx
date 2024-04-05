import PropTypes from 'prop-types'
import { useState } from 'react'
import { HiArrowRight } from "react-icons/hi";
import StationByZone from '../StationByZone';


export default function CreateRouteVarForm({routeIdReturn}) {
  const [createRouteVarModel,setCreateRouteVarModel]=useState({
      routeVarId:0,
      routeVarName:'',
      routeVarShortName:'',
      startStop:'',
      endStop:'',
      outBound:true,
      runningTime:0,
      //routeStations:[],
      routeId:'',
  })
  const [isOpen,setIsOpen]=useState(false);
  const handleAddStation=async ()=>{
    setIsOpen(true);
  }



  // const handleSubmit=async ()=>{
  //   await setCreateRouteVarModel({...createRouteVarModel,routeId:routeIdReturn});
    
  // }
  return (
    <div>
      {!routeIdReturn && (<div>
        <p>Vui lòng hoàn thành bước 1 để thao tác tiếp bước 2</p>
      </div>)}
    <div>
      <div className="flex flex-row gap-2">
        {/* <p>Bạn có muốn bản sao của 1 lượt có sẵn từ hệ thống không</p>
        <button type="button" className="bg-green-300 p-3 rounded-lg hover:opacity-80">Có</button>
        <button type="button" className="bg-rose-300 p-3 rounded-lg hover:opacity-80">Không</button> */}
      </div>
       
        <div>
        <main className="mx-20 mx-auto my-4">
        {/* <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="RouteId" id="RouteId" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={routeIdReturn} readOnly />
            <label htmlFor="RouteId" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mã số tuyến</label>
        </div> */}
        <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="routeVarName" id="routeVarName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="routeVarName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tên lượt</label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="startStop" id="startStop" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="startStop" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Trạm bắt đầu</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="endStop" id="endStop" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="endStop" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Trạm kết thúc</label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
          {/* pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" */}
              <input type="number"  name="runningTime" id="runningTime" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="runningTime" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Thời gian hoàn thành chuyến (phút)</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
              {/* <input type="time" name="operationTimeEnd" id="operationTimeEnd" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="operationTimeEnd" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Thời gian kết thúc hoạt động tuyến</label> */}
              <label htmlFor="outBound" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Chọn lượt</label>

                <select name="outBound" id="outBound" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                  <option value={true}>Lượt đi</option>
                  <option value={false}>Lượt về</option>
                </select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
              {/* <input type="text" name="outBoundName" id="outBoundName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required /> */}
              <p className="text-sm text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 flex flex-row items-center gap-1 hover:underline cursor-pointer">Tạo danh sách trạm <HiArrowRight /></p>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            {/* Vòng lặp for */}
            {/* {createRouteVarModel.routeStations.map((item,index)=>(
              <div key={index}>
                <input value={item.stationName} type="text" name="stationName" id="stationName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="stationName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Trạm {index+1}</label>
              </div>
            ))} */}
              
          </div>
        </div>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Xác nhận</button>
      </main>

        </div>
    </div>
    {isOpen===true &&(
      <div>
      <StationByZone/>
    </div>
    )}
    
    </div>
  )
}

CreateRouteVarForm.propTypes={
  routeIdReturn:PropTypes.string
}