import { BASE_URL } from "../lib/contants"

export const getUsers=async ()=>{
    try {
        const res= await fetch(`${BASE_URL}/users`);
        const data= await res.json();
        console.log("Get user list",res)
        return data;
    } catch (error) {
        console.log("get users exception",error)
    }
}