import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51MwgWMFkFIKfee4Y6D2RzbIPWzQiec7Ss1jMZMLsgZKwpFUwYSe26fzsdjHgBK5uBLyUvWZqjDn2f2hAd49T5H8K00zBG4uXcv');

const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeContainer;
