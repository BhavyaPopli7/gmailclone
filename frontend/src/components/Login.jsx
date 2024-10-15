import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/appSlice';

const Login = () => {
  const [input,setInput] = useState({
    email:"",
    password:""
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeHandler = (e) => {
   setInput({...input,[e.target.name]:e.target.value});
  }

  const submitHandler = async (e)=>{
    e.preventDefault();
    try{
      const res = await axios.post("https://gmailclone-ilxa.onrender.com/api/v1/user/login",input,{
       headers:{
         'Content-Type': "application/json"
       },
       withCredentials:true
      });

      console.log(res.data);
      if(res.data.success){
        dispatch(setAuthUser(res.data.user));
       navigate("/");
       toast.success(res.data.message);
      }
    }
    catch(error){
     console.log(error);
     toast.error("Unable to Login");
    }
  }
  return (
    <div className='flex items-center justify-center w-screen mt-32'>
        <form onSubmit={submitHandler} className='flex flex-col gap-3 bg-white p-4 w-[20%]'>
            <h1 className='font-bold text-2xl uppercase my-2'>Login</h1>
            <input onChange={changeHandler} value={input.email} name='email' type='email' placeholder='Email' className='border border-gray-400 rounded-md px-2 py-1'/>
            <input onChange={changeHandler} value={input.password} name='password' type='password' placeholder='Password' className='border border-gray-400 rounded-md px-2 py-1'/>
            <button type='submit' className='bg-gray-800 p-2 text-white my-2 rounded-md'>Login</button>
            <p>Don't have an account?  <Link to={"/signup"} className='text-blue-600'>Signup</Link></p>
        </form>
    </div>
  )
}

export default Login

