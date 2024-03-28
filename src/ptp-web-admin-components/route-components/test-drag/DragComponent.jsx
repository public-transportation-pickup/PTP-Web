import { DndContext, closestCorners } from "@dnd-kit/core"
import { useState } from "react"
import Column from "./Column"
import { arrayMove } from "@dnd-kit/sortable";
import Input from "./Input";

export default function DragComponent() {
    const [fakeData,setFakeData]=useState([
        {id:1, title:"Làm việc nhà"},
        {id:2, title:"Nấu cơm"},
        {id:3, title:"Phơi đồ"},
        {id:4, title:"tưới cây"},
        {id:5, title:"Dọn tủ đồ"},
        {id:6, title:"Mua trái cây"},
    ])
    const addTasks=title=>{
        setFakeData(tasks=>[...fakeData,{id:tasks.length+1,title}])
    } 
    const getTaskPos= id=> fakeData.findIndex(task=>task.id===id);
    const handleDragEnd=event=>{
        const {active, over}=event
        if(active.id===over.id) return;
        setFakeData(tasks=>{
            const originPos= getTaskPos(active.id);
            const newPos=getTaskPos(over.id);
            return arrayMove(tasks, originPos, newPos)
        })
    }

    // const sensors= useSensors(
    //     useSensor(PointerSensor),
    //     useSensor(TouchSensor),
    //     useSensor(KeyboardSensor,{
    //         coordinateGetter:sortableKeyboardCoordinates
    //     })
    // )

  return (
    <div>
        <h2>Drag test</h2>
        <div className="m-2">
            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners} >
                <Input onSubmit={addTasks}/>
                <Column tasks={fakeData}/>
            </DndContext>
        </div>
    </div>
  )
}
