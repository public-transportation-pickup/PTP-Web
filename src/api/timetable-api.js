import {BASE_URL} from '../lib/contants/index.js'
//viết code get time table bằng route var và routeid zô đây
export const getTimeTableByRouteIdandRouteVarId=async(routeId, routeVarId)=>{
    try {
        const res= await fetch (`${BASE_URL}/routes/${routeId}/route-vars/${routeVarId}`);
        const data = res.json();
        console.log("GetTimeTableByRouteIdandRouteVarId",data);
        return data;
    } catch (error) {
        console.log("getTimeTableByRouteIdandRouteVarId exception",error)
    }
}