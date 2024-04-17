import PropTypes from 'prop-types'
import CardStats from './dashboard-store-component/CardStats';

export default function HeaderStats({param}) {
    var totalSalePercents=param!=undefined?`${RoundedNumber(Math.abs((param.totalSalesNew-param.totalSalesLast)/param.totalSalesLast))}`:"0";
    var totalOrderPercent=param!=undefined?`${RoundedNumber(Math.abs((param.totalOrdersNew-param.totalOrdersLast)/param.totalOrdersLast))}`:"0";
    var averagePercent=param!=undefined?`${RoundedNumber(Math.abs((param.averageSaleValueNew-param.averageSaleValueLast)/param.averageSaleValueLast))}`:"0";
    var averageSaleValueNew=param!=undefined?`${RoundedNumber(param.averageSaleValueNew)}`:"0"
    // console.log(averagePercent);
    function RoundedNumber(num) {
      const roundedNum = num.toFixed(2);
    
      return `${roundedNum}`;
    }
    return (
      <div>
        {/* Header */}
        <div >
            <div className="md:pt-10 pb-0 pt-0 mt-4">
              <div className="px-4 md:px-10 mx-auto w-full">
            <div>
              {/* Card stats */}
              {/* <div className="flex flex-wrap"> */}
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-3">
                  <CardStats
                    statSubtitle="Tổng giá trị đơn hàng"
                    statTitle={param!=undefined?`${param.totalSalesNew}`:"0"}
                    statArrow={param!=undefined?((param.totalSalesNew-param.totalSalesLast) <0 ?"down":"up") :("up")}
                    statPercent={totalSalePercents!=='Infinity'? totalSalePercents:'0'}
                    statPercentColor={param!=undefined?((param.totalSalesNew-param.totalSalesLast) <0 ?"text-red-500":"text-emerald-500") :("text-red-500")}
                    statDescripiron="So với tuần trước"
                    statIconName="far fa-chart-bar"
                    statIconColor="bg-red-500"
                  />
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-3">
                  <CardStats
                    statSubtitle="Đơn hàng"
                    statTitle={param!=undefined?`${param.totalOrdersNew}`:"0"}
                    statArrow={param!=undefined?((param.totalOrdersNew-param.totalOrdersLast) <0 ?"down":"up") :("up")}
                    statPercent={totalOrderPercent!=='Infinity'? totalSalePercents:'0'}
                    statPercentColor={param!=undefined?((param.totalOrdersNew-param.totalOrdersLast) <0 ?"text-red-500":"text-emerald-500") :("text-red-500")}
                    statDescripiron="So với tuần trước"
                    statIconName="fas fa-chart-pie"
                    statIconColor="bg-orange-500"
                  />
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-3">
                  <CardStats
                    statSubtitle="Doanh thu trung bình"
                    statTitle={averageSaleValueNew}
                    statArrow={param!=undefined?((param.averageSaleValueNew-param.averageSaleValueLast) <0 ?"down":"up") :("up")}
                    statPercent={averagePercent!=='Infinity'? totalSalePercents:'0'}
                    statPercentColor={param!=undefined?((param.averageSaleValueNew-param.averageSaleValueLast) <0 ?"text-orange-500":"text-emerald-500") :("text-red-500")}
                    statDescripiron="So với tuần trước"
                    statIconName="fas fa-percent"
                    statIconColor="bg-sky-500"
                  />
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-3">
                  <CardStats
                    statSubtitle="Khách hàng"
                    statTitle="49,65%"
                    statArrow="up"
                    statPercent="12"
                    statPercentColor="text-emerald-500"
                    statDescripiron="So với tuần trước"
                    statIconName="fas fa-users"
                    statIconColor="bg-pink-500"
                  />
                </div>
                  </div>
            </div>
          </div>
        </div>
          
        </div>
      </div>
    );
}

HeaderStats.propTypes={
    param:PropTypes.object
}
