import { useEffect, useState } from "react";
import { HiOutlineEye,HiOutlineMap,HiOutlineXCircle, HiArrowRight  } from "react-icons/hi";
import {useParams,useNavigate} from 'react-router-dom'
import { getRouteById } from "../../api/route-api";
import { getRouteVars } from "../../api/route-var-api";
import { ToastContainer,toast } from "react-toastify";
import { getRouteStation } from "../../api/route-station-api";
import Map from '../../pages/Map.jsx';
import { getTimeTableByRouteIdandRouteVarId } from "../../api/timetable-api.js";

export default function DetailRoutePage() {
  const params=useParams();
  const navigate=useNavigate();
  const [routeInfo,setRouteInfo]=useState({});
  const [routeStationList1,setRouteStationList1]=useState([])
  const [routeStationList2,setRouteStationList2]=useState([])
  const [timetable1,setTimetable1]=useState(null)
  const [timetable2,setTimetable2]=useState(null)
  const [isOpenMap,setIsOpenMap]=useState(false);
  const [MapType,setMapType]=useState(null);
  const [flagCreateRoutevar,setFlagCreateRoutevar]=useState(true);


  console.log("routeStationList1",routeStationList1)
  console.log("routeStationList2",routeStationList2)

  const handleViewMap = (enumType)=>{
    setIsOpenMap(true);
    if(enumType === true){
      setMapType(true)
    }else if (enumType===false){
      setMapType(false)
    }
  }

  const handleCloseMap=()=>{
    setIsOpenMap(false);
  }

  const handleCreateAnotherRoutevar=async ()=>{
    
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
              const responseTimetable1= await getTimeTableByRouteIdandRouteVarId(params.routeId, item.id);
              if(responseTimetable1!==null) setTimetable1(responseTimetable1[0])
            }else{
              setRouteStationList2(responseRouteStation);
              console.log("Luot 2",item.id)
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
    <div className="mx-8">
      <ToastContainer/>
      <div className="mb-2">
        <p className="text-center text-2xl pb-6 text-amber-500 font-bold">

          {routeInfo.name}
          
        </p>
        <p><span className="text-amber-500 font-bold" >Mã số tuyến:</span> <span>{routeInfo.routeNo}</span></p>
        <p><span className="text-amber-500 font-bold" >Khoảng cách:</span> <span>{routeInfo.distance} mét</span></p>
        <p><span className="text-amber-500 font-bold" >Thời gian của 1 chuyến:</span> <span>{routeInfo.timeOfTrip} phút</span></p>
        <p><span className="text-amber-500 font-bold" >Thời gian giãn cách:</span> <span>{routeInfo.headWay} phút</span></p>
        <p><span className="text-amber-500 font-bold" >Loại xe:</span> <span>{routeInfo.numOfSeats} chỗ</span></p>
        <p><span className="text-amber-500 font-bold" >Tổng số chuyến:</span> <span>{routeInfo.totalTrip}</span></p>
        <p><span className="text-amber-500 font-bold" >Thuộc tổ chức:</span> <span>{routeInfo.orgs}</span></p>
        <p><span className="text-amber-500 font-bold" >Mô tả vé:</span> <span>{routeInfo.tickets}</span></p>
        <p><span className="text-amber-500 font-bold" >Thời khóa biểu - lượt đi:</span> <span>{timetable1!==null? timetable1.applyDates:"Chưa có thời khóa biểu cho lượt đi"}</span></p>
        <p><span className="text-amber-500 font-bold" >Thời khóa biểu - lượt về:</span> <span>{timetable2!==null? timetable2.applyDates:"Chưa có thời khóa biểu cho lượt về"}</span></p>
        <p><span className="text-amber-500 font-bold" >Trạng thái:</span> <span>{routeInfo.status}</span></p>
      </div>
      
      <div className="flex flex-col gap-4">
      {/* Lượt  */}
      <div className="border-2 border-amber-200 p-4 rounded-lg">
        <HiOutlineEye className="bg-amber-400 rounded-full cursor-pointer hover:bg-amber-200 ml-auto" onClick={()=>handleViewMap(true)} size={25}/>
        <div>
        <h1 className="text-amber-500 underline">Lượt đi:</h1>
        {/* {loading===true &&(<p>Đang lấy dữ liệu...</p>)} */}
          {routeStationList1&& routeStationList1.length>0&&routeStationList1.map((item,index)=>(
            <div key={index} className="inline-flex items-center gap-1">
              <p className="mr-2">{item.stationName}</p>
              {index===routeStationList1.length-1?(<></>):<HiArrowRight className="mr-2 font-bold"/>} 
            </div>
          ))}
        </div>
        
      </div>
      {/* Lượt về */}
      <div className="border-2 border-amber-200 p-4 rounded-lg">
        <HiOutlineEye className="bg-amber-400 rounded-full cursor-pointer hover:bg-amber-200 ml-auto" onClick={()=>handleViewMap(false)} size={25}/>
        <div>
        <h1 className="text-amber-500 underline">Lượt về:</h1>
        {/* {loading===true &&(<p>Đang lấy dữ liệu...</p>)} */}
          {routeStationList2&& routeStationList2.length>0&&routeStationList2.map((item,index)=>(
            <div key={index} className="inline-flex items-center gap-1">
              <p className="mr-2">{item.stationName}</p>
              {index===routeStationList2.length-1?(<></>):<HiArrowRight className="mr-2"/>} 
            </div>
          ))}
          {routeStationList2.length===0&&(
            <div>
              <p>Lượt về này hiện chưa có dữ liệu. Bạn có muốn tạo dữ liệu cho lượt về này không?</p>
              <button>Có</button>
              <button>Không</button>
            </div>
          )}
        </div>
        
      </div>
      {/*End Lượt về */}
      {/* Map của lượt */}
      {isOpenMap===true &&(
        <div className="border-2 border-amber-200 rounded-lg p-4 w-2/3 mx-auto">
          <h1>Bản đồ lượt đi</h1>
        <HiOutlineXCircle onClick={handleCloseMap} className="cursor-pointer ml-auto" size={30}/>
        {MapType===true && (
          <Map markers={routeStationList1}/>
        )}
      </div>
      )}
      {isOpenMap===true &&(
        <div className="border-2 border-amber-200 rounded-lg p-4 mx-auto">
          <h1>Bản đồ lượt về</h1>
        <HiOutlineXCircle onClick={handleCloseMap} className="cursor-pointer ml-auto" size={30}/>
        {MapType===false && (
          <Map markers={routeStationList2}/>
        )}
      </div>
      )}
      
      {/*End Map của lượt */}
    </div>
    </div>
    
  )
}
