import Navbar from "./components/Navbar"
import "./App.css"
import { UserProvider } from "./context/UserContext"
import AppRoutes from "./routes/AppRoutes"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Payment from "./components/Stripe/Payment"
/* import StripeCheckout from "./components/Stripe/StripeCheckout" */

function App() {


  return (
    <BrowserRouter>
      <div className="App">
        <UserProvider>
          <Navbar />
          <AppRoutes />
        </UserProvider>
      </div>
    </BrowserRouter>
  );
}

export default App
