//import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { HiArrowRight } from "react-icons/hi";
import StationByZone from '../StationByZone';
import { getDistrictByProvinceId } from '../../../../api/store-api';
import { HiOutlineTrash} from "react-icons/hi";
import {toast} from 'react-toastify'
import { createRouteVarManually } from '../../../../api/route-var-api';
import {useNavigate, useParams} from 'react-router-dom'
import { getRouteById } from '../../../../api/route-api';


export default function CreateRouteVarForm1() {
  const navigate=useNavigate();
  const params=useParams();
  const [listRouteStation,setListRouteStation]=useState([]);
  const [isOpen,setIsOpen]=useState(false);
  const [listZone,setListZone]=useState([]);
  const [createRouteVarModel,setCreateRouteVarModel]=useState({
      routeVarId:0,
      routeVarName:'',
      routeVarShortName:'',
      startStop:'',
      endStop:'',
      outBound:true,
      runningTime:0,
      routeStations:[],
      routeId:'',
  })
  const [routeInfo,setRouteInfo]=useState({});
  const [routevarId,setRoutevarId]=useState('');
  const [buttonSubmit,setButtonSubmit]=useState(false);

  console.log("List route var", listRouteStation)
  console.log("Create route var model", createRouteVarModel);
  //console.log("Create route var model", createRouteVarModel2);
  console.log("RouteInfo", routeInfo)
  const handleAddStation=async (station)=>{
    let lenngthArray= createRouteVarModel.routeStations.length;
    setListRouteStation(listRouteStation.concat(station))
    setCreateRouteVarModel({...createRouteVarModel,routeStations: createRouteVarModel.routeStations.concat({stationId:station.id,index:lenngthArray, description:""})})
  }

  const handleCloseButton=async ()=>{
    setIsOpen(false);
  }

  const handleRemoveStation= (id)=>{
    setListRouteStation(listRouteStation.filter((station)=>station.id!==id))
    setCreateRouteVarModel(createRouteVarModel.routeStations.filter((station)=>station.stationId!==id));
  }

  const handleChange=async(e)=>{
    setCreateRouteVarModel({...createRouteVarModel,[e.target.id]:e.target.value,})
  }

  const handleContinueButton=async ()=>{
    navigate(`/route/${params.routeId}/routevar/${routevarId}/timetable/create`)
  }

  const handleSubmit=async ()=>{
    setCreateRouteVarModel({...createRouteVarModel,routeId:params.routeId});
    try {
      if(params.routeId!==null && params.routeId){
        const responseAPI= await createRouteVarManually(createRouteVarModel);
        console.log("Reponse api create route manuall",responseAPI);
        if(responseAPI!==null || responseAPI !==undefined){
          
          toast("Tạo lượt thành công");
          setRoutevarId(responseAPI.id);
          setButtonSubmit(true);
        } 
        else toast("Tạo lượt thất bại");
      }
    } catch (error) {
      console.error("Handle submit create route var",error);
    }
  }
  useEffect(()=>{
    const fetchData=async ()=>{
      try {
        const responseAPI= await getDistrictByProvinceId("79");
        const responseRouteInfo= await getRouteById(params.routeId);
        setListZone(responseAPI);
        setRouteInfo(responseRouteInfo);
      } catch (error) {
        console.error("Fetch data create routevar page",error)
      }
    }
    fetchData();
    setCreateRouteVarModel({...createRouteVarModel,routeId:params.routeId})
  },[listRouteStation])
  return (
    <div>
      {/* {!params.routeId && (<div>
        <p>Vui lòng hoàn thành bước 1 để thao tác tiếp bước 2</p>
      </div>)} */}
    <div>
      <div className="flex flex-row gap-2">
      </div>
       
        <div>
        <main className="mx-20 mx-auto my-4">
          <h1>Tạo lượt đi cho tuyến {routeInfo.name}</h1>
        <div className="relative z-0 w-full mb-5 group">
            <input onChange={handleChange} type="text" name="routeVarName" id="routeVarName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="routeVarName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tên lượt</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input onChange={handleChange} type="text" name="routeVarShortName" id="routeVarShortName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="routeVarShortName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tên ngắn gọn lượt</label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
              <input onChange={handleChange} type="text" name="startStop" id="startStop" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="startStop" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Trạm bắt đầu</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
              <input onChange={handleChange} type="text" name="endStop" id="endStop" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="endStop" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Trạm kết thúc</label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
        
              <input onChange={handleChange} type="number"  name="runningTime" id="runningTime" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="runningTime" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Thời gian hoàn thành chuyến (phút)</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input value="Lượt đi" type="text"  name="outBound" id="outBound" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " readOnly />
              <label htmlFor="outBound" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Lượt đi</label>

                {/* <select name="outBound" id="outBound" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                  <option value={true}>Lượt đi</option>
                  <option value={false}>Lượt về</option>
                </select> */}
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
              <p onClick={()=>setIsOpen(true)} className="text-sm text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 flex flex-row items-center gap-1 hover:underline cursor-pointer">Tạo danh sách trạm <HiArrowRight /></p>
              <p>Vui lòng kiểm tra danh sách trạm và thứ tự trước khi xác nhận. Cám ơn bạn đã hợp tác</p>

              {isOpen===true &&(
      <div className='mt-4'>
      <StationByZone handleCloseButtonFunc={handleCloseButton} addStationFunc={handleAddStation} listZoneArray={listZone}/>
    </div>
    )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            {listRouteStation && listRouteStation.length >0 ?( listRouteStation.map((item,index)=>(
              <div key={index} className='flex flex-row mb-1 items-center gap-2'>
                <div className='border-2 w-2/3 flex flex-row gap-2 items-center border-slate-300 py-2'>
                  <div className='ml-2'>
                    {index+1} - {item.name} 
                  </div>
                  {/* <div className='flex flex-row ml-auto gap-2'> */}
                    <input className='w-1/2 text-center ml-auto mr-2' value={index}/>
                  {/* </div> */}
                  
                </div>
                <HiOutlineTrash className='hover: cursor-pointer' size={20} onClick={()=>handleRemoveStation(item.id)}/>
              </div>
            ))):(
              <div></div>
            )}
              
          </div>
        </div>
        <div className="flex flex-row gap-4">
        <button disabled={buttonSubmit===true ? true :false} onClick={handleSubmit} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Xác nhận</button>
        {buttonSubmit===true&&(
          <div className="flex flex-row gap-3 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <button  onClick={handleContinueButton} type="button" className="">Tiếp tục tạo thời khóa biểu </button><HiArrowRight className="" size={20}/>
          </div>
        ) }
        </div>
      </main>

        </div>
    </div>
    
    
    </div>
  )
}

// CreateRouteVarForm.propTypes={
//   routeIdReturn:PropTypes.string,
//   getRouteVarId:PropTypes.func
// }