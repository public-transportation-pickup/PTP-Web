import { HiOutlinePlusSm } from "react-icons/hi";
import RouteItem from "../../components/route-components/RouteItem";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";


export default function RouteMainPage() {

  const navigate=useNavigate();
  const handleCreateButton=()=>{
    navigate('/route/create')
  }
  return (
    <div className="">
      <ToastContainer/>
      <h1 className="py-8 font-bold text-4xl font-bold text-center font-montserrat">Danh Sách Tuyến</h1>
      <div className="flex justify-end mb-2">
        <button onClick={()=>handleCreateButton()} type="button" className="text-lg font-semibold rounded-lg bg-gradient-to-r from-cyan-600 to-sky-500 pl-3 pr-4 pt-2 pb-2 flex flex-row items-center hover:from-green-500 hover:to-yellow-500"><HiOutlinePlusSm/>Tạo mới tuyến</button>
      </div>
      <div>
        <RouteItem/>
      </div>
    </div>
  )
}

