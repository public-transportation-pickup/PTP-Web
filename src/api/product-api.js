import { BASE_URL } from "../lib/contants"

export const getProductById=async (id)=>{
    try {
        const response=await fetch(`${BASE_URL}/products/${id}`);
        const data=await response.json();
        console.log("Get product by id res data", data)
        if(response.status===200) return data;
        else return null;
    } catch (error) {
        console.error("Get Product By Id exception",error);
        return null
    }
}