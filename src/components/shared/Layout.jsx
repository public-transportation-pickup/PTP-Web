//import React from 'react'
import {Outlet} from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { ACCESS_TOKEN } from '../../api/auth-api';

export default function Layout() {
	// const {currentUser}=useSelector(state=>state.user);
  //  const navigate=useNavigate()
   console.log("AccessToken Layout",ACCESS_TOKEN);
  // useEffect(()=>{
  //    const storeUserLocal=async()=>{
  //     try {
  //        if(ACCESS_TOKEN!==null){ 
  //          const dataFetchRefresh=await refreshToken(ACCESS_TOKEN)
  //          console.log("DataFetchRefresh",JSON.stringify(dataFetchRefresh));
  //        }
  //        else navigate('/sign-in');
  //     } catch (error) {
  //       console.log("Exception useEffect Dashboard",error)
  //     }
      
  //    }
  //    storeUserLocal();
  // },[currentUser])
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
