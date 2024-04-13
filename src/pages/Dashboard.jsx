import { useSelector } from "react-redux";
import BuyerProfileChart from "../components/BuyerProfileChart";
import DashboardStartsGrid from "../components/DashboardStartsGrid";
import PopularProducts from "../components/PopularProducts";
import RecentOrdrers from "../components/RecentOrdrers";
import TransactionChart from "../components/TransactionChart";
import { useEffect, useState } from "react";
import { ACCESS_TOKEN, authenticationV2, refreshToken } from "../api/auth-api";
import { useNavigate } from "react-router-dom";
import { getReport } from "../api/user-api";
import { useAPIRequest,Actions } from "../lib/utils/api-request";

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
    }else if(ACCESS_TOKEN===null){
      const dataFetch=await authenticationV2(currentUser.stsTokenManager.accessToken);
      console.log("DataFetch",JSON.stringify(dataFetch));
    }else navigate('/sign-in')
    //     // console.log("admin storage", localStorage.getItem("admin"));
    //     console.log("DataFetch",JSON.stringify(dataFetch));
    //     // console.log("Currenet user", (JSON.parse(localStorage.getItem("admin"))).token);
    //     //if(dataFetch===null) navigate('/sign-in');
    //     if(dataFetch===500 || dataFetch===undefined)  navigate('/sign-in');
   //else navigate('/sign-in');
      } catch (error) {
    //     console.log("Exception useEffect Dashboard",error)
       }
      
     }
     storeUserLocal();
  },[currentUser])

  //#region request API
    const [reportState,requestReport]=useAPIRequest(getReport);
    const [report,setReport]=useState(null);
    useEffect( ()=>{
      requestReport();
    },[])
  
    useEffect(()=>{
      if(reportState.status===Actions.success){
        setReport(reportState.payload);
        // console.log("Report: ",reportState.payload)
      }
      if(reportState.status===Actions.failure){
        console.log("Get report errors:",reportState.error);
      }
    },[reportState]);
  //#region 


  return (
    <div className="flex gap-4 flex-col">
        <DashboardStartsGrid data={report}/>
        <div className="w-full">
          <TransactionChart param={report}/>
          {/* <BuyerProfileChart/> */}
        </div>
        <div className="flex flex-row gap-4 w-full">
          <RecentOrdrers param={report}/>
          <PopularProducts param={report}/>
        </div>
        
    </div>
  )
}
