import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { FidgetSpinner } from 'react-loader-spinner';
import { useParams } from 'react-router-dom'
import Slider from 'react-slick';
import { cartContext } from '../../Context/AddtoCart';

export default function ProductDetails() {

  let {addtoCart} = useContext(cartContext)

async function addtCart(id){
 await addtoCart(id)
}
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true

  }
    let {id} = useParams()
    let [specificProudct, setSpecificProudct] = useState([])
    let [isLoading,setIsLoading] = useState(true)

    async function getSpecificProduct(id){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
         setSpecificProudct(data.data)
         console.log(data.data);
         setIsLoading(false)
        
    }
    useEffect(()=>{
        getSpecificProduct(id)
    },[])
   
  return (
    <Fragment>
    {isLoading?<div className='d-flex justify-content-center align-items-center my-5'>
        <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={{}}
        wrapperClass="fidget-spinner-wrapper"
        />
        </div>:<div className='container'>
        <div className='row'>
        <div className='col-md-3'>
        
        <Slider {...settings}>
       {specificProudct.images.map(image=> <img src={image} alt="" />)}
      </Slider>
        </div>
        <div className='col-md-9 align-self-center'>
         <p className='fw-bold '>{specificProudct.description}</p> 
         <p>{specificProudct.title}</p> 
         <div className='d-flex justify-content-between '>
        <p> {specificProudct.price} EGP</p>
        <p className='d-flex'><i className="fa-solid fa-star rating-color align-self-center p-1"></i>{specificProudct.ratingsAverage}</p>
    
         </div>
         <button onClick={()=>addtCart(specificProudct.id)} className='btn btn-success bg-main text-white text-center w-100'>Add To Cart</button>
    
         </div>
    
        </div>
        </div>}
    
   
    </Fragment>
  )
}
