import axios from 'axios'
import { BASE_URL } from '../lib/contants';
import { ACCESS_TOKEN } from './auth-api';
export const createTrip=async (tripModel)=>{
    try {
        const res= await axios.post(`${BASE_URL}/trips`,tripModel,{
            headers:{
                "Content-Type":"application/json"
            }
        })
        console.log("Create timetable from trip res",res);
        if (res.status===200) return res.data;
        else return null;
    } catch (error) {
        console.error("create time table exception", error);
    }
}

export const updateTrip = async (tripId,jsonTrip)=>{
    try {
        const res= await axios.put(`${BASE_URL}/trips/${tripId}`,jsonTrip,{
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(res.status===204) return res.status;
    } catch (error) {
        console.error("Update trip exception", error);
    }
}

export const deleleTrip = async (tripId)=>{
    try {
        const res= await axios.delete(`${BASE_URL}/trips/${tripId}`,{
            headers:{
                Authorization:`Bearer ${JSON.parse(ACCESS_TOKEN)}`,
            }
        });
    if(res.status===204) return res.status;
    else return null;
    } catch (error) {
        console.log("Get routes exception", error);
    }
}