import { BASE_URL } from "../lib/contants";
import { ACCESS_TOKEN, refreshToken } from "./auth-api";

export const getProductsInMenu=async (menuId)=>{
    try {
        const res= await fetch(`${BASE_URL}/menus/${menuId}/products-menu`,{
            headers:{
                Authorization:`Bearer ${JSON.parse(ACCESS_TOKEN)}`
            }
        });
        const data=await  res.json();
        if(res.status===200) return data;
        else if(res.status===401) await refreshToken(ACCESS_TOKEN);
        return null;
    } catch (error) {
        console.error("get products in menu exception",error);
    }
}