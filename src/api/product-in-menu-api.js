import { BASE_URL } from "../lib/contants";
import { ACCESS_TOKEN } from "./auth-api";

export const getProductsInMenu=async (menuId)=>{
    try {
        const res= await fetch(`${BASE_URL}/menus/${menuId}/products-menu`,{
            headers:{
                Authorization:`Bearer ${JSON.parse(ACCESS_TOKEN)}`
            }
        });
        const data=await  res.json();
        if(res.status===200) return data;
        return null;
    } catch (error) {
        console.error("get products in menu exception",error);
    }
}