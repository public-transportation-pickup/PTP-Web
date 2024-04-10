import { BASE_URL } from "../lib/contants"
import { ACCESS_TOKEN } from "./auth-api";
import axios from 'axios'

export const getMenuById=async (menuId)=>{
    try {
        // const res= fetch(`${BASE_URL}/menus/${menuId}`,{
        //     headers:{
        //        " Authorization":`Bearer ${JSON.parse(ACCESS_TOKEN)}`
        //     }
        // });
        // const data=res.json();
        // console.log("getMenuById res",res);
        // if( res.status===200) return data;
        // else return null;
        const res=await axios.get(`${BASE_URL}/menus/${menuId}`,{
            headers:{
                Authorization:`Bearer ${JSON.parse(ACCESS_TOKEN)}`
            }
        });
        console.log("getMenuById res",res);
        return await res.data;
        
    } catch (error) {
        console.error("getMenuById exception", error)
    }
}
