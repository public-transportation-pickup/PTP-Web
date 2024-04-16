import { useEffect, useState } from "react";
import PaginationButton from "../../../components/store-components/PaginationButton";
import {useParams,useNavigate} from 'react-router-dom'
import { getMenuByStoreId } from "../../../api/store-api";
import { getProductsInMenu } from "../../../api/product-in-menu-api";
import { getMenuById } from "../../../api/menu-api";


export default function MenuMainPage() {
    const params= useParams();
    const [listMenu,setListMenu]=useState([]);
    const [menuId,setMenuId]=useState('');
    const [listProductsMenu,setProductsMenu]=useState([]);
    const [menuInfo, setMenuInfo]=useState({});
    console.log("param store on menu main page", params.storeId);
    console.log("List menu", listMenu);
    console.log("list productmenu", listProductsMenu);
    console.log("menuId",menuId)
    console.log("menu info", menuInfo)
    const navigate= useNavigate();
    const handleDetailClick=async ()=>{
        navigate(`/store/${await params.storeId}`)
    }

    const getListProductInMenu=async (menuId)=>{
        try {
            await setMenuId(menuId);
            const reponseAPIgetMenuInfo= await getMenuById(menuId);
            if(reponseAPIgetMenuInfo!==null) setMenuInfo(reponseAPIgetMenuInfo);
            const responseAPI= await getProductsInMenu(menuId);
            console.log("product-menu main menu page",responseAPI);
            if(responseAPI!==null) setProductsMenu(responseAPI);
        } catch (error) {
            console.error("get product in menu menu main page", error);
        }
    }

    useEffect(()=>{
        const fetchData=async ()=>{
            const responseAPI= await getMenuByStoreId(params.storeId);
            console.log("Menu main page fetch data ress",responseAPI);
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
        <span className="hover:underline">Sản phẩm</span>
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
                    {listMenu && listMenu.length > 0 && listMenu.map((item,index)=>(
                        <div key={index} className="border-b-4 border-orange-100 ">
                            <div className="hover:font-bold focus:text-yellow-200" onClick={()=>getListProductInMenu(item.id)}>{item.name}</div>
                        </div>
                    ))}
                    
                </div>
                    </td>
                    <td className="w-2/3 content-start">
                    <div className=" mx-3 overflow-auto">
                    {menuId !== '' ? (
                        <div className="">
                            <div className="bg-yellow-100 p-4 rounded-lg mb-6">
                                <div>Mô tả: {menuInfo.description}</div>
                                <div>Thời gian áp dụng: {menuInfo.startTime} - {menuInfo.endTime}</div>
                                <div>Áp dụng các ngày trong tuần: {menuInfo.dateApply}</div>
                            </div>
                             {listProductsMenu && listProductsMenu.length >0 ? (
                                listProductsMenu.map((item,index)=>(
                                    <div key={index}>
                                        <div>
                                            <div>
                                                <img src={item.imageURL}/>
                                                <p>{item.productName}</p>
                                            </div>
                                            <div>{item.productPrice}</div>
                                        </div>
                                        <div>
                                        <PaginationButton setCurrentPage={5} currentPage={5} totalPages={5}/>
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
