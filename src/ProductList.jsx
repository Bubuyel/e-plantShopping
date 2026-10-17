import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import CartItem from './CartItem.jsx';
import './ProductList.css';

// Builds a small SVG thumbnail so every plant has an image without external hosting.
const thumbnail = (emoji, background) => {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">` +
    `<rect width="200" height="200" rx="16" fill="${background}"/>` +
    `<text x="100" y="125" font-size="90" text-anchor="middle">${emoji}</text>` +
    `</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: thumbnail('🌿', '#d9f2d9'), description: 'Produces oxygen at night, improving air quality.', cost: '$15' },
      { name: 'Spider Plant', image: thumbnail('🍃', '#e3f4d0'), description: 'Filters formaldehyde and xylene from the air.', cost: '$12' },
      { name: 'Peace Lily', image: thumbnail('🌼', '#f3f0d0'), description: 'Removes mold spores and purifies the air.', cost: '$18' },
      { name: 'Boston Fern', image: thumbnail('🌱', '#d2eedd'), description: 'Adds humidity and removes toxins from the air.', cost: '$20' },
      { name: 'Rubber Plant', image: thumbnail('🪴', '#dcefe6'), description: 'Easy to care for and effective at purifying indoor air.', cost: '$17' },
      { name: 'Aloe Vera', image: thumbnail('🌵', '#e0f1d6'), description: 'Purifies the air and its gel soothes minor burns.', cost: '$14' },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: thumbnail('💜', '#e8dcf5'), description: 'Calming scent used in aromatherapy and relaxation.', cost: '$20' },
      { name: 'Jasmine', image: thumbnail('🌸', '#fbe5ee'), description: 'Sweet fragrance that fills a room at night.', cost: '$18' },
      { name: 'Rosemary', image: thumbnail('🌾', '#dfeedd'), description: 'Fragrant herb used in cooking and for mental clarity.', cost: '$15' },
      { name: 'Mint', image: thumbnail('🍀', '#d6f2e2'), description: 'Refreshing aroma, great for teas and cooking.', cost: '$12' },
      { name: 'Lemon Balm', image: thumbnail('🍋', '#f6f2c9'), description: 'Citrusy scent that helps reduce stress and anxiety.', cost: '$14' },
      { name: 'Hyacinth', image: thumbnail('🌷', '#f2dcf0'), description: 'Spring bloom with a strong, sweet perfume.', cost: '$22' },
    ],
  },
  {
    category: 'Succulents and Cacti',
    plants: [
      { name: 'Echeveria', image: thumbnail('🪷', '#e5eedd'), description: 'Rosette-shaped succulent that thrives in bright light.', cost: '$10' },
      { name: 'Jade Plant', image: thumbnail('☘️', '#d7efdc'), description: 'Long-living succulent said to bring good luck.', cost: '$16' },
      { name: 'Barrel Cactus', image: thumbnail('🌵', '#f1ead2'), description: 'Round, slow-growing cactus that needs very little water.', cost: '$19' },
      { name: 'Zebra Haworthia', image: thumbnail('🌿', '#dcebe4'), description: 'Small striped succulent, perfect for desks and shelves.', cost: '$11' },
      { name: 'String of Pearls', image: thumbnail('🟢', '#e2f3d9'), description: 'Trailing succulent with bead-like leaves for hanging pots.', cost: '$21' },
      { name: 'Bunny Ear Cactus', image: thumbnail('🐰', '#f0e6d8'), description: 'Pad-shaped cactus that looks like a pair of bunny ears.', cost: '$13' },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = (plantName) => cartItems.some((item) => item.name === plantName);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  return (
    <div>
      <nav className="navbar">
        <a href="#home" className="navbar-brand" onClick={handleHomeClick}>
          <span className="navbar-logo">🌿</span>
          <span>
            <span className="navbar-title">Paradise Nursery</span>
            <span className="navbar-subtitle">Where Green Meets Serenity</span>
          </span>
        </a>
        <div className="navbar-links">
          <a href="#home" onClick={handleHomeClick}>Home</a>
          <a href="#plants" onClick={handlePlantsClick}>Plants</a>
          <a href="#cart" className="cart-link" onClick={handleCartClick} aria-label="Cart">
            <svg className="cart-icon" viewBox="0 0 256 256" width="42" height="42" aria-hidden="true">
              <circle cx="80" cy="216" r="12" />
              <circle cx="184" cy="216" r="12" />
              <path
                d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
            </svg>
            <span className="cart-count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-grid">
          {plantsArray.map((category) => (
            <section key={category.category}>
              <h2 className="category-title">{category.category}</h2>
              <div className="product-list">
                {category.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <h3 className="product-title">{plant.name}</h3>
                    <p className="product-description">{plant.description}</p>
                    <p className="product-price">{plant.cost}</p>
                    <button
                      className="product-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart(plant.name)}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
