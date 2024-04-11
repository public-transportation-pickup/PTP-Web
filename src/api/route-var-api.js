import axios from 'axios';
import { BASE_URL } from "../lib/contants";
import { ACCESS_TOKEN, CURRENT_USER } from './auth-api';
import { updateDistanceRoute } from './route-api';

export const getRouteVars=async (routeId)=>{
    try {
        const res = await fetch(`${BASE_URL}/routes/${routeId}/route-vars`);
        const data= await res.json();
        console.log("Get route vars data: ",data);
        return data;
    } catch (error) {
        console.log("Get RouteVars exception",error);
    }
}
export const getRouteVarsById=async (routeId)=>{
    try {
        const res = await fetch(`${BASE_URL}/routevars/${routeId}`);
        const data= await res.json();
        console.log("Get route vars by id data: ",data);
        return data;
    } catch (error) {
        console.log("Get RouteVars by id exception",error);
    }
}

export const createRouteVarManually= async (RouteVarCreateModel)=>{
    try {
        const res= await axios.post(`${BASE_URL}/routevars`,
            // headers:{
            //     Authorization:`Bearer ${CURRENT_USER.token}`,
            // },
            RouteVarCreateModel
        )
        console.log("Create route var manuall res: ",res)
        return await res.data;
    } catch (error) {
        console.error("create route var manually exception: ", error)
    }
}

export const createRouteVarDuplicate=async(routeId,routevarId, duplicateRouteVarModel)=>{
    try {
        // console.log("createRouteVarDuplicate-duplicateRouteVarModel",rouuteId);
        // console.log("createRouteVarDuplicate-duplicateRouteVarModel",duplicateRouteVarModel);
        const res=await axios.post(`${BASE_URL}/routevars/${routevarId}/duplicate`,duplicateRouteVarModel,{
            headers:{
                "Content-Type":"application/json"
            }
        })
        console.log("create route var duplicate res: ", res);
        const resUpdateRouteDistance= await updateDistanceRoute(routeId);
        console.log("resUpdateRouteDistance status",resUpdateRouteDistance);
        if(resUpdateRouteDistance===204 && res.status===200) return await res.data;
        else return null
    } catch (error) {
        console.error("Create route var duplicate exception: ", error);
    }
}

export const deleleRouteVar = async (routeVarId)=>{
    try {
        const res= await axios.delete(`${BASE_URL}/routes/${routeVarId}`,{
            headers:{
                Authorization:`Bearer ${JSON.parse(ACCESS_TOKEN)}`,
            }
        });
    if(res.status===204) return res.status;
    else return null;
    } catch (error) {
        console.log("Delete route var exception", error);
    }
}