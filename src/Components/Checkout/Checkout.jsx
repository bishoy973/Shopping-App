import axios from 'axios'
import { useFormik } from 'formik'
import React, { Fragment, useContext, useEffect } from 'react'
import { cartContext } from '../../Context/AddtoCart'
import { useParams } from 'react-router-dom'

export default function Checkout() {
  let {pid} = useParams()
let {GetPayment} = useContext(cartContext)

async  function getToPayment(shippingAddress){
let {data} = await GetPayment(pid,shippingAddress)
console.log(data?.session?.url);
 window.location.href =`${data?.session?.url}`

}


let paymentForm = useFormik({
    initialValues:{
        details : '',
        phone: "",
        city : ""
    },
    onSubmit: getToPayment
})





  return (
    <Fragment>
<div className=' container  mt-5'>
<h3 className='text-main fw-bold'>Welcome to Checkout</h3>
<form className='mt-4 w-75 ' onSubmit={paymentForm.handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Address</label>
    <input type="text" name='details' className="form-control" id="details" aria-describedby="details" value= {paymentForm.values.details} onChange={paymentForm.handleChange} />
  </div>
  <div className="mb-3">
  <label htmlFor="exampleInputEmail1" className="form-label">Phone</label>
  <input type="text" name='phone' className="form-control" id="phone" aria-describedby="phone" value= {paymentForm.values.phone} onChange={paymentForm.handleChange} />
</div>
<div className="mb-3">
<label htmlFor="exampleInputEmail1" className="form-label">City</label>
<input type="text" name='city' className="form-control" id="city" aria-describedby="city" value= {paymentForm.values.city} onChange={paymentForm.handleChange} />
</div>


  <button type="submit" className="btn bg-main text-white d-block ms-auto">Submit</button>
</form>

</div>      
    </Fragment>
  )
}
