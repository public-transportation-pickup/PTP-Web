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


export default function DragandDrop({listRouteVarStation, routeId}) {
    
    const [listRouteStationUpdate,setListRouteStationUpdate]=useState([]);
    const [duplicateRouteVarModel,setDuplicateRouteVarModel]=useState([]);
    const [flag,setFlag]=useState(false);
    const [listZone, setListZone]=useState([]);
    const [zoneChoosen, setZoneChoozen]=useState(null);
    const [listStationbyZone, setListStationbyZone]=useState([]);
    //const [staionChoosen,setStationChoosen]=useState(null);

    console.log("listRouteStationUpdate",listRouteStationUpdate)
    console.log("flag", flag);
    console.log("list zone",listZone);
    //console.log("zone choose "+ zoneChoosen +"zone name" + zoneChoosen.district_name);
    console.log("List station by zone",listStationbyZone);
// const addStations=(station)=>{
//     setListRouteStationUpdate(()=>[...listRouteStationUpdate,station])
// } 

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

const getStationtoAdd=async (value)=>{
    console.log("Station choose",value);
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
    setListRouteStationUpdate(listRouteVarStation);
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
    }
    fetchData();
},[listRouteVarStation,zoneChoosen])

return (
<div>
    
    <div className="flex flex-row">
        <div className="m-2 mt-10 w-2/3">
            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners} >
                {/* <Input onSubmit={addTasks}/> */}
                {Array.isArray(listRouteStationUpdate)}
                <RowItemDrag listItem={listRouteStationUpdate} deleteFunc={deleteStations}/>
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
                <div className="bg-yellow-100 rounded-lg px-4 py-2">
                    <div className=" mb-2 w-28">
                        <span>Chọn quận</span>
                    </div>
                    <ComboboxComponent listItems={listZone} params="district_name" onValueChange={setZoneChoozen}/>
                </div>
                <div className="h-96 overflow-auto mt-1 bg-sky-100 rounded-lg p-2">
                    <div className="">
                    <ComboboxComponent listItems={listStationbyZone} params="name" onValueChange={getStationtoAdd}/>
                    </div>
                    {listStationbyZone && listStationbyZone.length >0 && (listStationbyZone.map((item,index)=>(
                        <div key={index} className="flex justify-between border-b-2 p-2 text-sm">
                        <div className="ml-4">{index+1}- {item.name}</div>
                        <HiOutlinePlus className="w-5 h-5 rounded-full bg-red-200 hover:opacity-95" />
                    </div>
                    )))}
                </div>
                <div className="bg-violet-100 rounded-lg p-4 items-center flex justify-center">
                    <button className="bg-violet-300 rounded-lg p-4" onClick={handleCloseButton}>Đóng</button>
                </div>
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
