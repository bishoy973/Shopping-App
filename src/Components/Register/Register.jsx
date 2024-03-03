import React, { Fragment, useState } from 'react';
import styles from './Register.module.css'
import { useFormik } from 'formik';
import * as yup  from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
const [errorMsg,setErrorMsg] = useState("");
const [spinner,setSpinner] = useState(false);
let nav = useNavigate()
async  function sendData(value){
  setSpinner(true)
  setErrorMsg("")
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',value)
    .catch(err => setErrorMsg(err.response.data.message))
   if(data.message === "success"){
    nav("/login")
  
  }}

    const validationSchema = yup.object({
      name:yup.string().min(3 , "name is super short").max(11,"name is too long").required("name is required"),
      email: yup.string().email("email is not valid").required("email is required"),
      password: yup.string().matches(/^[A-z][a-z]{3,8}$/,"password is invalid").required("password is required"),
      rePassword: yup.string().oneOf([yup.ref("password")],"password doesn't match").required("password is 7masa"),
      phone: yup.string().matches(/^01[0125][0-9]{8}$/,"phone is invalid").required("phone is required")

    });

  let registerForm = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },
   validationSchema,
    onSubmit:sendData
  })
  return (
    <Fragment>
<form className='container w-50 my-5' onSubmit={registerForm.handleSubmit}>
<h3 className='mb-3'>Register Now:</h3>
{errorMsg ? <div className='text-danger alert-danger fw-bolder fs-3 '>{errorMsg}</div>:null}
<div className="mb-3">
<label htmlFor="fullName" className="form-label">Full Name</label>
<input type="text" className="form-control" id="userName" name="name" aria-describedby="emailHelp" value={registerForm.values.name} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
{registerForm.errors.name && registerForm.touched.name ?<small className='text-danger alert-danger fw-bolder'>{registerForm.errors.name}</small>:null}
</div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="userEmail1" name="email" aria-describedby="emailHelp" value={registerForm.values.email} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
    {registerForm.errors.email && registerForm.touched.email ?<small className='text-danger alert-danger fw-bolder'>{registerForm.errors.email}</small>:null}
    </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="userPassword" name="password" value={registerForm.values.password} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
    {registerForm.errors.password && registerForm.touched.password ?<small className='text-danger alert-danger fw-bolder'>{registerForm.errors.password}</small>:null}

  </div>
  <div className="mb-3">
  <label htmlFor="exampleInputPassword1" className="form-label">RePassword</label>
  <input type="password" className="form-control" id="userRePassword" name="rePassword" value={registerForm.values.rePassword} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
  {registerForm.errors.rePassword && registerForm.touched.rePassword ?<small className='text-danger alert-danger fw-bolder'>{registerForm.errors.rePassword}</small>:null}

</div>
<div className="mb-3">
<label htmlFor="exampleInputPassword1" className="form-label">Phone</label>
<input type="tel" className="form-control" id="iserPhone" name="phone" value={registerForm.values.phone} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur}/>
{registerForm.errors.phone && registerForm.touched.phone ?<small className='text-danger alert-danger fw-bolder'>{registerForm.errors.phone}</small>:null}

</div>
<div>
  <button type="submit" className="btn btn-success">{spinner?<i className="fa-solid fa-spinner fa-spin"></i>:'Submit'}</button>
  
  </div>
</form>

    
    
    
    </Fragment>
  )
}
