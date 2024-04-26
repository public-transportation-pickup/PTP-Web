import { BASE_URL } from "../lib/contants";
import axios from 'axios'
import { ACCESS_TOKEN, refreshToken } from "./auth-api";
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

export const getCategory=async (id)=>{
    try {
        const res= await fetch(`${BASE_URL}/categories/${id}`);
        const data= await res.json();
        console.log("get category res", res)
        if(res.status===200) return data;
        else return null;
    } catch (error) {
        console.error("get category by id exception", error);
    }
}

export const CreateCategory=async (createModal)=>{
    try {
        // const res=  await fetch(`${BASE_URL}/categories`,{
        //     method:'POST',
        
        // });
        // const data= await res.json();
        // console.log("Data: ",data);
        // return data;
        const formData= new FormData();
        formData.append('Name', createModal.Name);
        formData.append("Description", createModal.Description);
        formData.append('Status',createModal.Status);
        formData.append('Image', createModal.Image[0]);
        //console.log("CURRENT_USER.token",JSON.stringify(ACCESS_TOKEN));
        const res= await axios.post(`${BASE_URL}/categories`,formData,{
            headers:{
                Authorization:`Bearer ${JSON.parse(ACCESS_TOKEN)}`,
            },
        })
        console.log("Create Category res", res);

        if(res.status===201)return res.status;
        else if(res.status===401) await refreshToken(ACCESS_TOKEN);
    } catch (error) {
        console.log("Get all category error: ",error);
    }
}

export const UpdateCategory=async (cateId,updateCate)=>{
    try {
        const formData= new FormData();
        formData.append('Id',updateCate.Id)
        formData.append('Name',updateCate.Name);
        formData.append('Description',updateCate.Description)
        formData.append('Status',updateCate.Status)
        formData.append("Image",updateCate.Image)
        const res= await axios.put(`${BASE_URL}/categories/${cateId}`,formData,{
            headers:{
                "Content-Type":"multipart/form-data",
                Authorization:`Bearer ${JSON.parse(ACCESS_TOKEN)}`,
            },
        });
        if(res.status===204) return res.status;
        else if(res.status===401) await refreshToken(ACCESS_TOKEN);
        else null;
    } catch (error) {
        console.log("Update category exception", error);
    }
}

export const DeleteCategory =async (id)=>{
    try {
        const res= await axios.delete(`${BASE_URL}/categories/${id}`,{
            headers:{
                Authorization:`Bearer ${JSON.parse(ACCESS_TOKEN)}`,
            },
        }
    );
        console.log("Delete category", res)
        if(res.status===204) return res.status;
        else if(res.status===401) await refreshToken(ACCESS_TOKEN);
        else return null
    } catch (error) {
        console.log("Delete Category API", error);
    }
}
