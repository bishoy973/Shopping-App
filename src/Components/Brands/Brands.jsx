import axios from "axios"
import { Fragment, useEffect, useState } from "react";


export default function Brands() {
  // https://ecommerce.routemisr.com/api/v1/brands
   const [allBrands , setAllBrands]  = useState([])

  async function getAllBrands(){
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    console.log(data?.data);
    setAllBrands(data?.data)
  }

  useEffect(()=>{
    getAllBrands()
  },[])
 
  return (
    <>
<div className="container">
<div className="row">
{allBrands.map((brand)=><div className="col-md-3 my-3">
<div className="card-shadow">
<img src={brand.image} alt={brand.slug} />
</div>
</div>)}
</div>
</div>
    
    </>
  )
}
