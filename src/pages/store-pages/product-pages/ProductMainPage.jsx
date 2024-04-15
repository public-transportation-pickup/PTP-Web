import { useCallback, useEffect, useState } from "react";
import PaginationButton from "../../../components/store-components/PaginationButton";
import { useNavigate,useParams } from "react-router-dom";
import { getProductByStoreId } from "../../../api/store-api";
import NumberFormat from "../../../lib/utils/NumberFormat";
import {GetDayOfWeek,DateTimeFormat} from "../../../lib/utils/DateFormat"

export default function ProductMainPage() {
    const params= useParams();
    console.log("param store on product main page", params.storeId);
    const navigate= useNavigate();
    const [listProduct,setListProduct]=useState([]);
    console.log("List product", listProduct);
    const handleDetailClick=async ()=>{
        navigate(`/store/${await params.storeId}`)
    }

    useEffect(()=>{
        const fetchData=async()=>{
            const responseAPI= await getProductByStoreId(params.storeId);
            if(Array.isArray(responseAPI.items)) await setListProduct(responseAPI.items);
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
        <h1 className="text-center mx-auto text-4xl mb-8">Danh sách sản phẩm</h1>
        {/* <div className="flex justify-end mb-8">
            <button className="rounded-lg bg-orange-400 pl-3 pr-4 pt-2 pb-2 flex flex-row items-center hover:bg-orange-100" onClick={handleCreateButtonClick}><HiOutlinePlusSm />Create new product</button>
        </div> */}
        
        <div className="border rounded-lg">
            <table className="table-auto rounded-lg min-w-full divide-y divide-gray-200">
                <thead className="rounded-lg bg-gray-50">
                    <tr>
                        <th>Hình_Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Thời gian chuẩn bị</th>
                        <th>Số lượng xử lý đồng thời</th>
                        <th>Ngày sản xuất</th>
                        <th>Ngày hết hạn</th>
                    </tr>
                </thead>
                <tbody>
                    {listProduct && listProduct.length >0 && (listProduct.map((item,index)=>(
                        <tr key={index} className="hover:bg-orange-100">
                        <td>
                            <div className="flex flex-row py-2 gap-4 items-center ml-4">
                                <img src={item.imageURL} className="rounded-full bg-purple-100 w-10 h-10"/>
                                <p>{item.name}</p>
                            </div>
                        </td>
                        <td className="text-center py-2"><NumberFormat number={item.price}/> VNĐ</td>
                        <td className="text-center py-2">{item.preparationTime}</td>
                        <td className="text-center py-2">{item.numProcessParallel}</td>
                        <td className="text-center py-2"> <DateTimeFormat date={item.manufacturingDate}/> </td>
                        <td className="text-center py-2"><DateTimeFormat date={item.expirationDate}/></td>
                    </tr>
                    )))}
                    
                    
                </tbody>
            </table>
            <div>
                {/* <PaginationButton setCurrentPage={5} currentPage={5} totalPages={5}/> */}
            </div>
        </div>
    </>
  )
}

/*
    Thay đổi icon khi từ menu điều hướng qua (Web Store)
*/
