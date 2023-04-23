import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import CheckoutContainer from './CheckoutContainer';
import './Cart.css';

const Cart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('cart');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const removeProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('cart', JSON.stringify(updatedProducts));
  };

  return (
    <div className="Cart">
      {products.length === 0 ? (
        <h5 className="empty-cart-message">CART IS EMPTY</h5>
      ) : (
        <>
          <h1 className="cart-heading">Cart</h1>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onRemove={removeProduct} />
          ))}
          <CheckoutContainer products={products} />
        </>
      )}
    </div>
  );
};

export default Cart;
