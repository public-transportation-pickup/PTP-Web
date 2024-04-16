import CreateRouteVarForm1 from "../../../components/route-components/route-create-components/manual-form-components/CreateRouteVarForm1";
import { ToastContainer } from "react-toastify";
import CreateRouteVarForm2 from "../../../components/route-components/route-create-components/manual-form-components/CreateRouteVarForm2";

export default function CreateRouteVarPage() {
  return (
    <div>
      <ToastContainer/>
      <CreateRouteVarForm1/>
      <CreateRouteVarForm2/>
    </div>
  )
}
