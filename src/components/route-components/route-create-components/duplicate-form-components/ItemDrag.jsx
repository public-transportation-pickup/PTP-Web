import { useSortable } from "@dnd-kit/sortable"
import PropTypes from 'prop-types'
import {CSS} from '@dnd-kit/utilities'
import { HiOutlineViewGrid } from "react-icons/hi";

export default function ItemDrag({id, StationName}) {
    const{attributes, listeners, setNodeRef, transform, transition}= useSortable({id})

    const style={
        transition,
        transform:CSS.Transform.toString(transform),
    }
  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style} className='bg-red-100 m-2 p-2 items-center flex justify-start gap-10 hover:bg-red-400'>
    {/* <input type='checkbox' className=''/>     */}
    <HiOutlineViewGrid className="w-5 h-5"/> {StationName}
</div>
  )
}

ItemDrag.propTypes={
    id: PropTypes.string,
    StationName:PropTypes.string
}
