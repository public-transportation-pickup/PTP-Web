import { BASE_URL } from "../lib/contants";

export const getRouteVars=async (routeId)=>{
    try {
        const res = await fetch(`${BASE_URL}${routeId}/route-vars`);
        const data= res.json();
        console.log("Get route vars data: ",data);
    } catch (error) {
        console.log("Get RouteVars exception",error);
    }
}
export const getRouteVarsById=async (routeId)=>{
    try {
        const res = await fetch(`${BASE_URL}routevars/${routeId}`);
        const data= res.json();
        console.log("Get route vars by id data: ",data);
    } catch (error) {
        console.log("Get RouteVars by id exception",error);
    }
}
