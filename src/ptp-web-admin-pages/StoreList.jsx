
//import {BASE_URL} from '../lib/contants/index.js';

export default function StoreList() {
    const handleButton= async ()=>{
        // const res= await fetch(`api/stores`);
        // console.log("Get all store", await res);
        const res= await fetch('/api/routes',{
        });
        const data= await res.json();
        console.log("Data: ",data);
           
    }
  return (
    <button className='p-3 bg-gray-500 text-red-700' onClick={handleButton}>S</button>
  )
}
