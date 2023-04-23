import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const calculateTotalPrice = (products) => {
  return products.reduce((total, product) => total + product.price, 0);
};

const CheckoutContainer = ({ products }) => {
  const totalPrice = calculateTotalPrice(products);

  return (
    <div className="checkout-container">
      <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
      <Link to="/checkout" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary">
          Checkout
        </Button>
      </Link>
    </div>
  );
};

export default CheckoutContainer;
