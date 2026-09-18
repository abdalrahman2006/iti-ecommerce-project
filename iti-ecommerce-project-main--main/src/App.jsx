import { Route, Routes } from "react-router-dom";
import BtmHeader from "./components/header/BtmHeader";
import TopHeader from "./components/header/TopHeader";
import Home from "./page/home/Home";
import ProductDetails from "./page/productDetails/ProductDetails";
import Cart from "./page/cart/Cart";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
import { AnimatePresence } from "framer-motion";
import CategoryPage from "./page/CategoryPage/CategoryPage";
import SearchResults from "./page/SearchResults";
import Favorites from "./page/favorites/Favorites"
import Login from "./page/Login/Login";
import About from "./components/About/About";
import Contact from "./page/Contact/Contact";
import Checkout from "./page/Checkout/Checkout";
import Addresses from "./page/Addresses/Addresses";
// import Profile from "./page/Profile/Profile";
import OrderHistory from "./page/Orders/OrderHistory";
import OrderDetails from "./page/Orders/OrderDetails";
import AdminLayout from "./page/Admin/AdminLayout";
import Dashboard from "./page/Admin/Dashboard";
import AdminProducts from "./page/Admin/AdminProducts";
import AdminOrders from "./page/Admin/AdminOrders";

function App() {
  return (
    <>
      <header>
        <TopHeader />
        <BtmHeader />
      </header>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#e9e9e9",
            borderRadius: "5px",
            padding: "14px",
          },
        }}
      />

      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/category/:category" element={<CategoryPage />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/addresses" element={<Addresses />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;










     
     
     