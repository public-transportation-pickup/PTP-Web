import {BrowserRouter, Routes,Route} from 'react-router-dom';
import SignIn from './ptp-web-admin-pages/SignIn.jsx'
import Layout from './ptp-web-admin-components/shared/Layout.jsx'
import Product from './ptp-web-admin-pages/Product.jsx';
import Dashboard from './ptp-web-admin-pages/Dashboard.jsx';
import PrivateRoute from './ptp-web-admin-components/shared/PrivateRoute.jsx';
import CreateStorePage from './ptp-web-admin-pages/store-pages/CreateStorePage.jsx';
import StoreList from './ptp-web-admin-pages/StoreList.jsx';
import UpdateStorePage from './ptp-web-admin-pages/store-pages/UpdateStorePage.jsx';
import Map from './ptp-web-admin-pages/Map.jsx';
//import ComboBoxRoute from './ptp-web-admin-components/store-components/ComboBoxRoute.jsx';
import ComboBoxTes from './ptp-web-admin-components/store-components/ComboBoxTes.jsx';
import StorePageMain from './ptp-web-admin-pages/store-pages/StorePageMain.jsx';
import DetailStorePage from './ptp-web-admin-pages/store-pages/DetailStorePage.jsx';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='product' element={<Product/>}/>
            <Route path='map' element={<Map/>}/>

            <Route path='store'>
              <Route index element={<StorePageMain/>}/>
              <Route path='create-store' element={<CreateStorePage/>}/>
              <Route path='update-store' element={<UpdateStorePage/>}/>
              <Route path='detail-store' element={<DetailStorePage/>}/>
            </Route>
          </Route>
        </Route>
        
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/getall' element={<StoreList/>}/>
        <Route path='/comboBox' element={<ComboBoxTes/>}/>
        
        
      </Routes>
    </BrowserRouter>
  )
}