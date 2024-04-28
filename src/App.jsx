import {BrowserRouter, Routes,Route} from 'react-router-dom';
import SignIn from './pages/SignIn.jsx'
import Layout from './components/shared/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx';
import PrivateRoute from './components/shared/PrivateRoute.jsx';
import CreateStorePage from './pages/store-pages/CreateStorePage.jsx';
import UpdateStorePage from './pages/store-pages/UpdateStorePage.jsx';
import Map from './pages/Map.jsx';
import StorePageMain from './pages/store-pages/StorePageMain.jsx';
import DetailStorePage from './pages/store-pages/DetailStorePage.jsx';
import MenuMainPage from './pages/store-pages/menu-pages/MenuMainPage.jsx';
import DetailRoutePage from './pages/route-pages/DetailRoutePage.jsx';
import CategoryMainPage from './pages/category-pages/CategoryMainPage.jsx';
import UserMainPage from './pages/user-pages/UserMainPage.jsx';
import CreateRoutePage from './pages/route-pages/CreateRoutePage.jsx';
import ProductMainPage from './pages/store-pages/product-pages/ProductMainPage.jsx';
import DetailCategoryPage from './pages/category-pages/DetailCategoryPage.jsx';
import UpdateCategoryPage from './pages/category-pages/UpdateCategoryPage.jsx';
import CreateRouteVarPage from './pages/route-pages/route-var-pages/CreateRouteVarPage.jsx';
import CreateTimetablePage from './pages/route-pages/timetable-pages/CreateTimetablePage.jsx';
import CreateTripPage from './pages/route-pages/trip-pages/CreateTripPage.jsx';
import RouteMainPage from './pages/route-pages/RouteMainPage.jsx';
import StationMainPage from './pages/station-pages/StationMainPage.jsx';
import DashboardStorePage from './pages/store-pages/DashboardStorePage.jsx';
import TestPage from './pages/TestPage.jsx';
import UpdateRoutePage from './pages/route-pages/UpdateRoutePage.jsx';
import DetailProductPage from './pages/store-pages/product-pages/DetailProductPage.jsx';

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
              <Route path='update/:storeId' element={<UpdateStorePage/>}/>

              <Route path=':storeId'>
                {/* url for menu of store */}
                <Route index element={<DetailStorePage/>}/>
                <Route path='dashboard' element={<DashboardStorePage/>}/>
                <Route path='menu'>
                  <Route index element={<MenuMainPage/>}/>
                </Route>
                  {/* end url for menu of store */}
                {/* url for product of store */}
                <Route path='product'>
                  <Route index element={<ProductMainPage/>}/>
                </Route>
                {/* end for product of store */}
              </Route>
            </Route>
            {/* end url web for store */}

            
            {/* url route */}
            <Route path='route'>
              <Route index element={<RouteMainPage/>}/>
              <Route path='create' element={<CreateRoutePage/>}/>
              <Route path=':routeId'>
                <Route index element={<DetailRoutePage/>}/>
                <Route path='routevar'>
                  <Route path='create' element={<CreateRouteVarPage/>}/>
                  <Route path=':routevarId1/:routevarId2'>
                    <Route path='timetable/create' element={<CreateTimetablePage/>}/>
                    <Route path='timetable/:timetableId/trip/create' element={<CreateTripPage/>}/>
                  </Route>
                </Route>
                <Route path='update' element={<UpdateRoutePage/>}/>
              </Route>
            </Route>
            {/* end route */}

              
            {/* url category */}
            <Route path='category'>
              <Route index element={<CategoryMainPage/>}/>
              <Route path=':categoryId' element={<DetailCategoryPage/>}/>
              <Route path='update/:categoryId' element={<UpdateCategoryPage/>}/>
            </Route>
             {/* end url category */}
            {/* url user */}
            <Route path='user' element={<UserMainPage/>}/>
            <Route path='station' element={<StationMainPage/>}/>
          </Route>
        </Route>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/map' element={<Map/>}/>
        <Route path='/testpage' element={<TestPage/>}/>
        <Route path='/detailProduct' element={<DetailProductPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}