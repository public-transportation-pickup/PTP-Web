import {BrowserRouter, Routes,Route} from 'react-router-dom';
import SignIn from './ptp-web-pages/SignIn.jsx'
import SignUp from './ptp-web-pages/SignUp'
import Home from './ptp-web-pages/Home';
import  Layout from './ptp-web-pages/Layout'
import Product from './ptp-web-pages/Product.jsx';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='home' element={<Home/>}/>
          <Route path='product' element={<Product/>}/>
        </Route>

        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}