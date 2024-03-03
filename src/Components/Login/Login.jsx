import React, { Fragment, useContext, useState } from 'react';
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as yup  from 'yup'
import { useFormik } from 'formik';
import { tokenContext } from '../../Context/TokenContext';



export default function Login() {
  const [errorMsg,setErrorMsg] = useState("");
  const [spinner,setSpinner] = useState(false);
  const {token , setToken} = useContext(tokenContext)
  let nav = useNavigate()
  async  function sendData(value){
    setSpinner(true)
    setErrorMsg("")
      let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',value)
      .catch(err => setErrorMsg(err.response.data.message))
      console.log(data)
   
        localStorage.setItem("userToken",data.token)
        setToken(data.token)
      
     

     if(data.message === "success"){
      nav("/")
    
    }}

 
      const validationSchema = yup.object({
        email: yup.string().email("email is not valid").required("email is required"),
        password: yup.string().matches(/^[A-z][a-z]{3,8}$/,"password is invalid").required("password is required"),
  
  
      });
  
    let loginForm = useFormik({
      initialValues:{
        email:"",
        password:""
       
      },
     validationSchema,
      onSubmit:sendData
    })
    return (
      <Fragment>
  <form className='container w-50 my-5' onSubmit={loginForm.handleSubmit}>
  <h3 className='mb-3'>Login Now:</h3>
  {errorMsg ? <div className='text-danger alert-danger fw-bolder fs-3 '>{errorMsg}</div>:null}
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" id="userEmail1" name="email" aria-describedby="emailHelp" value={loginForm.values.email} onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} />
      {loginForm.errors.email && loginForm.touched.email ?<small className='text-danger alert-danger fw-bolder'>{loginForm.errors.email}</small>:null}
      </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" className="form-control" id="userPassword" name="password" value={loginForm.values.password} onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} />
      {loginForm.errors.password && loginForm.touched.password ?<small className='text-danger alert-danger fw-bolder'>{loginForm.errors.password}</small>:null}
  
    </div>

  <div className='d-flex'>
  <Link className="fw-bolder text-black " to={"/forgotpassword"}>Forgot Password?</Link>
    <button type="submit"   className="btn btn-success d-block ms-auto">{spinner?<i className="fa-solid fa-spinner fa-spin"></i>:'Login'}</button>
    
    </div>
  </form>
  
      
      
      
      </Fragment>
    )
  }
  