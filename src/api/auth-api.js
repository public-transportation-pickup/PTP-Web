import axios from "axios";
import { BASE_URL } from "../lib/contants/index.js";

export const refreshToken = async (oldAccessToken) => {
  try {
    // console.log("Old Token", JSON.parse(oldAccessToken));
    const res = await axios.post(
      `${BASE_URL}/auth/refresh-token`,
      oldAccessToken,
      {
        headers: {
          "Content-Type": "application/json",
        },
        // body:oldAccessToken
      }
    );
    //const data=res.data;
    // console.log("refresh data", res.data);
    // console.log("Refresh token status",res.status);
    if (res.status === 200 && res.data !== null) {
      await localStorage.setItem("accessToken", JSON.stringify(res.data.token));
      await localStorage.setItem("admin", JSON.stringify(res.data));
      //await console.log("Local storage refresh",await localStorage.getItem("admin"));
      //await console.log("Access token local refresh", await localStorage.getItem("accessToken"))
    } else window.location.href(`/sign-in`);
    return res.status;
  } catch (error) {
    localStorage.clear();
    console.error("Exception refreshToken", error);
  }
};

export const authenticationV2 = async (tokenFirebase) => {
  // console.log("firebaseToken", tokenFirebase);
  try {
    const res = await axios.post(`${BASE_URL}/auth`, {
      role: "Admin",
      token: tokenFirebase,
    });
    // console.log("Response", res.data);
    if (res.status === 200 && res.data !== null) {
      await localStorage.setItem("accessToken", JSON.stringify(res.data.token));
      await localStorage.setItem("admin", JSON.stringify(res.data));
      ACCESS_TOKEN = await localStorage.getItem("accessToken");
      //   console.log("Local storage", await localStorage.getItem("admin"));
      //   console.log(
      //     "Access token local",
      //     await localStorage.getItem("accessToken")
      //   );
    }

    return res.status;
  } catch (error) {
    //toast.warning("Phiên đăng nhập hết hạn");
    let oldToken = await localStorage.getItem("accessToken");
    // // console.log("old Token param", JSON.parse(oldToken))
    await refreshToken(oldToken);
    //console.log("Exception authenV2",error)
  }
};

//console.log("AuthReq",authReq)
//console.log("Token firebase",tokenFirebase)
//await console.log("Res-data of auth-api",JSON.parse(res)+"-"+ JSON.parse(data));
export const CURRENT_USER = async () => {
  // const {currentUser}=useSelector(state=>state.user);
  let admin = await localStorage.getItem("admin");
  try {
    console.log("Admin storage", admin);
    return (await admin) !== null && admin !== undefined
      ? JSON.parse(localStorage.getItem("admin"))
      : "";
  } catch (error) {
    console.error("Current user", error);
    //authenticationV2(currentUser.stsTokenManager.accessToken)
  }
};
export let ACCESS_TOKEN = null;
