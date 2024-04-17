import { useEffect, useState } from "react";
//import DragDropImage from "../../components/category-components/DragDropImage";
import { CreateCategory, getCategories } from "../../api/category-api";
import { ToastContainer, toast } from "react-toastify";
import { HiCloudUpload } from "react-icons/hi";
import PropTypes from 'prop-types'

export default function CreateCategoryPage({checkReload}) {
  const [createModal, setCreateModal]=useState({
    Name:'',
    Description:'',
    Status:'ACTIVE',
    Image:[]
  })

  const [listCategory,setListCategory]=useState([]);
  const [preview,setPreview]=useState('')
  console.log("Create category modal", createModal);

  const fetchData= 
  async ()=>{
    //setLoading(true);
      const responseAPI= await getCategories();
      setListCategory(responseAPI);
      console.log("ResponseAPI:",responseAPI);
      //setLoading(false);
  }

  // const setImageDrag=async (value)=>{
  //   setCreateModal({...createModal,Image:value})
  // }

  const handleInputImgChange = (e) => {
    const { name} = e.target;
    //setFile(e.target.files)
    setPreview(URL.createObjectURL(e.target.files[0]))
    setCreateModal((prevFormData) => ({
        ...prevFormData,
        [name]: e.target.files,
    }));
    };

  const handleChange=async (e)=>{
    setCreateModal({...createModal,[e.target.id]:e.target.value,})
  }

  const handleSubmit=async ()=>{
    try {
      checkReload(true);
      const responseAPI= await CreateCategory(createModal);
      console.log("ResponseAPI create category page", responseAPI);
      if (responseAPI===201){
        await toast.success("Tạo thành công");
        fetchData();
        checkReload(false);
      } 
      else toast.error("Tạo thất bại")
    } catch (error) {
      console.error("Create category page error", error);
    }
  }



  useEffect(()=>{

  },[listCategory])

  return (
    <div className="pt-2 h-full border-dashed">
      <ToastContainer/>
      <h2 className="text-xl text-center mb-6 font-bold">Tạo mới danh mục sản phẩm</h2>
    <form className="max-w-sm mx-auto">
      <div className="mb-5">
        <label htmlFor="Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên danh mục</label>
        <input onChange={handleChange} type="text" id="Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      <div className="mb-5">
        <label htmlFor="Description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả</label>
        <textarea onChange={handleChange} id="Description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
        <div className="mb-5">
        {preview? (
                        <div className="flex justify-center p-1 border items-center rounded-full bg-blue-200 w-36 h-36 mx-auto">
                                        {console.log("File map: ",preview)}
                                        <img src={preview} alt="listing image" className="w-28 h-28 object-contain rounded-full items-center" />
                                        {/* <button type="button" className="p-3 text-red-700 rounded-lg uppercase hover: opacity-65">Delete</button> */}
                                    </div>
                        ):(<>
                            <div className=""></div>
                        </>)}
          <label htmlFor="Image" className="mt-2 border-2 border-dashed border-blue-500 p-2 flex flex-row gap-2 items-center cursor-pointer hover:bg-blue-200">
            <HiCloudUpload />
            <input onChange={handleInputImgChange} className="hidden" type="file" id="Image" name="Image" accept="image/*" multiple={false}/>
            <div className="flex flex-row">
            <p className="text-xs">Chọn hình ảnh cho danh mục</p>
            <p className="text-xs ml-16">JPG, PNG, GIF,JFIF</p>
            </div>
            
          </label>
          {/* <DragDropImage setFileDrag={setImageDrag}/> */}
        </div>

      <button onClick={handleSubmit} type="button" className="ml-40 text-base text-white bg-cyan-600 hover:bg-cyan-400 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">Tạo</button>
    </form>
    </div>
  )
}

CreateCategoryPage.propTypes={
  checkReload:PropTypes.func
}