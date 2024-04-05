import PropTypes from 'prop-types'

export default function CreateTimeTable({routeId, routeVarId}) {
    const dayOfWeek=["T2","T3","T4","T5","T6","T7","CN"]
  return (
    <div>
        {/* <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="RouteId" id="RouteId" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={routeId} readOnly />
            <label htmlFor="RouteId" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mã số tuyến</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="RouteVarId" id="RouteVarId" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={routeVarId} readOnly />
            <label htmlFor="RouteVarId" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mã số lượt</label>
        </div> */}
        <div>
            <p>Chọn ngày tuyến sẽ hoạt động</p>
            <div>
                {/* <label htmlFor="day"></label> */}
                <div  className="flex flex-row items-center ">
                {dayOfWeek && dayOfWeek.length >0 && dayOfWeek.map((item,index)=>(
                    
                        <div key={index} className="flex gap-1 mr-4 items-center">
                            <input key={index} type="checkbox" value={item} className="w-4 h-4"/>
                            <label htmlFor="dayOfWeek" className="">{item}</label>
                        </div>
                    
                    
                ))}
                </div>
                
            </div>
        </div>
        <div className="mt-4">
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Xác nhận</button>

        </div>
    </div>
  )
}

CreateTimeTable.propTypes={
    routeId:PropTypes.string,
    routeVarId:PropTypes.string
}
