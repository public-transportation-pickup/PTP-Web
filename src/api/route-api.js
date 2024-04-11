import axios from 'axios';
import { BASE_URL } from '../lib/contants/index'
import { ACCESS_TOKEN } from './auth-api';

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

export const createRoute=async (createModel)=>{
    try {
        const res= await axios.post(`${BASE_URL}/routes`,{model:createModel},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(res.status===200) return res.data;
    } catch (error) {
        console.error("Create Route exception", error);
    }
}

export const deleleRoute = async (routeId)=>{
    try {
        const res= await axios.delete(`${BASE_URL}/routes/${routeId}`,{
            headers:{
                Authorization:`Bearer ${JSON.parse(ACCESS_TOKEN)}`,
            }
        });
    if(res.status===204) return res.status;
    else return null;
    } catch (error) {
        console.log("Delete route exception", error);
    }
}
export const updateRoute = async (routeModel)=>{
    try {
        const res= await axios.put(`${BASE_URL}/routes/${routeModel.id}`,routeModel,{
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(res.status===204) return res.status;
    } catch (error) {
        console.error("Create Route exception", error);
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


