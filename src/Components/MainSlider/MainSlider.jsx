import React, { Fragment } from 'react'
import Slider from 'react-slick';
import slide1 from '../Assets/grocery-banner.png';
import slide2 from '../Assets/grocery-banner-2.jpeg';
import img1 from '../Assets/slider-image-3.jpeg';
import img2 from '../Assets/slider-image-2.jpeg';



export default function MainSlider() {

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true
  };

  return (
    <Fragment>
    <div className='container mb-4'>
    <div className='row gx-0 '>
    <div className='col-md-8'>
    <Slider {...settings}>
   <img src={img1} alt="" className='w-100' height={250}/>
   <img src={img2} alt="" className='w-100' height={250}/>
    </Slider>
     </div>
    <div className='col-md-4'>
    <img src={slide1} alt="" className='w-100' height={125}/>
    <img src={slide2} alt="" className='w-100' height={125}/>
    </div>
   
   
   
    </div>
    </div>
   
    </Fragment>
  )
}
