import { BASE_URL } from "../lib/contants";
import { ACCESS_TOKEN } from "./auth-api";
import axios from "axios";

export const getProductsInMenu = async (param) => {
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
    headers: { Authorization: `Bearer ${JSON.parse(ACCESS_TOKEN)}` },
  });
  //   console.log(response.data);
  return response.data;
};

