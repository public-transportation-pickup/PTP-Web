import { HiOutlinePlusSm } from "react-icons/hi";
import RouteItem from "../../components/route-components/RouteItem";
import { useNavigate } from "react-router-dom";


export default function RouteMainPage() {

  const navigate=useNavigate();
  const handleCreateButton=()=>{
    navigate('/route/create')
  }
  return (
    <div className="">
      <h1 className="pt-8 text-xl">Danh sách tuyến</h1>
      <div className="flex justify-end mb-4">
        <button onClick={()=>handleCreateButton()} type="button" className="rounded-lg bg-orange-400 pl-3 pr-4 pt-2 pb-2 flex flex-row items-center hover:bg-orange-100"><HiOutlinePlusSm/>Tạo mới tuyến</button>
      </div>
      <div>
        <RouteItem/>
      </div>
    </div>
  )
}

