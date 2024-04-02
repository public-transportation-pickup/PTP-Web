import axios from 'axios'
import {BASE_URL} from '../lib/contants/index.js'
import { useSelector } from 'react-redux'

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
    try {
        const json={
            role:"Admin",
            token:tokenFirebase
        }
        console.log("Json auth",JSON.stringify(json));
        const res= await axios.post(`${BASE_URL}/auth`,{
            role:"Admin",
            token:tokenFirebase
        })
        console.log("Response",res.data)
        if(res.status===200&&res.data!==null){
            await localStorage.setItem("accessToken",JSON.stringify(res.data.token));
            await localStorage.setItem("admin",JSON.stringify(res.data));
            console.log("Local storage",await localStorage.getItem("admin"));
            console.log("Access token local", await localStorage.getItem("accessToken"))
        } 

        return res.status;
    
    } catch (error) {
        console.log("Exception authenV2",error)

    }

    
}

//console.log("AuthReq",authReq)
//console.log("Token firebase",tokenFirebase)
//await console.log("Res-data of auth-api",JSON.parse(res)+"-"+ JSON.parse(data));
export const CURRENT_USER= async ()=>{
    const {currentUser}=useSelector(state=>state.user);
    try {
        
        return await localStorage.getItem("admin") !==null?JSON.parse(localStorage.getItem("admin")):""
    } catch (error) {
        
        authenticationV2(currentUser.stsTokenManager.accessToken)
    }
    
}