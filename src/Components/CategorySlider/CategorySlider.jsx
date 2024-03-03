import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Slider from 'react-slick'

export default function CategorySlider() {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay:true
    
      }

    function getCatSlider(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
   
    }

    let {data} = useQuery("catSlider" , getCatSlider)
    console.log(data?.data?.data);
  return (
    <>
<div className='container'>
<Slider {...settings}>
{data?.data?.data.map((ele)=> 
     <>
    <img src={ele.image} className='w-100' height={200} alt="" />
    <p className='text-center '>{ele.name}</p>
    </>
    )}
</Slider>
</div>
    </>
  )
}
