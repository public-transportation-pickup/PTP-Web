import { useEffect, useState } from "react";
import { HiOutlineEye,HiOutlineXCircle, HiArrowRight  } from "react-icons/hi";
import {useNavigate, useParams} from 'react-router-dom'
import { getRouteById } from "../../api/route-api";
import { getRouteVars } from "../../api/route-var-api";
import { ToastContainer,toast } from "react-toastify";
import { getRouteStation } from "../../api/route-station-api";
import Map from '../../pages/Map.jsx';
import { getTimeTableByRouteIdandRouteVarId } from "../../api/timetable-api.js";
import classNames from "classnames";
import { getStationByStationId } from "../../api/station-api.js";
import StationDetailModal from "../../components/route-components/StationDetailModal.jsx";
import { HiPencil } from "react-icons/hi";

export default function DetailRoutePage() {
  const params=useParams();
  const navigate=useNavigate();
  const [routeInfo,setRouteInfo]=useState({});
  const [routeStationList1,setRouteStationList1]=useState([])
  const [routeStationList2,setRouteStationList2]=useState([])
  // const [routeVar1,setRouteVar1]=useState('')
  // const [routeVar2,setRouteVar2]=useState('')
  const [timetable1,setTimetable1]=useState(null)
  const [timetable2,setTimetable2]=useState(null)
  const [isOpenMap,setIsOpenMap]=useState(null);
  const [MapType,setMapType]=useState(null);
  const [detailStation,setDetailStation]=useState(null);
  const [isOpenDetailModal,setIsOpenDetailModal]=useState(null);

  console.log("route info",routeInfo)
  console.log("routeStationList1",routeStationList1)
  console.log("routeStationList2",routeStationList2)

  const handleViewMap = (enumType)=>{
   
    if(enumType === true){
      setIsOpenMap(true);
      setMapType(true)
    }else if (enumType===false){
      setIsOpenMap(false);
      setMapType(false)
    }
  }

  const handleCloseMap=()=>{
    setIsOpenMap(null);
  }

  const handleViewStationDetail=async(stationId)=>{
    try {
      const responseAPI= await getStationByStationId(stationId);
      console.log("Response detail station",responseAPI);
      if(responseAPI!==null){
        setDetailStation(responseAPI);
        setIsOpenDetailModal(true);
      } 
    } catch (error) {
      console.error("view station detail exception",error);
    }
  }

  const handleEditRoute=async ()=>{
    navigate(`/route/${routeInfo.id}/update`);
  }

  useEffect(()=>{
    const fetchData=async ()=>{
      try {
        const responserouteInfo= await getRouteById(params.routeId);
        const responseRoutevarList= await getRouteVars(params.routeId);

        if(Array.isArray(responseRoutevarList)===true){
          responseRoutevarList.map(async(item,index)=>{
            const responseRouteStation=await getRouteStation(params.routeId,item.id);
            if(index===0 && Array.isArray(responseRouteStation)===true){
              setRouteStationList1(responseRouteStation)
              console.log("Luot 1",item.id)
              //setRouteVar1(item.id)
              const responseTimetable1= await getTimeTableByRouteIdandRouteVarId(params.routeId, item.id);
              if(responseTimetable1!==null) setTimetable1(responseTimetable1[0])
            }else{
              setRouteStationList2(responseRouteStation);
              console.log("Luot 2",item.id)
              //setRouteVar2(item.id);
              const responseTimetable2= await getTimeTableByRouteIdandRouteVarId(params.routeId, item.id);
              if(responseTimetable2!==null) setTimetable2(responseTimetable2[0])
            }
          })
          await responserouteInfo!==null?setRouteInfo(responserouteInfo):setRouteInfo({});
        
        }else{
          toast(`Tuyến số ${routeInfo.routeNo} không có lượt`)
        }
      } catch (error) {
        console.error('fetch data detail page',error)
      }
    }
    fetchData()
  },[params.routeId])

  return (
    <div className="mx-8 mt-8">
      <ToastContainer/>
      <div className="mb-2">
        <div className="flex flex-row justify-center items-center gap-4">
          <div className="text-center text-2xl pb-6 text-sky-500 font-bold mt-3">{routeInfo.name}</div>
          <HiPencil className=" bg-blue-200 hover:bg-blue-700 rounded-full text-center" size={30} onClick={()=>handleEditRoute()}/>
        </div>
        
        <div>
        <p><span className="text-sky-500 font-bold" >Mã số tuyến:</span> <span>{routeInfo.routeNo}</span></p>
        <p><span className="text-sky-500 font-bold" >Khoảng cách:</span> <span>{routeInfo.distance} mét</span></p>
        <p><span className="text-sky-500 font-bold" >Thời gian của 1 chuyến:</span> <span>{routeInfo.timeOfTrip} phút</span></p>
        <p><span className="text-sky-500 font-bold" >Thời gian giãn cách:</span> <span>{routeInfo.headWay} phút</span></p>
        <p><span className="text-sky-500 font-bold" >Thời gian hoạt động:</span> <span>{routeInfo.operationTime}</span></p>
        <p><span className="text-sky-500 font-bold" >Loại xe:</span> <span>{routeInfo.numOfSeats} chỗ</span></p>
        <p><span className="text-sky-500 font-bold" >Tổng số chuyến:</span> <span>{routeInfo.totalTrip}</span></p>
        <p><span className="text-sky-500 font-bold" >Thuộc tổ chức:</span> <span>{routeInfo.orgs}</span></p>
        <p><span className="text-sky-500 font-bold" >Mô tả vé:</span> <span>{routeInfo.tickets}</span></p>
        <p><span className="text-sky-500 font-bold" >Thời khóa biểu - lượt đi:</span> <span>{timetable1!==null? timetable1.applyDates:"Chưa có thời khóa biểu cho lượt đi"}</span></p>
        <p><span className="text-sky-500 font-bold" >Thời khóa biểu - lượt về:</span> <span>{timetable2!==null? timetable2.applyDates:"Chưa có thời khóa biểu cho lượt về"}</span></p>
        <p><span className="text-sky-500 font-bold" >Trạng thái:</span> <span>{routeInfo.status}</span></p>
        </div>
        
      </div>
      
      <div className="flex flex-col gap-4 pt-8">
      {/* Lượt  */}
      <div className="border-2 border-sky-200 p-4 rounded-lg">
        <HiOutlineEye className="bg-sky-400 rounded-full cursor-pointer hover:bg-sky-200 ml-auto" onClick={()=>handleViewMap(true)} size={25}/>
        <div>
        <h1 className="text-sky-500 underline">Lượt đi:</h1>
        {/* {loading===true &&(<p>Đang lấy dữ liệu...</p>)} */}
          {routeStationList1&& routeStationList1.length>0&&routeStationList1.map((item,index)=>(
            <div key={index} className="inline-flex items-center gap-1">
              <div onClick={()=>handleViewStationDetail(item.stationId)} className="hover:cursor-pointer">
                <p className={ classNames(item.storeId!=="00000000-0000-0000-0000-000000000000"? ' text-neutral-400':'text-black',"mr-2 hover:font-bold")}>{item.stationName}</p>
              </div>
              {index===routeStationList1.length-1?(<></>):<HiArrowRight className="mr-2 font-bold"/>} 
            </div>
          ))}
        </div>
        
      </div>
      {/* Lượt về */}
      <div className="border-2 border-sky-200 p-4 rounded-lg">
        <HiOutlineEye className="bg-sky-400 rounded-full cursor-pointer hover:bg-sky-200 ml-auto" onClick={()=>handleViewMap(false)} size={25}/>
        <div>
        <h1 className="text-sky-500 underline">Lượt về:</h1>
        {/* {loading===true &&(<p>Đang lấy dữ liệu...</p>)} */}
          {routeStationList2&& routeStationList2.length>0&&routeStationList2.map((item,index)=>(
            <div key={index} className="inline-flex items-center gap-1">
              {/* <p className="mr-2">{item.stationName}</p> */}
              {/* <p className={ classNames(item.storeId!=="00000000-0000-0000-0000-000000000000"? ' text-neutral-400':'text-black',"mr-2")}>{item.stationName}</p>
               */}
              <div onClick={()=>handleViewStationDetail(item.stationId)} className="hover:cursor-pointer">
                <p className={ classNames(item.storeId!=="00000000-0000-0000-0000-000000000000"? ' text-neutral-400':'text-black',"mr-2 hover:font-bold")}>{item.stationName}</p>
              </div>
              {index===routeStationList2.length-1?(<></>):<HiArrowRight className="mr-2"/>} 
            </div>
          ))}
          {routeStationList2.length===0&&(
            <div>
              <p>Lượt về này hiện chưa có dữ liệu. Bạn có muốn tạo dữ liệu cho lượt về này không?</p>
              <button className="bg-green-300 hover:bg-green-50">Có</button>
              <button className="bg-rose-300 hover:bg-rose-50">Không</button>
            </div>
          )}
        </div>
        
      </div>
      {/*End Lượt về */}
      {/* Map của lượt */}
      {isOpenMap===true &&(
        <div className="border-2 border-sky-200 rounded-lg p-4 mx-auto">
          <h1 className="text-sky-500">Bản đồ lượt đi</h1>
        <HiOutlineXCircle onClick={handleCloseMap} className="cursor-pointer ml-auto" size={30}/>
        {MapType===true && (
          <Map markers={routeStationList1}/>
        )}
      </div>
      )}
      {isOpenMap===false &&(
        <div className="border-2 border-sky-200 rounded-lg p-4 mx-auto">
          <h1 className="text-sky-500">Bản đồ lượt về</h1>
        <HiOutlineXCircle onClick={handleCloseMap} className="cursor-pointer ml-auto" size={30}/>
        {MapType===false && (
          <Map markers={routeStationList2}/>
        )}
      </div>
      )}
      
      {/*End Map của lượt */}

      {/* Modal detail station */}
      {
        isOpenDetailModal===true && (
          <StationDetailModal buttonCheck={isOpenDetailModal} detailStation={detailStation} setButtonCheck={setIsOpenDetailModal}/>
        )
      }
      {/* End Modal detail station */}
    </div>
    </div>
    
  )
}
