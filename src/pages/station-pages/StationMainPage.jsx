import { useCallback, useEffect, useState } from "react"
//import MenuDropDown from "../../components/shared/MenuDropDown.jsx";
import PaginationButton from "../../components/shared/PaginationButton.jsx";
import { getStationRevenue } from '../../api/station-api';
import classNames from "classnames";
import { ToastContainer} from "react-toastify";

export default function StationMainPage() {
  //const navigate= useNavigate();
  const [listStation,setListStation]= useState([]);

  //const [listUser,setListUser]= useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  //console.log("User list",listUser)

  const fetchData= useCallback(
    async ()=>{
        const responseAPI= await getStationRevenue();
        await setListStation(responseAPI);
        // console.log("ResponseAPI:",responseAPI);
    },[listStation]
) 

// const ViewDetailFunc=(userId)=>{
//   navigate(`/user/${userId}`);
// }
const formatNumber = (number) => {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  
    return formatter.format(number);
  };

  useEffect(() => {
    fetchData();
   
  }, []);


  return (
    <div className="">
      <ToastContainer/>
      <h1 className="py-4 text-3xl mb-4 font-bold text-center">Danh Sách Thu Nhập Theo Trạm</h1>
      <table className=" w-full h-96 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-auto">
                <thead className="text-xs text-gray-700 uppercase bg-blue-400 dark:bg-gray-700 dark:text-gray-40 h-10 items-center">
                    <tr>
                    <th className="px-4">#</th>
                    <th>Trạm</th>
                    <th>Cửa hàng</th>
                    <th>Địa chỉ trạm</th>
                    <th>Số lượng đơn</th>
                    <th>Tổng doanh thu</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody className="overflow-auto">
                    {listStation && listStation.length >0 ? (listStation.slice(currentPage*10, currentPage*10+10).map((item,index)=>(
                        <tr key={index} className={classNames(index%2!==0?"bg-blue-100":'',"border-b dark:border-gray-700 text-xs")}>
                             <td className="px-4">{index+1}</td>
                            <td>{item.name}</td>
                            <td>{item.storeName}</td>
                            <td>{item.address}</td>
                            {/* <td className='px-7'>998765567</td> */}
                            <td className='px-7'>{item.orderCompleted}</td>
                            
                            <td className='px-3'>{formatNumber(item.revenue)} VNĐ</td>
                            {/* <td><MenuDropDown DeleteFunc={()=>DeleteFunc()} EditFunc={()=>EditFunc()} ViewDetailFunc={()=>ViewDetailFunc()}/></td> */}
                        </tr>
                    ))):(<></>)}
                </tbody>
            </table>
            {listStation && listStation.length===0 &&(<div className="text-center"> Danh sách trống!!!</div>)}
            {listStation && listStation.length >0 ? 
            <div className="bg-gray-50 items-center  align-middle dark:bg-gray-800 dark:border-gray-700 border-0 border-slate-300 ">
                <PaginationButton
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    totalPages={Math.ceil(listStation.length/10)}/>
              </div>
              :
              <></>}
           
    </div>
  )
}
