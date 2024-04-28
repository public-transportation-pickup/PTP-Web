import {ToastContainer,toast} from 'react-toastify'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { UpdateCategory, getCategory } from '../../api/category-api';


export default function UpdateCategoryPage() {
  const params =useParams();
  const [categoryUpdate,setCategoryUpdate]=useState({
    Id:'',
    Name:'',
    Description:'',
    Status:'',
    Image:[]
  })
  const[loading,setLoading]=useState(false);
console.log("Update category model", categoryUpdate);
  const [preview,setPreview]=useState(null)
  const handleChange=(e)=>{
    setCategoryUpdate({...categoryUpdate,[e.target.id]:e.target.value})
  }
  const handleInputImgChange = (e) => {
    const {value } = e.target;
    //setFile(e.target.files)
    setPreview(URL.createObjectURL(e.target.files[0]))
    setCategoryUpdate((prev) => ({
        ...prev,
        Image: value,
    }));
    };

    const handleSubmit=async()=>{
      try {
        const isFormValid = Object.values(categoryUpdate).every(value => value !== null && value !== '' && value.length>0);
        if(isFormValid===false) toast.warning("Thông tin form chưa đủ")
        const responseAPI= await UpdateCategory(params.categoryId, categoryUpdate);
        console.log("Handle submit response API update category pagae",responseAPI);
        if(responseAPI==204) toast.success("Cập nhật danh mục thành công")
        else toast.error("Cập nhật danh mục thất bại");
      } catch (error) {
        console.log("Handle submit",error);
      }
    }

    useEffect(()=>{
      const fetchData=async ()=>{
        try {
          setLoading(true);
          const responseAPI=await getCategory(params.categoryId);
          console.log("get cate reponsseAPI", responseAPI)
          setCategoryUpdate({
            Id:params.categoryId,
            Name:responseAPI.name,
            Description:responseAPI.description,
            Status:responseAPI.status
          })
          setPreview(responseAPI.imageURL);
          setLoading(false);
        } catch (error) {
          console.error("fetch data update cate page",error);
        }
      }
      fetchData();
    },[params.categoryId])
  return (
    <div><div className="pt-10 h-full">
    <ToastContainer/>
    <h2 className="text-xl text-center mb-8 font-bold">Cập nhật danh mục sản phẩm</h2>

  <form className="max-w-sm mx-auto">
    <div className='flex flex-col justify-center gap-5'>
    <div className="flex justify-center p-3 border items-center rounded-full bg-purple-300 w-28 h-28 mx-auto">
                                        {console.log("File map: ",preview)}
                                        <img src={preview===null?categoryUpdate.imageURL:preview} alt="listing image" className="w-28 h-28 object-contain rounded-full items-center" />
                                        {/* <button type="button" className="p-3 text-red-700 rounded-lg uppercase hover: opacity-65">Delete</button> */}
                                  
                                  </div>
        <div className="mb-5 mx-auto">
        <label htmlFor="Image" className="p-1 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
                                Chọn hình ảnh
          <input onChange={handleInputImgChange} className="hidden" type="file" id="Image" name="Image" accept="image/*" multiple={false}/>
        </label>
      </div>
    </div>
    

    <div className="mb-5">
      <label htmlFor="Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên danh mục</label>
      <input onChange={(e)=>handleChange(e)} type="text" id="Name" name='Name' value={categoryUpdate.Name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
    </div>
    <div className="mb-5">
      <label htmlFor="Description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả</label>
      <textarea onChange={(e)=>handleChange(e)} id="Description" name='Description'  value={categoryUpdate.Description} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
    </div>
    {/* <div className="mb-5">
      <label htmlFor="Status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trạng thái</label>
      <input onChange={(e)=>handleChange(e)} id="Status" name='Status' value={categoryUpdate.Status} className="uppercase bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
    </div> */}
      

    <button onClick={handleSubmit} type="button" className="text-white bg-cyan-600 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">{loading===true?"Cập nhật ...":"Cập nhật"}</button>
  </form>
  </div></div>
  )
}

UpdateCategoryPage.propTypes={
  categoryUpdateObject:PropTypes.object
}
