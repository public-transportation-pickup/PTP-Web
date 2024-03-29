import { BASE_URL } from "../lib/contants";
export const getCategories=async ()=>{
    try {
        const res=  await fetch(`${BASE_URL}/categories`);
        const data= await res.json();
        console.log("Data: ",data);
        return data;
    } catch (error) {
        console.log("Get all category error: ",error);
    }
}
export const CreateCategory=async (formData)=>{
    try {
        const res=  await fetch(`${BASE_URL}/categories`,{
            method:'POST',
            headers
        });
        const data= await res.json();
        console.log("Data: ",data);
        return data;
    } catch (error) {
        console.log("Get all category error: ",error);
    }
}

export const UpdateCategory=async (updateCate)=>{
    try {
        const res= await fetch(`${BASE_URL}/`)
    } catch (error) {
        console.log("Update category exception", error);
    }
}
