# Mini Task Board 📋

A full-stack task management web application built for the **Full Stack Developer Intern Assessment**. It allows users to track daily tasks across different workflow statuses (`todo`, `in-progress`, `done`) with real-time database synchronization.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 16 (App Router, Turbopack), React, Tailwind CSS, TypeScript
- **Backend:** Node.js (ES Modules), Express.js, `mysql2`, `cors`, `dotenv`
- **Database:** MySQL

---

## 📁 Project Structure

```text
Task_Board_Assessment/
├── backend/
│   ├── config/
│   │   └── db.js              # MySQL connection pool
│   ├── controllers/
│   │   └── taskController.js  # CRUD controller logic
│   ├── routes/
│   │   └── taskRoutes.js      # Express API routes
│   ├── .env                   # Database & port environment variables
│   ├── schema.sql             # Database creation & table schema
│   ├── server.js              # Express app entrypoint
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── layout.tsx         # Root layout & font configuration
│   │   ├── page.tsx           # Task board UI & API integration
│   │   └── globals.css        # Tailwind styling
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

## ⚡ Prerequisites

Make sure you have the following installed on your machine:
- **Node.js** (v18.x or later)
- **npm** (comes with Node.js)
- **MySQL Server** (running locally on port `3306`)

---

## 🗄️ 1. Database Setup

1. Start your local **MySQL Server**.
2. Open your MySQL client (MySQL Workbench, phpMyAdmin, or MySQL CLI) and run the script from [`backend/schema.sql`](backend/schema.sql):

```sql
CREATE DATABASE IF NOT EXISTS mini_task_board;
USE mini_task_board;

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  status ENUM('todo', 'in-progress', 'done') DEFAULT 'todo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- (Optional) Seed sample data
INSERT INTO tasks (title, status) VALUES 
('Setup Backend API', 'done'),
('Configure MySQL Database', 'done'),
('Create Task Routes and Controllers', 'in-progress'),
('Connect Frontend UI', 'todo');
```

---

## ⚙️ 2. Backend Setup & Run

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `backend/.env`:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=mini_task_board
   ```
   *(Update `DB_PASSWORD` and `DB_USER` with your MySQL credentials).*

4. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend will run at: **`http://localhost:5000`**  
   You should see:
   ```text
   Server is running on port 5000
   MySQL connected successfully!
   ```

---

## 💻 3. Frontend Setup & Run

1. Open a **new terminal** and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend Next.js development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   👉 **`http://localhost:3000`**

---

## 🔌 API Endpoints Reference

All task endpoints are prefixed with `/api/tasks`:

| Method | Endpoint | Description | Request Body | Response Status |
|:---|:---|:---|:---|:---|
| `GET` | `/api/tasks` | Fetch all tasks | _None_ | `200 OK` |
| `POST` | `/api/tasks` | Add a new task | `{"title": "Task name", "status": "todo"}` | `201 Created` |
| `PUT` | `/api/tasks/:id` | Update task status | `{"status": "in-progress"}` | `200 OK` |
| `DELETE` | `/api/tasks/:id` | Delete a task by ID | _None_ | `200 OK` |

### Allowed Task Statuses:
- `todo`
- `in-progress`
- `done`

---

## 🏛️ API Implementation

This project uses **Express.js** for the Node.js API instead of Next.js API routes.

### Why Express?

I chose Express.js because it provides a simple and lightweight way to build the REST API separately from the Next.js frontend. This keeps the frontend and backend responsibilities clearly separated and makes the API easier to develop, test, and extend independently.

---

## 🧪 Quick Test / Health Check

You can verify the backend is running by visiting:
- [http://localhost:5000](http://localhost:5000) -> `{"message":"Hello from server!"}`
- [http://localhost:5000/api/tasks](http://localhost:5000/api/tasks) -> Returns task list JSON array
