import XMLParser from 'react-xml-parser';


export default function GetDataByButton() {
    const handleClick1=async()=>{
        const res= await fetch(`http://apicms.ebms.vn/businfo/getallroute`,{
            mode: 'no-cors',
            method:'GET',
        });
        const data = await res.text();
        const xml = new XMLParser().parseFromString(data);
        const jsonData = await JSON.stringify(xml);
        console.log(JSON.stringify(jsonData));
        console.log("Res",res);
        
        //const data =await res.json();
        console.log("Data",data);
        data.forEach(element => {
            const resCreateRoute= fetch(`/api/route/create`,element);
            console.log("Res create route",resCreateRoute);
        });
        
    }
    const handleClick2=async()=>{

    }
    const handleClick3=async()=>{

    }

    
  return (
    <div className="gap-4">
        <button type="button" className="bg-slate-600" onClick={handleClick1}>Get All Route</button>
        <button type="button" className="bg-purple-600" onClick={handleClick2}>Update info route</button>
        <button type="button" className="bg-blue-600"onClick={handleClick3}>Create Station</button>
    </div>
  )
}
