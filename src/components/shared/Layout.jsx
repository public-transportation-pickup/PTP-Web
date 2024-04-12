//import React from 'react'
import {Outlet} from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authenticationV2 } from '../../api/auth-api';

export default function Layout() {
	const {currentUser}=useSelector(state=>state.user);
  //const navigate=useNavigate()
  //console.log("Current user firebase", currentUser)
  useEffect(()=>{
    const storeUserLocal=async()=>{
      try {
        //const dataFetch=await authentication(currentUser.stsTokenManager.accessToken);
        const dataFetch=await authenticationV2(currentUser.stsTokenManager.accessToken);
        
        // console.log("admin storage", localStorage.getItem("admin"));
        //  console.log("DataFetch",JSON.stringify(dataFetch));
        // console.log("Currenet user", (JSON.parse(localStorage.getItem("admin"))).token);
        //if(dataFetch!==null) localStorage.setItem("admin",JSON.stringify(dataFetch));
        //else navigate('/sign-in');
      } catch (error) {
        console.log("Exception useEffect Dashboard",error)
      }
      
    }
    storeUserLocal();
  },[currentUser])
  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
			<Sidebar />
			<div className="flex flex-col flex-1">
				<Header />
				<div className="flex-1 p-3 min-h-0 overflow-auto">
					<Outlet />
				</div>
			</div>
		</div>
  )
}
