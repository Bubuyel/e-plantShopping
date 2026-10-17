import React, { useState } from 'react';
import ProductList from './ProductList.jsx';
import AboutUs from './AboutUs.jsx';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  const handleHomeClick = () => {
    setShowProductList(false);
  };

  return (
    <div className="app-container">
      {showProductList ? (
        <ProductList onHomeClick={handleHomeClick} />
      ) : (
        <div className="landing-page">
          <div className="landing-content">
            <div className="landing-intro">
              <h1>Welcome To Paradise Nursery</h1>
              <p>Where Green Meets Serenity</p>
              <button className="get-started-button" onClick={handleGetStartedClick}>
                Get Started
              </button>
            </div>
            <AboutUs />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
