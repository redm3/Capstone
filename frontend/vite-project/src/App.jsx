import Navbar from "./components/Navbar"
import "./App.css"
import { UserProvider } from "./context/UserContext"
import AppRoutes from "./routes/AppRoutes"
import StripeContainer from "./components/StripeContainer"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Payment from "./components/Stripe/Payment"
/* import StripeCheckout from "./components/Stripe/StripeCheckout" */

function App() {


  return (
    <div className="App">
       <UserProvider>
       {<Navbar/>}
       <AppRoutes />
{/*        <h1>Stripe Test Integration with React and MongoDB</h1>
        <StripeContainer /> */}
        {/* <Checkout/> */}
       
        {/* <StripeCheckout/> */}

       </UserProvider>

    </div>
  )
}

export default App
