import { BASE_URL } from "../lib/contants";
import axios from "axios";
import { ACCESS_TOKEN } from "./auth-api";

export const getUsers = async (roleName) => {
  try {
    // console.log("api - " + roleName);
    const res = await fetch(`${BASE_URL}/users?RoleName=${roleName}`);
    const data = await res.json();
    console.log("Get user list", res);
    return data;
  } catch (error) {
    console.log("get users exception", error);
  }
};

export const getReport = async () => {
  const res = await axios.get(`${BASE_URL}/reports/admin`);
  return res.data;
};


export const deleteUser=async (id)=>{
  try {
    const res= await axios.delete(`${BASE_URL}/users/${id}`,{
      headers:{
        Authorization: `Bearer ${JSON.parse(ACCESS_TOKEN)}`,
      }
    })
    console.log("response delete user", res);
    if(res.status===204) return res.status;
    else return null;
  } catch (error) {
    console.error("Delete user api exception",error)
  }
}

export const getUserById=async (id)=>{
  try {
    const res= await fetch(`${BASE_URL}/users/${id}`);
    console.log("get user by id res",res);
    if(res.status===200) return await res.json();
    else return null
  } catch (error) {
    console.error("get user by id exception",error);
  }
}