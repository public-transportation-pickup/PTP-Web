import { useCallback, useEffect, useState } from "react";
import PaginationButton from "../../../components/store-components/PaginationButton";
import { useNavigate,useParams } from "react-router-dom";
import { getProductByStoreId } from "../../../api/store-api";


export default function ProductMainPage() {
    const params= useParams();
    console.log("param store on product main page", params.storeId);
    const navigate= useNavigate();
    const [listProduct,setListProduct]=useState([]);
    const handleDetailClick=async ()=>{
        navigate(`/store/${await params.storeId}`)
    }

    useEffect(()=>{
        const fetchData=async()=>{
            const responseAPI= await getProductByStoreId(params.storeId);
            if(Array.isArray(responseAPI)) setListProduct(responseAPI);
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
        <h1 className="text-center mx-auto text-4xl">Danh sách sản phẩm</h1>
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
                        <th>Số lượng món đồng thời</th>
                        <th>Ngày sản xuất</th>
                        <th>Ngày hết hạn</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-gray-100">
                        <td>
                            <div className="flex flex-row">
                                <img/>
                                <p></p>
                            </div>
                        </td>
                        <td>Malcolm Lockyer</td>
                        <td>1961</td>
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

/*
    Thay đổi icon khi từ menu điều hướng qua (Web Store)
*/
