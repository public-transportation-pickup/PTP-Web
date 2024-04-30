import { useEffect, useState } from "react"
import { createStore,forwardGeocoding,getDistrictByProvinceId,getWardByDistrictId } from "../../api/store-api";
import ComboboxComponent from "../../components/store-components/ComboboxComponent";
import {ToastContainer, toast } from "react-toastify";
import { getStations } from "../../api/station-api";
import { HiOutlineTrash} from "react-icons/hi";


export default function CreateStorePage() {
    //const [listProvinces,setListProvince]=useState([]);
    const [listDistrict,setListDistrict]=useState([]);
    const [listWard,setListWard]=useState([]);
    const [listStation,setListStation]=useState([]);
    // console.log("List province",listProvinces);
    // console.log("List district",listDistrict);
    // console.log("List ward",listWard);
    //console.log("List station",listStation);
    const [preview,setPreview]=useState();
    //const [provinceId,setProvinceId]=useState('');
    const [districtId,setDistrictId]=useState('');
    // console.log("ProvinceID", provinceId);
    // console.log("DistrictId",districtId);
    //const [error, setError]=useState(false);
    const [loading,setLoading]=useState(false);
    //const [addressStation,setAddressStation]=useState('');
    const [stationListInfo,setStationListInfo]=useState([]);
    //console.log("addressStation",addressStation)
    const [jsonForm,setJsonForm]=useState({
        Name:'',
        Description:'',
        PhoneNumber:'',
        OpenedTime:"06:00",
        ClosedTime:"23:59",
        Latitude:0,
        Longitude: 0,
        Zone:'',
        Ward:'',
        AddressNo:'',
        Street:"null",
        ActivationDate: new Date().toISOString(),
        Email:'',
        ManagerName:'',
        DateOfBirth:'',
        ManagerPhone:'',
        StationIds:[]
    })
    console.log("Json form: ",jsonForm);
    console.log("Station id", jsonForm.StationIds)
    console.log("Station list info", stationListInfo);
    const [file,setFile]=useState([]);
    //console.log("File ava", file);


    const handleStationChange=async (value)=>{
        //await setJsonForm((listStationId)=>[listStationId,value.id]);
        console.log("station change",value);
        if(value.storeId!=="00000000-0000-0000-0000-000000000000") await toast("Trạm đã được đăng kí store")
        else{
            await setJsonForm({...jsonForm,StationIds:[...jsonForm.StationIds, value.id]});
        await setStationListInfo(prev=>[...prev, value]);
    }
        
        //setAddressStation(JSON.stringify(value.addressNo))
        
    }

    const handleZoneChange=async (value)=>{
        await setJsonForm({...jsonForm,Zone:value.district_name});
        await setDistrictId(value.district_id)
        
    }
    const handleWardChange=async (value)=>{
        await setJsonForm({...jsonForm,Ward:value.ward_name});
        
    }

        
    const handleChange=async(e)=>{
        if(e.target.type==='time' || e.target.type ==='text' || e.target.type==='textarea'|| e.target.type==='number'|| e.target.type==='date'){
            if(e.target.id==='DateOfBirth'){
                //const inputDate= new Date(e.target.value);
                setJsonForm({...jsonForm,[e.target.id]: (e.target.value).toString(),});
            } 
            else setJsonForm({...jsonForm,[e.target.id]:e.target.value,});
            if(jsonForm.AddressNo!=='' && jsonForm.Ward!=='' && jsonForm.Zone!==''){
                console.log("bắt đầu lấy địa chỉ")
                let addressStore= `${jsonForm.AddressNo}, ${jsonForm.Ward}, ${jsonForm.Zone}, TPHCM`
                console.log("")
                const geocoording= await forwardGeocoding(addressStore)
                console.log("Geocooording",geocoording)
                setJsonForm(prevJsonForm => ({
                    ...prevJsonForm,
                    Latitude: geocoording.lat,
                    Longitude: geocoording.lng
                  }));
                  console.log("Đã lấy xong")
        }
    }
    }

    const handleRemoveStation=async (id)=>{
        //console.log("station id remove", station!==id)
        setJsonForm({...jsonForm, StationIds:jsonForm.StationIds.filter((station)=>station!==id)})
        setStationListInfo(stationListInfo.filter((station)=>station.id!==id))

    }

    const handleSubmit =async (e)=>{
        e.preventDefault();
        try{
            // const isFormValid = Object.values(jsonForm).every(value => value !== null && value !== '' && value.length>0);
            // if(isFormValid===false) toast.warning("Thông tin form chưa đủ")
            //if(file.length<1) return setError('You must upload at least one image');
            setLoading(true);
            //setError(false);
            if(jsonForm.Latitude !==0 && jsonForm.Longitude!==0){
                const responseAPI= await createStore(jsonForm,file);
                console.log("call api create store", responseAPI);
                if(responseAPI===null) toast.error("Tạo cửa hàng thất bại")
                else if (responseAPI.status===400) toast.info(responseAPI.message);
                else if (responseAPI.status===500) toast.info("Lỗi hệ thống")
                else toast.success("Tạo cửa hàng thành công")
            }else toast("Đang cập nhật địa chỉ. Xin chờ chút ạ!")
            
            
            setLoading(false);
        }catch(error){
            console.log("Catch:",error);
            setError(error.message);
            setLoading(false);
        }
    }

    const handleInputImgChange = (e) => {
        const { name, value } = e.target;
        setFile(e.target.files)
        setPreview(URL.createObjectURL(e.target.files[0]))
        setJsonForm((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        };


    useEffect(()=>{
        async function fetchData() {
                const responseDistrict=await getDistrictByProvinceId("79");
                await setListDistrict(responseDistrict);
            if(districtId){
                const responseWard=await getWardByDistrictId(districtId);
                const responseRouteStationAPI= await getStations(jsonForm.Zone);
                await setListWard(responseWard);
                await setListStation(responseRouteStationAPI)
            }else{
                setListWard([]);
            }   
        }
        fetchData();
        
    },[districtId]);
    

return (
    <>
    <ToastContainer/>
        <main className='p-3 max-w-6xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-5 font-montserrat'>Tạo Cửa Hàng Mới</h1>
            <div>
                <div>
                    <h3 className="pb-4 font-bold text-lg font-montserrat">I. Điền thông tin người quản lý cửa hàng</h3>
                    <div className="px-12">
                        <div className="flex flex-row items-center w-full pb-4">
                                <label className="w-1/5 font-montserrat" htmlFor="ManagerName">Họ và tên quản lý</label>
                                <input
                                type="text"
                                id="ManagerName"
                                className="rounded-lg w-4/5 h-12 px-4"
                                onChange={handleChange}
                                value={jsonForm.ManagerName}
                                required
                                />
                                
                            </div>
                            <div className="flex flex-row items-center w-full pb-4">
                                <label className="w-1/5 font-montserrat" htmlFor="Email">Email</label>
                                <input
                                type="text"
                                id="Email"
                                className="rounded-lg w-4/5 h-12 px-4"
                                onChange={handleChange}
                                value={jsonForm.Email}
                                required
                                />
                                
                            </div>
                            <div className="flex flex-row items-center w-full pb-4">
                                <label className="w-1/5 font-montserrat" htmlFor="DateOfBirth">Ngày sinh</label>
                                <input
                                type="date"
                                id="DateOfBirth"
                                className="rounded-lg w-4/5 h-12 px-4"
                                onChange={handleChange}
                                value={jsonForm.DateOfBirth}
                                required
                                />
                                
                            </div>
                            <div className="flex flex-row items-center w-full pb-8">
                                <label className="w-1/5 font-montserrat" htmlFor="ManagerPhone">Số điện thoại</label>
                                <input
                                type="text"
                                id="ManagerPhone"
                                className="rounded-lg w-4/5 h-12 px-4"
                                onChange={handleChange}
                                value={jsonForm.ManagerPhone}
                                required
                                />
                                
                            </div>
                    </div>
                </div>
                <div>
                    <h3 className="pb-4 font-bold text-lg font-montserrat">II. Điền thông tin cửa hàng và tiến hành tạo cửa hàng</h3>
                    <div className="flex flex-row gap-4 pb-4  items-center py-8 px-6 ">
                        <div className="flex flex-col gap-8 items-start pb-4 mx-auto">
                            <div className="flex flex-row gap-1 items-center">
                                {/* <div className="flex flex-row gap-3 items-center"> */}
                                {/*<p>Chọn Thành Phố</p>
                                <ComboboxComponent listItems={listProvinces} params="province_name" onValueChange={handleCityChange}/>*/}
                                <p className="font-montserrat">Chọn Quận</p>
                                <ComboboxComponent listItems={listDistrict} params="district_name" onValueChange={handleZoneChange}/>
                                {/* </div> */}
                                {/* <div className="flex flex-row gap-3 items-center"> */}
                                <p className="ml-24 font-montserrat">Chọn Phường</p>
                                <ComboboxComponent listItems={listWard} params="ward_name" onValueChange={handleWardChange}/>
                                {/* <p>Chọn Trạm</p>
                                <ComboboxComponent listItems={listStation} params="name" onValueChange={handleStationChange}/> */}
                                {/* </div> */}
                                
                            
                            </div>
                            <div className="flex flex-row gap-8">
                                <div className="flex flex-row gap-4 items-center">
                                <p  className="font-montserrat">Chọn Trạm</p>
                                <ComboboxComponent listItems={listStation} params="name" onValueChange={handleStationChange}/>
                                </div>
                                <div>
                                    {stationListInfo && stationListInfo.length >0 && stationListInfo.map((item,index)=>(
                                        //storeId="00000000-0000-0000-0000-000000000000"
                                                <div key={index} className="flex flex-row gap-4 items-center border-y-2 justify-between">
                                                <div className="flex flex-row gap-2">
                                                <p>{index+1} - </p>
                                                <div>
                                                    <p className="font-poppins font-thin">Tên trạm: {item.name}</p>
                                                    <p className="font-poppins font-thin">Địa chỉ: {item.address}</p>
                                                </div>
                                                </div>
                                                <HiOutlineTrash className="cursor-pointer" onClick={()=>handleRemoveStation(item.id)}/>
                                                </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-row items-center w-full">
                                <label className="w-1/3 font-montserrat" htmlFor="Address">Địa chỉ (Số nhà, tổ, đường, khu phố):</label>
                                <input
                                type="text"
                                id="AddressNo"
                                className="rounded-lg w-2/3 h-12 px-4"
                                onChange={handleChange}
                                value={jsonForm.AddressNo}
                                required
                                />
                                
                            </div>
                            {/* {loading===true && (<p>Chờ chút để hệ thống cập nhật địa chỉ của bạn....</p>)} */}
                        </div>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4 w-full'>
                            <div className='w-2/3 flex flex-col gap-6 flex-1 pt-4'>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="Name" className="font-montserrat">Tên cửa hàng</label>
                                    <input onChange={handleChange} value={jsonForm.Name} type='text' placeholder='Tên cửa hàng' className='border p-3 rounded-lg'id='Name' maxLength='62' minLength='1' required/>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="Description" className="font-montserrat">Mô tả</label>
                                    <textarea onChange={handleChange} value={jsonForm.Description} type='text' placeholder='Mô tả' className='border p-3 rounded-lg'id='Description' required/>
                                </div>
                                
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="PhoneNumber" className="font-montserrat">Số điện thoại</label>
                                    <input onChange={handleChange} value={jsonForm.PhoneNumber} type='text' placeholder='Số điện thoại' className='border p-3 rounded-lg'id='PhoneNumber'  required/>
                                </div>
                                {/* <input onChange={handleChange} value={formData.Address} type='text' placeholder='Address' className='border p-3 rounded-lg'id='Address'  required/> */}
                                {/* <div className='flex gap-5 flex-row'>
                                    <div className='flex gap-2'>
                                        <span>Open Time</span>
                                        <input onChange={handleChange} checked={formData.OpenedTime} type='time' id='OpenedTime' className='w-3/4'/>
                                        
                                    </div>
                                    <div className='flex gap-2'>
                                    <span>Closed Time</span>
                                        <input onChange={handleChange} checked={formData.ClosedTime} type='time' id='ClosedTime' className='w-3/4'/>
                                        
                                    </div>
                                </div> */}
                            </div>
                            <div className='w-1/3 flex flex-col flex-1 gap-2 pt-12'>
                                <div className="flex justify-center flex-row gap-2 ">
                                <div className='flex gap-4'>
                                    {/* <input onChange={handleInputImgChange} className='hidden' type='file' id='images' accept='image/*'/>
                                    <button className='p-1 text-green-700 border border-green-700 rounded uppercase hover: shadow-lg disabled:opacity-80'>Select Image</button> */}
                                    <label htmlFor="images" className="font-montserrat p-1 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
                                        Chọn ảnh
                                        <input onChange={handleInputImgChange} className="hidden" type="file" id="images" name="File" accept="image/*" multiple={false}/>
                                    </label>
                                    
                                </div>
                                
                                    <span className='font-normal text-gray-600 ml-2'> Chỉ 1 ảnh</span>
                                
                                </div>
                                
                                {/* <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p> */}
                                {preview? (
                                <div className="flex justify-center p-3 border items-center rounded-full bg-blue-200 w-28 h-28 mx-auto">
                                                {console.log("File map: ",preview)}
                                                <img src={preview} alt="listing image" className="w-28 h-28 object-contain rounded-full items-center" />
                                                {/* <button type="button" className="p-3 text-red-700 rounded-lg uppercase hover: opacity-65">Delete</button> */}
                                            </div>
                                ):(<>
                                    <div className="rounded-full bg-blue-300 w-28 h-28 mx-auto"></div>
                                </>)}
                                <button onClick={handleSubmit} disabled={loading} className="font-montserrat p-3 bg-cyan-600 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading===true?'Tạo Cửa hàng ....':'Tạo Cửa hàng'}</button>
                                {/* {error&& <p className="text-red-700 text-sm">{error}</p>} */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            
            
        </main>
    {/* <div className="p-4" >
        <DisplayData className/>
    </div> */}
    </>
    
  )
}
