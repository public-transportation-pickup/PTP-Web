import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess,signInFailure } from '../redux/user/userSlice';
import OAuth from '../ptp-web-admin-components/shared/OAuth';

export default function SignIn() {
  const [formData,setFormData]=useState({});
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {loading, error}=useSelector((state)=>state.user);
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
    console.log("HandleChange: ",e.target.id);
  };
  console.log("Formdata",formData);

  const handleSubmit= async(e)=>{
    e.preventDefault();
    //setLoading(true);
    try{
      dispatch(signInStart());
      const res=await fetch('/api/auth/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      console.log('HandleSubmit req:',res);
      const data = await res.json();
      console.log('Data Sign in res:',data);
      if(data.success===false){
        // setError(data.message);
        // setLoading(false);
        dispatch(signInFailure(data.message));
        return;
      }
      // setLoading(false);
      // setError(null);
      dispatch(signInSuccess(data));
      navigate('/');
    }catch(error){
      // setLoading(false);
      // setError(error.message);
      dispatch(signInFailure(error.message));
      console.log("Submit Form Sign Up error",error)
    }
    
  };

  return (
    <div className="h-screen">
    {/*<!-- Left column container with background-->*/}
    <div
      className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
      {/* <div
        className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-5/12 xl:w-5/12">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="w-full mt-6"
          alt="Sample image" />
      </div> */}

      {/* <!-- Right column container --> */}
      <div className="mb-12 md:mb-0 md:w-8/12 lg:w-7/12 xl:w-7/12 mx-auto">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6 gap-4" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-cyan-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              {/* <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
              >
                {loading ? 'Waiting...' :'Sign In'}
              </button> */}
              <OAuth formData={formData}/>
            </div>
          </form>
        </div>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
    </div>
  </div>
    
  )
}
