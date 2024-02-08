import Map from "../Map";


export default function DetailStorePage() {
  return (
    <div>
        <h1 className="text-center text-2xl pb-6">Store 1 (cho tên của store zô đây)</h1>
        <div className="flex justify-center p-3 border items-center rounded-full bg-purple-300 w-28 h-28 mx-auto">
                                        <img src="https://png.pngtree.com/png-clipart/20230913/original/pngtree-general-store-clipart-cute-cartoon-candy-shop-with-front-facade-vector-png-image_11054333.png" alt="listing image" className="w-28 h-28 object-contain rounded-full items-center" />
                                        {/* <button type="button" className="p-3 text-red-700 rounded-lg uppercase hover: opacity-65">Delete</button> */}
        </div>
        <div className="items-center flex justify-center gap-14 pt-4 pb-8">
            <button className="bg-green-200 rounded-lg w-32 h-8 hover:opacity-70">View products</button>
            <button className="bg-green-400 rounded-lg w-32 h-8 hover:opacity-70">View menu</button>
        </div>
        <div className='p-3 max-w-6xl mx-auto'>
            {/* xem detail store như create store, cho thêm thuộc tính
                Dưới image sẽ có các thao tác điều hướng (view product of store, view menu)
                button cùng tone màu, menu nhạt hơn store
            */} 

            <div className="flex flex-row gap-4 pb-8 items-center py-2 ">
                <p className="text-xl">Địa chỉ</p>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-row gap-3 items-center">
                        <p>Thành Phố</p>
                        <input type="text" className="rounded-lg w-64 h-12"/>
                        <p>Quận</p>
                        <input type="text" className="rounded-lg w-64 h-12"/>
                        <p>Phường</p>
                        <input type="text" className="rounded-lg w-64 h-12"/>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <label htmlFor="streetName">Đường:</label>
                        <input
                        type="text"
                        id="streetName"
                        className="rounded-lg w-64 h-12"
                        />
                        <label className="" htmlFor="streetName">Khu phố:</label>
                        <input
                        type="text"
                        id="streetName"
                        className="rounded-lg w-32 h-12"
                        />
                        <label htmlFor="streetName">Tổ:</label>
                        <input
                        type="text"
                        id="streetName"
                        className="rounded-lg w-24 h-12"
                        />
                    </div>
                </div>
            </div>

                <div>
                    <div className='w-3/4 flex flex-col gap-4 flex-1'>
                        <div className="flex flex-col gap-2">
                            <span className="flex items-center gap-4">
                                <label htmlFor="Name" className="text-right">Tên store:</label>
                                <input type="text" placeholder="Name" className="border p-3 rounded-lg w-3/4" id="Name" maxLength="62" minLength="1" required/>
                            </span>

                            <span className="flex items-center gap-4">
                                <label htmlFor="Description" className="text-right">Mô tả:</label>
                                <textarea type="text" placeholder="Description" className="border p-3 rounded-lg w-3/4" id="Description" required/>
                            </span>

                            <span className="flex items-center gap-4">
                                <label htmlFor="PhoneNumber" className="text-right">Số điện thoại:</label>
                                <input type="text" placeholder="PhoneNumber" className="border p-3 rounded-lg w-3/4" id="PhoneNumber" required/>
                            </span>
                                
                        </div>
                        
                        <div className='flex gap-5 flex-row'>
                            <div className='flex gap-2'>
                                <span>Open Time</span>
                                <input type='time' id='OpenedTime' className='w-3/4'/>
                                
                            </div>
                            <div className='flex gap-2'>
                            <span>Closed Time</span>
                                <input type='time' id='ClosedTime' className='w-3/4'/>
                                
                            </div>
                    </div>
                </div>                  
            </div>
        </div>
        <div>
            {/*Import a location map of store by coordinate of store*/}
            <h1 className="pt-10 text-lg">Location maps</h1>
            <div className="flex justify-center" >
                <div className="w-3/4 items-center border border-s-slate-200">
                    <Map/>
                </div>
            </div>
            
        </div>
    </div>
  )
}
