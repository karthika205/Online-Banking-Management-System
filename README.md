# 🏦 Online Banking Management System

## Tech Stack
- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT + bcryptjs (Role-Based Access Control)

## Folder Structure
```
01-banking-system/
├── backend/
│   ├── config/       → db.js (MongoDB connection)
│   ├── controllers/  → authController, userController, transactionController
│   ├── middleware/   → authMiddleware (JWT + Admin check)
│   ├── models/       → User.js, Transaction.js
│   ├── routes/       → authRoutes, userRoutes, transactionRoutes
│   ├── .env
│   └── server.js
└── frontend/
    ├── public/
    └── src/
        ├── components/ → Navbar
        ├── context/    → AuthContext
        ├── pages/      → Login, Register, Dashboard, Transactions, AdminPanel
        └── utils/      → api.js (axios instance)
```

## How to Run

### Step 1 - Start Backend
```bash
cd backend
npm install
npm run dev
# Server runs on http://localhost:5000
```

### Step 2 - Start Frontend
```bash
cd frontend
npm install
npm start
# App runs on http://localhost:3000
```

### Step 3 - Setup MongoDB
- Install MongoDB locally OR use MongoDB Atlas
- Update `.env` → MONGO_URI with your connection string

## Features
- ✅ Register / Login with JWT Auth
- ✅ bcrypt Password Hashing
- ✅ Role-Based Access (Admin / User)
- ✅ Deposit, Withdraw, Transfer
- ✅ Transaction History
- ✅ Admin Panel - Manage Users
