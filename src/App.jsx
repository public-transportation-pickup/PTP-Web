import {BrowserRouter, Routes,Route} from 'react-router-dom';
import SignIn from './foodie-pickup-pages/SignIn.jsx'
import SignUp from './foodie-pickup-pages/SignUp'
import Home from './foodie-pickup-pages/Home';
import  Layout from './foodie-pickup-pages/Layout'
import Product from './foodie-pickup-pages/Product.jsx';
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