E-Commerce Product Listing 

This is a full-stack e-commerce application built using the React,node, Express and mysql
It includes both a user shopping experience and an admin panel for managing products, categories, and users.

Features
1.User Features
- View a list of products with name, price, and image
- View detailed product information
- Search and filter products
- Add products to the shopping cart
- Manage cart items (update quantity, remove items)

2.Admin Features
- Admin Panel (secured via authentication)
- Create, update, and delete categories
- Create, update, and delete products
- View all registered users

3. Backend Features
- RESTful API using Express.js
- MYSql databse with sequelize 
- JWT based authetication and authorization

Tech Stack
Frontend:
- React + React Router
- Context API
- Axios 
- Tailwind CSS

Backend:
Node.js + Express.js
MYSql + Sequelize
JWT (for authentication)


Installation & Setup

1.Clone the Repository
git clone https://github.com/SsagarikaR/e-commerce/edit/master

Backend Setup

Navigate to the backend folder:
cd e-commerce-backend

Install dependencies:
npm install

Create .env file with following variable
JWT
DBNAME
DBUSER
PASSWORD

Start the backend server:
npm run dev

Frontend Setup

Open a new terminal and navigate to the frontend folder:
cd e-commerce-frontend

Install frontend dependencies:
npm install

Start the React development server:
npm run dev
