import React, { useEffect } from 'react'
import { FaUser } from 'react-icons/fa';
// import {IOKeySharp } from "react-icons/io5";
import { FaKey } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from '../../store/slice/user/user.thunk';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector(
    state=>state.userReducer
  );
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  })
  useEffect (()=>{
    if(isAuthenticated) navigate('/');
  },[isAuthenticated]);
  const handleInputChange = (e) => {
    // console.log(e.target.name)
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async () => {
    console.log("login");
    toast.success("login successful");
    const response = await dispatch(loginUserThunk(loginData));
    if(response?.payload?.success){
      navigate("/")
    }
  }

  // console.log(loginData);
  return (
  <div className='flex justify-center items-center p-6  min-h-screen'>

    <div className="max-w-[40rem] w-full flex flex-col gap-5 bg-base-200 p-6 rounded-lg">
      <h2 className='text-2xl font-semibold'>Please Login...</h2>
      <label className="input input-bordered flex items-center gap-2 w-full">
        <FaUser />
        <input type="text" name="username" className="grow" placeholder="Username" onChange={handleInputChange}/>
      </label>
      <label className="input input-bordered flex items-center gap-2 w-full">
      <FaKey />
      <input type="password" name="password" className="grow" placeholder='Password' onChange={handleInputChange}/>
      </label>
      <button onClick={handleLogin} className="btn btn-primary">Login</button>

      <p>
        Don't have an account? &nbsp;
        <Link to='/signup' className='text-blue-400 underline'>Sign UP</Link>
      </p>   
    </div>
  </div>
  )
}

export default Login;