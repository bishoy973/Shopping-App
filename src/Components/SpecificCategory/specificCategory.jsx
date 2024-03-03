import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function SpecificCategory() {
     const [specificCategory, setspecificCategory] = useState({});
     let {catID} = useParams()
    async function getCat(){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${catID}`)
        console.log(data?.data);
        setspecificCategory(data?.data)
        
    }
    useEffect(()=>{
        getCat()
    })
  return (
    <div>
<div className="container my-5 ">
<div className='w-75 mx-auto my-auto'>
<img src={specificCategory.image} alt={specificCategory.slug} className='w-75' height={500} />
<p className=" text-main fs-4 fw-bolder text-center py-4">{specificCategory.name}</p>


</div>
</div>

    </div>
  )
}
