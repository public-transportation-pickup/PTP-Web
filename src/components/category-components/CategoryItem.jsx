import { useCallback, useEffect, useState } from 'react';
import imgDefault from '../../assets/store-default-img.png'
import {useNavigate} from 'react-router-dom'
import {DeleteCategory, getCategories, getCategory} from '../../api/category-api.js'
import classNames from 'classnames';
import { HiOutlineTrash,HiPencil } from "react-icons/hi";
import { toast } from "react-toastify";
import CategoryDetailModal from './CategoryDetailModal.jsx';
import Modal from '../shared/Modal.jsx';
import PropTypes from 'prop-types'

export default function CategoryItem({checkReload}) {
const [loading,setLoading]=useState(false);
const [listCategory,setListCategory]=useState([]);
const [detailModal,setDetailModal]=useState(null);
const navigate=useNavigate();
console.log("detailModal", detailModal)
const [detailCategory, setdetailCategory]=useState(null);
    console.log("List category", listCategory);

    const fetchData= useCallback(
        async ()=>{
          setLoading(true);
            const responseAPI= await getCategories();
            setListCategory(responseAPI);
            console.log("ResponseAPI:",responseAPI);
            setLoading(false);
        },[listCategory]
    ) 

    const handleDetailModal=async (value)=>{
      const responseAPI= await getCategory(value);
      console.log("Detail cate res", responseAPI)
      if(responseAPI!==null) await setdetailCategory(responseAPI);
      setDetailModal(true);
    }

    const deleteCategory =async (id)=>{
      try {
        const responseAPI= await DeleteCategory(id);
        if (responseAPI===204){
          fetchData();
          toast.success("Xóa danh mục thành công");
          
        } 
        else toast.error("Xóa danh mục thất bại")
        console.log("Response API delete category", responseAPI);
      } catch (error) {
        console.error("Delete category on categoryItem.jsx", error);
      }
    }
    const navigateEditPage=(id)=>{
      navigate(`update/${id}`)
    }

    useEffect(()=>{
        fetchData();
    },[checkReload])

    const commonProperty= 'flex border gap-2 px-2 py-1 h-20 rounded-lg';
    const inactiveProperty='border-dashed border-rose-400 border-4 hover:bg-rose-200'
    const activeProperty= 'border-solid  border-cyan-400 border-4 hover:bg-cyan-200'
    //className='flex flex-row border border-dashed border-green-100 border-4 gap-2

  return (
    <div className='h-10 w-30'>
      {loading && <p className="text-center my-7 text-2xl font-poppins">Loading...</p>}
      <div className="grid grid-cols-3 gap-5 font-montserrat">
        {listCategory.length>0 && listCategory&& (listCategory.map((item,index)=>(
           <div key={index}>
              <div key={index}  className={ classNames(item.status.toUpperCase() ==="ACTIVE"? activeProperty:inactiveProperty,commonProperty)}>
                {/* <Link to={`/category/${item.id}`} key={index}> */}
                  <div className='flex flex-row mr-auto  items-center gap-2'>
                    <img className='h-10 w-10 rounded-full' src={item.imageURL===null? imgDefault:item.imageURL}/>
                    <div className='flex flex-col gap-1 hover:font-bold cursor-pointer' onClick={()=>handleDetailModal(item.id)}>
                      <p className=''>{item.name}</p>
                      {/* <p>{item.Description}</p> */}
                    </div>
                  </div>
                {/* </Link> */}
             
              <div className='ml-auto mr-2 flex flex-row items-center gap-3'>
                <HiPencil className='z-10 bg-blue-200 hover:bg-blue-700 rounded-lg cursor-pointer p-1' size={30} onClick={()=>navigateEditPage(item.id)}/>
                <Modal buttonValue={<HiOutlineTrash className='z-10 bg-blue-200 hover:bg-blue-700 rounded-lg cursor-pointer p-1' size={30}/>} title="Bạn chắc chắn muốn xóa?" EnumHandler={()=>deleteCategory(item.id)}/>
              </div>
              </div>
           </div>
        ))
        )}
      </div>
      
      <div>
        {detailModal===true && (
          < CategoryDetailModal buttonCheck={detailModal} detailCategory={detailCategory} setButtonCheck={setDetailModal}/>
        )}
      </div>
        
    </div>
  )
}

CategoryItem.propTypes={
  checkReload:PropTypes.bool
}
