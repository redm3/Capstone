import React from 'react';
import Logo from '../assets/metro-logo.png';
import Footer from '../components/Footer';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Home() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div
      className="container"
      style={{
        textAlign: 'center',
        minHeight: '150vh', // Ensures that the content takes up the full viewport height
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        className="logo-container"
        style={{
          display: 'block',
          margin: '20px auto',
          width: '50%', // Adjust this value to your desired width
          padding: '0 20px', // Add padding to prevent the carousel from touching the edges
          flexGrow: 2, // Allows the logo-container to grow and push the footer to the bottom
        }}
      >
        <img
          src={Logo}
          alt="Metro Logo"
          style={{
            display: 'block',
            margin: '20px auto',
            maxWidth: '100%', // Ensures that the logo does not overflow on small screens
          }}
        />
        <h1>Our Featured Products</h1>
        <Carousel responsive={responsive}>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
          <div>Item 5</div>
          <div>Item 6</div>
          <div>Item 7</div>
        </Carousel>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
