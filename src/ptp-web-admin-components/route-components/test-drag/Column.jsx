import PropTypes from 'prop-types'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import Task from './Task'

export default function Column({tasks}) {
  return (
    <div className=' p-2 '>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
      {tasks.map((task)=>(
            // <div key={task.id} className='bg-red-100 m-2 p-2'>
            //       {task.title}  
            // </div>
            <Task key={task.id} id={task.id} title={task.title}/>
        ))}
      </SortableContext>
        
    </div>
  )
}

Column.propTypes={
    tasks: PropTypes.array
}
