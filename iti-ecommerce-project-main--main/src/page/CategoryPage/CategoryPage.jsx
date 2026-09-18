import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../../components/slideProducts/Product";
import "./categorypage.css";
import SlideProductLoading from "../../components/slideProducts/SlideProductLoading";
import PageTransition from "../../components/PageTransition";

function CategoryPage() {
  const { category } = useParams();

  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setCategoryProducts(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [category]);

  // console.log(categoryProducts);

  return (
    <PageTransition key={category}>
        <div className="category_products">
      {loading ? (
        <SlideProductLoading key={category} />
      ) : (
        <div className="container">
          <div className="top_slide">
            <h2>{category} : {categoryProducts.limit}</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestias, voluptates?
            </p>
          </div>

          <div className="products">
            {categoryProducts.products.map((item, index) => (
              <Product item={item} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
    </PageTransition>
  );
}

export default CategoryPage;



// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Product from "../../components/slideProducts/Product";
// import SlideProductLoading from "../../components/slideProducts/SlideProductLoading";
// import PageTransition from "../../components/PageTransition";
// import { getProducts } from "../../api/productsApi";
// import "./categorypage.css";

// function CategoryPage() {
//   const { category } = useParams();

//   const [categoryProducts, setCategoryProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCategoryProducts = async () => {
//       try {
//         setLoading(true);

//         const response = await getProducts({
//           category: category,
//         });

//         setCategoryProducts(response?.data?.products || []);
//       } catch (error) {
//         console.error("Error fetching category products:", error);
//         setCategoryProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategoryProducts();
//   }, [category]);

//   return (
//     <PageTransition key={category}>
//       <div className="category_products">
//         {loading ? (
//           <SlideProductLoading />
//         ) : (
//           <div className="container">
//             <div className="top_slide">
//               <h2>
//                 {category} : {categoryProducts.length}
//               </h2>

//               <p>
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                 Molestias, voluptates?
//               </p>
//             </div>

//             <div className="products">
//               {categoryProducts.length > 0 ? (
//                 categoryProducts.map((item) => (
//                   <Product item={item} key={item._id || item.id} />
//                 ))
//               ) : (
//                 <p>No products available in this category.</p>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </PageTransition>
//   );
// }

// export default CategoryPage;


