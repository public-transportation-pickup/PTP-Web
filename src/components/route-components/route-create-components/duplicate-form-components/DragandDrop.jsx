import { DndContext, closestCorners } from "@dnd-kit/core"
import { useEffect, useState } from "react"
import { arrayMove } from "@dnd-kit/sortable";
import PropTypes from 'prop-types'
import RowItemDrag from "./RowItemDrag";


export default function DragandDrop({listRouteVarStation}) {
const [listRouteStationUpdate,setListRouteStationUpdate]=useState(listRouteVarStation!==null? listRouteVarStation:[]);

// const addStations=title=>{
//     setListRouteStationUpdate(tasks=>[...listRouteStationUpdate,tasks])
// } 

const deleteStations=async(itemDelete)=>{
    //removePeople(e) {
        console.log("Item delete",itemDelete);
        await setListRouteStationUpdate({listRouteStationUpdate: listRouteStationUpdate.filter(function(station) { 
            return station !== itemDelete 
        })});
    //}
}
const getTaskPos= id=> listRouteStationUpdate.findIndex(task=>task.id===id);
const handleDragEnd=event=>{
    const {active, over}=event
    console.log("Active",active);
    console.log("Over",over);
    console.log("Over item array", over.data.current.sortable.items)
    if(active.id===over.id) return;
    setListRouteStationUpdate(routeStation=>{
        const originPos= getTaskPos(active.id);
        const newPos=getTaskPos(over.id);
        return arrayMove(routeStation, originPos, newPos)
    })
    console.log("list route station update",listRouteStationUpdate);
}

const changeIndex=async()=>{
    listRouteStationUpdate.map((item,index)=>{
        item.index=index;
    })
    await console.log("Array after change index",listRouteStationUpdate);
}

useEffect(()=>{

},[listRouteVarStation])

return (
<div>
    <div className="m-2">
        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners} >
            {/* <Input onSubmit={addTasks}/> */}
            <RowItemDrag listItem={listRouteStationUpdate} deleteFunc={deleteStations}/>
        </DndContext>
    </div>
    <div>
        <button type="button" className="bg-sky-400 p-4 rounded-lg" onClick={changeIndex}>Xác nhận</button>
    </div>
</div>
)
}

DragandDrop.propTypes={
  listRouteVarStation:PropTypes.array
}
