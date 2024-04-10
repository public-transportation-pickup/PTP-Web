import PropTypes from 'prop-types'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import ItemDrag from './ItemDrag'
import { HiOutlineTrash } from "react-icons/hi";
//import { useEffect } from 'react';

export default function RowItemDrag({listItem,deleteFunc}) {
  //console.log("Array rowItem",listItem);
  // useEffect(()=>{

  // },[listItem])
  return (
    <div className=' p-2 h-[36rem] overflow-auto'>
    <SortableContext items={listItem} strategy={verticalListSortingStrategy}>
    {listItem && listItem.map((item)=>(
          <div key={item.id} className='flex items-center'>
            <div className='w-2/3'>
            <ItemDrag key={item.id} id={item.id} StationName={item.stationName}/>
            </div>
            <div className='w-1/3'>
            <HiOutlineTrash className='w-6 h-6 z-10' onClick={()=>deleteFunc(item)}/>

            </div>
          </div>
      ))}
    </SortableContext>
      
  </div>
  )
}

RowItemDrag.propTypes={
    listItem:PropTypes.array,
    deleteFunc:PropTypes.func
}
