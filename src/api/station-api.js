import { BASE_URL } from "../lib/contants";
import axios from "axios";

export const getStations = async (zone) => {
  try {
    console.log("Zone to get station: ", zone);
    const response = await fetch(`${BASE_URL}/stations?Zone=${zone}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("get stations exception", error);
  }
};
export const getStationRevenue = async () => {
  const res = await axios.get(`${BASE_URL}/stations/revenue`);
  return res.data;
};

export const getStationByStationId=async (stationId)=>{
  try {
    const res= await fetch(`${BASE_URL}/stations/${stationId}`);
    const data=await res.json();
    if(res.status===200) return data;
    else return null;
  } catch (error) {
    console.error("get station by stationId exception",error);
    return null;
  }
  
}