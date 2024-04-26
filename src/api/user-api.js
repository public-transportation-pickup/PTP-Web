import { BASE_URL } from "../lib/contants";
import axios from "axios";

export const getUsers = async (roleName) => {
  try {
    // console.log("api - " + roleName);
    const res = await fetch(`${BASE_URL}/users?RoleName=${roleName}`);
    const data = await res.json();
    console.log("Get user list", res);
    return data;
  } catch (error) {
    console.log("get users exception", error);
  }
};

export const getReport = async () => {
  const res = await axios.get(`${BASE_URL}/reports/admin`);
  return res.data;
};

export const getTest = async () => {
  const res = await axios.get(
    `https://magiclandapiv2.somee.com/api/v1/classes?time=Week`,
    {
      headers: {
        'referrerPolicy': "no-referrer",
      },
    }
  );
  return res.data;
};
