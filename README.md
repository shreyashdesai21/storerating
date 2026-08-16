# storerating
# ⭐ StoreRating Platform


A full-stack web application that allows users to discover stores, submit ratings, and manage their reviews. The platform provides separate dashboards and role-based functionality for **Administrators, Users, and Store Owners**.


## 🚀 Live Demo


**Frontend:**  
https://storerating-zeta.vercel.app/


**Backend:**  
Deployed on Render


**Database:**  
PostgreSQL hosted on Neon


---


## 📌 Overview


StoreRating is a role-based store rating platform designed to provide a centralized system for managing stores, users, and ratings.


Users can browse registered stores, search for stores, submit ratings, and modify their ratings.


Administrators can manage users and stores, while store owners can monitor their store's ratings and user feedback.


---


## ✨ Features


### 👤 User


- User registration and login
- Secure authentication using JWT
- Browse registered stores
- Search stores by name and address
- View store ratings
- Submit ratings from **1 to 5 stars**
- Modify previously submitted ratings
- Change password
- Role-based access control


### 🏪 Store Owner


- Secure store-owner login
- Store dashboard
- View overall store rating
- View total number of ratings
- View users who rated the store
- Change password


### 🛠️ Administrator


- Admin authentication
- Admin dashboard
- View platform statistics
- Manage users
- Add new users
- View user details
- Manage stores
- Add new stores
- Assign store owners
- Role-based access control


---


## 🏗️ System Architecture


```text
                    ┌──────────────────────┐
                    │       GitHub         │
                    │   Source Repository  │
                    └──────────┬───────────┘
                               │
              ┌────────────────┴────────────────┐
              │                                 │
              ▼                                 ▼
      ┌───────────────┐                 ┌────────────────┐
      │    Vercel     │                 │     Render     │
      │    Frontend   │ ──── HTTPS ───► │     Backend    │
      │  React + Vite │                 │ Express + Node │
      └───────────────┘                 └───────┬────────┘
                                                │
                                                │ Prisma ORM
                                                ▼
                                      ┌────────────────────┐
                                      │   Neon PostgreSQL  │
                                      │      Database      │
                                      └────────────────────┘
🛠️ Tech Stack
Frontend
React
Vite
React Router
Tailwind CSS
JavaScript
Axios
Backend
Node.js
Express.js
Prisma ORM
JWT Authentication
bcryptjs
Zod
CORS
Database
PostgreSQL
Neon
Prisma Migrations
Deployment
Vercel — Frontend
Render — Backend
Neon — PostgreSQL Database
GitHub — Source Code Management
📂 Project Structure
store-rating-platform/
│
├── backend/
│   │
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.js
│   │
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── env.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── adminController.js
│   │   │   ├── authController.js
│   │   │   ├── ownerController.js
│   │   │   ├── storeController.js
│   │   │   └── userController.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorMiddleware.js
│   │   │   ├── roleMiddleware.js
│   │   │   └── validationMiddleware.js
│   │   │
│   │   ├── routes/
│   │   │   ├── adminRoutes.js
│   │   │   ├── authRoutes.js
│   │   │   ├── ownerRoutes.js
│   │   │   ├── storeRoutes.js
│   │   │   └── userRoutes.js
│   │   │
│   │   ├── services/
│   │   │   ├── adminService.js
│   │   │   ├── authService.js
│   │   │   ├── ownerService.js
│   │   │   ├── ratingService.js
│   │   │   ├── storeService.js
│   │   │   └── userService.js
│   │   │
│   │   ├── utils/
│   │   │   ├── jwt.js
│   │   │   ├── pagination.js
│   │   │   └── password.js
│   │   │
│   │   ├── validators/
│   │   │   ├── authValidator.js
│   │   │   ├── ratingValidator.js
│   │   │   ├── storeValidator.js
│   │   │   └── userValidator.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── tests/
│   │   └── auth.test.js
│   │
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   │
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── owner/
│   │   │   └── user/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env.example
│   ├── vercel.json
│   ├── package.json
│   └── package-lock.json
│
├── docs/
│   └── database-schema.md
│
├── .gitignore
└── README.md
🔐 Authentication & Authorization

The application uses JWT-based authentication.

After successful login, the user's role determines which sections of the application they can access.

Roles
ADMIN
USER
STORE_OWNER
Access Control
ADMIN
 ├── Dashboard
 ├── Users
 ├── Add User
 ├── Stores
 └── Add Store


USER
 ├── Stores
 ├── Submit Rating
 ├── Modify Rating
 └── Change Password


STORE_OWNER
 ├── Owner Dashboard
 └── Change Password

Protected routes are handled through frontend route guards and backend role-based middleware.

⭐ Rating System

Users can provide a rating between:

1 ⭐
2 ⭐
3 ⭐
4 ⭐
5 ⭐

Users can:

Submit a rating
View their rating
Modify their rating
View the store's overall rating

Store owners can view the overall rating and rating information for their store.

🗄️ Database

The application uses PostgreSQL with Prisma ORM.

The database schema and migrations are located in:

backend/prisma/

Prisma is used for:

Database schema management
Migrations
Queries
Relationships
Database client generation
Database Documentation

See:

docs/database-schema.md

for database structure and relationships.

💻 Local Development
Prerequisites

Make sure you have installed:

Node.js
npm
PostgreSQL
Git
1. Clone the Repository
git clone https://github.com/shreyashdesai21/storerating.git

Navigate into the project:

cd storerating
2. Backend Setup

Navigate to the backend:

cd backend

Install dependencies:

npm install

Create:

backend/.env

Use .env.example as a reference.

Example:

DATABASE_URL="postgresql://username:password@localhost:5432/store_rating"
PORT=3000
JWT_SECRET="your-secret-key"

Generate Prisma Client:

npm run prisma:generate

Run migrations:

npm run prisma:migrate

Seed the database:

npm run prisma:seed

Start the backend:

npm run dev

The backend will run on:

http://localhost:3000
3. Frontend Setup

Open another terminal.

Navigate to:

cd frontend

Install dependencies:

npm install

Create:

frontend/.env

Example:

VITE_API_URL=http://localhost:3000/api

Start the frontend:

npm run dev

The frontend will normally run on:

http://localhost:5173
🔧 Production Deployment
Frontend — Vercel

The frontend is deployed using Vercel.

Configuration
Root Directory: frontend
Framework: Vite
Build Command: npm run build
Output Directory: dist

Environment variable:

VITE_API_URL=https://your-backend-url/api
Backend — Render

The backend is deployed using Render.

Configuration
Root Directory: backend
Runtime: Node
Build Command: npm install && npx prisma generate && npm run prisma:deploy
Start Command: npm start

Environment variables:

DATABASE_URL=your-neon-postgresql-url
JWT_SECRET=your-production-secret
NODE_ENV=production
Database — Neon

The production PostgreSQL database is hosted on Neon.

Prisma migrations are deployed using:

npx prisma migrate deploy
🔒 Environment Variables

Never commit actual .env files to GitHub.

Use:

.env.example

for documenting required variables.

Backend
DATABASE_URL=
PORT=
JWT_SECRET=
NODE_ENV=
Frontend
VITE_API_URL=
🧪 Testing

Backend tests are located in:

backend/tests/

Run the test suite with the configured test runner:

npm test

For manual testing, verify:

Authentication
Role-based access
Store creation
User management
Store search
Rating submission
Rating modification
Owner dashboard
Password changes
🚀 Deployment Workflow

After making changes:

git add .
git commit -m "Describe your changes"
git push

The deployment pipeline is:

Git Push
   │
   ├── Vercel → Frontend deployment
   │
   └── Render → Backend deployment

The backend continues to use the Neon PostgreSQL production database.

🛡️ Security

The application implements:

JWT authentication
Password hashing using bcrypt
Role-based authorization
Input validation using Zod
Protected API routes
Environment-based secrets
CORS configuration
Prisma ORM for database access
Important

Never commit:

.env
node_modules/

or any credentials/API keys to the repository.

📈 Future Improvements

Potential future enhancements include:

Email verification
Password reset via email
Store images
Advanced store filtering
Rating analytics
Rating distribution charts
Admin analytics
Store-owner notifications
Review comments
Pagination improvements
Automated CI/CD testing
Docker support
👨‍💻 Author

Shreyash Desai

Computer Science & Engineering Student

GitHub:
https://github.com/shreyashdesai21

📄 License

This project is developed for educational and project purposes.

Add an appropriate open-source license if you plan to distribute the project publicly.



### Recommended GitHub README structure


Your GitHub repository will look much more professional if the top looks like:


```text
⭐ StoreRating Platform


A full-stack role-based store rating platform.


[Live Demo] [GitHub] [Tech Stack]


Features
├── User
├── Store Owner
└── Administrator


Architecture
Tech Stack
Project Structure
Authentication
Database
Local Development
Deployment
Security
Future Improvements
Author
