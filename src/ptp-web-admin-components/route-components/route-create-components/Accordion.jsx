import { useState } from "react"
import PropTypes from 'prop-types'


export default function Accordion({title,component}) {
    const [accordionOpen,setAccordionOpen]=useState(false);
  return (
    <div className="py-4 bg-indigo-100 p-4 rounded-lg">
        <button onClick={()=>setAccordionOpen(!accordionOpen)} className="flex justify-between w-full">
            <span>{title}</span>
            {accordionOpen?<span>+</span>:<span>-</span>}
            
        </button>
        <div className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
        >
            <div className="overflow-hidden">
                {component}
            </div>
        </div>
    </div>
  )
}
Accordion.propTypes={
    title:PropTypes.string.isRequired,
    component:PropTypes.element.isRequired
}
