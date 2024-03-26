import { useEffect, useState } from "react";
import ComboboxComponent from "../../store-components/ComboboxComponent"
import { getRoutes } from "../../../ptp-web-admin-api/route-api";
import { getRouteVars, getRouteVarsById } from "../../../ptp-web-admin-api/route-var-api";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function DuplicateForm() {
    const [jsonForm,setJsonForm]=useState({
        Name:"",
        Description:"",
        PhoneNumber:"",
        OpenedTime:"06:00",
        ClosedTime:"22:00",
        Latitude:0,
        Longtitude:0,
        Zone:"",
        Ward:"",
        AddressNo:"",
        Street:"",
        ActivationDate: new Date(),
        StationIds:[]
    })
    const [file,setFile]=useState([]);
    const [listRoute,setListRoute]=useState([]);
    const [listRouteVar,setListRouteVar]=useState([]);
    const [detailRouteVar,setDetailRouteVar]=useState([]);
    const[routeId,setRouteId]=useState('');

    const handleRouteIdChange=async(value)=>{
        setRouteId(value===null|| value===undefined ? '':value)
    }

    const handleRouteVarIdChange=async(value)=>{
        console.log("Routevar id:", value);
        if(value){
            const responseAPI= await getRouteVarsById(value);
            console.log("Response get list station by routevar id:",responseAPI);
            Array.isArray(responseAPI)?setDetailRouteVar(responseAPI):()=>{
                setDetailRouteVar([]);
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
            <ToastContainer/>
        </div>
        <div>
            <ComboboxComponent listItems={listRoute} params="" onValueChange={handleRouteIdChange}/>
            <ComboboxComponent listItems={listRouteVar} params="" onValueChange={handleRouteVarIdChange}/>
            <button type="button" className="bg-blue-300 hover:opacity-85 p-4">Tạo bản sao</button>
        </div>
        
    </div>
  )
}
