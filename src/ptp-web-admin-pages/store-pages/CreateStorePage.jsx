import { useEffect, useState } from "react"
//import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom'
//import DisplayData from "../../ptp-web-admin-components/store-components/DisplayData";
import { getAllProvince,getDistrictByProvinceId,getWardByDistrictId } from "../../ptp-web-admin-api/store-api";
import ComboboxComponent from "../../ptp-web-admin-components/store-components/ComboboxComponent";


export default function CreateStorePage() {
    //const {currentUser} =useSelector(state=>state.user);
    const navigate=useNavigate();
    const [listProvinces,setListProvince]=useState([]);
    const [listDistrict,setListDistrict]=useState([]);
    const [listWard,setListWard]=useState([]);
    // console.log("List province",listProvinces);
    // console.log("List district",listDistrict);
    // console.log("List ward",listWard);
    const [files, setFiles]=useState([]);
    const [preview,setPreview]=useState();
    const [provinceId,setProvinceId]=useState('');
    const [districtId,setDistrictId]=useState('');
    console.log("ProvinceID", provinceId);
    console.log("DistrictId",districtId);


    const [formData,setFormData]=useState({
        Name:'',
        Description:'',
        PhoneNumber:'',
        OpenedTime:'',
        ClosedTime:'',
        Address:'',
        Route:'',
        RouteVar:'',
        Station:'',
        City:'',
        Zone:'',
        Ward:'',
        ActivationDate:new Date(),
    });

    const handleRouteChange=async (value)=>{
        await setFormData({...formData,Route:value.district_name});
        
    }
    const handleRouteVarChange=async (value)=>{
        await setFormData({...formData,RouteVar:value.district_name});
        
    }
    const handleStationChange=async (value)=>{
        await setFormData({...formData,Station:value.district_name});
        
    }
    const handleCityChange=async (value)=>{
        await setFormData({...formData,City:value.province_name});
        await setProvinceId(value.province_id)
        
    }
    const handleZoneChange=async (value)=>{
        await setFormData({...formData,Zone:value.district_name});
        await setDistrictId(value.district_id)
        
    }
    const handleWardChange=async (value)=>{
        await setFormData({...formData,Ward:value.ward_name});
        
    }

    let formdata1= new FormData();
    formdata1.append('Name',formData.Name);
    formdata1.append('Description',formData.Description);
    formdata1.append('PhoneNumber',formData.PhoneNumber);
    formdata1.append('OpenedTime',formData.OpenedTime.toString());
    formdata1.append('ClosedTime',formData.ClosedTime.toString());
    formdata1.append('Address',formData.Address);
    formdata1.append('ActivationDate',formData.ActivationDate.toISOString());
    formdata1.append('File',files);
    
    console.log("file",files);
    const [error, setError]=useState(false);
    const [loading,setLoading]=useState(false);
    console.log("FormData",formData);
    console.log("FormData1",formdata1);
    for (let entry of formdata1.entries()) {
        console.log(entry[0] + ':', entry[1]);
      }
    
    
        
    const handleChange=(e)=>{
        if(e.target.type==='time' || e.target.type ==='text' || e.target.type==='textarea'){
            setFormData({...formData,[e.target.id]:e.target.value,});
        }
    }

    const handleSubmit =async (e)=>{
        e.preventDefault();
        try{
            //if(files.length<1) return setError('You must upload at least one image');
            //if(+formData.regularPrice < +formData.discountPrice) return setError('Discount price must be lower than regular price');
            setLoading(false);
            setError(false);
            console.log("formdata1:",formdata1);
            const res= await fetch(`/api/stores`,{                
                method:'POST',
                body:formdata1
            });
            const data=await res.json();
            console.log("Response",data);
            setLoading(false);
            if(data.success===false){
                setError(data.message);
            }
            navigate(`/store/${data._id}`);
        }catch(error){
            console.log("Catch:",error);
            setError(error.message);
            setLoading(false);
        }
    }

    const handleInputImgChange = (e) => {
        const { name, value } = e.target;
        setFiles(e.target.files)
        setPreview(URL.createObjectURL(e.target.files[0]))
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        };

    useEffect(()=>{
        async function fetchData() {
            const responseProvince =await getAllProvince();
            await setListProvince(responseProvince);
            if(provinceId){
                const responseDistrict=await getDistrictByProvinceId(provinceId);
                await setListDistrict(responseDistrict);
            }else{
                setListDistrict([])
            }

            if(districtId){
                const responseWard=await getWardByDistrictId(districtId);
                await setListWard(responseWard);
            }else{
                setListWard([]);
            }
               
                
        }
        fetchData();
        
    },[provinceId,districtId]);
    

return (
    <>
        <main className='p-3 max-w-6xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Create Store</h1>
            <div className="flex flex-row gap-4 pb-8  items-center py-2 ">
                <div className="flex flex-col gap-8 items-start pb-4">
                    <div className="flex flex-row gap-4 justify-center items-center">
                        <p>Chọn Tuyến</p>
                        <ComboboxComponent listItems={listDistrict !==null || listDistrict !==undefined?listDistrict:null} params="district_name" onValueChange={handleRouteChange}/>
                        <p>Chọn Lượt</p>
                        <ComboboxComponent listItems={listDistrict} params="district_name" onValueChange={handleRouteVarChange}/>
                        <p>Chọn Trạm</p>
                        <ComboboxComponent listItems={listDistrict} params="district_name" onValueChange={handleStationChange}/>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        {/* Kiểm soát cho chọn từng thành phần, chọn thành phố xong mới cho chọn quận-> phường */}
                        <p>Chọn Thành Phố</p>
                        <ComboboxComponent listItems={listProvinces} params="province_name" onValueChange={handleCityChange}/>
                        <p>Chọn Quận</p>
                        <ComboboxComponent listItems={listDistrict} params="district_name" onValueChange={handleZoneChange}/>
                        <p>Chọn Phường</p>
                        <ComboboxComponent listItems={listWard} params="ward_name" onValueChange={handleWardChange}/>
                    </div>
                    <div className="flex flex-row gap-1 items-center w-full">
                        <label className="w-1/3" htmlFor="Address">Địa chỉ (Số nhà, tổ, đường, khu phố):</label>
                        <input
                        type="text"
                        id="Address"
                        className="rounded-lg w-2/3 h-12"
                        />
                        
                    </div>
                </div>
            </div>
            <div>
                <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
                    <div className='w-3/4 flex flex-col gap-4 flex-1'>
                        <input onChange={handleChange} value={formData.Name} type='text' placeholder='Name' className='border p-3 rounded-lg'id='Name' maxLength='62' minLength='1' required/>
                        <textarea onChange={handleChange} value={formData.Description} type='text' placeholder='Description' className='border p-3 rounded-lg'id='Description' required/>
                        {/* <input onChange={handleChange} value={formData.Address} type='text' placeholder='Address' className='border p-3 rounded-lg'id='Address'  required/> */}
                        <input onChange={handleChange} value={formData.PhoneNumber} type='text' placeholder='PhoneNumber' className='border p-3 rounded-lg'id='PhoneNumber'  required/>
                        <div className='flex gap-5 flex-row'>
                            <div className='flex gap-2'>
                                <span>Open Time</span>
                                <input onChange={handleChange} checked={formData.OpenedTime} type='time' id='OpenedTime' className='w-3/4'/>
                                
                            </div>
                            <div className='flex gap-2'>
                            <span>Closed Time</span>
                                <input onChange={handleChange} checked={formData.ClosedTime} type='time' id='ClosedTime' className='w-3/4'/>
                                
                            </div>
                    </div>
                    </div>
                    <div className='w-3/12 flex flex-col flex-1 gap-2'>
                        <div className="flex justify-center flex-row gap-2 ">
                        <div className='flex gap-4'>
                            {/* <input onChange={handleInputImgChange} className='hidden' type='file' id='images' accept='image/*'/>
                            <button className='p-1 text-green-700 border border-green-700 rounded uppercase hover: shadow-lg disabled:opacity-80'>Select Image</button> */}
                            <label htmlFor="images" className="p-1 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
                                Select Image
                                <input onChange={handleInputImgChange} className="hidden" type="file" id="images" name="File" accept="image/*" />
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
                        ):(<></>)}
                        <button disabled={loading} className="p-3 bg-cyan-600 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading?'Creating ....':'Create Store'}</button>
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

//tphcm province_id 79