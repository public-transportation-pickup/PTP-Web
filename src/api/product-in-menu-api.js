import { BASE_URL } from "../lib/contants";
import { ACCESS_TOKEN, refreshToken } from "./auth-api";
import axios from "axios";

export const getProductsInMenu = async (param) => {
  var CURRENT_USER = JSON.parse(localStorage.getItem("admin"));
  let url = null;
  if (param.menuId !== undefined) {
    url =
      BASE_URL +
      "/stores/" +
      param.storeId +
      "/products?pageNumber=0" +
      //   param.pageNumber +
      "&pageSize=5&menuId=" +
      param.menuId;
  }
  console.log(url);

  var response = await axios.get(url, {
    headers: { Authorization: `Bearer ${CURRENT_USER.token}` },
  });
  //   console.log(response.data);
  return response.data;
};
// export const getProductsInMenu=async (menuId)=>{
//     try {
//         const res= await fetch(`${BASE_URL}/menus/${menuId}/products-menu`,{
//             headers:{
//                 Authorization:`Bearer ${JSON.parse(ACCESS_TOKEN)}`
//             }
//         });
//         const data=await  res.json();
//         if(res.status===200) return data;
//         else if(res.status===401) await refreshToken(ACCESS_TOKEN);
//         return null;
//     } catch (error) {
//         console.error("get products in menu exception",error);
//     }
// }
