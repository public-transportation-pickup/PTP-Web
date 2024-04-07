import axios from 'axios';
import { BASE_URL } from '../lib/contants/index'

export const getRoutes = async ()=>{
    try {
        // const response= await fetch(`${BASE_URL}/routes`);
        // const data= await response.json();
        // console.log("Get all route data",data);
        // return data;
        const response= await axios.get(`${BASE_URL}/routes`);
        console.log("Response, response.dâta",response,response.data);
        return response.data;
    } catch (error) {
        console.log("Get routes exception", error);
    }
}

export const getRouteById=async (routeId)=>{
    try {
        const response = await fetch(`${BASE_URL}/routes/${routeId}`);
        const data=await response.json();
        console.log("Get route by Id data:",data);
        return data;
    } catch (error) {
        console.log("Get route exception", error);
    }
}

export const deleleRoute = async (routeId)=>{
    try {
        const response= await fetch(`${BASE_URL}/routes/${routeId}`,{
            headers:{
                'method':'DELETE'
            }
        });
        const data= await response.json();
        console.log("Delete route data",data);
        return data;
    } catch (error) {
        console.log("Get routes exception", error);
    }
}
export const updateRoute = async (routeModel)=>{
    try {
        const response= await fetch(`${BASE_URL}/routes/${routeModel.Id}`);
        const data= await response.json();
        console.log("Get all route data",data);
        return data;
    } catch (error) {
        console.log("Get routes exception", error);
    }
}

export const updateDistanceRoute=async (routeId)=>{
    try {
        const res= await axios.put(`${BASE_URL}/routes/${routeId}/distance-modification`);
        console.log("Update distance route response: ",res);
        return await res.status
    } catch (error) {
        console.error("Update distance route exception", error);
    }
}


