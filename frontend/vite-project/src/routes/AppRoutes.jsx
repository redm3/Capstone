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

function AppRoutes(props) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login {...props} />} />
      <Route path="/pay" element={<Pay />} />
      <Route path="/addressform" element={<AddressForm />} />
    </Routes>
  );
}

export default AppRoutes;