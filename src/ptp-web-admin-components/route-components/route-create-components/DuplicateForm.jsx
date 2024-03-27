import { useEffect, useState } from "react";
import ComboboxComponent from "../../store-components/ComboboxComponent"
import { getRoutes } from "../../../ptp-web-admin-api/route-api";
import { getRouteVars} from "../../../ptp-web-admin-api/route-var-api";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getRouteStation } from "../../../ptp-web-admin-api/route-station-api";

export default function DuplicateForm() {
    
    const [listRoute,setListRoute]=useState([]);
    const [listRouteVar,setListRouteVar]=useState([]);
    const [routeVarStation,setRouteVarStation]=useState([]);
    const[routeId,setRouteId]=useState('');

    const handleRouteIdChange=async(value)=>{
        console.log("Route choose", value);
        setRouteId(value.id===null|| value.id===undefined ? '':value.id)
        //console.log("RouteId", routeId);
    }

    const handleRouteVarIdChange=async(value)=>{
        console.log("Routevar id:", value);
        if(value){
            const responseAPI= await getRouteStation(routeId,value.id);
            console.log("Response get list station by routevar id:",responseAPI);
            Array.isArray(responseAPI)?setRouteVarStation(responseAPI):async()=>{
                setRouteVarStation([]);
                await console.log("detail route var", routeVarStation);
                toast("Tuyến bạn chọn không có trạm");
            }
        }
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
    },[routeId])
    
  return (
    <div>
        <div>
            <ToastContainer className="w-20 h-10"/>
        </div>
        <div>
            <ComboboxComponent listItems={listRoute} params="name" onValueChange={handleRouteIdChange}/>
            <ComboboxComponent listItems={listRouteVar} params="routeVarName" onValueChange={handleRouteVarIdChange}/>
            <button type="button" className="bg-blue-300 hover:opacity-85 p-4">Tạo bản sao</button>
        </div>
        Onclick button thì show detail route var ra
    </div>
  )
}
