import { useEffect, useState } from "react";
import { HiOutlineEye } from "react-icons/hi";
import {useParams} from 'react-router-dom'
import { getRouteById } from "../../api/route-api";
import { getRouteVars } from "../../api/route-var-api";
import { ToastContainer,toast } from "react-toastify";
import { getRouteStation } from "../../api/route-station-api";
import { HiArrowRight } from "react-icons/hi";

export default function DetailRoutePage() {
  const params=useParams();
  const [routeInfo,setRouteInfo]=useState({});

  const [routeStationList1,setRouteStationList1]=useState([])
  const [routeStationList2,setRouteStationList2]=useState([])
  const [coorList1, setCoorList1]=useState([]);
  const [coorList2, setCoorList2]=useState([]);
  const [MapType,setMapType]=useState('');
  //{id, geocode:[lat,long],popup}
  console.log("routeStationList1",routeStationList1)
  console.log("routeStationList2",routeStationList2)
  console.log("coorList 1",coorList1)
  console.log("coorList 2",coorList2)

  const handleViewMap=async(enum)=>{
    if(enum ==="Var1"){
      setMapType("Var1")
    }
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
              await routeStationList1.map((item,index)=>{
                setCoorList1(coorList1.concat({id:index,geocode:[item.latitude,item.longitude],popUp:item.stationName}))
              })
            }else{
              setRouteStationList2(responseRouteStation);
              await routeStationList2.map((item,index)=>{
                setCoorList2(coorList2.concat({id:index,geocode:[item.latitude,item.longitude],popUp:item.stationName}))
              })
            }
          })
          responserouteInfo!==null?setRouteInfo(responserouteInfo):setRouteInfo({});
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
    <div>
      <div>
        <p>Thông tin của tuyến: <span>{routeInfo.routeNo}</span></p>
        <p>Tên tuyến: <span>{routeInfo.name}</span></p>
        <p>Khoảng cách: <span>{routeInfo.distance}</span></p>
        <p>Thời gian chuyến: <span>{routeInfo.timeOfTrip}</span></p>
        <p>Thời gian giãn cách: <span>{routeInfo.headWay}</span></p>
        <p>Loại xe: <span>{routeInfo.numOfSeats} chỗ</span></p>
        <p>Tổng số chuyến: <span>{routeInfo.totalTrip}</span></p>
        <p>Thuộc tổ chức: <span>{routeInfo.orgs}</span></p>
        <p>Mô tả vé: <span>{routeInfo.tickets}</span></p>
        <p>Trạng thái:<span>{routeInfo.status}</span></p>
      </div>
      
      <div className="flex flex-col gap-4">
      <div>
      <HiOutlineEye/>
        <div>
        <h1>Lượt đi</h1>
          {routeStationList1&& routeStationList1.length>0&&routeStationList1.map((item,index)=>(
            <div key={index} className="inline-flex items-center gap-1">
              <p className="mr-2">{item.stationName}</p>
              {index===routeStationList1.length-1?(<></>):<HiArrowRight className="mr-2"/>} 
            </div>
          ))}
        </div>
        
      </div>
      {/* Lượt về */}
      <div>
      <div>
        <div>
          <h1>Lượt về</h1>
          {routeStationList2&& routeStationList2.length>0&&routeStationList2.map((item,index)=>(
            <div key={index}>
              <p>{item.stationName}</p>
              {index===routeStationList2.length-1?(<></>):<HiArrowRight/>} 
            </div>
          ))}
        </div>
      </div>
      </div>
      {/*End Lượt về */}
      {/* Map của lượt */}
      <div>
        
      </div>
      {/*End Map của lượt */}
    </div>
    </div>
    
  )
}
