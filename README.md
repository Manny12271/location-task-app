# 🧠 Smart Location-Based Task App

## 📌 Project Overview

This is a full-stack productivity application built with React and Flask that allows users to manage tasks tied to specific locations. The app helps users stay organized by associating tasks with real-world places, making it easier to remember and complete them.

---

## 🚀 Features

* User authentication (signup & login with JWT)
* Create, read, update, and delete tasks (CRUD)
* Associate tasks with locations
* Mark tasks as complete/incomplete
* User-specific data (users can only access their own tasks)
* Pagination for task retrieval
* Responsive frontend using React

---

## 🛠️ Technologies Used

### Frontend

* React
* JavaScript (ES6+)
* React Hooks (useState, useEffect)

### Backend

* Flask
* Flask-JWT-Extended (authentication)
* Flask-Bcrypt (password hashing)
* Flask-SQLAlchemy (ORM)
* Flask-Migrate (database migrations)
* Flask-CORS

### Database

* SQLite (development)

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Manny12271/location-task-app.git
cd location-task-app
```

---

### 2. Backend Setup (Flask)

```bash
cd server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Run the server:

```bash
flask run --host=0.0.0.0
```

---

### 3. Frontend Setup (React)

```bash
cd client
npm install
npm start
```

---

## 🔐 Authentication

* Users must log in to access tasks
* JWT tokens are used for secure authentication
* Each request to protected routes includes a Bearer token

---

## 📡 API Endpoints

### Auth Routes

* `POST /api/auth/signup` → Create new user
* `POST /api/auth/login` → Login and receive token

### Task Routes

* `GET /api/tasks/` → Get user tasks (with pagination)
* `POST /api/tasks/` → Create a new task
* `PATCH /api/tasks/:id` → Update a task
* `DELETE /api/tasks/:id` → Delete a task

---

## 📄 Example Task Object

```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk and eggs",
  "location": "Walmart",
  "completed": false
}
```

---

## 🎯 Key Functionality

* Full CRUD operations implemented
* Backend enforces ownership of data
* Frontend dynamically updates based on API responses
* Pagination implemented for scalable data handling

---

## ⚠️ Known Limitations

* No persistent login (token stored in memory only)
* Basic UI styling
* SQLite used instead of PostgreSQL (can be upgraded)

---

## 📈 Future Improvements

* Add persistent login (localStorage)
* Improve UI with Tailwind or Chakra UI
* Add edit form for tasks
* Integrate maps API for real location selection
* Deploy application (Render, Netlify, etc.)

---

## 🎥 Demo

The application demonstrates:

* User login
* Task creation
* Task updates (toggle complete)
* Task deletion
* User-specific data access

---

## 👨‍💻 Author

Manuel Alfaro

---

## 📌 Conclusion

This project demonstrates full-stack development skills including API design, authentication, database relationships, and frontend integration using React and Flask.
