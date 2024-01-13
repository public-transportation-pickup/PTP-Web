import {BrowserRouter, Routes,Route} from 'react-router-dom';
import SignIn from './ptp-web-admin-pages/SignIn.jsx'
import SignUp from './ptp-web-admin-pages/SignUp'
import Layout from './ptp-web-admin-components/shared/Layout.jsx'
import Product from './ptp-web-admin-pages/Product.jsx';
import Dashboard from './ptp-web-admin-pages/Dashboard.jsx';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='product' element={<Product/>}/>
        </Route>

        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}