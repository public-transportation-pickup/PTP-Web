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
      <strong>Recent Orders</strong>
      {param!==null?
      <div className="mt-3">
        <table className="w-full text-gray-700 border-x border-gray-200 rounded-sm">
          <thead>
            <tr>
              <td ></td>
              <td>Name</td>
              {/* <td>Address</td> */}
              <td>Orders Successfull</td>
              {/* <td>Orders Cancelled</td> */}
              <td>Other Orders</td>
              <td>Revenue</td>
              
            </tr>
          </thead>
          <tbody>
            {param.topOrderStores.map((store,index)=>(
              <tr key={index}>
                <td className='pr-3'>{index}</td>
                <td>{store.name}</td>
                {/* <td>{store.name}</td> */}
                <td className='px-10'>{store.orderCompleted}</td>
                {/* <td></td> */}
                <td className='px-10'>{store.orderCanceled + store.orderOthers}</td>
                <td>{formatNumber(store.revenue)}</td>
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
