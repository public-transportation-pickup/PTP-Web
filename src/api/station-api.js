import { BASE_URL } from "../lib/contants"

export const getStations=async(zone)=>{
    try {
        
        const response= await fetch(`${BASE_URL}/stations?Zone=${zone}`);
        const data= await response.json();
        return data;
    } catch (error) {
        console.log("get stations exception", error)
    }
}