import { useSelector } from "react-redux";
import BuyerProfileChart from "../ptp-web-admin-components/BuyerProfileChart";
import DashboardStartsGrid from "../ptp-web-admin-components/DashboardStartsGrid";
import PopularProducts from "../ptp-web-admin-components/PopularProducts";
import RecentOrdrers from "../ptp-web-admin-components/RecentOrdrers";
import TransactionChart from "../ptp-web-admin-components/TransactionChart";
import { useEffect } from "react";
import { authentication, authenticationV2 } from "../ptp-web-admin-api/auth-api";


export default function Dashboard() {
  const {currentUser}=useSelector(state=>state.user);
  //console.log("Current user firebase", currentUser)
  useEffect(()=>{
    const storeUserLocal=async()=>{
      try {
        //const dataFetch=await authentication(currentUser.stsTokenManager.accessToken);
        const dataFetch=await authenticationV2(currentUser.stsTokenManager.accessToken);
        localStorage.setItem("admin",JSON.stringify(dataFetch));
        // console.log("admin storage", localStorage.getItem("admin"));
        console.log("DataFetch",JSON.stringify(dataFetch));
      } catch (error) {
        console.log("Exception useEffect Dashboard",error)
      }
      
    }
    storeUserLocal();
  },[currentUser])
  return (
    <div className="flex gap-4 flex-col">
        <DashboardStartsGrid/>
        <div className="flex flex-row gap-4 w-full">
          <TransactionChart/>
          <BuyerProfileChart/>
        </div>
        <div className="flex flex-row gap-4 w-full">
          <RecentOrdrers/>
          <PopularProducts/>
        </div>
        
    </div>
  )
}
