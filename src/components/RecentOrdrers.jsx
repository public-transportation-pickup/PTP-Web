import {Link} from 'react-router-dom'

export default function  RecentOrdrers({param}) {
  // console.log(param);
  const formatNumber = (number) => {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  
    return formatter.format(number);
  };
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong>Cửa hàng có doanh thu cao nhất</strong>
      {param!==null?
      <div className="mt-3">
        <table className="w-full text-gray-700 border-x border-gray-200 rounded-sm">
          <thead>
            <tr className='font-bold'>
              <td >#</td>
              <td>Tên cửa hàng</td>
              {/* <td>Address</td> */}
              <td>Đơn hoàn thành</td>
              {/* <td>Orders Cancelled</td> */}
              <td>Còn lại</td>
              <td>Tổng doanh thu</td>
              
            </tr>
          </thead>
          <tbody>
            {param.topOrderStores.map((store,index)=>(
              <tr key={index}>
                <td className='pr-3'>{index+1}</td>
                <td>{store.name}</td>
                {/* <td>{store.name}</td> */}
                <td className='px-7'>{store.orderCompleted}</td>
                {/* <td></td> */}
                <td className='px-6'>{store.orderCanceled + store.orderOthers}</td>
                <td className='pl-4'>{formatNumber(store.revenue)} VNĐ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      :
      <></>}
    </div>
  )
}
