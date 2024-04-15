import { useParams,useNavigate } from "react-router-dom";
import Map from "../Map";
import { useEffect, useState } from "react";
import { getStoreById } from "../../api/store-api";


export default function DetailStorePage() {
    const params= useParams();
    const navigate= useNavigate();
    console.log("param detail page", params.storeId);
    const [detailStore, setDetailStore]=useState({});
    const [markerStore,setMarkerStore]=useState([])
    console.log("detail store", detailStore);
    console.log("Marker store", markerStore);
    //console.log("JSON.strungfy",detailStore.name)

    
    useEffect(()=>{
        const fetchData=async()=>{
            const responseAPI= await getStoreById(params.storeId);
            //console.log("response api detail store",responseAPI);
            await setDetailStore(responseAPI)
            await setMarkerStore((prevList)=>[...prevList,{popUp:detailStore.name, geocode:[detailStore.latitude,detailStore.longitude]}])
           
        }
        fetchData();
    },[params.storeId])

    const handleViewProductClick=async(id)=>{
        navigate(`/store/${id}/product`)
    }

    const handleViewMenuClick=async(id)=>{
        navigate(`/store/${id}/menu`)
    }

    const handleStoreAllButton=async ()=>{
        navigate('/store')
    }

  return (
    <div>
        <div>
            <button onClick={handleStoreAllButton} className="hover:underline cursor-pointer">Cửa hàng</button>
        </div>
        {detailStore&&(
             <div>
        
             <h1 className="text-center text-2xl pb-6">{detailStore.name}</h1>
             <div className="flex justify-center p-3 border items-center rounded-full bg-purple-300 w-28 h-28 mx-auto">
                                             <img src={detailStore.imageURL} alt="image" className="w-28 h-28 object-contain rounded-full items-center" />
                                             {/* <button type="button" className="p-3 text-red-700 rounded-lg uppercase hover: opacity-65">Delete</button> */}
             </div>
             <div className="items-center flex justify-center gap-14 pt-4 pb-8">
                 <button onClick={()=>handleViewProductClick(params.storeId)} className="bg-green-200 rounded-lg w-32 h-8 hover:opacity-70">Sản phẩm</button>
                 <button onClick={()=>handleViewMenuClick(params.storeId)} className="bg-green-400 rounded-lg w-32 h-8 hover:opacity-70">Lịch bán</button>
             </div>
             <div className='p-3 max-w-6xl mx-auto'>
                 {/* xem detail store như create store, cho thêm thuộc tính
                     Dưới image sẽ có các thao tác điều hướng (view product of store, view menu)
                     button cùng tone màu, menu nhạt hơn store
                 */} 
     
                 <section className="">
       <div className="py-3 px-4 mx-auto max-w-2xl lg:py-8">
           <form action="#">
               <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                   <div className="sm:col-span-2">
                       <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
                       <input type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={`${detailStore.addressNo}, ${detailStore.zone}, ${ detailStore.ward}`} required=""/>
                   </div>
                   <div className="w-full">
                       <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giờ mở cửa</label>
                       <input type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={detailStore.openedTime} required=""/>
                   </div>
                   <div className="w-full">
                       <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giờ đóng cửa</label>
                       <input type="text" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={detailStore.closedTime} required=""/>
                   </div>
                   <div>
                       <label htmlFor="activationDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày bắt đầu hoạt động</label>
                       <input type="text" name="activationDate" id="activationDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={detailStore.activationDate} required=""/>
                   </div>
                   <div>
                       <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trạng thái</label>
                       <input type="text" name="status" id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={detailStore.status} required=""/>
                   </div> 
                   <div className="sm:col-span-2">
                       <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả</label>
                       <textarea id="description" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={detailStore.description}></textarea>
                   </div>
               </div>
              
           </form>
       </div>
     </section>
             </div>
             <div>
                 {/*Import a location map of store by coordinate of store*/}
                 {/* <h1 className="pt-10 text-lg">Location maps</h1> */}
                 <div className="flex justify-center" >
                     {/* <div className="w-3/4 items-center border border-s-slate-200">
                         <Map markers={markerStore}/>
                     </div> */}
                 </div>
                 
             </div>
         </div>
        )}
    </div>
   
  )
}
