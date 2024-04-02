import { useState } from "react"
import PropTypes from 'prop-types';


export default function Input({onSubmit}) {
    const [input,setInput]=useState('');
    const handleSubmit=async ()=>{
        if(!input) return;
        onSubmit(input);
        setInput("");
    }
  return (
    <div>
        <input type="text" className="" value={input} onChange={e=>setInput(e.target.value)}/>
        <button onClick={handleSubmit}>Add</button>
    </div>
  )
}

Input.propTypes={
    onSubmit:PropTypes.func
}