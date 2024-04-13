import { HiOutlinePlusSm,HiOutlineXCircle } from "react-icons/hi";
import CategoryItem from "../../components/category-components/CategoryItem";
import { useEffect, useState } from "react";

import CreateCategoryPage from "./CreateCategoryPage";



export default function CategoryMainPage() {
  const [modalCreate,setModalCreate]=useState(false);


    const handleCreateButtonClick=()=>{
        setModalCreate(true);
    }

    const handleCloseModal=()=>{
        setModalCreate(false);
        
    }
    
    useEffect(()=>{

    },[modalCreate])
    
    
  return (
    <>
        <h1 className="text-center mx-auto text-4xl">Danh sách danh mục</h1>
        <div className="flex justify-between gap-1">
            <div className="w-2/3 mt-14">
                    <CategoryItem/>
                <div>
                    {/* <PaginationButton/> */}
                </div>
            </div>
            <div className="w-1/3 mt-10">
                {modalCreate===false&& (
                    <button className="rounded-lg bg-orange-400 pl-3 pr-4 pt-2 pb-2 flex flex-row ml-auto items-center hover:bg-orange-100" onClick={handleCreateButtonClick}><HiOutlinePlusSm />Tạo mới danh mục</button>
                )}
                {modalCreate===true && (
                <div className=" bg-gradient-to-r from-cyan-100 to-blue-100 p-4">
                    <HiOutlineXCircle className="ml-auto hover:cursor-pointer"size={40} onClick={handleCloseModal}/>
                    <CreateCategoryPage/>
                </div>
                )}
                {/* {editFlag===true && modalCreate===false && (
                <div className=" bg-gradient-to-r from-cyan-100 to-blue-100 p-4">
                    <HiOutlineXCircle className="ml-auto hover:cursor-pointer"size={40} onClick={handleCloseModal("EDIT_CLOSE")}/>
                    <UpdateCategoryPage/>
                </div>
                )} */}
            </div>
            
        </div>
        
    </>
    
  )
}
