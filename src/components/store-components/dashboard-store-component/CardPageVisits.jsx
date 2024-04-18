import PropTypes from 'prop-types'
import NumberFormat from '../../../lib/common/NumberFormat.jsx'

export default function CardPageVisits({param}) {
    return (
        <>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-slate-700">
                  Sản phấm bán chạy nhất
                  </h3>
                </div>
                {/* <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button
                    className="bg-indigo-500 text-white active:bg-cyan-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    See all
                  </button>
                </div> */}
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
                      Tên sản phầm
                    </th>
                    <th className="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Giá tiền
                    </th>
                    <th className="text-center px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                      Số lượng đã bán
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {param.length>0 ?(param.map((item,index)=>(
                    <tr key={item.id}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {index +1 }
                      {/* <img
                          src={item.imageURL}
                          alt="..."
                          className="my-1 w-[4rem] h-[4rem] ml-3 rounded-md border-2 border-slate-50 shadow "></img> */}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {item.productName}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <NumberFormat number={item.price}/> VNĐ
                      </td>
                      <td className="border-t-0 text-center px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {item.totalQuantity}
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

CardPageVisits.propTypes={
    param: PropTypes.any
}
