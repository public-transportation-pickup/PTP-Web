import { useSelector } from "react-redux"
import {Outlet,Navigate} from 'react-router-dom'


export default function PrivateRoute() {
  const {currentUser}= useSelector(state=>state.user);
  // const adminStorage= localStorage.getItem("admin")? JSON.parse(localStorage.getItem("admin")):null;
  // useEffect(()=>{
  //   const refresh=async()=>{
  //     if(adminStorage===undefined){
  //       await localStorage.clear();
  //     }
  //   }
  //   refresh
  // },[adminStorage])
  
  return (
    currentUser ?<Outlet/>:<Navigate to={'/sign-in'}/>
  )
}
