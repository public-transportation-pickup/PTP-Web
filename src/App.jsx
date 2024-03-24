import {BrowserRouter, Routes,Route} from 'react-router-dom';
import SignIn from './ptp-web-admin-pages/SignIn.jsx'
import Layout from './ptp-web-admin-components/shared/Layout.jsx'
import Dashboard from './ptp-web-admin-pages/Dashboard.jsx';
import PrivateRoute from './ptp-web-admin-components/shared/PrivateRoute.jsx';
import CreateStorePage from './ptp-web-admin-pages/store-pages/CreateStorePage.jsx';
import StoreList from './ptp-web-admin-pages/StoreList.jsx';
import UpdateStorePage from './ptp-web-admin-pages/store-pages/UpdateStorePage.jsx';
import Map from './ptp-web-admin-pages/Map.jsx';
import StorePageMain from './ptp-web-admin-pages/store-pages/StorePageMain.jsx';
import DetailStorePage from './ptp-web-admin-pages/store-pages/DetailStorePage.jsx';
import ScheduleMenuPage from './ptp-web-admin-pages/store-pages/menu-pages/ScheduleMenuPage.jsx';
import MenuMainPage from './ptp-web-admin-pages/store-pages/menu-pages/MenuMainPage.jsx';
import RouteItem from './ptp-web-admin-components/route-components/RouteItem.jsx';
import RouteMainPage from './ptp-web-admin-pages/route-pages/RouteMainPage.jsx';
import MapStationPage from './ptp-web-admin-pages/route-pages/MapStationPage.jsx';
import StationsList from './ptp-web-admin-components/route-components/StationsList.jsx';
import DetailRoutePage from './ptp-web-admin-pages/route-pages/DetailRoutePage.jsx';
import ProductItemModal from './ptp-web-admin-components/store-components/menu-components/ProductItemModal.jsx';
import CategoryMainPage from './ptp-web-admin-pages/category-pages/CategoryMainPage.jsx';
import CreateCategoryPage from './ptp-web-admin-pages/category-pages/CreateCategoryPage.jsx';
import UserMainPage from './ptp-web-admin-pages/user-pages/UserMainPage.jsx';
import CreateRoutePage from './ptp-web-admin-pages/route-pages/CreateRoutePage.jsx';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Dashboard/>}/>
            
            <Route path='map' element={<Map/>}/>
            {/* url web for store */}
            <Route path='store'>
              <Route index element={<StorePageMain/>}/>
              <Route path='create' element={<CreateStorePage/>}/>
              <Route path='update' element={<UpdateStorePage/>}/>
              <Route path=':id' element={<DetailStorePage/>}/>
              {/* url for menu of store */}
              {/* url for product of menu of store */}
            </Route>
            <Route path='menu'>
              <Route index element={<MenuMainPage/>}/>
              <Route path='scheduleMenu' element={<ScheduleMenuPage/>}/>
            </Route>

            <Route path='route'>
              <Route index element={<RouteMainPage/>}/>
              <Route path='routes/:id' element={<DetailRoutePage/>}>
                <Route path='stations/:routeId' element={<MapStationPage/>}/>
              </Route>
              <Route path='create' element={<CreateRoutePage/>}/>
            </Route>
            {/* url category */}
            <Route path='category'>
              <Route index element={<CategoryMainPage/>}/>
              <Route path='create' element={<CreateCategoryPage/>}/>
              
            </Route>
            {/* url user */}
            <Route path='user' element={<UserMainPage/>}/>
          </Route>
        </Route>
        
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/getall' element={<StoreList/>}/>
        <Route path='/routeItem' element={<RouteItem/>}/>
        <Route path='/routes/:id' element={<DetailRoutePage/>}/>
        {/* <Route path='/comboBox' element={<ComboBoxTes/>}/> */}
        {/* <Route path='/scheduleMenu' element={<ScheduleMenuPage/>}/> */}
        <Route path='/stationList' element={<StationsList/>}/>
        {/* <Route path='/createmenu'element={<CreateMenuPage/>}/> */}
        <Route path='/productitemmodal' element={<ProductItemModal/>}/>
        
        
      </Routes>
    </BrowserRouter>
  )
}