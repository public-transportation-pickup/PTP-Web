import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
import { HiMenuAlt2 } from "react-icons/hi";
import { GetDate } from '../../../lib/utils/DateFormat';
export default function DetailProductPage({detailProduct}) {
    const params=useParams();
    console.log("Detail on detail product page",detailProduct)
  return (
    <div>
      <section className="overflow-hidden bg-white py-2 font-poppins dark:bg-gray-800">
        <div className="px-1 py-4 mx-auto md:px-6">
            <div className="flex flex-col -mx-4 justify-center">
                <div className="w-full mb-6 md:mb-0">
                    <div className="sticky top-0 z-50 overflow-hidden ">
                        <div className="relative mb-4 lg:mb-6 lg:h-2/4 flex justify-center items-center">
                            <img src="https://i.postimg.cc/6qcPhTQg/R-18.png" alt=""className="object-cover w-28 h-28 "/>
                        </div>
                        <div className="px-6 pb-6 mt-6 border-t border-gray-300 dark:border-gray-400 flex flex-row justify-start">
                            <div className="flex flex-row items-center mt-6">
                                <span className="mr-2 items-center">
                                    <HiMenuAlt2 />
                                </span>
                                <h2 className="text-sm font-bold text-gray-700 dark:text-gray-400">Sản phẩm thuộc menu</h2>
                            </div>
                            <div className="mt-6 px-7">
                                <Link to={`/store/${params.storeId}/menu`} className="text-sm text-blue-400 dark:text-blue-200">{detailProduct.menuName}</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full px-1 ">
                    <div className="lg:pl-10">
                        <div className="mb-2">
                            <p className="inline-block mb-4 text-xl font-bold text-gray-700 dark:text-gray-400 ">
                                <span>${detailProduct.salePrice}</span>
                                <span
                                    className=" ml-1 text-base font-normal text-gray-500 line-through dark:text-gray-400">${detailProduct.price}</span>
                            </p>
                            <p className="max-w-md text-slate-700 dark:text-gray-400 mb-4">
                            {detailProduct.description}
                            </p>
                        </div>
                        <div className="mb-2 w-full flex flex-row justify-start">
                            <h2
                                className="w-40 pb-0.5 text-base font-semibold border-b border-blue-300 dark:border-gray-600 dark:text-gray-400">
                                Thời gian chuẩn bị</h2>
                            <div>
                                <div className="flex flex-wrap -mx-2">
                                    <div
                                        className="text-sm px-4 py-2 mb-1 mr-4rounded-md   dark:border-gray-400   dark:hover:border-gray-300 dark:text-gray-400">
                                        {detailProduct.preparationTime}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-2 w-full flex flex-row justify-start">
                            <h2
                                className="w-40 pb-1 text-base font-semibold border-b border-blue-300 dark:border-gray-600 dark:text-gray-400">
                                Số đơn xử lý cùng lúc</h2>
                            <div>
                                <div className="flex flex-wrap -mx-2 ">
                                    <div
                                        className="text-sm px-4 py-2 mb-1 mr-4  rounded-md   dark:border-gray-400   dark:hover:border-gray-300 dark:text-gray-400">
                                        {detailProduct.numProcessParallel}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-2 w-full flex flex-row justify-start">
                            <h2
                                className="w-40 pb-1 text-base font-semibold border-b border-blue-300 dark:border-gray-600 dark:text-gray-400">
                                Danh mục</h2>
                            <div>
                                <div className="flex flex-wrap -mx-2">
                                    <div
                                        className="text-sm px-4 py-2 mb-1 mr-4 rounded-md   dark:border-gray-400   dark:hover:border-gray-300 dark:text-gray-400">
                                        {detailProduct.categoryName}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-2 w-full flex flex-row justify-start">
                            <h2
                                className="w-40 pb-1 text-base font-semibold border-b border-blue-300 dark:border-gray-600 dark:text-gray-400">
                                NSX_HSD</h2>
                            <div>
                                <div className="flex flex-wrap -mx-2">
                                    <div
                                        className=" flex flex-row gap-2 text-sm px-4 py-2 mb-1 mr-4 rounded-md  dark:border-gray-400   dark:hover:border-gray-300 dark:text-gray-400">
                                        {/* {GetDate(detailProduct.manufacturingDate)}-{detailProduct.expirationDate} */}
                                        <GetDate date={detailProduct.manufacturingDate}/> - <GetDate date={detailProduct.expirationDate}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

DetailProductPage.propTypes={
    detailProduct:PropTypes.object
}
