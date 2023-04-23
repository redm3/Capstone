import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import './store.css';

function getCategoryClassName(category) {
  return category.replace(/\s+/g, '-').toLowerCase();
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

function Store() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('*');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products');
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterClick = (category) => {
    setFilter(category === 'All' ? '*' : getCategoryClassName(category));
    setCurrentPage(1); // Reset the currentPage when the category filter changes
  };

  const handlePageClick = (direction) => {
    if (direction === 'prev') {
      setCurrentPage(Math.max(1, currentPage - 1));
    } else if (direction === 'next') {
      setCurrentPage(currentPage + 1);
      scrollToTop(); // Call scrollToTop() function here
    }
  };

  const filteredProducts = products.filter((product) => filter === '*' || getCategoryClassName(product.category) === filter);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div style={{ paddingTop: '50px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '1rem', paddingRight: '1rem' }}>
      <h1>Store</h1>
      <h3>Check out our current stock</h3>
      <div className="category-buttons">
        {['All', 'Off-White', 'Nike', 'Yeezy', 'Jordan', 'Louis Vuitton', 'Travis Scott', 'Supreme'].map((category) => (
          <Button
            key={category}
            variant="contained"
            onClick={() => handleFilterClick(category)}
            sx={{
              backgroundColor: 'grey',
              color: 'white',
              '&:hover': {
                backgroundColor: 'black',
              },
              marginRight: '0.5rem',
              marginBottom: '0.5rem',
            }}
          >
            {category}
          </Button>
        ))}
      </div>
      
      <div className="grid">
        <AnimatePresence mode="wait">
          {displayedProducts.map((product) => (
            <motion.div
              key={product.id}
              className={`product-container ${getCategoryClassName(product.category)}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.25 }}
            >
              <h2>{product.title}</h2>
              <Link to={`/products/${product.id}`}>
                <img
                  className="product-image"
                  src={product.image}
                  alt={product.title}
                  style={{ width: '100%', height: 'auto' }}
                />
              </Link>
              <p>Price: ${product.price}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="pagination" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
        /* position: 'fixed', */
        left: 0,
        right: 0,
        bottom: -40,
      }}>
        <Button
          variant="contained"
          onClick={() => handlePageClick('prev')}
          sx={{
            backgroundColor: 'grey',
            color: 'white',
            '&:hover': {
              backgroundColor: 'black',
            },
            marginRight: '0.5rem',
            marginBottom: '0.5rem',
          }}
          disabled={currentPage === 1}
        >
          BACK
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button
          variant="contained"
          onClick={() => handlePageClick('next')}
          sx={{
            backgroundColor: 'grey',
            color: 'white',
            '&:hover': {
              backgroundColor: 'black',
            },
            marginLeft: '0.5rem',
            marginBottom: '0.5rem',
          }}
          disabled={currentPage === totalPages}
        >
          NEXT
        </Button>
      </div>
    </div>
  );
}

export default Store;
