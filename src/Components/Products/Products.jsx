import axios from 'axios'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { FidgetSpinner } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/AddtoCart'
import { wishListContext } from '../../Context/WhishListcontext'

export default function Products() {
let [productData, setProductData] = useState([])
let [isLoading,setIsLoading] = useState(true)
let {addtoCart} = useContext(cartContext)
let {addToWishlist} = useContext(wishListContext)
// <i class="fa-solid fa-heart"></i>
// Route +  link 

async function addWishlist(pId){
  console.log("heyy");
  await addToWishlist(pId)
}



async function addtCart(id){
await  addtoCart(id)
}



   async function getProductData(){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        setProductData(data.data)
        setIsLoading(false)

    }

    useEffect(()=>{
        getProductData()
      
    },[]);
    
    function searchProducts(pInput , title){
      if(title.toString().toLowerCase().includes(pInput)){
        console.log("trueee");
      }
        
};




  return (
<Fragment>
<input  type="text" placeholder="search...." onChange={(e)=>searchProducts(e.target.value , productData.map((p)=>p.title))} className="w-75 mx-auto form-control my-5 ng-pristine ng-valid ng-touched" />

    
    <div className='container py-3'>
    <div className='row'>
    {isLoading ?
        <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={{}}
        wrapperClass="fidget-spinner-wrapper"
        />: ""}
        
        {productData.map((product)=>{
            return <div className='col-md-2' key={product.id}>
            <div className='product p-3'>
         <Link to={`details/${product.id}`} className='text-black text-decoration-none'>
         <img src={product.imageCover} className='w-100' alt="" />
         <p className='text-main'>{product.title.split(" ").slice(0,3).join(" ")}</p>
         <p>{(product.description.split(" ").slice(0,4).join(" "))}</p>
         <div className='d-flex justify-content-between p-1'>
         <p>price: {product.price}</p>
       <p>{product.ratingsAverage}<i className="fa-solid fa-star rating-color"></i></p>
         </div>
         </Link>
            
           <div className='d-flex'>
            <button onClick={()=>addtCart(product.id)} className='btn btn-success bg-main text-white text-center w-100'>Add To Cart</button>
            <button className='btn' onClick={()=>addWishlist(product.id)}><i className="heart fa-solid fa-heart"></i></button>
        </div>
            </div>
           </div>
         
           
           })
        }
        

       

    </div>
    </div>
    </Fragment>
  )
}

