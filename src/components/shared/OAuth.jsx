import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {app} from '../../firebase.js'
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux'
import { signInStart, signInSuccess,signInFailure } from '../../redux/user/userSlice.js';
import { ToastContainer, toast } from "react-toastify";
import { authenticationV2 } from "../../api/auth-api.js";


export default function OAuth({formData}) {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {loading,currentUser}=useSelector((state)=>state.user);
  //console.log("FormData send to OAuth:",formData);
  const handleSignIn=async()=>{
    try {
      dispatch(signInStart());
      const auth = getAuth(app);
      const userCredential= await signInWithEmailAndPassword(auth, formData.email, formData.password)
    // Signed up 
    const user = userCredential.user;
    //console.log("user credetial:",user);
    if(user === null){
      dispatch(signInFailure());
      toast("Đăng nhập thất bại")
    }
    await dispatch(signInSuccess(user));
    const authenData=await authenticationV2(currentUser.stsTokenManager.accessToken);
    console.log('authen Data',authenData)

    // await authentication(currentUser.stsTokenManager.accessToken);
    // await console.log("Authentication call api return", authentication)
    navigate('/');
    
    } catch (error) {
      console.log("Sign In firebase fail",error);
      toast("Tài khoản không tồn tại")
    }
  }
  return (
    <>
    <ToastContainer/>
    <button
      onClick={handleSignIn}
      type="button"
      className="flex w-full justify-center rounded-md bg-cyan-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
      >
      {loading? 'SignIn...':'SignIn'} 
    </button>
    </>
    
  )
}

OAuth.propTypes = {
  formData: PropTypes.object.isRequired,
};