import  { useEffect, useState } from "react";
import HeroSlider from "../../components/HeroSlider";

import "./home.css";
import SlideProduct from "../../components/slideProducts/SlideProduct";
import SlideProductLoading from "../../components/slideProducts/SlideProductLoading";
import PageTransition from "../../components/PageTransition";

const categories = [
  "smartphones",
  "mobile-accessories",
  "laptops",
  "tablets",
  "sunglasses",
  "sports-accessories",
];

function Home() {
  const [products, setProducts] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const results = await Promise.all(
          categories.map(async (category) => {
            const res = await fetch(
              `https://dummyjson.com/products/category/${category}`
            );
            const data = await res.json();
            return { [category]: data.products };
          })
        );

        const productsData = Object.assign({}, ...results);
        setProducts(productsData);
      } catch (error) {
        console.error("Erorr Fetching", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <PageTransition>
      <div>
        <HeroSlider />

        {loading
          ? categories.map((category) => <SlideProductLoading key={category} />)
          : categories.map((category) => (
              <SlideProduct
                key={category}
                data={products[category]}
                title={category.replace("-", " ")}
              />
            ))}
      </div>
    </PageTransition>
  );
}

export default Home;



// import { useEffect, useState } from "react";

// import HeroSlider from "../../components/HeroSlider";
// import SlideProduct from "../../components/slideProducts/SlideProduct";
// import SlideProductLoading from "../../components/slideProducts/SlideProductLoading";
// import PageTransition from "../../components/PageTransition";

// import { getCategories } from "../../api/categoriesApi";
// import { getProducts } from "../../api/productsApi";

// import "./home.css";

// function Home() {
//   // { categoryId, categoryName, products: [...] }
//   const [categorySections, setCategorySections] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHomeData = async () => {
//       try {
//         setLoading(true);

//         const categoriesResponse = await getCategories();
//         const categories =
//           categoriesResponse?.data?.categories || categoriesResponse?.data || [];

//         // نجيب منتجات كل كاتيجوري بالتوازي، على حسب الـ _id
//         const results = await Promise.all(
//           categories.map(async (category) => {
//             try {
//               const productsResponse = await getProducts({ category: category._id });
//               const products = productsResponse?.data?.products || productsResponse?.data || [];
//               return { categoryId: category._id, categoryName: category.name, products };
//             } catch (err) {
//               console.error(`Error fetching products for category ${category.name}:`, err);
//               return { categoryId: category._id, categoryName: category.name, products: [] };
//             }
//           })
//         );

//         // نسيب بس الكاتيجوريز اللي فعلاً فيها منتجات
//         setCategorySections(results.filter((section) => section.products.length > 0));
//       } catch (error) {
//         console.error("Error fetching home data:", error);
//         setCategorySections([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHomeData();
//   }, []);

//   return (
//     <PageTransition>
//       <div>
//         <HeroSlider />

//         {loading ? (
//           <>
//             <SlideProductLoading />
//             <SlideProductLoading />
//             <SlideProductLoading />
//           </>
//         ) : categorySections.length > 0 ? (
//           categorySections.map((section) => (
//             <SlideProduct
//               key={section.categoryId}
//               data={section.products}
//               title={section.categoryName}
//             />
//           ))
//         ) : (
//           <div className="container">
//             <p>No products available.</p>
//           </div>
//         )}
//       </div>
//     </PageTransition>
//   );
// }

// export default Home;