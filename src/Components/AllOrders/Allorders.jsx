import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';

export default function Allorders() {
    let [userOrders, setUserOrder ] = useState([]);
    let {id} = jwtDecode(localStorage.getItem("userToken")) 
  async  function getUserOrders(id){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    setUserOrder(data)
    }
    useEffect(()=>{
        getUserOrders(id)
    },[])
  return (
    <div>
      {userOrders === null?
        <div className=" text-center bg-dark vw-100 bg-opacity-10 position-absolute  start-0  vh-100 d-flex flex-column justify-content-center align-items-center ">
          <h2>it seems you don't have any orders yet </h2>
          <div>
            <ThreeDots
              height="80"
              width="200"
              radius="9"
              color="#0aad0a"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        </div>
      :
        <>
          <h1 className='text-center text-main my-4 '>Your Orders</h1>
          <div className="row justify-content-between g-3  ">
            {userOrders.map((order , idx)=>{
             return <div key={idx} className="bg-main-light rounded-4 p-3 ">
                <span className='text-main fs-4 fw-bolder  me-3'>Total Cost: {order.totalOrderPrice} EGP</span>
                <span className='h4  text-main'>Payment Method: {order.paymentMethodType}</span>
                <p className='m-0 mt-3'>phone: {order.shippingAddress.phone}</p>
                <p className='m-0 '>city: {order.shippingAddress.city}</p>
                <div className='row'>
                  {order.cartItems.map((item , index)=>{
                    return <div key={index} className='col-sm-5 col-md-3 col-xl-2 bg-main text-white rounded-3 p-3 m-2 '>
                      <p className=''>product count : {item.count}</p>
                      <p className=''> price : {item.price} EGP</p>
                    </div>
                  })}
                </div>
              </div>
            })}
          </div>
        </>
      
      }
    </div>
  )
}

