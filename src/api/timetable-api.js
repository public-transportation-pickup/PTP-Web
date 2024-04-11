import {BASE_URL} from '../lib/contants/index.js'
import axios from 'axios'
import { ACCESS_TOKEN } from './auth-api.js';
//viết code get time table bằng route var và routeid zô đây
export const getTimeTableByRouteIdandRouteVarId=async(routeId, routeVarId)=>{
    try {
        const res= await fetch (`${BASE_URL}/routes/${routeId}/route-vars/${routeVarId}/timetables`);
        const data =await res.json();
        console.log("GetTimeTableByRouteIdandRouteVarId",data);
        return data;
    } catch (error) {
        console.log("getTimeTableByRouteIdandRouteVarId exception",error)
    }
}

export const createTimeTableManually=async (timeTableModel)=>{
    try {
        const res= await axios.post(`${BASE_URL}/timetables`,timeTableModel,{
            headers:{
                "Content-Type":"application/json"
            },
        })
        console.log("Create timetable res",res);
        if (res.status===201) return res.data;
        else return null;
    } catch (error) {
        console.error("create time table exception", error);
    }
}

export const createTimeTableFromTrip=async (timeTableId,tripId)=>{
    try {
        const res= await axios.post(`${BASE_URL}/timetables/${tripId}`,tripId,{
            headers:{
                "Content-Type":"application/json"
            }
        })
        console.log("Create timetable from trip res",res);
        if (res.status===201) return res;
        else return null;
    } catch (error) {
        console.error("create time table exception", error);
    }
}

export const updateTimeTable = async (id, jsonTimeTable)=>{
    try {
        const res= await axios.put(`${BASE_URL}/timetables/${id}`,jsonTimeTable,{
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(res.status===204) return res.status;
    } catch (error) {
        console.error("Update time table exception", error);
    }
}

export const deleleTimeTable = async (timetableId)=>{
    try {
        const res= await axios.delete(`${BASE_URL}/timetables/${timetableId}`,{
            headers:{
                Authorization:`Bearer ${JSON.parse(ACCESS_TOKEN)}`,
            }
        });
    if(res.status===204) return res.status;
    else return null;
    } catch (error) {
        console.log("Delete timetable exception", error);
    }
}