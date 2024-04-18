import axios from "axios";
import { BASE_URL } from "../lib/contants";
import {ACCESS_TOKEN} from '../api/auth-api.js'

export async function getTransactions(storeId) {
//   var CURRENT_USER = JSON.parse(localStorage.getItem("user"));
//   var USERID = CURRENT_USER.user.id;
try {
    let url = BASE_URL + "/users/" + storeId + "/wallets";
    var response = await axios.get(url, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    });
    if(response.status===200) return response.data;
    else return null;
} catch (error) {
    console.error("get transactions exception",error)
    return null;
}
 
}