import { useState,useEffect, useCallback } from "react";
import NumberFormat from "../../../lib/common/NumberFormat.jsx";
import DateTimeFormat from "../../../lib/common/DateTimeFormat.jsx";
import {Actions, useAPIRequest } from '../../../lib/utils/api-request.js';
import { getTransactions } from "../../../api/transaction-api.js";
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types'
import { ToastContainer, toast } from "react-toastify";

export default function CardPageTransactions({storeId}) {
  //#region api request
  //const [transState,requestTrans]=useAPIRequest(getTransactions(storeId));
  //#endregion
  const navigate = useNavigate();
  const [transactions,setTransactions]= useState([]);
//   useEffect(()=>{
//     requestTrans();
//   },[])

//   useEffect(()=>{
//     if(transState.status===Actions.success){
//       setTransactions(transState.payload.transactions);
//     }
//     if(transState.status===Actions.failure){
//       console.log(transState.error);
//     }

//   },[transState]);

const fetchData=useCallback(async ()=>{
    try {
        const responseAPI=await getTransactions(storeId);
        console.log("Response api fetch card transaction",responseAPI);
        if(responseAPI!==null) setTransactions(responseAPI);
        
        // else toast("Đã xảy ra lỗi khi lấy dữ liệu giao dịch")

    } catch (error) {
        console.error("fetch data card page transaction exception",error)
    }
},[transactions])

useEffect(()=>{
    fetchData()
},[storeId])

  const handleClick=()=>{
    navigate(`transactions`)
  }
  // console.log(transactions);
  return (
    <>
    {/* <ToastContainer/> */}
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-slate-700">
              Giao dịch mới nhất
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                onClick={()=>handleClick()}
                className="bg-indigo-500 text-white active:bg-cyan-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                 Tất cả
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  
                </th>
                <th className="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Loại giao dịch
                </th>
                <th className="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Nội dung
                </th>
                <th className="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Số tiền
                </th>
                
                <th className="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Hình thức
                </th>
                <th className="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Thời gian
                </th>
                
              </tr>
            </thead>
            <tbody>
              {transactions.length>0 ?(transactions.slice(0, 5).map((item,index)=>(
                <tr key={index}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {index +1}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.transactionType==='Receive'?'Thanh toán':'Hoàn tiền'}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <a
                        className="text-blue-500 underline hidden lg:inline-block font-bold"
                        href={"../orders/"+item.orderId}
                    >
                      {item.transactionType==='Receive'?'Thanh toán cho đơn hàng':'Hoàn tiền cho đơn hàng'} của {item.name}
                    </a>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <NumberFormat number={item.amount}/> VNĐ
                  </td>
                  
                  
                  <td className="border-t-0  px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      Thanh toán ví
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                      <DateTimeFormat date={item.creationDate}/>
                  </td>
                </tr>

              ))):(<></>)}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardPageTransactions.propTypes={
    storeId: PropTypes.string
}
