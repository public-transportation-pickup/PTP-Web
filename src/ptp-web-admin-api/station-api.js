import { BASE_URL } from "../lib/contants"

export const getStations=async()=>{
    try {
        const response= await fetch(`${BASE_URL}/stations`);
        const data= await response.json();
        return data;
    } catch (error) {
        console.log("get stations exception", error)
    }
}