import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";


function Payment({ orderData, totalPrice }) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [errorMessage, seterrorMessage] = useState("");


  useEffect(() => {
    
    fetch("http://127.0.0.1:8000/config").then(async (r) => {

      const { publishableKey } = await r.json();
      console.log(publishableKey);
      setStripePromise(loadStripe(publishableKey));

      console.log(totalPrice);

      axios.post("http://127.0.0.1:8000/create-payment-intent", { amount: 2000 }, { headers: { 'Content-Type': 'application/json' }})


        .then(async (result) => {

          console.log(result)
          let clientSecret = result.data
          setClientSecret(clientSecret);
          console.log(clientSecret)

        }).catch(err => {
          console.log(err)
          seterrorMessage(err.message)

        })
    });
  }, []);

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <StripeCheckoutForm orderData={orderData} clientSecret={clientSecret} />

        </Elements>
      )}
      <div>
        {errorMessage}
      </div>
    </>
  );
}

export default Payment;