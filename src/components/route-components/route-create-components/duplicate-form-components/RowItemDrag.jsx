import PropTypes from 'prop-types'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import ItemDrag from './ItemDrag'
import { HiOutlineTrash } from "react-icons/hi";

export default function RowItemDrag({listItem,deleteFunc}) {
  return (
    <div className=' p-2 '>
    <SortableContext items={listItem} strategy={verticalListSortingStrategy}>
    {listItem.map((item)=>(
          <div key={item.id}>
            <ItemDrag key={item.id} id={item.id} StationName={item.stationName}/>
            <HiOutlineTrash onClick={deleteFunc(item)}/>
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
