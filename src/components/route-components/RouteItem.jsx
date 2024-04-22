//import PropTypes from 'prop-types';
import { useEffect,useState } from "react";
//import { Link } from "react-router-dom"
import { deleleRoute, getRoutes } from "../../api/route-api";
import SearchBar from "./SearchBar";
//import ComboboxComponent from "../store-components/ComboboxComponent";
import { HiOutlineTrash} from "react-icons/hi";
import Modal from "../shared/Modal";
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";


export default function RouteItem() {
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    //const [searchTerm,setSearchTerm]=useState('');
    const [listRoute, setListRoute]=useState([]);

    const viewDetail=async (id)=>{
        navigate(`/route/${id}`)
    }
    
    const deleteRoute=async (id)=>{
        try {
            const responseAPI= await deleleRoute(id);
            if(responseAPI===204){
                toast.success("Xóa tuyến thành công")
                fetchData();    
            } 
            else toast.error("Xóa tuyến thất bại")
        } catch (error) {
            console.error("delete route route main page", error)
        }
    }
    async function fetchData(){
        try {
            setLoading(true);
            const res= await getRoutes('');
            //const data= await res.json();
            await setListRoute(res);
            setLoading(false);
        } catch (error) {
            console.log("Fetch Data routeItem exception",error);
        }
        
    }

    const searchListResult=async(searchTerm)=>{
        try {
            setLoading(true)
            const responseAPI=await getRoutes(searchTerm);
            setListRoute(responseAPI);
            setLoading(false);
        } catch (error) {
            console.error("search list route page main exception", error);
        }
    }

    useEffect(()=>{
        fetchData();
        
    },[])
return (
    <main>
        
        <div className="pb-4 px-px items-center">
            <SearchBar searchFunc={searchListResult}/>
        </div>
        {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
        {Array.isArray(listRoute)===false || listRoute.length ===0 && <p className="text-center my-7 text-2xl">Không có dữ liệu. Vui lòng quay lại sau</p>}
        <div className="grid grid-cols-3 gap-5" >
            {Array.isArray(listRoute)===true&& listRoute.length > 0&& !loading && (listRoute.map((item)=>(
            
                <div key={item.id}  className=' flex flex-row bg-blue-300 hover:bg-blue-400 rounded-lg items-center gap-8 w-full h-full  p-2'>
                <div className='rounded-full border border-cyan-300 flex justify-between items-center p-2' >
                        {item.routeNo}
                </div>
                <div className="cursor-pointer hover:font-bold" onClick={()=>viewDetail(item.id)}>{item.name}</div>
                <div className='ml-auto mr-2 flex flex-row items-center gap-3'>
                    <Modal buttonValue={<HiOutlineTrash className='z-10 bg-blue-200 hover:bg-blue-600 rounded-lg cursor-pointer p-1' size={30}/>} title="Bạn chắc chắn muốn xóa?" EnumHandler={()=>deleteRoute(item.id)}/>
              </div>
                </div>
        )))}
        </div>
    </main>
    
   
  )
}

// RouteItem.propTypes ={
//     routeItem:PropTypes.object,
// }
