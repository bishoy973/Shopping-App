import React, { Fragment, useContext, useEffect, useState } from 'react'
import { wishListContext } from '../../Context/WhishListcontext'
import { FidgetSpinner } from 'react-loader-spinner'
import { cartContext } from '../../Context/AddtoCart'

export default function Wishlist() {

    let {getWishList , showList , setShowList , deleteListItem} = useContext(wishListContext)
    let [isLoading , setIsLoading ] = useState(false)
    let {addtoCart} = useContext(cartContext)

    async function addtCart(id){
      await  addtoCart(id)
      deleteList(id)
      }

async function deleteList(id){
    setIsLoading(true)
  let {data} =  await deleteListItem(id)
  setIsLoading(false)
 setShowList(data?.data)
 console.log(showList);
 getList()
}


 async function  getList(){
await   getWishList()
}
    useEffect(()=>{
      setIsLoading(true)
      getList()
      setIsLoading(false)
      console.log(showList);
    },[])
  return (
    <Fragment>
    {isLoading ?
       <div className='loader'>
       <FidgetSpinner
       visible={true}
       height="80"
       width="80"
       ariaLabel="fidget-spinner-loading"
       wrapperStyle={{}}
       wrapperClass="fidget-spinner-wrapper"
       />
       </div>:<>
       <div className='container bg-body-secondary mt-3'>
    <h2 className='fw-bold p-2 mb-3'>My Wishlist : </h2>
  <div className='d-flex justify-content-between m-3'>
  </div>

  
        {showList.map((item)=><div className='row  ' key={item.id}>
    <div className='col-md-2'>
    <img src={item.imageCover} className="w-100 m-3" alt={item.slug} />
    </div>
    <div className='col-md-8'>
    <p>{item.title}</p>
    <p className='text-main '>price:{item.price} EGP</p>
    <button className='btn text-start' onClick={()=>deleteList(item.id)}><i className="fa-solid fa-trash-can p-1 text-danger "></i>Remove</button>
    </div>
    <div className='col-md-2'>
  <div className='d-flex justify-content-center align-content-center align-self-center '>
  <button className='btn btn-outline-success' onClick={()=>addtCart(item.id)}>Add to Cart</button>
  </div>
  
    </div>
    
    <p className="brdr"></p>   
    
    
    

    </div>)}
    </div>
       </>}
  
  
    </Fragment>
  )
}
