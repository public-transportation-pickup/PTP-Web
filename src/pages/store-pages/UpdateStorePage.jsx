import { useEffect, useState } from "react"
import {ToastContainer, toast } from "react-toastify";
import { updateStore,forwardGeocoding,getDistrictByProvinceId,getWardByDistrictId, getStoreById } from "../../api/store-api-1.js";
import ComboboxComponent from "../../components/store-components/ComboboxComponent";
import { getStationByStationId, getStations } from "../../api/station-api";
import {useParams} from 'react-router-dom'
import {HiPencil,HiOutlineXCircle, HiOutlineTrash } from "react-icons/hi";
//import { getUserById, updateUser } from "../../api/user-api";

export default function UpdateStorePage() {
  const params=useParams();

  const [listDistrict,setListDistrict]=useState([]);
  const [listWard,setListWard]=useState([]);
  const [listStation,setListStation]=useState([]);

  const [districtId,setDistrictId]=useState('');

  const [preview,setPreview]=useState();
  console.log("Preview",preview)

  // const [error, setError]=useState('');
  const [loading,setLoading]=useState(false);
  const [changeAddress,setChangeAddress]=useState(false);

  //const [addressStation,setAddressStation]=useState('');

  const [stationListInfo,setStationListInfo]=useState([]);

  const [store,setStore]=useState({});

  const handleInputImgChange = (e) => {
    const { value } = e.target;
    setPreview(URL.createObjectURL(e.target.files[0]))
    setJsonForm((prevFormData) => ({
        ...prevFormData,
        File: value,
    }));
    };


  const [jsonForm,setJsonForm]=useState({
    Id:'',
    Name:'',
    Description:'',
    PhoneNumber:'',
    OpenedTime:"06:00",
    ClosedTime:"22:00",
    Latitude:0,
    Longitude: 0,
    Zone:'',
    Ward:'',
    AddressNo:'',
    Street:"null",
    File:[],
    ActivationDate: new Date().toISOString(),
    Email:'',
    ManagerName:'',
    DateOfBirth:'',
    ManagerPhone:'',
    StationIds:[]
})

//console.log("Store update get info",store);
console.log("Station info list initial",stationListInfo)

console.log("Jsonform",jsonForm)


  const handleStationChange=async (value)=>{
    console.log("station change",value);
    if(value.storeId!=="00000000-0000-0000-0000-000000000000") await toast("Trạm đã được đăng kí store")
    else{
        await setJsonForm({...jsonForm,StationIds:[]});
        await setJsonForm({...jsonForm,StationIds:[...jsonForm.StationIds, value.id]});
        await setStationListInfo(prev=>[...prev, value]);
    // await setJsonForm({...jsonForm,StationIds:value.id});
    // setAddressStation(JSON.stringify(value.address))
    }
    
}
const handleRemoveStation=async (id)=>{
  //console.log("station id remove", station!==id)
  setJsonForm({...jsonForm, StationIds:jsonForm.StationIds.filter((station)=>station!==id)})
  setStationListInfo(stationListInfo.filter((station)=>station.id!==id))

}

const handleZoneChange=async (value)=>{
    await setJsonForm({...jsonForm,Zone:value.district_name});
    await setDistrictId(value.district_id)
    
}
const handleWardChange=async (value)=>{
    await setJsonForm({...jsonForm,Ward:value.ward_name});
    
}

const handleChange=async (e)=>{
  if(e.target.type==='time' || e.target.type ==='text' || e.target.type==='textarea'|| e.target.type==='number'||e.target.type==='date'){
    if(e.target.id==='DateOfBirth'){
      //const inputDate= new Date(e.target.value);
      setJsonForm({...jsonForm,[e.target.id]: (e.target.value).toString(),});
  } 
  else{
    setJsonForm({...jsonForm,[e.target.id]:e.target.value,});
  } 
  if(changeAddress===true){
    if((jsonForm.AddressNo!=='' && jsonForm.Ward!=='' && jsonForm.Zone!=='') ||(jsonForm.AddressNo!==store.AddressNo || jsonForm.Ward!==store.Ward || jsonForm.Zone!==store.Zone)){
      setLoading(true);  
      let addressStore= `${jsonForm.AddressNo}, ${jsonForm.Ward}, ${jsonForm.Zone}, TPHCM`
        const geocoording= await forwardGeocoding(addressStore)
        if(geocoording===null){
            toast("Kiểm tra lại địa chỉ")
        }
        else{
          const geocoording= await forwardGeocoding(addressStore)
          console.log("Geocooording",geocoording)
          await setJsonForm(prevJsonForm => ({
              ...prevJsonForm,
              Latitude: geocoording.lat,
              Longitude: geocoording.lng
            }));
          console.log("json lat long"+jsonForm.Latitude+" "+ jsonForm.Longitude)
        } 
        setLoading(false);
    }
}
  }
  
}

const handleOpenChangeAddress=async ()=>{
  setChangeAddress(true);
}

const handleCloseChangeAddress=async ()=>{
  setChangeAddress(false);
  setJsonForm({
    AddressNo:store.addressNo,
    Ward:store.ward,
    Zone: store.zone
  })
}

const handleSubmit =async (e)=>{
  e.preventDefault();
  try{
      //if(jsonForm.File.length <1 ) return setError('You must upload at least one image');
      const isFormValid = Object.values(jsonForm).every(value => value !== null && value !== '');
      if(isFormValid===false) toast.warning("Thông tin form chưa đủ")
      setLoading(true);
      //setError(false);
      const responseAPI= await updateStore(jsonForm);
              console.log("call api update store", responseAPI);
              if(responseAPI===204) toast.success("Cập nhật cửa hàng thành công")
              else if(responseAPI===401) toast.warning("Vui lòng đăng nhập")
              //else if(responseAPI.status===400 && responseAPI!==null) toast.warning(responseAPI.message);
              else toast.error("Cập nhật cửa hàng thất bại")
      setLoading(false);
  }catch(error){
      console.log("Catch:",error);
      //setError(error.message);
      setLoading(false);
  }
}


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
        if(params.storeId){
            const responseAPI= await getStoreById(params.storeId);
            setStore(responseAPI);
            setPreview(responseAPI.imageURL);
            setJsonForm({...jsonForm,
              Id:params.storeId,
              Name:responseAPI.name,
              Description:responseAPI.description,
              PhoneNumber:responseAPI.phoneNumber,
              Latitude:responseAPI.latitude,
              Longitude: responseAPI.longitude,
              AddressNo:responseAPI.addressNo,
              Zone:responseAPI.zone,
              Ward:responseAPI.ward,
              //Street:responseAPI.street,
              ActivationDate: new Date().toISOString(),
              Email:responseAPI.email,
              ManagerName:responseAPI.managerName,
              DateOfBirth:new Date(responseAPI.dateOfBirth).toISOString().split('T')[0],
              ManagerPhone:responseAPI.phoneNumber,
              StationIds:responseAPI.stationIds
            })
            if(responseAPI.stationIds.length >0 && stationListInfo.length < responseAPI.stationIds.length){
              responseAPI.stationIds.forEach(async element => {
                let value=await getStationByStationId(element);
                setStationListInfo(prev=>[...prev, value]);
              });
            } 
        }else setStore(null);
       
            
    }
    fetchData();
    
},[params.storeId,districtId]);

    return (
      <>
      <ToastContainer/>
          <main className='p-3 max-w-6xl mx-auto'>
              <h1 className='text-3xl font-semibold text-center my-7 font-montserrat'>Cập Nhật Cửa Hàng</h1>
              <div>
                <div>
                  <h3 className="font-bold mb-2 font-montserrat">I. Cập nhật thông tin quản lý của cửa hàng:</h3>
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
                  <h3 className="font-bold mb-2 font-montserrat">II. Cập nhật thông tin cửa hàng:</h3>
                  <div>
                    <div className="flex flex-row gap-2 mb-6 w-full">
                  <div className="w-full">
                    <div className=" ml-10 flex flex-row items-center gap-5">
                      <div>
                        <div className="flex flex-row gap-3 items-center">
                        <div className="flex flex-row items-center w-full">
                                <label className="w-1/5 font-montserrat" htmlFor="ManagerName">Địa chỉ hiện tại</label>
                                <input
                                type="text"
                                id="ManagerName"
                                className="rounded-lg w-[50rem] h-12 px-4 ml-14"
                                value={`${store.addressNo}, ${store.street!=="null"?store.street +",":""} ${store.ward}, ${store.zone}`}
                                readOnly
                                />
                            </div>
                        </div>
                        <div className="flex flex-row mt-8">
                          <div htmlFor="description" className="font-montserrat">Các trạm hiện tại được đăng kí:</div>
                            <div className="grid grid-cols-2 gap-2">
                            {store.stationName && store.stationName.length >0&& store.stationName.map((item,index)=>(
                                    // <div key={index} className="ml-8 items-center">
                                    <div key={index} className="ml-3 items-center bg-white w-[20rem] h-12 rounded-lg">
                                        <p key={index} className="p-2 mb-2">{index+1} - {item} </p>
                                    </div>
                                ))}
                            </div>
                            
                         
                        </div>
                      </div>
                      
                      <HiPencil onClick={handleOpenChangeAddress} size={30} className="z-10 bg-blue-300 cursor-pointer rounded-full p-1 hover:bg-blue-400"/>        
                      
                    </div>
                    
                    <div>
                    </div>
                  </div>
                  
                </div>

                {
                  changeAddress===true && (
                    <div className="border-2 border-blue-300 rounded-lg p-3 mb-6">
                      <div className="flex justify-between mb-2">
                        <p className="font-bold"><span className="text-rose-500 underline text-xl">Lưu ý: </span> Nếu đóng form địa chỉ sẽ không được cập nhật</p>
                        <HiOutlineXCircle size={30} onClick={()=>handleCloseChangeAddress} className="z-10 bg-rose-300 cursor-pointer rounded-full p-1 hover:bg-rose-400"/>
                      </div>
                      <div className="flex flex-row gap-4 pb-4  items-center py-2 ">
                    <div className="flex flex-col gap-8 items-start pb-4 mx-auto">
                        <div className="flex flex-row gap-3 items-center">
                            <p className="">Chọn Quận</p>
                            <ComboboxComponent listItems={listDistrict} params="district_name" onValueChange={handleZoneChange}/>
                            <p>Chọn Phường</p>
                            <ComboboxComponent listItems={listWard} params="ward_name" onValueChange={handleWardChange}/>
                            {/* <p>Chọn Trạm</p>
                            <ComboboxComponent listItems={listStation} params="name" onValueChange={handleStationChange}/> */}
                        
                        </div>
                        <div className="flex flex-row gap-8">
                          <div className="flex flex-row gap-4 items-center">
                          <p>Chọn Trạm</p>
                          <ComboboxComponent listItems={listStation} params="name" onValueChange={handleStationChange}/>
                          </div>
                          <div>
                              {stationListInfo && stationListInfo.length >0 && stationListInfo.map((item,index)=>(
                                  //storeId="00000000-0000-0000-0000-000000000000"
                                          <div key={index} className="flex flex-row gap-4 items-center border-y-2 justify-between">
                                          <div className="flex flex-row gap-2">
                                          <p>{index+1} - </p>
                                          <div>
                                              <p>Tên trạm: {item.name}</p>
                                              <p>Địa chỉ: {item.address}</p>
                                          </div>
                                          </div>
                                          <HiOutlineTrash className="cursor-pointer" onClick={()=>handleRemoveStation(item.id)}/>
                                          </div>
                              ))}
                          </div>
                      </div>
                        {/* <p>{addressStation}</p> */}
                        <div className="flex flex-row gap-1 items-center w-full">
                            <label className="w-1/3" htmlFor="Address">Địa chỉ (Số nhà, tổ, đường, khu phố):</label>
                            <input
                            type="text"
                            id="AddressNo"
                            className="rounded-lg w-2/3 h-12"
                            onChange={handleChange}
                            value={jsonForm.AddressNo}
                            required
                            />
                            
                        </div>
                        
                    </div>  
                </div>
                    </div>
                  )
                }
                
                <div>
                    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
                        <div className='w-2/3 flex flex-col gap-6 flex-1 pt-16'>
                        <div className="flex flex-col gap-1">
                              <label htmlFor="Name" className="">Tên cửa hàng</label>
                              <input onChange={handleChange} value={jsonForm.Name} type='text' placeholder='Tên cửa hàng' className='border p-3 rounded-lg'id='Name' maxLength='62' minLength='1' required/>
                          </div>

                          <div className="flex flex-col gap-1">
                              <label htmlFor="Description" className="">Mô tả</label>
                              <textarea onChange={handleChange} value={jsonForm.Description} type='text' placeholder='Mô tả' className='border p-3 rounded-lg'id='Description' required/>
                          </div>
                          
                          <div className="flex flex-col gap-1">
                              <label htmlFor="PhoneNumber" className="">Số điện thoại</label>
                              <input onChange={handleChange} value={jsonForm.PhoneNumber} type='text' placeholder='Số điện thoại' className='border p-3 rounded-lg'id='PhoneNumber'  required/>
                          </div>
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
                        <div className='w-1/3 flex flex-col flex-1 gap-2 pt-24'>
                            <div className="flex justify-center flex-row gap-2 ">
                            <div className='flex gap-4'>
                                <label htmlFor="File" className="p-1 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
                                    Chọn ảnh
                                    <input onChange={handleInputImgChange} className="hidden" type="file" id="File" name="File" accept="image/*" multiple={false}/>
                                </label>
                                
                            </div>
                            
                                <span className='font-normal text-gray-600 ml-2'> Chỉ 1 ảnh</span>
                            
                            </div>
                            
                            {preview? (
                            <div className="flex justify-center p-3 border items-center rounded-full bg-blue-200 w-28 h-28 mx-auto">
                                            {console.log("File map: ",preview)}
                                            <img src={preview} alt="listing image" className="w-28 h-28 object-contain rounded-full items-center" />
                                        </div>
                            ):(<>
                                <div className="rounded-full bg-blue-300 w-28 h-28 mx-auto"></div>
                            </>)}
                            <button onClick={handleSubmit} disabled={loading} className="p-3 bg-cyan-600 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading===true?'Cập nhật ....':'Cập nhật'}</button>
                        </div>
                    </form>
                </div>
                  </div>
                </div>
              </div>
              
              
          </main>
      </>
    );
}
