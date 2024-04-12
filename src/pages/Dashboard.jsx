import { useSelector } from "react-redux";
import BuyerProfileChart from "../components/BuyerProfileChart";
import DashboardStartsGrid from "../components/DashboardStartsGrid";
import PopularProducts from "../components/PopularProducts";
import RecentOrdrers from "../components/RecentOrdrers";
import TransactionChart from "../components/TransactionChart";
import { useEffect } from "react";
import { ACCESS_TOKEN, authenticationV2, refreshToken } from "../api/auth-api";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const {currentUser}=useSelector(state=>state.user);
  const navigate=useNavigate()
  //console.log("Current user firebase", currentUser)
  useEffect(()=>{
    const storeUserLocal=async()=>{
       try {
    //     //const dataFetch=await authentication(currentUser.stsTokenManager.accessToken);
    //     const dataFetch=await authenticationV2(currentUser.stsTokenManager.accessToken);
    if(ACCESS_TOKEN!==null){ 
      const dataFetch=await refreshToken(ACCESS_TOKEN)
      console.log("DataFetch",JSON.stringify(dataFetch));
    }
    //     // console.log("admin storage", localStorage.getItem("admin"));
    //     console.log("DataFetch",JSON.stringify(dataFetch));
    //     // console.log("Currenet user", (JSON.parse(localStorage.getItem("admin"))).token);
    //     //if(dataFetch===null) navigate('/sign-in');
    //     if(dataFetch===500 || dataFetch===undefined)  navigate('/sign-in');
   else navigate('/sign-in');
      } catch (error) {
    //     console.log("Exception useEffect Dashboard",error)
       }
      
     }
     storeUserLocal();
  },[currentUser])
  return (
    <div className="flex gap-4 flex-col">
        <DashboardStartsGrid/>
        <div className="w-full">
          <TransactionChart/>
          {/* <BuyerProfileChart/> */}
        </div>
        <div className="flex flex-row gap-4 w-full">
          <RecentOrdrers/>
          <PopularProducts/>
        </div>
        
    </div>
  )
}
