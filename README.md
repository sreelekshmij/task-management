# Task Management Application

A simple Task Management Application built using **React**, **Node.js (Express)**, and **Supabase**. The application demonstrates user authentication, role-based authorization, task management, REST APIs, and database integration.

---

# Tech Stack

## Frontend

- React
- SCSS Modules
- React Hook Form
- Yup
- Axios
- React Router DOM

## Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt
- Supabase

## Database

- Supabase (PostgreSQL)

---

# Features

- User Registration
- User Login
- JWT Authentication
- Role-Based Authorization (Admin & User)
- Create Task
- View Tasks
- Update Task
- Soft Delete Task
- Search Tasks by Title
- Filter Tasks by Status
- Server-side Pagination

---

# Project Structure

```
project/
│
├── api/
│   ├── controllers/
│   ├── middleware/
│   ├── migrations/
│   ├── routes/
│   ├── services/
│   ├── config/
│   ├── app.js
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

# Database Setup (Supabase)

1. Create a new project in **Supabase**.
2. Open your project dashboard.
3. Navigate to **SQL Editor**.
4. Click **New Query**.
5. Open the provided SQL migration file from the project.
6. Copy the entire SQL script.
7. Paste it into the SQL Editor.
8. Click **Run**.

The migration script will automatically create the required tables:

- `users`
- `tasks`

along with the required columns, constraints, and default values.

After the migration completes:

1. Navigate to **Project Settings → API**.
2. Copy the **Project URL**.
3. Copy the **SSecret Key** from the API Keys.
4. Add them to the backend `.env` file.

---

# Environment Variables

## Backend (.env)

Create a `.env` file inside the **api** folder.

```env
PORT=5000

JWT_SECRET=your_jwt_secret

SUPABASE_URL=your_supabase_url

SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## Frontend (.env)

Create a `.env` file inside the **frontend** folder.

```env
REACT_APP_API_URL=http://localhost:8080/api
```

---

# Backend Setup

Navigate to the backend folder.

```bash
cd api
```

Install dependencies.

```bash
npm install
```

Start the backend server.

```bash
npm run dev
```

If nodemon is not configured:

```bash
nodemon index.js
```

The backend will run on:

```
http://localhost:8080
```

---

# Frontend Setup

Navigate to the frontend folder.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Start the React application.

```bash
npm start
```

The frontend will run on:

```
http://localhost:3000
```

---

# Running the Application

### Start Backend

```bash
cd api
npm install
npm run dev
```

### Start Frontend

```bash
cd frontend
npm install
npm start
```

Once both servers are running:

- Frontend: **http://localhost:3000**
- Backend: **http://localhost:8080**

---

# User Roles

## User

- Register and Login
- Create Tasks
- View only their own Tasks
- Update only their own Tasks
- Delete only their own Tasks

## Admin

- Login
- View all Tasks
- Create Tasks
- Update any Task
- Delete any Task

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/signup` | Register User |
| POST | `/api/auth/login` | Login User |

---

## Tasks

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/tasks` | Get All Tasks |
| GET | `/api/tasks/:id` | Get Task by ID |
| POST | `/api/tasks` | Create Task |
| PATCH | `/api/tasks/:id` | Update Task |
| DELETE | `/api/tasks/:id` | Soft Delete Task |

---

# Query Parameters

The Get Tasks API supports:

### Pagination

```
?page=1&limit=10
```

### Search by Title

```
?search=meeting
```

### Filter by Status

```
?status=Pending
```

### Combined Example

```
?page=1&limit=10&search=meeting&status=Completed
```

---

# Authentication

Include the JWT token in the Authorization header for all protected routes.

```
Authorization: Bearer <JWT_TOKEN>
```

---

# Validation

Using Yup validation with useForm hook in frontend.

# Notes

- Passwords are securely hashed using **bcrypt**.
- JWT is used for authentication.
- Role-based authorization is implemented for task operations.
- Tasks are **soft deleted** using the `is_deleted` flag.
- Supabase is used as the PostgreSQL database.
- Server-side pagination, search, and status filtering are implemented.

---

# Author

Developed as part of a Full Stack Developer Machine Test using React, Node.js, Express, and Supabase.