import { useEffect, useState } from "react";
import PaginationButton from "../../../components/store-components/PaginationButton";
import {useParams,useNavigate} from 'react-router-dom'
import { getMenuByStoreId } from "../../../api/store-api";
import { getProductsInMenu } from "../../../api/product-in-menu-api";
import { getMenuById } from "../../../api/menu-api";
import NumberFormat from "../../../lib/utils/NumberFormat";
import {GetDayOfWeek,GetDate} from "../../../lib/utils/DateFormat"

export default function MenuMainPage() {
    const params= useParams();
    const [listMenu,setListMenu]=useState([]);
    const [menuId,setMenuId]=useState('');
    const [listProductsMenu,setProductsMenu]=useState([]);
    const [menuInfo, setMenuInfo]=useState({});
    const [currentPage, setCurrentPage] = useState(0);
    console.log(menuInfo);
    const navigate= useNavigate();
    const handleDetailClick=async ()=>{
        navigate(`/store/${await params.storeId}`)
    }

    const getListProductInMenu=async (menuId)=>{
        try {
            await setMenuId(menuId);
            const reponseAPIgetMenuInfo= await getMenuById(menuId);
            if(reponseAPIgetMenuInfo!==null) setMenuInfo(reponseAPIgetMenuInfo);
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
            if(responseAPI!==null) setListMenu(responseAPI);
        
        }
        fetchData();
    },[params.storeId])

    return (
    <>
     <p>
        <span className="hover:underline">Cửa hàng</span>
        <span className="px-2">&gt;</span>
        <button type="button" onClick={handleDetailClick} className="hover:underline">Chi tiết</button>
        <span className="px-2">&gt;</span>
        <span className="hover:underline">Lịch bán</span>
    </p>
        <h1 className="text-center mx-auto text-4xl mb-20">Danh sách lịch bán</h1>
        {/* <button className="">Create Menu</button> */}
        {/* <div className="flex justify-end mb-8">
            <button className="rounded-lg bg-orange-400 pl-3 pr-4 pt-2 pb-2 flex flex-row items-center hover:bg-orange-100" onClick={handleCreateButtonClick}><HiOutlinePlusSm />Create new product</button>
        </div> */}
        
        <div className="border-2 rounded-lg  h-4/5">
            <table className="h-full w-full">
                <tbody>
                <tr className="">
                    <td className="content-start border-r-4 border-orange-100 w-1/3">
                    <div className="p-2 mx-3">
                    {listMenu && listMenu.length > 0 && listMenu.slice(currentPage*10, currentPage*10+10).map((item,index)=>(
                        <div key={index} className="border-b-4 border-orange-100 ">
                            <div className="hover:font-bold focus:text-yellow-200" onClick={()=>getListProductInMenu(item.id)}>{item.name}</div>
                        </div>
                    ))}
                    
                </div>
                    </td>
                    <td className="w-2/3 content-start">
                    <div className=" mx-3 overflow-auto">
                    {menuId !== ''? (
                        <div className="">
                            <div className="bg-yellow-100 p-4 rounded-lg mb-6">
                                <div>Mô tả: {menuInfo.description}</div>
                                <div>Thời gian áp dụng: {menuInfo.startTime} - {menuInfo.endTime}</div>
                                <div>Áp dụng các ngày trong tuần: <GetDayOfWeek days={menuInfo.dateApply}/></div>
                                {menuInfo.startDate!==null?
                                    <div>Ngày cụ thể: <GetDate date={menuInfo.startDate}/> - <GetDate date={menuInfo.endDate}/></div>
                                    :<></>
                                }
                            </div>
                             {listProductsMenu && listProductsMenu.length >0 ? (
                                listProductsMenu.map((item,index)=>(
                                    <div  key={index} className="border rounded-lg">
                                    <table className="table-auto rounded-lg min-w-full divide-y divide-gray-200">
                                        <thead className="rounded-lg bg-gray-50">
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
                                                <tr className="hover:bg-orange-100">
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
                                            
                                            
                                        </tbody>
                                    </table>
                                    <div>
                                    <PaginationButton
                                        setCurrentPage={setCurrentPage}
                                        currentPage={currentPage}
                                        totalPages={Math.ceil(listProductsMenu.length/10)}/>
                                    </div>
                                </div>
                                ))
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
