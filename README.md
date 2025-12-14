# 🍬 SweetShop (MERN Stack)

A full‑stack **Sweet Shop Management System** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.
This project supports **Admin and User roles**, product management, cart, order placement, invoice generation, and dashboard analytics.

---

## 🚀 Features

### 👤 Authentication

* User Registration & Login
* Admin Login
* Role‑based access (Admin / User)
* JWT‑based secure authentication

### 🍭 User Features

* View available sweets
* Search sweets
* Add / remove sweets from cart
* Increase or decrease quantity (like food delivery apps)
* Place order
* View all past orders
* Download invoice (PDF)

### 🛠️ Admin Features

* Add new sweets
* Update sweet price & stock
* Delete sweets
* Restock sweets
* View all user orders
* Order status management
* Revenue & Profit charts

### 📊 Dashboard

* Total sales
* Total orders
* Revenue & profit visualization using charts

---

## 🏗️ Project Structure

```
sweet-shop-management-system/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Sweet.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── sweetRoutes.js
│   │   ├── orderRoutes.js
│   │   └── dashboardRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── utils/
│   │   └── invoice.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── UserDashboard.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── Orders.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── CartContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* bcryptjs

---

## 🧑‍💻 Installation & Setup

### 2️1️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create `.env` file in backend:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Default Admin Setup

You can manually insert admin data into MongoDB:

```json
{
  "name": "Admin",
  "email": "admin@sweetshop.com",
  "password": "$2a$10$XXXXXXXXXXXXXXXXXXXXXXXX",
  "role": "admin"
}
```

(Password must be bcrypt hashed)

---

## 📄 Invoice Generation

* PDF invoice generated after order placement
* Download available from Orders page

---

## 📈 Future Improvements

* Online payment gateway
* Order delivery tracking
* Customer reviews
* Email notifications

---

## 🤝 Contribution

Contributions are welcome!
Feel free to fork the repository and submit pull requests.

---

## 📧 Contact

**Developer:** Paras Baraiya
**GitHub:** [https://github.com/Paras-Baraiya](https://github.com/Paras-Baraiya)

---

## ⭐ If you like this project

Please give it a ⭐ on GitHub 🙂
