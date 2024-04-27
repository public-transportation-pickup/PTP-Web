import { useEffect, useState } from "react";
import {useParams,useNavigate} from 'react-router-dom'
import { getMenuByStoreId, getStoreById } from "../../../api/store-api";
import { getProductsInMenu } from "../../../api/product-in-menu-api";
import { getMenuById } from "../../../api/menu-api";
import NumberFormat from "../../../lib/utils/NumberFormat";
import {GetDayOfWeek,GetDate} from "../../../lib/utils/DateFormat"
import PaginationButton from "../../../components/shared/PaginationButton";
import classNames from "classnames";
import { toast,ToastContainer } from "react-toastify";

export default function MenuMainPage() {
    const params= useParams();
    const [listMenu,setListMenu]=useState([]);
    const [menuId,setMenuId]=useState('');
    const [listProductsMenu,setProductsMenu]=useState([]);
    const [menuInfo, setMenuInfo]=useState({});
    const [storeInfo,setStoreInfo]=useState({});
    const [currentPage, setCurrentPage] = useState(0);
    console.log(menuInfo);
    console.log("Store Info",storeInfo)
    const navigate= useNavigate();
    const handleDetailClick=async ()=>{
        navigate(`/store/${await params.storeId}`)
    }

    const getListProductInMenu=async (menuId)=>{
        try {
            await setMenuId(menuId);
            const reponseAPIgetMenuInfo= await getMenuById(menuId);
            if(reponseAPIgetMenuInfo!==null || reponseAPIgetMenuInfo!==undefined) setMenuInfo(reponseAPIgetMenuInfo);
            else toast("Menu bị gì rùi")
            const responseAPI= await getProductsInMenu({
                storeId:params.storeId,
                menuId:menuId
            });
            if(responseAPI!==null) setProductsMenu(responseAPI.items);
        } catch (error) {
            console.error("get product in menu menu main page", error);
        }
    }

    useEffect(()=>{
        const fetchData=async ()=>{
            const responseAPI= await getMenuByStoreId(params.storeId);
            const responseAPIStore=await getStoreById(params.storeId);
            if(responseAPI!==null) setListMenu(responseAPI);
            if(responseAPIStore!==null) setStoreInfo(responseAPIStore);
        }
        fetchData();
    },[params.storeId])

    return (
    <>
    <ToastContainer/>
     <p>
        <span className="hover:underline text-sky-700">Cửa hàng</span>
        <span className="px-2">&gt;</span>
        <button type="button" onClick={handleDetailClick} className="hover:underline text-sky-700">Chi tiết</button>
        <span className="px-2">&gt;</span>
        <span className="hover:underline text-sky-700">Sản phẩm</span>
    </p>
        <h1 className="text-center mx-auto mb-10 flex flex-col"><span className="font-bold text-3xl">{storeInfo.name} </span><span className="text-3xl">Menu</span></h1>
        {/* <button className="">Create Menu</button> */}
        
        <div className="border-2 rounded-lg  h-4/5">
            <table className="h-full w-full">
                <tbody>
                <tr className="">
                    <td className="content-start border-r-4 border-cyan-700 w-1/3 ">
                    <div className="p-2 mx-3">
                    {listMenu && listMenu.length > 0 && listMenu.map((item,index)=>(
                        <div key={index} className="border-b-2 border-cyan-700 ">
                            <div className={classNames(menuId && menuId==item.id?'text-cyan-500 font-semibold':'','cursor-pointer hover:font-bold focus:text-yellow-200')} onClick={()=>getListProductInMenu(item.id)}>{item.name}</div>
                            {/* <div className="cursor-pointer hover:font-bold focus:text-yellow-200" onClick={()=>getListProductInMenu(item.id)}>{item.name}</div> */}
                        </div>
                    ))}
                    
                </div>
                    </td>
                    <td className="w-2/3 content-start">
                    <div className=" mx-3 overflow-auto">
                    {menuId !== '' && menuInfo!==undefined? (
                        <div className="">
                            <div className="bg-sky-100 p-4 rounded-3xl mb-6 w-[32rem] mx-auto mt-4">
                                <div className="ml-10 font-bold">Mô tả: {menuInfo.description}</div>
                                <div className="ml-10">Thời gian áp dụng: {menuInfo.startTime} - {menuInfo.endTime}</div>
                                <div className="ml-10 flex flex-row"><p className="mr-2">Áp dụng các ngày trong tuần: </p><GetDayOfWeek days={menuInfo.dateApply}/></div>
                                {menuInfo.startDate!==null?
                                    <div className="ml-10">Ngày cụ thể: <GetDate date={menuInfo.startDate}/> - <GetDate date={menuInfo.endDate}/></div>
                                    :<></>
                                }
                            </div>
                             {listProductsMenu && listProductsMenu.length >0 ? (
                               
                                    <div  className="rounded-lg">
                                    <table className="table-auto rounded-lg min-w-full divide-y divide-gray-200">
                                        <thead className="text-sm text-gray-700 uppercase bg-blue-400 dark:bg-gray-700 dark:text-gray-40 h-10 items-center">
                                            <tr>
                                                <th>Sản phẩm</th>
                                                <th>Giá</th>
                                                <th>Thời gian chuẩn bị</th>
                                                <th>Số lượng xử lý đồng thời</th>
                                                {/* <th>Ngày sản xuất</th> */}
                                                {/* <th>Ngày hết hạn</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {listProductsMenu.map((item,index)=>(
                                                <tr key={index} className= {classNames(index%2!==0?'bg-blue-100':''," h-8 border-b-2  dark:bg-gray-800 dark:border-gray-700 text-xs py-4 hover:bg-sky-50")}>
                                                <td>
                                                    <div className="flex flex-row py-2 gap-4 items-center ml-4">
                                                        <img src={item.imageURL} className="rounded-full bg-purple-100 w-10 h-10"/>
                                                        <p>{item.name}</p>
                                                    </div>
                                                </td>
                                                <td className="text-center py-2"><NumberFormat number={item.price}/> VNĐ</td>
                                                <td className="text-center py-2">{item.preparationTime}</td>
                                                <td className="text-center py-2">{item.numProcessParallel}</td>
                                                {/* <td className="text-center py-2">{item.manufacturingDate}</td> */}
                                                {/* <td className="text-center py-2">{item.expirationDate}</td> */}
                                            </tr>
                                            
                                        ))}
                                        </tbody>
                                    </table>
                                    <div>
                                    <PaginationButton
                                        setCurrentPage={setCurrentPage}
                                        currentPage={currentPage}
                                        totalPages={Math.ceil(listProductsMenu.length/10)}/>
                                    </div>
                                </div>
                               
                                ):(
                                    <div className="mb-auto">Danh sách trống</div>
                                )}
                        </div>
                    ):(<div className="mb-auto"><p>Chọn menu để xem sản phẩm trong menu</p></div>)}
                   
                    
                   
                </div>
                    </td>
                
                
                </tr>
                </tbody>
                
                
            </table>
            <div>
                {/* <PaginationButton/> */}
            </div>
        </div>
        
    </>
  )
}
