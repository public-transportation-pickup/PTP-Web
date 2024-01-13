import BuyerProfileChart from "../ptp-web-admin-components/BuyerProfileChart";
import DashboardStartsGrid from "../ptp-web-admin-components/DashboardStartsGrid";
import PopularProducts from "../ptp-web-admin-components/PopularProducts";
import RecentOrdrers from "../ptp-web-admin-components/RecentOrdrers";
import TransactionChart from "../ptp-web-admin-components/TransactionChart";


export default function Dashboard() {
  return (
    <div className="flex gap-4 flex-col">
        <DashboardStartsGrid/>
        <div className="flex flex-row gap-4 w-full">
          <TransactionChart/>
          <BuyerProfileChart/>
        </div>
        <div className="flex flex-row gap-4 w-full">
          <RecentOrdrers/>
          <PopularProducts/>
        </div>
        
    </div>
  )
}
