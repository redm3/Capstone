import { Routes, Route, Link } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Register from "../pages/Register";
import Pay from "../pages/Pay";
import AddressForm from "../pages/checkout/AddressForm";
import Checkout from "../pages/checkout/Checkout";
import PaymentForm from "../pages/checkout/PaymentForm";
import Review from "../pages/checkout/Review";

import Payment from "../components/Stripe/Payment";
import ProductDetailsPage from "../pages/products/ProductDetailsPage";

import StripeCheckoutForm from "../components/Stripe/StripeCheckoutForm";
import Completion from "../components/Stripe/Completion";
import Store from "../pages/Store/Store";

function AppRoutes(props) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/store" element={<Store />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login {...props} />} />

      <Route path="/addressform" element={<AddressForm />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />



      <Route path="/payment" element={<Payment />} />
      <Route path="/completion" element={<Completion />} />
    </Routes>
  );
}

export default AppRoutes;