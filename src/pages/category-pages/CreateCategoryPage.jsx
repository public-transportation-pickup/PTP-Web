import { useState } from "react";
import DragDropImage from "../../components/category-components/DragDropImage";
import { CreateCategory } from "../../api/category-api";
import { ToastContainer, toast } from "react-toastify";


export default function CreateCategoryPage() {
  const [createModal, setCreateModal]=useState({
    Name:'',
    Description:'',
    Status:'ACTIVE',
    Image:[]
  })
  console.log("Create category modal", createModal);

  const setImageDrag=async (value)=>{
    setCreateModal({...createModal,Image:value})
  }

  const handleChange=async (e)=>{
    setCreateModal({...createModal,[e.target.id]:e.target.value,})
  }

  const handleSubmit=async ()=>{
    try {
      const responseAPI= await CreateCategory(createModal);
      console.log("ResponseAPI create category page", responseAPI);
      if (responseAPI===201){
        await toast.success("Tạo thành công");
      } 
      else toast.error("Tạo thất bại")
    } catch (error) {
      console.error("Create category page error", error);
    }
  }

  return (
    <div className="pt-10 h-full">
      <ToastContainer/>
      <h2 className="text-xl text-center mb-8 font-bold">Tạo mới danh mục sản phẩm</h2>
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
          <DragDropImage setFileDrag={setImageDrag}/>
        </div>

      <button onClick={handleSubmit} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tạo</button>
    </form>
    </div>
  )
}
