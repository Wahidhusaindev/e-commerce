import React from "react";
// import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Cart from "./pages/Cart.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";
import Mens from "./Components/Mens.jsx";
import Womens from "./Components/Womens.jsx";
import Jewelery from './Components/jewelery.jsx'
import Electronic from "./Components/Electronic.jsx";
import About from "./Components/About.jsx";
import Contact from "./Components/Contact.jsx";
import Header from "./Components/Header.jsx";


const App = () => {
  return (
    <div>
      <Header />
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/mens-clothing" element={<Mens />} />
        <Route path="/womens-clothing" element={<Womens />} />
        <Route path="/jewelery" element={<Jewelery />} />
        <Route path="/electronics" element={<Electronic />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {/* <FAQ /> */}
      <Footer />
    </div>
  );
};

export default App;
