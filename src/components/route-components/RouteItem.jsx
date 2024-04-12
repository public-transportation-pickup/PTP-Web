//import PropTypes from 'prop-types';
import { useEffect,useState } from "react";
import { Link } from "react-router-dom"
import { getRoutes } from "../../api/route-api";
import SearchBar from "./SearchBar";
//import ComboboxComponent from "../store-components/ComboboxComponent";
import { HiOutlineTrash,HiPencil } from "react-icons/hi";
import Modal from "../shared/Modal";
import {useNavigate} from 'react-router-dom'


export default function RouteItem() {
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    const [listRoute, setListRoute]=useState([]);
    const navigateDetailPage=async (id)=>{
        navigate(`/route/${id}`)
    }
    
    useEffect(()=>{
        
        async function fetchData(){
            try {
                setLoading(true);
                const res= await getRoutes();
                //const data= await res.json();
                await setListRoute(res);
                setLoading(false);
            } catch (error) {
                console.log("Fetch Data routeItem exception",error);
            }
            
        }
        fetchData();
        
    },[])
return (
    <main>
        {/* <div><ComboboxComponent listItems={listRoute} params="Name" /></div> */}
        <div className="pb-4 px-px items-center">
            <SearchBar/>
        </div>
        {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
        <div className="grid grid-cols-3 gap-5" >
            {listRoute.length > 0&& !loading && (listRoute.map((item)=>(
            <Link to={`/route/${item.id}`} key={item.id}>
                <div key={item.id}  className=' flex flex-row bg-amber-300 hover:bg-amber-100 rounded-lg items-center gap-8 w-full h-full  p-2'>
                <div className='rounded-full border border-orange-300 flex justify-between items-center p-2'>
                        {item.routeNo}
                </div>
                <div className="">{item.name}</div>
                <div className='ml-auto mr-2 flex flex-row items-center gap-3'>
                    <HiPencil className='z-10 bg-blue-200 hover:bg-blue-400 rounded-full cursor-pointer p-1' size={30} onClick={()=>navigateDetailPage(item.id)}/>
                    <Modal buttonValue={<HiOutlineTrash className='z-10 bg-blue-200 hover:bg-blue-400 rounded-full cursor-pointer p-1' size={30}/>} title="Bạn chắc chắn muốn xóa?" EnumHandler={()=>deleteCategory(item.id)}/>
              </div>
                </div>
            </Link>
        )))}
        </div>
    </main>
    
   
  )
}

// RouteItem.propTypes ={
//     routeItem:PropTypes.object,
// }
