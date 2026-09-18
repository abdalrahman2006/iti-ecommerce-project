import React, { useContext } from "react";
import {
  FaRegHeart,
  FaRegStarHalfStroke,
  FaShare,
  FaStar,
} from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { CartContext } from "../../components/context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ProductInfo({ product }) {

    const {cartItems , addToCart ,  addToFavorites , favorites , removeFromFavorites} = useContext(CartContext)

    const isInCart = cartItems.some(i => i.id === product.id);

    const navigate = useNavigate()

    const handleAddToCart = () => {
        addToCart(product)

        toast.success(
          <div className='toast-wrapper'>
            <img src={product.images[0]} alt="" className='toast-img'/>

            <div className="toast-content">
              <strong>{product.title}</strong>
              added to Cart
              <div>
                <button className='btn' onClick={() => navigate('/cart')}> View Cart</button>
              </div>
            </div>
          </div>
          ,{duration : 3500}
        )

      }

        // favorites
  const isInFav = favorites.some(i => i.id === product.id);

  const handleAddToFav = () => {
    if(isInFav) {
      removeFromFavorites(product.id)
      toast.error(`${product.title} Removed from favorites`)
    }else{
    addToFavorites(product)
    toast.success(`${product.title} added To favorites`)
    }

   }

  return (
    <div className="details_item">
      <h1 className="name">{product.title}</h1>
      <div className="stars">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaRegStarHalfStroke />
      </div>

      <p className="price">$ {product.price}</p>

      <h5>
        Availability: <span>{product.availabilityStatus}</span>
      </h5>
      <h5>
        Brand: <span>{product.brand}</span>
      </h5>
      <p className="desc">{product.description}</p>
      <h5 className="stock">
        <span>Hurry Up! Only {product.stock} products left in stock.</span>{" "}
      </h5>

      <button onClick={handleAddToCart} className={`btn ${isInCart ? 'in-cart' : ''}`}>
        {isInCart ? "item in cart" : "Add to cart"}        <TiShoppingCart />
      </button>

      <div className="icons">
        <span className={`${isInFav ? "in-fav" : ""}`} onClick={handleAddToFav}>
          <FaRegHeart />
        </span>
        <span>
          <FaShare />
        </span>
      </div>
    </div>
  );
}

export default ProductInfo;

// import React, { useContext } from "react";
// import {
//   FaRegHeart,
//   FaRegStarHalfStroke,
//   FaShare,
//   FaStar,
// } from "react-icons/fa6";
// import { TiShoppingCart } from "react-icons/ti";
// import { CartContext } from "../../components/context/CartContext";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// function ProductInfo({ product }) {
//   const {
//     cartItems,
//     addToCart,
//     addToFavorites,
//     favorites,
//     removeFromFavorites,
//   } = useContext(CartContext);

//   const isInCart = cartItems.some((item) => item._id === product._id);

//   const isInFav = favorites.some((item) => item._id === product._id);

//   const navigate = useNavigate();

//   // =========================
//   // Add To Cart
//   // =========================

//   const handleAddToCart = () => {
//     addToCart(product);

//     toast.success(
//       <div className="toast-wrapper">
//         <img
//           src={product.mainImage?.url}
//           alt={product.name}
//           className="toast-img"
//         />

//         <div className="toast-content">
//           <strong>{product.name}</strong>
//           added to Cart
//           <div>
//             <button className="btn" onClick={() => navigate("/cart")}>
//               View Cart
//             </button>
//           </div>
//         </div>
//       </div>,
//       {
//         duration: 3500,
//       },
//     );
//   };

//   // =========================
//   // Favorites
//   // =========================

//   const handleAddToFav = () => {
//     if (isInFav) {
//       removeFromFavorites(product._id);

//       toast.error(`${product.name} Removed from favorites`);
//     } else {
//       addToFavorites(product);

//       toast.success(`${product.name} added To favorites`);
//     }
//   };

//   // =========================
//   // UI
//   // =========================

//   return (
//     <div className="details_item">
//       <h1 className="name">{product.name}</h1>

//       <div className="stars">
//         <FaStar />
//         <FaStar />
//         <FaStar />
//         <FaStar />
//         <FaRegStarHalfStroke />
//       </div>

//       <p className="price">$ {product.price}</p>

//       <h5>
//         Availability:{" "}
//         <span>{product.stock > 0 ? "In Stock" : "Out of Stock"}</span>
//       </h5>

//       <p className="desc">{product.description}</p>

//       <h5 className="stock">
//         {product.stock > 0 ? (
//           <span>Hurry Up! Only {product.stock} products left in stock.</span>
//         ) : (
//           <span>Out of stock.</span>
//         )}
//       </h5>

//       <button
//         onClick={handleAddToCart}
//         className={`btn ${isInCart ? "in-cart" : ""}`}
//         disabled={product.stock <= 0}
//       >
//         {isInCart ? "item in cart" : "Add to cart"}
//         <TiShoppingCart />
//       </button>

//       <div className="icons">
//         <span className={isInFav ? "in-fav" : ""} onClick={handleAddToFav}>
//           <FaRegHeart />
//         </span>

//         <span>
//           <FaShare />
//         </span>
//       </div>
//     </div>
//   );
// }

// export default ProductInfo;
