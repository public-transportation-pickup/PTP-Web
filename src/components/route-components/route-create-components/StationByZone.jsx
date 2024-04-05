import PropTypes from 'prop-types'
import ComboboxComponent from '../../store-components/ComboboxComponent'
import { useEffect, useState } from 'react'
import { getDistrictByProvinceId } from '../../../api/store-api';
import { getStations } from '../../../api/station-api';
import { HiOutlinePlus } from "react-icons/hi";
import { toast } from 'react-toastify';

export default function StationByZone({addStation}) {
  const [isOpen,setIsOpen]=useState(true);
  const [zoneName, setZoneName]=useState('');
  const [listZone, setListZone]=useState([]);
  const [listStationByZone, setListStationByZone]=useState([])
  const [listStationAdd, setListStationAdd]=useState([]);

  const handleZoneNameChange=async (value)=>{
    setZoneName(value.district_name);
    const reponseAPI= await getStations(value.district_name);
    setListStationByZone(reponseAPI);
  }

  const getStationtoAdd=async (value)=>(
    await addStation(value===undefined?null:value)
  )
    const addStationtoList= async (ele)=>{
      listStationAdd.includes(ele)?toast("Trạm đã được thêm"):setListStationAdd((prevList)=>[...prevList,ele]);
  }

  const handleCloseButton=async ()=>{
    await setIsOpen(false);
  }

    // useEffect(()=>{
    //   const fetchData=async()=>{
    //     const responseAPI= await getDistrictByProvinceId("79");
    //     await setListZone(responseAPI);
    //   }
    //   fetchData();
    // },[zoneName])

  return (
    <div>
      {isOpen===true &&(
        <div>
          <div>
            <ComboboxComponent listItems={listZone} params='district_name' onValueChange={handleZoneNameChange}/>
          </div>

          <div>
            {listStationByZone && listStationByZone.length >0 && listStationByZone.map((item,index)=>(
              // Xử lý onclick cho modal view detail station
              <div key={index}>
                <p>StationName</p>
                <HiOutlinePlus className='hover: p-2 rounded-full bg-blue-500' onClick={getStationtoAdd(item)}/>
              </div>
            ))}
          </div>

          <div>
            <button onClick={handleCloseButton} type='button' className='rounded-lg border border-blue-500 p-3'>Đóng</button>
          </div>
        </div>
      )}
      
    </div>
  )
}

StationByZone.propTypes={
  addStation:PropTypes.func
}

