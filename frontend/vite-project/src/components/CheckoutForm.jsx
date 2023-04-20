import React, { useState } from 'react';
import { CardElement} from '@stripe/react-stripe-js';
import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios from 'axios';

const CheckoutForm = () => {
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setPaymentError(error.message);
      setPaymentSuccess(null);
    } else {
      const orderData = {
        items: [{ id: 'item-id' }],
        currency: 'usd',
      };

      const { data: clientSecret } = await axios.post('/create-payment-intent', orderData);

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (paymentResult.error) {
        setPaymentError(paymentResult.error.message);
        setPaymentSuccess(null);
      } else {
        setPaymentSuccess('Payment successful');
        setPaymentError(null);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <PaymentElement/> */}
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
      {paymentError && <p style={{ color: 'red' }}>{paymentError}</p>}
      {paymentSuccess && <p style={{ color: 'green' }}>{paymentSuccess}</p>}
    </div>
  );
};

export default CheckoutForm;
