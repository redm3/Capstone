import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const publicKey = "pk_test_51MwgWMFkFIKfee4Y6D2RzbIPWzQiec7Ss1jMZMLsgZKwpFUwYSe26fzsdjHgBK5uBLyUvWZqjDn2f2hAd49T5H8K00zBG4uXcv";
const stripePromise = loadStripe(publicKey);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (!error) {
            try {
                const { data } = await axios.post("http://127.0.0.1:8000/api/checkout/payment", {
                    paymentMethodId: paymentMethod.id,
                    amount: 2000,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const { error: confirmationError } = await stripe.confirmCardPayment(data.client_secret);

                if (confirmationError) {
                    console.error(confirmationError);
                } else {
                    console.log('Payment successful');
                }
            } catch (error) {
                console.error(error);
            }
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button className="btn btn-primary" type="submit" disabled={!stripe || loading}>
                Pay with Stripe
            </button>
        </form>
    );
};

function Pay() {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
}

export default Pay;
