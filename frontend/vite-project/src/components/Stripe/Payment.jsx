import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/config").then(async (r) => {
      const { publishableKey } = await r.json();
      console.log(publishableKey);
      setStripePromise(loadStripe(publishableKey));

      axios.post("http://127.0.0.1:8000/create-payment-intent", {amount: 2000}
  
    ).then(async (result) => {
        console.log(result)
        let clientSecret = result.data
        setClientSecret(clientSecret);
        console.log(clientSecret)
      });
    });
  }, []);

/*   useEffect(() => {
    fetch("http://127.0.0.1:8000/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({amount: 2000}),

    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
      console.log(clientSecret)
    });
  }, []); */

  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (
        <Elements options={{clientSecret}} stripe={stripePromise}>
          <StripeCheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </>
  );
}

export default Payment;