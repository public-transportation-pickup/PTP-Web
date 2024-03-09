import ToggleMenu from "../../../ptp-web-admin-components/store-components/menu-components/ToggleMenu";


export default function CreateMenuPage() {
  return (
    <div className="flex flex row">
        <div className="w-full">
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Tạo mới menu</h2>
                    <form action="#">
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên menu</label>
                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required=""/>
                            </div>
                            <div className="w-full">
                                <label htmlFor="startTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày bắt đầu</label>
                                <input type="datetime-local" name="startTime" id="startTime" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required=""/>
                            </div>
                            <div className="w-full">
                                <label htmlFor="endTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày kết thúc</label>
                                <input type="datetime-local" name="endTime" id="endTime" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required=""/>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả</label>
                                <textarea id="description" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Mô tả của menu"></textarea>
                            </div>
                            <div className="h-64 pt-12 border-dashed border-2 sm:col-span-2 ">
                                    {/* <button type="button" className="bg-blue-700 text-blue-50 p-3 rounded-lg top-0 right-0">Menu product</button> */}
                                    {/* <button data-modal-target="default-modal" data-modal-toggle="default-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                        Toggle modal
                                    </button> */}
                                    {/* <button type="button" className="bg-slate-600 text-white" data-toggle="modal" data-target="#exampleModal">
                                        Launch demo modal
                                    </button> */}
                                    <ToggleMenu/>
                                    
                            </div> 
                        </div>
                        {/* Add product in menu */}
                        
                        <button type="button" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-blue-50 bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Add product
                        </button>
                    </form>
                </div>
            </section>
        </div>

  </div>
  )
}
