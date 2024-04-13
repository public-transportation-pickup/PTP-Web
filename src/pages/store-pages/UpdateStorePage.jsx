import { useEffect, useState } from "react"
import {ToastContainer, toast } from "react-toastify";
import { updateStore,forwardGeocoding,getDistrictByProvinceId,getWardByDistrictId, getStoreById } from "../../api/store-api";
import ComboboxComponent from "../../components/store-components/ComboboxComponent";
import { getStations } from "../../api/station-api";
import {useParams} from 'react-router-dom'
import {HiPencil,HiOutlineXCircle } from "react-icons/hi";

export default function UpdateStorePage() {
  const params=useParams();

  const [listDistrict,setListDistrict]=useState([]);
  const [listWard,setListWard]=useState([]);
  const [listStation,setListStation]=useState([]);

  const [districtId,setDistrictId]=useState('');

  const [preview,setPreview]=useState();
  console.log("Preview",preview)

  const [error, setError]=useState(false);
  const [loading,setLoading]=useState(false);
  const [changeAddress,setChangeAddress]=useState(false);

  const [addressStation,setAddressStation]=useState('');

  const [store,setStore]=useState({});

  const handleInputImgChange = (e) => {
    const { name, value } = e.target;
    setPreview(URL.createObjectURL(e.target.files[0]))
    setJsonForm((prevFormData) => ({
        ...prevFormData,
        File: value,
    }));
    };


  const [jsonForm,setJsonForm]=useState({
    Id:'',
    Name:"",
    Description:"",
    PhoneNumber:"",
    OpenedTime:"06:00",
    ClosedTime:"22:00",
    Latitude:0,
    Longitude: 0,
    Zone:"",
    Ward:"",
    AddressNo:"",
    Street:"null",
    File:[],
    ActivationDate: new Date().toISOString(),
    StationIds:[]
})

console.log("Jsonform",jsonForm)

  const handleStationChange=async (value)=>{
    await setJsonForm({...jsonForm,StationIds:value.id});
    setAddressStation(JSON.stringify(value.address))
    
}

const handleZoneChange=async (value)=>{
    await setJsonForm({...jsonForm,Zone:value.district_name});
    await setDistrictId(value.district_id)
    
}
const handleWardChange=async (value)=>{
    await setJsonForm({...jsonForm,Ward:value.ward_name});
    
}

const handleChange=(e)=>{
  //if(e.target.type==='time' || e.target.type ==='text' || e.target.type==='textarea'|| e.target.type==='number'){
      setJsonForm({...jsonForm,[e.target.id]:e.target.value,});
 // }
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
      
      setError(false);
      if(jsonForm.AddressNo!==null && jsonForm.Ward!==null && jsonForm.Zone!==null && jsonForm.AddressNo!=store.addressNo && jsonForm.Ward!=store.ward && jsonForm.Zone!=store.zone){
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
          
      }
      const responseAPI= await updateStore(jsonForm);
              console.log("call api update store", responseAPI);
              if(responseAPI===204) toast("Cập nhật thành công")
              else toast("Cập nhật thất bại")
      
      
      setLoading(false);
  }catch(error){
      console.log("Catch:",error);
      setError(error.message);
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
              Zone:responseAPI.zone,
              Ward:responseAPI.ward,
              AddressNo:responseAPI.addressNo,
              Street:responseAPI.street,
              ActivationDate: new Date().toISOString(),
              StationIds:responseAPI.stationIds
            })
        }else setStore(null);
       
            
    }
    fetchData();
    
},[districtId,loading]);

    return (
      <>
      <ToastContainer/>
          <main className='p-3 max-w-6xl mx-auto'>
              <h1 className='text-3xl font-semibold text-center my-7'>Cập nhật cửa hàng</h1>
              <div className="flex flex-row gap-2 mb-6 w-full">
                <div className="flex flex-row gap-3 items-center w-full">
                          <label className="" htmlFor="Address">Địa chỉ hiện tại</label>
                          <input
                          type="text"
                          className="rounded-lg w-3/5 h-12"
                          value={`${store.addressNo}, ${store.street!==null?store.street:""}, ${store.ward}, ${store.zone}`}
                          readOnly
                          />
                <HiPencil onClick={handleOpenChangeAddress} size={30} className="z-10 bg-blue-300 cursor-pointer rounded-full p-1 hover:bg-blue-400"/>
                          
                </div>
              </div>

              {
                changeAddress===true && (
                  <div className="border-2 border-blue-300 rounded-lg p-3 mb-8">
                    <div className="flex justify-between mb-2">
                      <p className="font-bold"><span className="text-rose-500 underline text-xl">Lưu ý: </span> Nếu đóng form địa chỉ sẽ không được cập nhật</p>
                      <HiOutlineXCircle size={30} onClick={handleCloseChangeAddress} className="z-10 bg-rose-300 cursor-pointer rounded-full p-1 hover:bg-rose-400"/>
                    </div>
                    <div className="flex flex-row gap-4 pb-4  items-center py-2 ">
                  <div className="flex flex-col gap-8 items-start pb-4">
                      <div className="flex flex-row gap-3 items-center">
                          <p className="">Chọn Quận</p>
                          <ComboboxComponent listItems={listDistrict} params="district_name" onValueChange={handleZoneChange}/>
                          <p>Chọn Phường</p>
                          <ComboboxComponent listItems={listWard} params="ward_name" onValueChange={handleWardChange}/>
                          <p>Chọn Trạm</p>
                          <ComboboxComponent listItems={listStation} params="name" onValueChange={handleStationChange}/>
                       
                      </div>
                      <p>{addressStation}</p>
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
                      <div className='w-3/4 flex flex-col gap-4 flex-1'>
                          <input onChange={handleChange} value={jsonForm.Name} type='text' placeholder='Name' className='border p-3 rounded-lg'id='Name' maxLength='62' minLength='1' required/>
                          <textarea onChange={handleChange} value={jsonForm.Description} type='text' placeholder='Description' className='border p-3 rounded-lg'id='Description' required/>
                          {/* <input onChange={handleChange} value={formData.Address} type='text' placeholder='Address' className='border p-3 rounded-lg'id='Address'  required/> */}
                          <input onChange={handleChange} value={jsonForm.PhoneNumber} type='text' placeholder='PhoneNumber' className='border p-3 rounded-lg'id='PhoneNumber'  required/>
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
                      <div className='w-3/12 flex flex-col flex-1 gap-2'>
                          <div className="flex justify-center flex-row gap-2 ">
                          <div className='flex gap-4'>
                              <label htmlFor="File" className="p-1 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
                                  Select Image
                                  <input onChange={handleInputImgChange} className="hidden" type="file" id="File" name="File" accept="image/*" multiple={false}/>
                              </label>
                              
                          </div>
                          
                              <span className='font-normal text-gray-600 ml-2'> Only 1 image</span>
                          
                          </div>
                          
                          {preview? (
                          <div className="flex justify-center p-3 border items-center rounded-full bg-purple-300 w-28 h-28 mx-auto">
                                          {console.log("File map: ",preview)}
                                          <img src={preview} alt="listing image" className="w-28 h-28 object-contain rounded-full items-center" />
                                      </div>
                          ):(<>
                              <div className="rounded-full bg-purple-300 w-28 h-28 mx-auto"></div>
                          </>)}
                          <button onClick={handleSubmit} disabled={loading} className="p-3 bg-cyan-600 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading===true?'Cập nhật ....':'Cập nhật'}</button>
                          {error&& <p className="text-red-700 text-sm">{error}</p>}
                      </div>
                  </form>
              </div>
              
          </main>
      </>
    );
}
