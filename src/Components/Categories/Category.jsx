import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Category() {
  const [categ, setCateg] = useState([])
  // https://ecommerce.routemisr.com/api/v1/categories
async function getAllCategories(){
  let {data} = await axios.get(' https://ecommerce.routemisr.com/api/v1/categories')
  setCateg(data.data)
  console.log(data.data);
}
useEffect(()=>{
  getAllCategories()
},[])

  return (
    <Fragment>
    <div className="container my-5">
    <div className="row">
    {categ.map((item)=>  <div className="col-md-4">
  
<Link className='card-shadow  border border-1 my-2' to={item._id}>
<img className="w-100" height={600} src={item.image} alt={item.slug} />

<h5 className=" text-main p-3 text-center  fw-bolder">{item.name}</h5>

 
</Link>
 
</div>  
    
    )}
    </div>
    </div>
    </Fragment>
  )
}
/*
  {categ.data.map((item)=>  <div className="col-md-4">
   <div className="card" style={{width: '18rem'}}>
  <img className="card-img-top" src={item.image} alt={item.slug} />
  <div className="card-body">
    <h5 className="card-title">{item.name}</h5>
  </div>
</div>
    </div>
    
    
    )}

*/