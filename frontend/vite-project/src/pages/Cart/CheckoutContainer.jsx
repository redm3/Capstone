import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox, FormControlLabel } from '@mui/material';

const calculateTotalPrice = (products) => {
  return products.reduce((total, product) => total + product.price, 0);
};

const CheckoutContainer = ({ products }) => {
  const [agreement, setAgreement] = useState(false);
  const totalPrice = calculateTotalPrice(products);

  const handleAgreementChange = (event) => {
    setAgreement(event.target.checked);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <h2>Sub Total: ${totalPrice.toFixed(2)}</h2>
        <FormControlLabel
          control={
            <Checkbox
              checked={agreement}
              onChange={handleAgreementChange}
              name="agreement"
              color="primary"
            />
          }
          label="I agree that all sales are final: No Returns or Exchanges."
          style={{ alignSelf: 'flex-end' }}
        />
      </div>
      <Link to="/checkout" style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          disabled={!agreement}
          sx={{
            backgroundColor: agreement ? 'black' : 'lightgrey',
            color: 'white',
            '&:hover': {
              backgroundColor: agreement ? 'black' : 'lightgrey',
            },
          }}
        >
          Checkout
        </Button>
      </Link>
    </div>
  );
};

export default CheckoutContainer;
