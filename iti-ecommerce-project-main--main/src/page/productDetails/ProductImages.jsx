// import React from 'react'

function ProductImages({product}) {
  return (
       <div className="imgs_item">
                <div className="big_img">
                  <img id="big_img" src={product.images[0]} alt={product.title} />
                </div>
    
                <div className="sm_img">
                  {product.images.map((img, index) => (
                    <div className="img_div_sm"  key={index}>
                      <img
                      src={img}
                      alt={product.title}
                      onClick={() => (document.getElementById("big_img").src = img)}
                    />
                    </div>
                  ))}
                </div>
              </div>
  )
}

export default ProductImages


// import { useState } from "react";

// function ProductImages({ product }) {
//   const images = [
//     product.mainImage?.url,
//     ...(product.subImages?.map((img) => img.url) || []),
//   ].filter(Boolean);

//   const [selectedImage, setSelectedImage] = useState(images[0]);

//   return (
//     <div className="imgs_item">
//       <div className="big_img">
//         <img
//           id="big_img"
//           src={selectedImage}
//           alt={product.name}
//         />
//       </div>

//       <div className="sm_img">
//         {images.map((img, index) => (
//           <div
//             className="img_div_sm"
//             key={index}
//           >
//             <img
//               src={img}
//               alt={product.name}
//               onClick={() => setSelectedImage(img)}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ProductImages;

