import {BrowserRouter, Routes,Route} from 'react-router-dom';
import SignIn from './ptp-web-admin-pages/SignIn.jsx'
import Layout from './ptp-web-admin-components/shared/Layout.jsx'
import Product from './ptp-web-admin-pages/Product.jsx';
import Dashboard from './ptp-web-admin-pages/Dashboard.jsx';
import PrivateRoute from './ptp-web-admin-components/shared/PrivateRoute.jsx';
import CreateStore from './ptp-web-admin-pages/store-pages/CreateStore.jsx';
import StoreList from './ptp-web-admin-pages/StoreList.jsx';
import UpdateStore from './ptp-web-admin-pages/store-pages/UpdateStore.jsx';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='product' element={<Product/>}/>
            <Route path='store/create-store' element={<CreateStore/>}/>
            <Route path='/update-store' element={<UpdateStore/>}/>
          </Route>
        </Route>
        
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/getall' element={<StoreList/>}></Route>
        
      </Routes>
    </BrowserRouter>
  )
}