import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Register from "../pages/Register";
/* import Pay from "../pages/Pay"; */
import AddressForm from "../pages/checkout/AddressForm";
import Checkout from "../pages/checkout/Checkout";

import Payment from "../components/Stripe/Payment";
import ProductDetailsPage from "../pages/products/ProductDetailsPage";


import Completion from "../components/Stripe/Completion";
import Store from "../pages/Store/Store";
import Cart from "../pages/Cart/Cart"
import Admin from "../pages/Admin/Admin";
import Profile from "../pages/profile/profile";

function AppRoutes(props) {
  const [orderData, setOrderData] = useState({});
  /* const [totalPrice, setTotalPrice] = useState(0); */
  const orderwrapper = (order) => {
    console.log(order)
    setOrderData(order)
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/store" element={<Store />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login {...props} />} />
      <Route path="/admin" element={<ProtectedRoute adminOnly={true}><Admin /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute adminOnly={false}><Profile /></ProtectedRoute>} />


      {/* <Route path="/addressform" element={<AddressForm />} /> */}
      <Route path="/checkout" element={<Checkout orderData={orderData} setOrderData={orderwrapper} /* setTotalPrice={setTotalPrice} */ />} />


      <Route path="/payment" element={<Payment orderData={orderData} />} />
      <Route path="/completion" element={<Completion />} />
    </Routes>
  );
}

export default AppRoutes;
