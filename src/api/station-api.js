import { BASE_URL } from "../lib/contants";
import axios from "axios";

export const getStations = async (zone) => {
  try {
    console.log("Zone to get station: ", zone);
    const response = await fetch(`${BASE_URL}/stations?Zone=${zone}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("get stations exception", error);
  }
};
export const getStationRevenue = async () => {
  const res = await axios.get(`${BASE_URL}/stations/revenue`);
  return res.data;
};
