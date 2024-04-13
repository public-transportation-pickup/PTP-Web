import PropTypes from 'prop-types'
import ComboboxComponent from '../../store-components/ComboboxComponent'
import { useEffect, useState } from 'react'
import { getStations } from '../../../api/station-api';
import { HiOutlinePlus } from "react-icons/hi";
import { toast } from 'react-toastify';

export default function StationByZone({handleCloseButtonFunc,addStationFunc,listZoneArray}) {
  //const [listZone, setListZone]=useState([]);
  const [zoneChoosen, setZoneChoozen]=useState(null);
  const [listStationbyZone, setListStationbyZone]=useState([]);
  //const [stationChoose,setStationChoose]=useState({});
//   const getStationtoAdd=async (value)=>{
//       console.log("Station choose",value);
//   }
    useEffect(()=>{
      const fetchData= async ()=>{
        if(zoneChoosen!==null){
            try {
                const responseAPI=await  getStations(zoneChoosen.district_name);
                console.log("ReponseAPI ",responseAPI);
                Array.isArray(responseAPI) ===true && responseAPI.length > 0 ? setListStationbyZone(responseAPI): setListStationbyZone([]);
            } catch (error) {
                console.log("get station by zone exception on drag.jsx", error)
            }
        }
        // listRouteVarStation.forEach(async element=> {
        //     console.log("Element", element);
        //     await setListRouteStationUpdate(()=>[...listRouteStationUpdate,{stationId:element.id,index:element.index,stationName:element.stationName},]);
        // });
            
    }
    fetchData();
    },[zoneChoosen])

  return (
    <div>
                <div className="bg-yellow-100 rounded-lg px-4 py-2">
                    <div className=" mb-2 w-28">
                        <span>Chọn quận</span>
                    </div>
                    <ComboboxComponent listItems={listZoneArray} params="district_name" onValueChange={setZoneChoozen}/>
                </div>
                <div className="h-96 overflow-auto mt-1 bg-sky-100 rounded-lg p-2">
                    <div className="">
                    <ComboboxComponent listItems={listStationbyZone} params="name" onValueChange={()=>addStationFunc}/>
                    </div>
                    {listStationbyZone && listStationbyZone.length >0 && (listStationbyZone.map((item,index)=>(
                        <div key={index} className="flex justify-between border-b-2 p-2 text-sm">
                        <div className="ml-4">{index+1}- {item.name}</div>
                        <HiOutlinePlus className="w-5 h-5 rounded-full bg-red-200 hover:opacity-95" onClick={()=>addStationFunc(item)}/>
                    </div>
                    )))}
                </div>
                <div className="bg-violet-100 rounded-lg p-4 items-center flex justify-center">
                    <button className="bg-violet-300 rounded-lg p-4" onClick={handleCloseButtonFunc}>Đóng</button>
                </div>
            </div>
  )
}

StationByZone.propTypes={
  handleCloseButtonFunc:PropTypes.func,
  addStationFunc:PropTypes.func,
  listZoneArray:PropTypes.array
}

