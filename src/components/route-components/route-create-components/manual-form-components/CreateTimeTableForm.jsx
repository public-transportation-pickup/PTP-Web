import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import { createTimeTableManually } from '../../../../api/timetable-api';
import {toast} from 'react-toastify'
import {useNavigate, useParams} from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi';
import { getRouteById } from '../../../../api/route-api';
import { getRouteVarsById } from '../../../../api/route-var-api';
export default function CreateTimeTableForm() {
    const navigate=useNavigate();
    const params=useParams();
    const dayOfWeek=["T2","T3","T4","T5","T6","T7","CN"]
    const [dateApply,setDateApply]=useState([]);
    const [routeInfo,setRouteInfo]=useState({});
    const [routeVarInfo,setRouteVarInfo]=useState({})
    const [timetableId,setTimetableId]=useState('');
    const [buttonSubmit,setButtonSubmit]=useState(false);

    console.log("Date apply",dateApply);
    const handleChange=async (e)=>{
        const { value, checked } = e.target;
        console.log(`${value} is ${checked}`);
        if (checked) {
            setDateApply([...dateApply,value])
        }
 
        // Case 2  : The user unchecks the box
        else {
            setDateApply(
                dateApply.filter(
                    (e) => e !== value
                ),
                
            );
        }
    };

    const handleContinueButton=async ()=>{
        navigate(`/route/${params.routeId}/routevar/${params.routevarId}/timetable/${timetableId}/trip/create`)
      }

    const handleSubmit= async ()=>{
        let dateApplyStr= dateApply.join(",");
        const timeTableModel=[{
            applyDates:dateApplyStr,
            routeId:params.routeId,
            routeVarId:params.routevarId
        }]
        try {
            const responseAPI= await createTimeTableManually(timeTableModel);
            if(responseAPI!==null){
                toast("Tạo thời khóa biểu thành công")
                setTimetableId(responseAPI.id);
                setButtonSubmit(true);
            } 
            else toast("Tạo thời khóa biểu thất bại");
        } catch (error) {
            console.error("handle submit create time table page", error)
        }
    }

    useEffect(()=>{
        const fetchData= async ()=>{
            try {
                const responseRouteInfo= await getRouteById(params.routeId);
                const responseRoutevarInfo= await getRouteVarsById(params.routevarId);
                responseRouteInfo===null?setRouteInfo({}) :setRouteInfo(responseRouteInfo);
                responseRoutevarInfo===null? setRouteVarInfo({}) :setRouteVarInfo(responseRoutevarInfo);
            } catch (error) {
                console.log("create time table page fetch data", error)
            }
            
        }
        fetchData();
    },[params.routeId,params.routevarId])
    
  return (
    <div>
        <div>
            <h1>Tạo thời khóa biểu cho tuyến {routeInfo.name} lượt {routeVarInfo.routeVarName}</h1>
            <p>Chọn ngày tuyến sẽ hoạt động</p>
            <div>
                {/* <label htmlFor="day"></label> */}
                <div  className="flex flex-row items-center ">
                {dayOfWeek && dayOfWeek.length >0 && dayOfWeek.map((item,index)=>(
                    
                        <div key={index} className="flex gap-1 mr-4 items-center">
                            <input onChange={handleChange} key={index} type="checkbox" value={item} className="w-4 h-4"/>
                            <label htmlFor="dayOfWeek" className="">{item}</label>
                        </div>
                    
                    
                ))}
                </div>
                
            </div>
        </div>
        <div className="mt-4">
        <div className="flex flex-row gap-4">
        <button disabled={buttonSubmit===true ? true :false} onClick={handleSubmit} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Xác nhận</button>
        {buttonSubmit===true&&(
          <div className="flex flex-row gap-3 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <button  onClick={handleContinueButton} type="button" className="">Tiếp tục tạo chuyến </button><HiArrowRight className="" size={20}/>
          </div>
        ) }
        </div>
        </div>
    </div>
  )
}

CreateTimeTableForm.propTypes={
    routeId:PropTypes.string,
    routeVarId:PropTypes.string,
    getTimeTableIdFunc:PropTypes.func
}
