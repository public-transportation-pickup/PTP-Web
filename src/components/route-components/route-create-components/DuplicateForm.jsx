import { useEffect, useState } from "react";
import ComboboxComponent from "../../store-components/ComboboxComponent"
import { getRoutes } from "../../../api/route-api";
import { getRouteVars} from "../../../api/route-var-api";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getRouteStation } from "../../../api/route-station-api";
import DragandDrop from "./duplicate-form-components/DragandDrop";

export default function DuplicateForm() {
    
    const [listRoute,setListRoute]=useState([]);
    const [listRouteVar,setListRouteVar]=useState([]);
    const [listRouteVarStation,setListRouteVarStation]=useState([]);
    const [routeId,setRouteId]=useState('');
    const [routeVarInfo, setRouteVarInfo]=useState();
    const [duplicate, setDuplicate]=useState(false);
    console.log("detail route var", listRouteVarStation)

    const handleRouteIdChange=async(value)=>{
        console.log("Route choose", value);
        setRouteId(value.id===null|| value.id===undefined ? '':value.id)
        //console.log("RouteId", routeId);
    }

    const handleRouteVarIdChange=async(value)=>{
        console.log("Routevar id:", value);
        if(value){
            const responseAPI= await getRouteStation(routeId,value.id);
            await setRouteVarInfo(value);
            console.log("Response get list station by routevar id:",responseAPI);
            await setListRouteVarStation(responseAPI)     
            //await console.log("detail route var", listRouteVarStation);
        }
    }

    const handleDuplicateButton=async()=>{
        setDuplicate(true);
    }

    useEffect(()=>{
        const fetchData=async()=>{
            const responseAPI=await getRoutes();
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
        fetchData();
    },[routeId,routeVarInfo])
    
  return (
    <div>
        <div>
            <ToastContainer className="w-20 h-10"/>
        </div>
        <div className="flex flex-col gap-4">
            <div>
                <p>Chọn Tuyến</p>
            <ComboboxComponent listItems={listRoute} params="name" onValueChange={handleRouteIdChange}/>
            </div>
            <div>
                <p>Chọn Lượt</p>
            <ComboboxComponent listItems={listRouteVar} params="routeVarName" onValueChange={handleRouteVarIdChange}/>

            </div>
            <button onClick={handleDuplicateButton} type="button" className="rounded-lg bg-blue-300 hover:opacity-85 p-4">Tạo bản sao</button>
        </div>
        {/* Onclick button thì show detail route var ra */}
        {duplicate===true && listRouteVarStation.length()!==0(
            <div>
                <h2>{routeVarInfo.RouteVarName }</h2>
                <DragandDrop listRouteVarStation={listRouteVarStation}/>
            </div>
        )}
            
       
    </div>
  )
}
