import { useState } from "react"
//import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import {BASE_URL} from '../lib/contants/index.js';

export default function CreateStore() {
    //const {currentUser} =useSelector(state=>state.user);
    const navigate=useNavigate();
    const [files, setFiles]=useState([]);
    const [preview,setPreview]=useState();
    const [formData,setFormData]=useState({
        Name:'',
        Description:'',
        PhoneNumber:'',
        OpenTime:'',
        ClosedTime:'',
        Address:'',
        ActivationDate:new Date(),
    });
    
    console.log("file",files);
    // const [imageUploadError,setImageUploadError]=useState(false);
    // const [uploading,setUploading]=useState(false);
    const [error, setError]=useState(false);
    const [loading,setLoading]=useState(false);
    console.log("FormData",formData);
    //console.log("Error create store",error);
    // const handleImageSubmit =  ()=>{
    //     if(files.length >0 && files.length +formData.imageUrls.length < 2){
    //         setUploading(true);
    //         setImageUploadError(false);
    //         const promises=[];
    //         for(let i=0; i<files.length;i++){
    //             promises.push(storeImage(files[i]));
    //         }
    //         Promise.all(promises).then((urls)=>{
    //             setFormData({...formData,files:formData.imageUrls.concat(urls)});
    //             setImageUploadError(false);
    //             setUploading(false);
    //         }).catch(()=>{
    //             setImageUploadError('Image upload failed');
    //             setUploading(false);
    //         });
    //     }else{
    //         setImageUploadError('You can only upload 1 image per listing');
    //         setUploading(false);
    //     }
    // }

    // const storeImage=async(file)=>{
    //     return new Promise((resolve, reject)=>{
    //         const storage=getStorage(app);
    //         const fileName= new Date().getTime()+ file.name;
    //         const storageRef= ref(storage,fileName);
    //         const uploadTask=uploadBytesResumable(storageRef,file);
    //         uploadTask.on(
    //             "state_changed",
    //             (snapshot)=>{
    //                 const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
    //                 console.log(`Upload is ${progress}% done`);
    //             },
    //             (error)=>{
    //                 reject(error);
    //             },
    //             ()=>{
    //                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
    //                     resolve(downloadURL);
    //                 });
    //             }
    //         );
    //     })
    // }

        
    const handleChange=(e)=>{
        // if(e.target.id ==='sale' ||e.target.id==='rent'){
        //     setFormData({...formData,type:e.target.id,});
        // }

        // if(e.target.id ==='parking' || e.target.id ==='furnished' || e.target.id==='offer'){
        //     setFormData({...formData,[e.target.id]:e.target.checked,});
        // }

        if(e.target.type==='time' || e.target.type ==='text' || e.target.type==='textarea'){
            setFormData({...formData,[e.target.id]:e.target.value,});
        }
    }

    const handleSubmit =async (e)=>{
        e.preventDefault();
        try{
            if(files.length<1) return setError('You must upload at least one image');
            //if(+formData.regularPrice < +formData.discountPrice) return setError('Discount price must be lower than regular price');
            setLoading(false);
            setError(false);
            const res= await fetch(`${BASE_URL}stores`,{
                method:'POST',
                mode:'no-cors',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    ...formData,
                    //userRef:currentUser._id,
                }),
            });
            const data=await res.json();
            setLoading(false);
            if(data.success===false){
                setError(data.message);
            }
            navigate(`/store/${data._id}`);
        }catch(error){
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
    

return (
    <main className='p-3 max-w-4xl mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>Create Store</h1>
    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
            <input onChange={handleChange} value={formData.Name} type='text' placeholder='Name' className='border p-3 rounded-lg'id='Name' maxLength='62' minLength='1' required/>
            <textarea onChange={handleChange} value={formData.Description} type='text' placeholder='Description' className='border p-3 rounded-lg'id='Description' required/>
            <input onChange={handleChange} value={formData.Address} type='text' placeholder='Address' className='border p-3 rounded-lg'id='Address'  required/>
            <input onChange={handleChange} value={formData.PhoneNumber} type='text' placeholder='PhoneNumber' className='border p-3 rounded-lg'id='PhoneNumber'  required/>
            <div className='flex gap-5 flex-row'>
                <div className='flex gap-2'>
                    <span>Open Time</span>
                    <input onChange={handleChange} checked={formData.OpenTime} type='time' id='OpenTime' className='w-3/4'/>
                    
                </div>
                <div className='flex gap-2'>
                <span>Closed Time</span>
                    <input onChange={handleChange} checked={formData.ClosedTime} type='time' id='ClosedTime' className='w-3/4'/>
                    
                </div>
        </div>
        </div>
        <div className='flex flex-col flex-1 gap-2'>
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
            {/* Test */}
            {/* <img src={srcTest} alt="listing image" className="w-20 h-20 object-contain rounded-lg"/> */}
            {/* endTest */}
            <button disabled={loading} className="p-3 bg-cyan-600 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading?'Creating ....':'Create Store'}</button>
            {error&& <p className="text-red-700 text-sm">{error}</p>}
        </div>
    </form>
</main>
  )
}

