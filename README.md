# MERN Stack Sweets E-commerce Platform

## About

This project is an e-commerce platform for selling a wide variety of sweets, built using the MERN stack (MongoDB, Express, React, Node.js). It offers users a seamless way to browse and purchase sweets online, featuring a modern and intuitive design for an enhanced shopping experience. The platform is optimized for both desktop and mobile devices, ensuring a smooth experience for all customers.

## Features

- **User Authentication**: Users can register, log in, and manage their profiles securely using JWT (JSON Web Tokens).
- **Sweets Catalog**: Dynamic display of sweets, with filtering options based on category, price, ingredients, and user preferences.
- **Shopping Cart**: Users can add, update, and remove sweets in their cart. The cart is saved persistently using local storage.
- **Payment Integration**: Integrated with razorpay for smooth and secure payment processing.
- **Admin Dashboard**: Admins can manage products (add/edit/remove sweets), view customer orders, and handle user management.
- **Order Management**: Users can view their past orders, track order status, and receive updates on their purchases.
- **Responsive Design**: Optimized for both mobile and desktop users to ensure easy browsing and shopping on any device.
- **Special Offers**: Admins can create and manage discounts or festive offers for specific sweets.
- **MongoDB Database**: Stores all product, user, and order information in a NoSQL database, ensuring fast and scalable data handling.
- **RESTful API**: Built with Node.js and Express to serve the frontend with product data, handle user authentication, and manage orders.
- **React Frontend**: A fast and interactive frontend built with React, ensuring a smooth user experience.

## Tech Stack

- **Frontend**: React.js, Redux (for state management)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (MongoDB Atlas or local instance)
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Gateway**: Stripe or PayPal
- **Styling**: CSS, Bootstrap

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or above)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas)
- [Stripe/PayPal](https://stripe.com) account for payment integration

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sweets-ecommerce.git
   cd sweets-ecommerce
