import { getStoreReport } from "../api/store-api"


export default function TestPage() {
    const handleButton=async()=>{
        const responseAPI=await getStoreReport("0a18760d-7adc-459a-81e3-727e0b70243b");
        console.log(responseAPI);
    }
  return (
    <button onClick={()=>handleButton} className="bg-green-600 p-4">TestPage</button>
  )
}
