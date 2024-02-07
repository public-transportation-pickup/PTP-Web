//import React from 'react'
import { FcOrgUnit } from "react-icons/fc";
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from "../../lib/contants/NavigationSidebar.jsx";
import { Link,useLocation  } from "react-router-dom";
import classNames from 'classnames'
import PropTypes from 'prop-types';
import { signOutUserStart, signOutUserFailre, signOutUserSuccess } from "../../redux/user/userSlice.js";
import { useDispatch,useSelector } from "react-redux";
import{HiOutlineLogout } from 'react-icons/hi'

const linkClass = 
	'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-300 hover:no-underline active:bg-neutral-600 rounded-sm text-base';

function SidebarLink({item}){
  const { pathname } = useLocation();
  return (
    <Link to={item.path} className={ classNames(pathname===item.path? ' bg-neutral-300 text-black':'text-slate-500',linkClass)}>
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
  
}
SidebarLink.propTypes ={
  item:PropTypes.object.isRequired,
}

export default function Sidebar() {
  const dispatch=useDispatch();
  const {currentUser}=useSelector(state=>state.user);
  const handleSignout= async ()=>{
    try{
      dispatch(signOutUserStart)
      
      await localStorage.clear();
      dispatch(signOutUserSuccess(currentUser));
    }catch(error){
      dispatch(signOutUserFailre(error.message));
    }
  }


  return (
    <div className="bg-neutral-200 w-60 p-3 flex flex-col text-black">
        <div className="flex items-center gap-2 px-1 py-3">
            <FcOrgUnit fontSize={24}/>
            <span className="text-neutral-900 text-lg">PTP</span>
        </div>
        <div className="flex-1 py-8 flex flex-col gap-0.5">
          {DASHBOARD_SIDEBAR_LINKS.map((item)=>(
            <SidebarLink key={item.key} item={item}></SidebarLink>
          ))}
        </div>
        <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
          {
            DASHBOARD_SIDEBAR_BOTTOM_LINKS.map(item=>(
              <SidebarLink key={item.key}item={item}/>
            ))
          }
          <div className={classNames(linkClass, 'cursor-pointer text-red-500')} onClick={handleSignout}>
            <span className="text-xl"><HiOutlineLogout /></span>
            Logout
          </div>
        </div>
    </div>
  )
}


