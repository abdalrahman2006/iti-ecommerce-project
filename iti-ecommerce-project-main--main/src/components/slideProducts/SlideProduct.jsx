// import React from 'react'
// import Product from './Product'
// import './slideProduct.css'

// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import {Autoplay , Navigation } from 'swiper/modules';


// function SlideProduct({data , title}) {

  
//   return (
//     <div className='slide_products slide'>
//         <div className="container">
//             <div className="top_slide">
//                 <h2>{title}</h2>
//                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, voluptates?</p>
//             </div>


//             <Swiper loop={true}
//             autoplay={{
//               delay: 2500,
//               disableOnInteraction: false,
//             }}
//              slidesPerView={5}
//               navigation={true}
//                modules={[Navigation , Autoplay]} 
//                className="mySwiper">
                

//                 {data.map((item) => {
//                   return(
//                     <SwiperSlide > <Product item={item} /> </SwiperSlide>
//                   )
//                 })}

    

//             </Swiper>



            
//         </div>
        
//     </div>
//   )
// }

// export default SlideProduct


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Product from "./Product";
import "./slideproduct.css";

function SlideProduct({ data, title }) {
  return (
    <div className="slide_products slide">
      <div className="container">
        <div className="top_slide">
          <h2>{title}</h2>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={true}
          loop={(data || []).length > 5}
          autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          spaceBetween={30}
          slidesPerView={2}
          breakpoints={{
            576: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          className="products_swiper"
        >
          {(data || []).map((item) => (
            <SwiperSlide key={item.id}>
              <Product item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default SlideProduct;