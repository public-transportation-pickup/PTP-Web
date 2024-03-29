import axios from 'axios'
import {BASE_URL} from '../lib/contants/index.js'

export const authentication= async (tokenFirebase)=>{
    try {
        const authReq={
            token:tokenFirebase,
            role:"Customer"
        }     
        console.log("AuthReq",authReq)
        const res= await fetch(`${BASE_URL}/auth`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(authReq)
        })
        const data= await res.json();
        return data;
    } catch (error) {
        console.error("auth exception",error);
    }
}

export const authenticationV2=async (tokenFirebase)=>{
    console.log("firebaseToken",tokenFirebase)
    const res= await axios.post(`${BASE_URL}/auth`,{
        role:"Admin",
        token:tokenFirebase
    }).catch((error)=>console.log("Exception authenV2",error));
    return res.data
}

//console.log("AuthReq",authReq)
//console.log("Token firebase",tokenFirebase)
//await console.log("Res-data of auth-api",JSON.parse(res)+"-"+ JSON.parse(data));
export const CURRENT_USER= await localStorage.getItem("admin") !==null?JSON.parse(localStorage.getItem("admin")):""