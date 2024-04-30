import { useEffect, useState } from "react";
//import PaginationButton from "../../../components/store-components/PaginationButton";
import { useNavigate,useParams } from "react-router-dom";
import { getProductByStoreId, getStoreById } from "../../../api/store-api-1.js";
import NumberFormat from "../../../lib/utils/NumberFormat";
import {DateTimeFormat} from "../../../lib/utils/DateFormat"
import classNames from "classnames";
import PaginationButton from "../../../components/shared/PaginationButton";
import { toast,ToastContainer } from "react-toastify";
import { getProductById } from "../../../api/product-api";
import ProductDetailModal from "../../../components/store-components/product-components/ProductDetailModal";

export default function ProductMainPage() {
    const params= useParams();
    console.log("param store on product main page", params.storeId);
    const navigate= useNavigate();
    const [listProduct,setListProduct]=useState([]);
    const [storeInfo,setStoreInfo]=useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [detailModal,setDetailModal]=useState(null);
    const [detailProduct,setDetailProduct]=useState(null)
    //const [isEffectCompleted, setIsEffectCompleted] = useState(false);
    console.log("List product", listProduct);
    const handleDetailClick=async ()=>{
        navigate(`/store/${await params.storeId}`)
    }

    const handleDetailModal=async (value)=>{
        const responseAPI= await getProductById(value);
        console.log("Detail product res", responseAPI)
        if(responseAPI!==null) await setDetailProduct(responseAPI);
        setDetailModal(true);
      }

      
    useEffect(()=>{
        const fetchData=async()=>{
            const responseAPI= await getProductByStoreId(params.storeId,currentPage);
            const responseAPIStore=await getStoreById(params.storeId);
            if(Array.isArray(responseAPI.items)){
                setListProduct(responseAPI.items) 
                
            } 
            if(responseAPIStore!==null) setStoreInfo(responseAPIStore)
            else if (Array.isArray(responseAPI.items)===false) toast.info("Cửa hàng chưa có sản phẩm")
            else toast.warning("Đã có lỗi trong quá trình lấy dữ liệu")
        }
        fetchData();
        //setIsEffectCompleted(true);
    },[params.storeId])

    // useEffect(()=>{
    //     if (isEffectCompleted===true && listProduct.length === 0) {
    //       toast.error("Danh sách sản phẩm trống!");
    //     }
    //   },[isEffectCompleted]);

  return (
    <>
    <ToastContainer/>
    {/* {listProduct.length === 0 && "Danh sách sản phẩm trống!"} */}
    <p>
        <span className="hover:underline text-sky-700">Cửa hàng</span>
        <span className="px-2">&gt;</span>
        <button type="button" onClick={handleDetailClick} className="hover:underline text-sky-700">Chi tiết</button>
        <span className="px-2">&gt;</span>
        <span className="hover:underline text-sky-700">Sản phẩm</span>
    </p>
    <h1 className="text-center mx-auto my-10 flex flex-col"><span className="font-bold text-3xl font-montserrat">{storeInfo.name} </span><span className="text-3xl font-quicksand">Danh sách sản phẩm</span></h1>
        
        <div className="rounded-lg">
            <table className="table-auto rounded-lg min-w-full divide-y divide-gray-200 px-1">
                <thead className="font-montserrat text-sm text-gray-700 uppercase bg-blue-400 dark:bg-gray-700 dark:text-gray-40 h-10 items-center">
                    <tr>
                        <th>#</th>
                        <th>Hình_Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Thời gian chuẩn bị</th>
                        <th>Số lượng xử lý đồng thời</th>
                        <th>Ngày sản xuất</th>
                        <th>Ngày hết hạn</th>
                    </tr>
                </thead>
                    <tbody className="">
                    {listProduct && listProduct.length >0&& (listProduct.map((item,index)=>(
                        <tr onClick={()=>handleDetailModal(item.id)} key={index} className= {classNames(index%2!==0?'bg-blue-100':''," h-8 border-b-2  dark:bg-gray-800 dark:border-gray-700 text-xs py-4 hover:bg-sky-50 hover:cursor-pointer")}>
                        <td className="px-4">{index+1}</td>
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
            {listProduct && listProduct.length===0 &&(<div className="text-center"> Danh sách trống!!!</div>)}
            {listProduct && listProduct.length >0?
                <div className="items-center  align-middle dark:bg-gray-800 dark:border-gray-700 border-0">
                    <PaginationButton
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    totalPages={Math.ceil(listProduct.length/10)}/>
            </div>:<></>}
            </div>
        </div>
        <div>
        {detailModal===true && (
          <ProductDetailModal buttonCheck={detailModal} detailProduct={detailProduct} setButtonCheck={setDetailModal}/>
        )}
      </div>
    </>
  )
}

/*
    Thay đổi icon khi từ menu điều hướng qua (Web Store)
*/
