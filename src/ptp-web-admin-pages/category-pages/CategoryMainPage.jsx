
import { useNavigate } from "react-router-dom";
import { HiOutlinePlusSm } from "react-icons/hi";
import CategoryItem from "../../ptp-web-admin-components/category-components/CategoryItem";



export default function CategoryMainPage() {
  const navigate=useNavigate();

    const handleCreateButtonClick=()=>{
        navigate('/catgory/create');
    }

    
    

    
    
  return (
    <>
        <h1 className="text-center mx-auto text-4xl">Danh sách danh mục</h1>
        <div className="flex justify-end mb-8">
            <button className="rounded-lg bg-orange-400 pl-3 pr-4 pt-2 pb-2 flex flex-row items-center hover:bg-orange-100" onClick={handleCreateButtonClick}><HiOutlinePlusSm />Tạo mới danh mục</button>
        </div>
        
        <div className="">
            {/* {listCategory.length>0?(listCategory.map((item,index)=>(
                <div key={index} className="w-full h-full">
                    <CategoryItem item={item}/>
                </div>
            ))):(<></>)} */}
            <CategoryItem/>
            <div>
                {/* <PaginationButton/> */}
            </div>
        </div>
    </>
    
  )
}
