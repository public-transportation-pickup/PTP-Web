import PropTypes from 'prop-types'
import HeaderStats from '../../components/store-components/HeaderStats.jsx'
import { ToastContainer} from 'react-toastify'
import CardLineChart from '../../components/store-components/dashboard-store-component/CardLineChart.jsx'
import CardBarChart from '../../components/store-components/dashboard-store-component/CardBarChart.jsx'
import CardPageVisits from '../../components/store-components/dashboard-store-component/CardPageVisits.jsx'
import CardSocialTraffic from '../../components/store-components/dashboard-store-component/CardSocialTraffic.jsx'
import CardPageTransactions from '../../components/store-components/dashboard-store-component/CardPageTransactions.jsx'
//import { Actions, useAPIRequest } from '../../lib/utils/api-request.js'
import { useCallback, useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { getStoreReport } from '../../api/store-api.js'

export default function DashboardStorePage() {
    const params =useParams();
    const navigate=useNavigate()
    console.log("Param store dashboard", params.storeId)
    const [report,setReport]= useState(null);
    console.log("Report dashboard store",report)

    const handleDetailClick=async ()=>{
        navigate(`/store/${await params.storeId}`)
    }

const fetchData=useCallback(async()=>{
    try {
        const responseAPI=await getStoreReport(params.storeId);
        if(responseAPI!==null){
            //toast("Đã xảy ra lỗi")
            console.log("responseAPI get store report fetch data",responseAPI)
            setReport(responseAPI);
        } 
        else setReport(null);
    } catch (error) {
        console.error("Fetch data dashboard",error)
    }
},[report])

useEffect(()=>{
    fetchData();
},[params.storeId])

  return (
    <div>
        <ToastContainer/>
        {report===null&&(<div>

        </div>)}
        <p>
        <span className="hover:underline text-sky-700">Cửa hàng</span>
        <span className="px-2">&gt;</span>
        <button type="button" onClick={handleDetailClick} className="hover:underline text-sky-700">Chi tiết</button>
        <span className="px-2">&gt;</span>
        <span className="hover:underline text-sky-700">Sản phẩm</span>
    </p>
        <h1 className="text-center mx-auto text-3xl my-10 underline font-bold">Thống Kê Của Cửa Hàng</h1>
        <div>
            <ToastContainer className="w-100 h-10"/>
            <HeaderStats param={report} />
            <div className="flex flex-wrap">
                <div className="w-full xl:w-8/12 mt-16 mb-12 xl:mb-0 px-4">
                <CardLineChart param={report}/>
                {/* App1 */}
                </div>
                <div className="w-full h-fit xl:w-4/12 mt-16 px-4">
                <CardBarChart param={report} />
                {/* App2 */}
                </div>
            </div>
            <div className="flex flex-wrap mt-4">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 pt-8">
                <CardPageVisits param={report!==null?report.productMosts:[]}/>
                {/* App3 */}
                </div>
                <div className="w-full xl:w-4/12 px-4 pt-8">
                <CardSocialTraffic  param={report!==null?report.customerMosts:[]}/>
                {/* App4   */}
                </div>
            </div>
            <div className="flex flex-wrap mt-4">
                <div className="w-full  mb-12 xl:mb-0 px-4 pt-8">
                <CardPageTransactions storeId={params.storeId}/>
                {/* App3 */}
                </div>
            </div>
        </div>
    </div>
  )
}

DashboardStorePage.propTypes={
    storenName:PropTypes.string
}