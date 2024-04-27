import { useSelector } from "react-redux"
import {Outlet,Navigate} from 'react-router-dom'
import { ACCESS_TOKEN} from "../../api/auth-api";



export default function PrivateRoute() {
  const {currentUser}= useSelector(state=>state.user);
  console.log("Private route access", localStorage.getItem("accessToken"),ACCESS_TOKEN);
  
  return (
    currentUser || ACCESS_TOKEN !==null ?<Outlet/>:<Navigate to={'/sign-in'}/>
  )
}
