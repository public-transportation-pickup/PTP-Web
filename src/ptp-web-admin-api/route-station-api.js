import { BASE_URL } from "../lib/contants"

export const getRouteStation= async (routeId,routeVarId)=>{
    try {
        const res= await fetch(`${BASE_URL}/routes/${routeId}/route-vars/${routeVarId}/route-stations`);
        const data= await res.json();
        console.log("Get Route Station Data",data);
        return data;
    } catch (error) {
        console.log("Get Route Stations exception",error)
    }
}