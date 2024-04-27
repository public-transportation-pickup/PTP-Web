import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
import { HiMenuAlt2 } from "react-icons/hi";
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
                        <div className="px-6 pb-6 mt-6 border-t border-gray-300 dark:border-gray-400 ">
                            <div className="flex flex-wrap items-center mt-6">
                                <span className="mr-2 items-center">
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        className="w-4 h-4 text-gray-700 dark:text-gray-400 bi bi-truck"
                                        viewBox="0 0 16 16">
                                        <path
                                            d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z">
                                        </path>
                                    </svg> */}
                                    <HiMenuAlt2 />
                                </span>
                                <h2 className="text-lg font-bold text-gray-700 dark:text-gray-400">Sản phẩm thuộc menu</h2>
                            </div>
                            <div className="mt-2 px-7">
                                <Link to={`/store/${params.storeId}/menu`} className="text-sm text-blue-400 dark:text-blue-200">{detailProduct.menuName}</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full px-1 md:w-1/2 ">
                    <div className="lg:pl-10">
                        <div className="mb-2">
                            <p className="inline-block mb-4 text-xl font-bold text-gray-700 dark:text-gray-400 ">
                                <span>${detailProduct.salePrice}</span>
                                <span
                                    className="text-base font-normal text-gray-500 line-through dark:text-gray-400">$price</span>
                            </p>
                            <p className="max-w-md text-gray-700 dark:text-gray-400">
                            {detailProduct.description}
                            </p>
                        </div>
                        {/* <div className="mb-2">
                            <h2
                                className="w-40 pb-1 text-base font-semibold border-b border-blue-300 dark:border-gray-600 dark:text-gray-400">
                                Thuộc cửa hàng</h2>
                            <div>
                                <div className="flex flex-wrap -mx-2">
                                    <div
                                        className="text-sm px-4 py-2 mb-1 mr-4 font-semibold rounded-md   dark:border-gray-400   dark:hover:border-gray-300 dark:text-gray-400">
                                        {detailProduct.storeName}
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="mb-2">
                            <h2
                                className="w-40 pb-1 text-base font-semibold border-b border-blue-300 dark:border-gray-600 dark:text-gray-400">
                                Thời gian chuẩn bị</h2>
                            <div>
                                <div className="flex flex-wrap -mx-2">
                                    <div
                                        className="text-sm px-4 py-2 mb-1 mr-4 font-semibold rounded-md   dark:border-gray-400   dark:hover:border-gray-300 dark:text-gray-400">
                                        {detailProduct.preparationTime}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-2">
                            <h2
                                className="w-40 pb-1 text-base font-semibold border-b border-blue-300 dark:border-gray-600 dark:text-gray-400">
                                Số đơn xử lý cùng lúc</h2>
                            <div>
                                <div className="flex flex-wrap -mx-2 ">
                                    <div
                                        className="text-sm px-4 py-2 mb-1 mr-4 font-semibold  rounded-md   dark:border-gray-400   dark:hover:border-gray-300 dark:text-gray-400">
                                        numProcessParallel
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-2">
                            <h2
                                className="w-40 pb-1 text-base font-semibold border-b border-blue-300 dark:border-gray-600 dark:text-gray-400">
                                Danh mục</h2>
                            <div>
                                <div className="flex flex-wrap -mx-2">
                                    <div
                                        className="text-sm px-4 py-2 mb-1 mr-4 font-semibold rounded-md   dark:border-gray-400   dark:hover:border-gray-300 dark:text-gray-400">
                                        categoryName
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-2">
                            <h2
                                className="w-40 pb-1 text-base font-semibold border-b border-blue-300 dark:border-gray-600 dark:text-gray-400">
                                NSX_HSD</h2>
                            <div>
                                <div className="flex flex-wrap -mx-2">
                                    <div
                                        className="text-sm px-4 py-2 mb-1 mr-4 font-semibold rounded-md   dark:border-gray-400   dark:hover:border-gray-300 dark:text-gray-400">
                                        manufacturingDate-expirationDate
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
