import Accordion from "../../ptp-web-admin-components/route-components/route-create-components/Accordion";
import CreateRouteForm from "../../ptp-web-admin-components/route-components/route-create-components/CreateRouteForm";
import CreateRouteVarForm from "../../ptp-web-admin-components/route-components/route-create-components/CreateRouteVarForm";



export default function CreateRoutePage() {
  return (
    <div>
      <h2 className="text-pretty text-xl text-center py-8 uppercase font-semibold">Tạo mới tuyến</h2>
      <div className="py-2 border border-indigo-200 rounded-lg">
        <p className="text-red-400 text-lg">Chú ý: </p>
        <p>- Bạn cần điền đầy đủ thông tin và xác nhận theo thứ tự các bước</p>
      </div>
      <div className="p-4 flex flex-col gap-5">
        <Accordion title="Bước 1: Tạo thông tin tuyến" component={<CreateRouteForm/>}/>
        
        <Accordion title="Bước 2: Tạo thông tin các lượt" component={<CreateRouteVarForm/>}/>
      </div>
    </div>
  )
}
