import PropTypes from 'prop-types'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import ItemDrag from './ItemDrag'

export default function RowItemDrag({listItem}) {
  return (
    <div className=' p-2 '>
    <SortableContext items={listItem} strategy={verticalListSortingStrategy}>
    {listItem.map((item)=>(
          // <div key={item.Id} className='bg-red-100 m-2 p-2'>
          //       {item.StationName}  
          // </div>
          <ItemDrag key={item.id} id={item.Id} StationName={item.StationName}/>
      ))}
    </SortableContext>
      
  </div>
  )
}

RowItemDrag.propTypes={
    listItem:PropTypes.array
}
