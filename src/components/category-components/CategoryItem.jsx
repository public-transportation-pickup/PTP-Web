import { useCallback, useEffect, useState } from 'react';
import imgDefault from '../../assets/store-default-img.png'
import PropTypes from 'prop-types'
import {getCategories} from '../../api/category-api.js'
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export default function CategoryItem() {
const [loading,setLoading]=useState(false);
const [listCategory,setListCategory]=useState([]);
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

    useEffect(()=>{
        fetchData();
    },[])

    const commonProperty= 'flex flex-row border gap-2 p-2 ';
    const inactiveProperty='border-dashed border-rose-500 border-4 hover:bg-rose-200'
    const activeProperty= 'border-solid  border-green-500 border-4 hover:bg-green-200'
    //className='flex flex-row border border-dashed border-green-100 border-4 gap-2

  return (
    <div className='h-10 w-30'>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      <div className="grid grid-cols-3 gap-5">
        {listCategory.length>0 && listCategory&& (listCategory.map((item,index)=>(
           <Link to={`/category/${item.id}`} key={index}>
              <div key={index} className={ classNames(item.status==="Active"? activeProperty:inactiveProperty,commonProperty)}>
                <img className='h-10 w-10 rounded-full' src={item.imageURL===null? imgDefault:item.imageURL}/>
                <div className='flex flex-col gap-1'>
                <p>{item.name}</p>
                <p>{item.Description}</p>
                </div>
                
          </div>
           </Link>
          
        ))
        )}
      </div>
      
      
        
    </div>
  )
}

CategoryItem.propTypes={
  listCategory:PropTypes.array.isRequired
}

