import { useEffect, useState } from "react"
import { createStore,forwardGeocoding,getDistrictByProvinceId,getWardByDistrictId } from "../../api/store-api";
import ComboboxComponent from "../../components/store-components/ComboboxComponent";
import {ToastContainer, toast } from "react-toastify";
import { getStations } from "../../api/station-api";


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

    const [jsonForm,setJsonForm]=useState({
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
        ActivationDate: new Date().toISOString(),
        StationIds:[]
    })
    //console.log("Json form: ",jsonForm);
    const [file,setFile]=useState([]);
    //console.log("File ava", file);

    const handleStationChange=async (value)=>{
        await setJsonForm({...jsonForm,StationIds:value.id});
        
    }
    // const handleCityChange=async (value)=>{
    //     //await setJsonForm({...jsonForm,Zone:value.province_name});
    //     await setProvinceId(value.province_id)
        
    // }
    const handleZoneChange=async (value)=>{
        await setJsonForm({...jsonForm,Zone:value.district_name});
        await setDistrictId(value.district_id)
        
    }
    const handleWardChange=async (value)=>{
        await setJsonForm({...jsonForm,Ward:value.ward_name});
        
    }

    const [error, setError]=useState(false);
    const [loading,setLoading]=useState(false);
    
        
    const handleChange=(e)=>{
        if(e.target.type==='time' || e.target.type ==='text' || e.target.type==='textarea'|| e.target.type==='number'){
            setJsonForm({...jsonForm,[e.target.id]:e.target.value,});
        }
    }

    const handleSubmit =async (e)=>{
        e.preventDefault();
        try{
            if(file.length<1) return setError('You must upload at least one image');
            setLoading(true);
            setError(false);
            if(jsonForm.AddressNo!==null && jsonForm.Ward!==null && jsonForm.Zone!==null){
                let addressStore= `${jsonForm.AddressNo}, ${jsonForm.Ward}, ${jsonForm.Zone}, TPHCM`
                const geocoording= await forwardGeocoding(addressStore)
                await setJsonForm({...jsonForm,Latitude:geocoording.lat})
                await setJsonForm({...jsonForm,Longitude:geocoording.lng});
            }
            
            const responseAPI= await createStore(jsonForm,file);
            console.log("call api create store", responseAPI);
            if(responseAPI===null) toast("Tạo thất bại")
            else toast("Tạo thành công")
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
            <h1 className='text-3xl font-semibold text-center my-7'>Create Store</h1>
            <div className="flex flex-row gap-4 pb-8  items-center py-2 ">
                <div className="flex flex-col gap-8 items-start pb-4">
                    <div className="flex flex-row gap-3 items-center">
                        {/* <div className="flex flex-row gap-3 items-center"> */}
                        {/*<p>Chọn Thành Phố</p>
                        <ComboboxComponent listItems={listProvinces} params="province_name" onValueChange={handleCityChange}/>*/}
                        <p className="">Chọn Quận</p>
                        <ComboboxComponent listItems={listDistrict} params="district_name" onValueChange={handleZoneChange}/>
                        {/* </div> */}
                        {/* <div className="flex flex-row gap-3 items-center"> */}
                        <p>Chọn Phường</p>
                        <ComboboxComponent listItems={listWard} params="ward_name" onValueChange={handleWardChange}/>
                        <p>Chọn Trạm</p>
                        <ComboboxComponent listItems={listStation} params="name" onValueChange={handleStationChange}/>
                        {/* </div> */}
                        
                       
                    </div>
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
                            {/* <input onChange={handleInputImgChange} className='hidden' type='file' id='images' accept='image/*'/>
                            <button className='p-1 text-green-700 border border-green-700 rounded uppercase hover: shadow-lg disabled:opacity-80'>Select Image</button> */}
                            <label htmlFor="images" className="p-1 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
                                Select Image
                                <input onChange={handleInputImgChange} className="hidden" type="file" id="images" name="File" accept="image/*" multiple={false}/>
                            </label>
                            
                        </div>
                        
                            <span className='font-normal text-gray-600 ml-2'> Only 1 image</span>
                        
                        </div>
                        
                        {/* <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p> */}
                        {preview? (
                        <div className="flex justify-center p-3 border items-center rounded-full bg-purple-300 w-28 h-28 mx-auto">
                                        {console.log("File map: ",preview)}
                                        <img src={preview} alt="listing image" className="w-28 h-28 object-contain rounded-full items-center" />
                                        {/* <button type="button" className="p-3 text-red-700 rounded-lg uppercase hover: opacity-65">Delete</button> */}
                                    </div>
                        ):(<>
                            <div className="rounded-full bg-purple-300 w-28 h-28 mx-auto"></div>
                        </>)}
                        <button onClick={handleSubmit} disabled={loading} className="p-3 bg-cyan-600 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading?'Creating ....':'Create Store'}</button>
                        {error&& <p className="text-red-700 text-sm">{error}</p>}
                    </div>
                </form>
            </div>
            
        </main>
    {/* <div className="p-4" >
        <DisplayData className/>
    </div> */}
    </>
    
  )
}
