import { useState } from "react";
import { HiOutlineEye } from "react-icons/hi";
import {useParams} from 'react-router-dom'

export default function DetailRoutePage() {
  const params=useParams();
  const [routeInfo,setRouteInfo]=useState({});
  return (
    <div className="flex flex-row gap-4">
      <div>Lượt đi</div>
      <div>Lượt về</div>
      <div>Map khi bấm zô các lượt đi hoặc về</div>
    </div>
  )
}
