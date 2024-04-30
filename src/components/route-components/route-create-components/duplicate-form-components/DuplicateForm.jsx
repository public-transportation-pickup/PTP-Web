import { useEffect, useState } from "react";
import ComboboxComponent from "../../../store-components/ComboboxComponent"
import { getRoutes } from "../../../../api/route-api";
import { getRouteVars} from "../../../../api/route-var-api";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getRouteStation } from "../../../../api/route-station-api";
import DragandDrop from "./DragandDrop";

export default function DuplicateForm() {
    
    const [listRoute,setListRoute]=useState([]);
    const [listRouteVar,setListRouteVar]=useState([]);
    const [listRouteVarStation,setListRouteVarStation]=useState([]);
    const [routeId,setRouteId]=useState('');
    const [routeVarInfo, setRouteVarInfo]=useState();
    const [duplicate, setDuplicate]=useState(false);
    const [loading,setLoading]=useState(false);
    console.log("routevarInfo choossen",routeVarInfo);
    //console.log("detail route var", listRouteVarStation)
    console.log("list Oute var station", listRouteVarStation)

    const handleRouteIdChange=async(value)=>{
        console.log("Route choose", value);
        setRouteId(value.id===null|| value.id===undefined ? '':value.id)
        setListRouteVarStation([]) 
        //console.log("RouteId", routeId);
    }

    const handleRouteVarIdChange=async(value)=>{
        console.log("Routevar id:", value);
        if(value){
            const responseAPI= await getRouteStation(routeId,value.id);
            await setRouteVarInfo(value);
            console.log("Response get list station by routevar id:",responseAPI);
            //await setListRouteVarStation(responseAPI) 
            //if(listRouteVarStation.length>0)await setListRouteVarStation([])  
            
            if(listRouteVarStation.length===0){
                responseAPI.forEach(async (element)=> {
                    //console.log("Element", element);
                    listRouteVarStation.push({id:element.index,stationId:element.stationId,index:element.index,stationName:element.stationName});
                });  
            }else toast("Đã xảy ra lỗi")
        
            
            //await console.log("detail route var", listRouteVarStation);
        }
    }

    const handleDuplicateButton=async()=>{
        setDuplicate(true);
        //fetchData();
        //if(listRouteVarStation.length > 0) setListRouteVarStation([])  
    }

    const fetchData=async()=>{
        const responseAPI=await getRoutes('');
        Array.isArray(responseAPI)?setListRoute(responseAPI):()=>{
            setListRoute([]);
            toast("Không thể tải danh sách tuyến");
        };
        if(routeId){
            const responseAPI2= await getRouteVars(routeId);
            Array.isArray(responseAPI2)? setListRouteVar(responseAPI2):()=>{
                setListRouteVar([]);
                toast("Không thể tải danh sách lượt")
            }
        }

    }

    useEffect(()=>{
        fetchData();
    },[routeId,routeVarInfo,listRouteVarStation])
    
  return (
    <div>
        <div>
            <ToastContainer className="w-60 h-10"/>
        </div>
        <div className="flex flex-row gap-4 items-center">
            <div>
                <p>Chọn Tuyến</p>
            <ComboboxComponent listItems={listRoute} params="name" onValueChange={handleRouteIdChange}/>
            </div>
            <div>
                <p>Chọn Lượt</p>
            <ComboboxComponent listItems={listRouteVar} params="routeVarName" onValueChange={handleRouteVarIdChange}/>

            </div>
            <button onClick={handleDuplicateButton} type="button" className="rounded-lg bg-blue-300 hover:opacity-85 px-4 py-2 ml-10 mt-5">Tạo bản sao</button>
        </div>
        {/* Onclick button thì show detail route var ra */}
        {duplicate===true &&  (
            <div>
                <DragandDrop listRouteVarStation={listRouteVarStation} routevarId={routeVarInfo.id} routeId={routeId}/>
            </div>
            
        )}
            
       
    </div>
  )
}
