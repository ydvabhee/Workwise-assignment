
## Overview

This project is a Next.js-based e-commerce platform that supports two types of users: **Buyers** and **Sellers**. The application includes user authentication, product management, and a shopping cart feature. Sellers can add, edit, and delete products, while buyers can search, browse, and add products to their cart.

## Features

### 1. **User Authentication**
   - Users can sign up and log in.
   - During sign-up, users can choose between two roles: **Buyer** or **Seller**.
   - Role-based access control to ensure users have access to the correct functionalities.

### 2. **Seller Functionality**
   - **Product Management**: Sellers can add, edit, and delete their products.
   - Product details include:
     - Name
     - Category (e.g., clothes, shoes)
     - Description
     - Price
     - Discount
   - Sellers have access to a product management dashboard to modify their listings.

### 3. **Buyer Functionality**
   - **Product Search**: Buyers can search for products by name or filter by category.
   - **Shopping Cart**: Buyers can add products to their shopping cart and remove them as needed.
   - **Cart Management**: Buyers can view and manage the items in their cart.

---

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (>= v14)
- **npm** or **yarn** package manager

---

## Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/ydvabhee/Workwise-assignment.git
cd Workwise-assignment/client
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Running the Application

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 4. Building for Production

To build the app for production:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm start
# or
yarn start
```

---

## Application Usage

### **User Authentication**
- Navigate to the **Sign-Up** page to create an account.
- Choose your role as either a **Buyer** or **Seller**.
- Once registered, log in with your credentials.

### **Seller Workflow**
1. After logging in as a seller, it will navigate to the **Product Dashboard**.
2. **Add a Product**: Fill in the product name, category, price, and discount.
3. **View Listings**: Sellers can view their added products from the dashboard.

### **Buyer Workflow**
1. After logging in as a buyer, it will navigate to the **Store** page.
2. **Search for Products**: Use the search bar to find products by name or category.
3. **Add to Cart**: Browse and add products to your shopping cart.
4. **Manage Cart**: View your cart, remove items and manage quantity.

---

## Technologies Used

- **Next.js**: Framework for building the frontend.
- **Tailwind CSS**: Styling framework for designing the user interface.
- **React**: JavaScript library for building dynamic components.
- **NextUI** NextUI is a UI library for React that helps you build beautiful and accessible user interfaces. Created on top of Tailwind CSS

---

## Contributing

Feel free to fork the project and make your contributions. You can submit a pull request with your changes, and we'll review them as soon as possible.

 

Happy coding!