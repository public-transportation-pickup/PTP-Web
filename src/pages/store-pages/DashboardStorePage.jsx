import PropTypes from 'prop-types'
import HeaderStats from '../../components/store-components/HeaderStats.jsx'
import { ToastContainer } from 'react-toastify'

export default function DashboardStorePage({storenName}) {
  return (
    <div>
        <div>Thống kể của cửa hàng {storenName}</div>
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
                <CardPageVisits param={report!==undefined?report.productMosts:[]}/>
                {/* App3 */}
                </div>
                <div className="w-full xl:w-4/12 px-4 pt-8">
                <CardSocialTraffic  param={report!==undefined?report.customerMosts:[]}/>
                {/* App4   */}
                </div>
            </div>
            <div className="flex flex-wrap mt-4">
                <div className="w-full  mb-12 xl:mb-0 px-4 pt-8">
                <CardPageTransactions/>
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