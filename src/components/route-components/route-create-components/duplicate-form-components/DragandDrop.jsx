import { DndContext, closestCorners } from "@dnd-kit/core"
import { useEffect, useState } from "react"
import { arrayMove } from "@dnd-kit/sortable";
import PropTypes from 'prop-types'
import RowItemDrag from "./RowItemDrag";
import { createRouteVarDuplicate } from "../../../../api/route-var-api";
import ComboboxComponent from "../../../store-components/ComboboxComponent";
import { getDistrictByProvinceId } from "../../../../api/store-api";
import { HiOutlinePlus } from "react-icons/hi";
import { getStations } from "../../../../api/station-api";
import {toast} from 'react-toastify'
import StationByZone from "../StationByZone";


export default function DragandDrop({listRouteVarStation, routeId}) {
    
    const [listRouteStationUpdate,setListRouteStationUpdate]=useState(listRouteVarStation);
    const [duplicateRouteVarModel,setDuplicateRouteVarModel]=useState([]);
    const [flag,setFlag]=useState(false);
    const [listZone, setListZone]=useState([]);
    const [stationChoosen, setStationChoozen]=useState(null);
    // const [listStationbyZone, setListStationbyZone]=useState([]);
    const [stationDup,setStationDup]=useState(false);
    //const [staionChoosen,setStationChoosen]=useState(null);

    //console.log("listRouteStationUpdate",listRouteStationUpdate)
    //console.log("Station Duplicate",stationDup);


const addStations=async (station)=>{
    //let flag=false;
    console.log("Station to add",station)
    await setStationChoozen(station);
    await listRouteStationUpdate.map(async (item)=>{
            //console.log("item.stationName===station.name",item.stationName==station.name)
            if (item.stationName==station.name){await setStationDup(true);return}
            else await setStationDup(false);
        })
    stationDup===false? await listRouteStationUpdate.push({id:listRouteStationUpdate.length+1,station:station.id,index:listRouteStationUpdate.length +1,stationName:station.name}):toast("Trạm đã được thêm")
    
} 

const deleteStations=async(itemDelete)=>{
    //removePeople(e) {
        console.log("Item delete",itemDelete);
        await setListRouteStationUpdate(await listRouteStationUpdate.filter(function(station) { 
            return station !== itemDelete 
        }));
    //}
}
const getTaskPos= id=> listRouteStationUpdate.findIndex(task=>task.id===id);
const handleDragEnd=async (event)=>{
    const {active, over}=event
    // console.log("Active",active);
    // console.log("Over",over);
    // console.log("Over item array", over.data.current.sortable.items)
    if(active.id===over.id) return;
    setListRouteStationUpdate(routeStation=>{
        const originPos= getTaskPos(active.id);
        const newPos=getTaskPos(over.id);
        return arrayMove(routeStation, originPos, newPos)
    })
}

const changeIndex=async()=>{
    listRouteStationUpdate.map((item,index)=>{
        item.index=index;
    })
    await console.log("Array after change index",listRouteStationUpdate);
}

const handleAddStationButton=async ()=>{
    
    try {
        setFlag(true);
        const responseDistrict=await getDistrictByProvinceId("79");
        await setListZone(responseDistrict);
    } catch (error) {
        console.log("Get all district in drag.jsx exception", error);
    }
}

const handleCloseButton=async ()=>{
    setFlag(false);
}



const handleConfirmButton=async ()=>{
    try {
        await changeIndex();
        const responseAPI= await createRouteVarDuplicate(routeId,duplicateRouteVarModel);
        console.log("Handle confirm on drag.jsx reponse",responseAPI);
    } catch (error) {
        console.error("Handle confirm on drag.jsx: ", error)
    }
}



useEffect(()=>{
   
    //setListRouteStationUpdate(listRouteVarStation);
    // const fetchData= async ()=>{
    //     listRouteVarStation.forEach(async (element)=> {
    //         //console.log("Element", element);
    //         await listRouteStationUpdate.push({id:element.index,stationId:element.id,index:element.index,stationName:element.stationName});
    //     });
            
    // }
    // fetchData();
},[listRouteVarStation,stationChoosen])

return (
<div>
    
    <div className="flex flex-row">
        <div className="m-2 mt-10 w-2/3">
            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners} >
                {/* <Input onSubmit={addTasks}/> */}
                {Array.isArray(listRouteStationUpdate)===true ?(
                <RowItemDrag listItem={listRouteStationUpdate} deleteFunc={deleteStations}/>
                ):(<div>Không có dữ liệu về chuyến</div>)}
            </DndContext>
        </div>
        <div className="w-1/3 mt-10">
           
            <div className="flex justify-center mb-8">
            {flag===false&& (
                <button className="bg-orange-200 p-4 rounded-lg mt-4" onClick={()=>handleAddStationButton()}>Thêm trạm</button>
            )}
            </div>
            {flag===true&& (
            
                <div>
                    <StationByZone handleCloseButtonFunc={handleCloseButton} addStationFunc={addStations} listZoneArray={listZone}/>
                </div>
               
            
        )}
        </div>
        
    </div>
    
    <div>
        <button type="button" className="bg-sky-400 p-4 rounded-lg" onClick={()=>handleConfirmButton}>Xác nhận</button>
    </div>
</div>
)
}

DragandDrop.propTypes={
  listRouteVarStation:PropTypes.array,
  routeId:PropTypes.string
}
