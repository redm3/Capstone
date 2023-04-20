import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './ProductDetailsPage.css';

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [womenSize, setWomenSize] = useState('');
  const [menSize, setMenSize] = useState('');

  const handleWomenSizeChange = (event) => {
    setWomenSize(event.target.value);
  };

  const handleMenSizeChange = (event) => {
    setMenSize(event.target.value);
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data.data));
  }, [id]);

  return (
    <Box border={0}>
      <div className="product-details-container1">
        {product ? (
          <>
            <div className="product-image-container1">
              <img src={product.image} alt={product.title} className="product-image1" />
            </div>
            <div className="product-details1">
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <FormControl fullWidth variant="outlined" style={{ marginBottom: '1rem' }}>
                <InputLabel>Women's Size</InputLabel>
                <Select
                  value={womenSize}
                  onChange={handleWomenSizeChange}
                  label="Women's Size"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  {/* Add more sizes as needed */}
                </Select>
              </FormControl>
              <FormControl fullWidth variant="outlined" style={{ marginBottom: '1rem' }}>
                <InputLabel>Men's Size</InputLabel>
                <Select
                  value={menSize}
                  onChange={handleMenSizeChange}
                  label="Men's Size"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={11}>11</MenuItem>
                  <MenuItem value={12}>12</MenuItem>
                  {/* Add more sizes as needed */}
                </Select>
              </FormControl>
              <button className="add-to-cart-button" disabled={!womenSize && !menSize}>
                Add to Cart
              </button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Box>
  );
}

export default ProductDetailsPage;
