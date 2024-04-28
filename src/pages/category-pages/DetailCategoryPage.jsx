import { useEffect } from "react";
import PropTypes from 'prop-types'
//import { getCategory } from "../../api/category-api";



export default function DetailCategoryPage({detailCategory}) {
  // const [detailCategory,setDetailCategory]=useState(null);
  console.log("category detail",detailCategory)
  //console.log("detail category", detailCategory);
  useEffect(()=>{
    // const fetchData=async ()=>{
    //   try {
    //     const responseAPI=await getCategory(categoryId);
    //     await setDetailCategory(responseAPI);
    //   } catch (error) {
    //     console.log("Fetch category by id exception",error)
    //   }
    // }
    // fetchData();
  },[detailCategory])
  return (
    <div>
      <div className="bg-yellow-200 p-3 rounded-lg flex flex-row items-center gap-3 px-10 font-montserrat">
        <div className="w-28 h-28 bg-blue-300 rounded-full">
          <img src={detailCategory.imageURL} className="w-28 h-28 bg-blue-300 rounded-full"/>
        </div>
        <div>
        <div>Tên danh mục: {detailCategory.name}</div>
        <div>Mô tả: {detailCategory.description}</div>
        {/* <div>Trạng thái: {detailCategory.status}</div> */}
        </div>
        
      </div>
    </div>
  )
}

DetailCategoryPage.propTypes={
  detailCategory:PropTypes.object
}
