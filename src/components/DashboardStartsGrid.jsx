import { useState } from 'react';
import { CiRoute,CiShop } from "react-icons/ci";
import { FaChartBar,FaMapLocation  } from "react-icons/fa6";

import {IoBagHandle} from 'react-icons/io5'

export default function DashboardStartsGrid({data}) {
  // console.log('DashboardStartsGrid',data);
  const formatNumber = (number) => {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  
    return formatter.format(number);
  };
  return (
    
    <div className="flex gap-4 w-full">
      {data!==null?
      <> 
        <BoxWrapper>
          <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-500'>
            <CiRoute className='text-2xl text-white'/>
          </div>
          <div className='pl-4'>
            <span className='text-sm text-gray-500 font-light'>Tuyến</span>
            <div className='flex items-center'>
              <strong className='text-xl text-gray-700 font-semibold'>{data.routes}</strong>
              {/* <span className='text-sm text-green-500 pl-2'>+25</span> */}
            </div>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div className='rounded-full h-12 w-12 flex items-center justify-center bg-green-500'>
            <FaMapLocation className='text-2xl text-white'/>
          </div>
          <div className='pl-4'>
            <span className='text-sm text-gray-500 font-light'>Trạm</span>
            <div className='flex items-center'>
              <strong className='text-xl text-gray-700 font-semibold'>{data.stations}</strong>
              {/* <span className='text-sm text-green-500 pl-2'>+25</span> */}
            </div>
          </div>
        </BoxWrapper><BoxWrapper>
          <div className='rounded-full h-12 w-12 flex items-center justify-center bg-orange-500'>
            <CiShop className='text-2xl text-white'/>
          </div>
          <div className='pl-4'>
            <span className='text-sm text-gray-500 font-light'>Cửa hàng</span>
            <div className='flex items-center'>
              <strong className='text-xl text-gray-700 font-semibold'>{data.stores}</strong>
              {/* <span className='text-sm text-green-500 pl-2'>+25</span> */}
            </div>
          </div>
        </BoxWrapper><BoxWrapper>
          <div className='rounded-full h-12 w-12 flex items-center justify-center bg-red-600'>
            <FaChartBar className='text-2xl text-white bg-red-600'/>
          </div>
          <div className='pl-4'>
            <span className='text-sm text-gray-500 font-light'>Tổng doanh thu</span>
            <div className='flex items-center'>
              <strong className='text-xl text-gray-700 font-semibold'>{formatNumber(data.revenue)} VNĐ</strong>
              {/* <span className='text-sm text-green-500 pl-2'>+25</span> */}
            </div>
          </div>
        </BoxWrapper>
      </>
      :<></>}
      
       
    </div>
  )
}
function BoxWrapper({children}){
  return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
    {children}
  </div>
}
