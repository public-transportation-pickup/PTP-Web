import { Outlet } from "react-router-dom";


export default function CreateRouteVarForm() {
  return (
    <div>
      <div className="flex flex-row gap-2">
        <p>Bạn có muốn bản sao của 1 lượt có sẵn từ hệ thống không</p>
        <button type="button" className="bg-green-300 p-3 rounded-lg hover:opacity-80">Có</button>
        <button type="button" className="bg-rose-300 p-3 rounded-lg hover:opacity-80">Không</button>
      </div>
       
        <div>
          <Outlet/>
        </div>
    </div>
  )
}
