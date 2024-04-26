import { DndContext, closestCorners } from "@dnd-kit/core"
import { useEffect, useState } from "react"
import { arrayMove } from "@dnd-kit/sortable";
import PropTypes from 'prop-types'
import RowItemDrag from "./RowItemDrag";
import { createRouteVarDuplicate } from "../../../../api/route-var-api";
//import ComboboxComponent from "../../../store-components/ComboboxComponent";
import { getDistrictByProvinceId } from "../../../../api/store-api";
// import { HiOutlinePlus } from "react-icons/hi";
// import { getStations } from "../../../../api/station-api";
import {toast} from 'react-toastify'
import StationByZone from "../StationByZone";


export default function DragandDrop({listRouteVarStation, routevarId, routeId}) {
    
    const [listRouteStationUpdate,setListRouteStationUpdate]=useState([]);
    const [duplicateRouteVarModel,setDuplicateRouteVarModel]=useState([]);
    const [flag,setFlag]=useState(false);
    const [listZone, setListZone]=useState([]);
    const [stationChoosen, setStationChoozen]=useState(null);
    // const [listStationbyZone, setListStationbyZone]=useState([]);
    const [stationDup,setStationDup]=useState(false);
    //const [staionChoosen,setStationChoosen]=useState(null);
    const [loading,setLoading]=useState(false);

    console.log("listRouteStationUpdate",listRouteStationUpdate)
    //console.log("Station Duplicate",stationDup);
    console.log("Duplicate model",duplicateRouteVarModel);

const addStations=async (station)=>{
    //let flag=false;
    setLoading(true);
    console.log("Station to add",station)
    setStationChoozen(station);
    listRouteStationUpdate.map(async (item)=>{
            //console.log("item.stationName===station.name",item.stationName==station.name)
            if (item.stationName==station.name){await setStationDup(true);return}
            else await setStationDup(false);
            console.log("Station dup", stationDup)
        })
    stationDup===false?setListRouteStationUpdate(listRouteStationUpdate.concat({id:listRouteStationUpdate.length+1,stationId:station.id,index:listRouteStationUpdate.length +1,stationName:station.name})) :toast("Trạm đã được thêm")
    //await 
    //setListRouteStationUpdate({...listRouteStationUpdate,id:listRouteStationUpdate.length+1,station:station.id,index:listRouteStationUpdate.length +1,stationName:station.name})
    setLoading(false);
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
        duplicateRouteVarModel.push({stationId:item.stationId,index:item.index});
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
        setLoading(true)
        changeIndex();
        if(duplicateRouteVarModel.length === listRouteStationUpdate.length){
            const responseAPI= await createRouteVarDuplicate(routeId,routevarId,duplicateRouteVarModel);
            console.log("Handle confirm on drag.jsx reponse",responseAPI);
            if(responseAPI!==null || responseAPI !==undefined) toast.success("Cập nhật tuyến thành công");
            else toast.error("Cập nhật tuyến thất bại");
        } else toast("Chưa thêm xong");
        setLoading(false);
    } catch (error) {
        console.error("Handle confirm on drag.jsx: ", error)
    }
}



useEffect(()=>{
    setListRouteStationUpdate(listRouteVarStation);
},[listRouteVarStation,stationChoosen,routeId,routevarId])

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
                    {loading===true&& (
                        <p className="mb-5 text-blue-300">Đang thêm....</p>
                    )}
                    
                    <StationByZone handleCloseButtonFunc={handleCloseButton} addStationFunc={addStations} listZoneArray={listZone}/>
                </div>
               
            
        )}
        </div>
        
    </div>
    
    <div>
        <button type="button" className="bg-cyan-600 p-4 font-bold text- rounded-lg hover:bg-cyan-200" onClick={handleConfirmButton}>{loading===true ? 'Xác nhận ...':'Xác nhận'}</button>

    </div>
</div>
)
}

DragandDrop.propTypes={
  listRouteVarStation:PropTypes.array,
  routevarId:PropTypes.string,
  routeId:PropTypes.string
}
