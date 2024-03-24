
//import {BASE_URL} from '../lib/contants/index.js';

import { authentication } from "../ptp-web-admin-api/auth-api";


export default function StoreList() {
    const handleButton= async ()=>{
        // const res= await fetch(`api/stores`);
        // console.log("Get all store", await res);
        const res= await authentication;
        console.log("Data: ",res);
           
    }
  return (
    <button className='p-3 bg-gray-500 text-red-700' onClick={handleButton}>S</button>
  )
}
