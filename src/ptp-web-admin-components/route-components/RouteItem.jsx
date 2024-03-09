//import PropTypes from 'prop-types';
import { useEffect,useState } from "react";
import { Link } from "react-router-dom"
import { getRoutes } from "../../ptp-web-admin-api/route-api";
import SearchBar from "./SearchBar";
//import ComboboxComponent from "../store-components/ComboboxComponent";


export default function RouteItem() {
    const [loading,setLoading]=useState(false);
    const [listRoute, setListRoute]=useState([]);
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
        <div className="py-8 px-px items-center">
            <SearchBar/>
        </div>
        {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
        <div className="grid grid-cols-3 gap-5" >
            {listRoute.length > 0&& !loading && (listRoute.map((item)=>(
            <Link to={`/routes/${item.id}`} key={item.id}>
                <div key={item.id}  className=' flex flex-row bg-amber-100 hover:opacity-90 rounded-lg items-center gap-8 w-full h-full  p-2'>
                <div className='rounded-full border border-orange-300 flex justify-between items-center p-2'>
                        {item.routeNo}
                </div>
                <div className="">{item.name}</div>
                
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
