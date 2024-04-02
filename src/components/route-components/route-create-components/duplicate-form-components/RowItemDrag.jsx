import PropTypes from 'prop-types'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import ItemDrag from './ItemDrag'

export default function RowItemDrag({listItem}) {
  return (
    <div className=' p-2 '>
    <SortableContext items={listItem} strategy={verticalListSortingStrategy}>
    {listItem.map((item)=>(

          <ItemDrag key={item.id} id={item.id} StationName={item.stationName}/>
      ))}
    </SortableContext>
      
  </div>
  )
}

RowItemDrag.propTypes={
    listItem:PropTypes.array
}
