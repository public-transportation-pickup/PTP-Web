
//import {BASE_URL} from '../lib/contants/index.js';

import { forwardGeocoding } from "../api/store-api";
import { ConvertVIEtoEN } from "../lib/utils/shareFunction";


export default function StoreList() {
    const handleButton= async ()=>{
        // const res= await fetch(`api/stores`);
        // console.log("Get all store", await res);
        //const unsignStr= await ConvertVIEtoEN("262 Ung Van Khiem, phuong 25, quan binh thanh, Ho Chi Minh");
        //console.log("Un signed str", unsignStr);
        const param= "135/39 Nguyễn Hữu Cảnh, phường 22, quận Bình Thạnh, TP. HCM"
        const res= await forwardGeocoding(param);
        console.log("Data: ",JSON.parse(res));
           
    }
  return (
    <button className='p-3 bg-gray-500 text-red-700' onClick={handleButton}>S</button>
  )
}
