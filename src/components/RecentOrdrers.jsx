import {Link} from 'react-router-dom'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAPIRequest,Actions } from "../lib/utils/api-request";
import { getStationRevenue } from '../api/station-api';
export default function  RecentOrdrers({param}) {
  // console.log(param);
  const formatNumber = (number) => {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  
    return formatter.format(number);
  };

  const [stationState,requestStation]=useAPIRequest(getStationRevenue);
  const [stations,setStation]=useState([]);
  useEffect( ()=>{
    requestStation();
  },[])

  useEffect(()=>{
    if(stationState.status===Actions.success){
      setStation(stationState.payload);
      // console.log("Report: ",stationState.payload)
    }
    if(stationState.status===Actions.failure){
      console.log("Get report errors:",stationState.error);
    }
  },[stationState]);

  const navigate = useNavigate();
  const handleClick=()=>{
    navigate(`station`)
  }
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div className='inline-flex w-full'>
        <strong>Top 5 trạm có doanh thu cao nhất</strong>
        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
          <button
            onClick={()=>handleClick()}
            className="bg-indigo-500 text-white active:bg-cyan-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
              Tất cả
          </button>
        </div>
      </div>
      {stations.length>0?
      <div className="mt-3">
        <table className="w-full text-gray-700 border-x border-gray-200 rounded-sm">
          <thead>
            <tr className='font-bold'>
              <td >#</td>
              <td>Trạm</td>
              <td>Cửa hàng</td>
              <td>Địa chỉ</td>
              <td>Số lượng đơn</td>
              {/* <td>Orders Cancelled</td> */}
              
              <td>Tổng doanh thu</td>
              
            </tr>
          </thead>
          <tbody>
            {stations.slice(0,5).map((station,index)=>(
              <tr key={index}>
                <td className='pr-3'>{index+1}</td>
                <td>{station.name}</td>
                <td>{station.storeName}</td>
                <td className=''>{station.address} VNĐ</td>
                <td className='px-7'>{station.orderCompleted}</td>
                {/* <td></td> */}
                {/* <td className='px-6'>{station.orderCanceled + station.orderOthers}</td> */}
                
                <td className='pl-4'>{formatNumber(station.revenue)} VNĐ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      :
      <></>}
    </div>
  )
}
