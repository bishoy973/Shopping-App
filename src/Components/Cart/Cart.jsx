import React, { Fragment, useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/AddtoCart'
import { FidgetSpinner } from 'react-loader-spinner'
import { Link } from 'react-router-dom'

export default function Cart() {
 let {showCart,deleteCartItem , updateCartItem  } =  useContext(cartContext)
 let [showCartItem , setShowCartItem] =   useState([])
 let[loading , setLoading] = useState(true)
 async function showUserCart(){
    let {data} = await showCart()
    setShowCartItem(data)
    setLoading(false)
    console.log(data)
 }



 async function deleteFromCart(id){
    setLoading(true)
 let {data} =   await deleteCartItem(id)
 setLoading(false)
 setShowCartItem(data)

 }
 async function updateFromCart(id , count){
  if(count < 1 ){
    let {data} =   await deleteCartItem(id)
    setShowCartItem(data)

  } else{
    let {data} =   await updateCartItem(id ,count)
    setShowCartItem(data)
  }
 }

 useEffect(()=>{
    showUserCart()
 },[])

  return (
    <Fragment>
    {loading ?
       <div className='loader'>
       <FidgetSpinner
       visible={true}
       height="80"
       width="80"
       ariaLabel="fidget-spinner-loading"
       wrapperStyle={{}}
       wrapperClass="fidget-spinner-wrapper"
       />
       </div>: <>
    <div className='container bg-body-secondary mt-3'>
    <h2 className=''>Shop Cart : </h2>
  <div className='d-flex justify-content-between m-3'>
  <h4 className='text-main'><span>Total Price:</span>{showCartItem?.data?.totalCartPrice}</h4>
  
 <Link className='btn bg-main text-white' to={`/checkout/${showCartItem.data._id}`}>Checkout</Link>
  </div>

    {showCartItem.data.products.map((product)=>
        <div className='row  ' key={product.product.id}>
    <div className='col-md-2'>
    <img src={product.product.imageCover} className="w-100 m-3" alt="" />
    </div>
    <div className='col-md-9'>
    <p>{product.product.title.split(" ").slice(0,4).join(" ")}</p>
    <p className='text-main '>price:{product.price} EGP</p>
    <button className='btn' onClick={()=>deleteFromCart(product.product.id)}><i className="fa-solid fa-trash-can p-1 text-main "></i> Remove</button>
    </div>
    <div className='col-md-1'>
  <div className='d-flex justify-content-center align-content-center align-self-center '>
  <button className='btn border border-success' onClick={()=>updateFromCart(product.product.id , product.count +1)}>+</button>
  <span className='m-2'>{product.count}</span>
  <button className='btn border border-success' onClick={()=>updateFromCart(product.product.id , product.count -1)}>-</button>
  </div>
  
    </div>
    
    <p className="brdr"></p>   
    
    
    

    </div>)}
    </div>
    </>}
    </Fragment>
  )
}
