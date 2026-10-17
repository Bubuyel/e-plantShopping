# Paradise Nursery

**Project name:** Paradise Nursery Shopping Application (e-plantShopping)

Paradise Nursery is an online plant shop built with React and Redux Toolkit. Visitors land on a home page with the company name and a **Get Started** button, browse houseplants grouped by category, add them to a shopping cart and manage the cart.

## Features

- Landing page with a background image, the company name, a short company description and a **Get Started** button
- Product listing with three categories and six plants each, every plant showing a thumbnail, name, description and price
- **Add to Cart** buttons that add the plant to the cart, disable themselves after the plant is added and update the cart icon count
- Navbar on the product and cart pages with links to Home, Plants and Cart
- Shopping cart page showing the total cart amount, and each plant's thumbnail, name, unit price and total cost
- Buttons to increase and decrease quantity, a delete button for each item, a **Checkout** button ("Coming Soon") and a **Continue Shopping** button

## Project structure

| File | Purpose |
| --- | --- |
| `src/App.jsx` | Landing page with the company name and Get Started button |
| `src/App.css` | Landing page styles, including the background image |
| `src/AboutUs.jsx` | Details about the company |
| `src/ProductList.jsx` | Product listing page and navbar |
| `src/CartItem.jsx` | Shopping cart page |
| `src/CartSlice.jsx` | Redux slice with `addItem`, `removeItem` and `updateQuantity` |
| `src/store.js` | Redux store |

## Getting started

```bash
npm install
npm run dev
```

Then open the address shown in the terminal. To create a production build, run `npm run build`.
