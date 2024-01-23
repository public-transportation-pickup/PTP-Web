import {BrowserRouter, Routes,Route} from 'react-router-dom';
import SignIn from './ptp-web-admin-pages/SignIn.jsx'
import SignUp from './ptp-web-admin-pages/SignUp'
import Layout from './ptp-web-admin-components/shared/Layout.jsx'
import Product from './ptp-web-admin-pages/Product.jsx';
import Dashboard from './ptp-web-admin-pages/Dashboard.jsx';
import PrivateRoute from './ptp-web-admin-components/shared/PrivateRoute.jsx';
import GetDataByButton from './ptp-web-admin-pages/GetDataByButton.jsx';
import CreateStore from './ptp-web-admin-pages/CreateStore.jsx';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='product' element={<Product/>}/>
            <Route path='store/create-store' element={<CreateStore/>}/>
          </Route>
        </Route>
        
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/fetch-third' element={<GetDataByButton/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}