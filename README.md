----Task Management System –----
A full-stack Task Management System built as part of a Backend Developer (Intern) Project Assignment.
The project demonstrates secure authentication, role-based access control, scalable REST APIs, and frontend integration.

------Project Overview----
This application allows Users to manage their own tasks and Admins to manage all users and tasks.
Key Highlights
Secure authentication using JWT
Role-based access (User / Admin)
RESTful API design with versioning
PostgreSQL database
React frontend for API interaction
Modular and scalable backend architecture

------Tech Stack-----
Backend
Node.js
Express.js
PostgreSQL
JWT Authentication
bcrypt (password hashing)
Sequelize / pg (ORM or query layer)
dotenv
CORS

Frontend
React.js (Vite)
Axios
React Router
Context API
CSS (custom styling)


🔐 Authentication & Authorization
Passwords are hashed using bcrypt
JWT tokens are issued on successful login
Tokens are validated using middleware
Role-based access:
User: Can manage only their own tasks
Admin: Can manage all tasks and users

📌 Roles & Permissions
👤 User
Register & Login
Create, Read, Update, Delete own tasks
View task details
🛡 Admin
Login (admin accounts created manually in DB)
View all users
Delete users
View, Update, Delete any task


📊 Database Schema (PostgreSQL)

---Users Table---
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(10) CHECK (role IN ('user', 'admin')) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

---Tasks Table---
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(100),
  description TEXT,
  status VARCHAR(20) DEFAULT 'todo',
  priority VARCHAR(10) DEFAULT 'low',
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

🔗 API Endpoints (v1)

Auth APIs
| Method | Endpoint                | Description        |
| ------ | ----------------------- | ------------------ |
| POST   | `/api/v1/auth/register` | Register user      |
| POST   | `/api/v1/auth/login`    | Login (user/admin) |

Task APIs
| Method | Endpoint            | Access                      |
| ------ | ------------------- | --------------------------- |
| GET    | `/api/v1/tasks`     | User: own tasks, Admin: all |
| POST   | `/api/v1/tasks`     | User/Admin                  |
| PUT    | `/api/v1/tasks/:id` | Owner or Admin              |
| DELETE | `/api/v1/tasks/:id` | Owner or Admin              |

Admin APIs
| Method | Endpoint            | Description   |
| ------ | ------------------- | ------------- |
| GET    | `/api/v1/users`     | Get all users |
| DELETE | `/api/v1/users/:id` | Delete user   |


🔒 Security Measures
JWT stored securely in localStorage
Protected routes using middleware
Input validation and sanitization
CORS configured properly
Admin-only routes protected via role middleware

🖥 Frontend Features
Login/Register UI
Role selection during login
Task cards displayed in responsive grid
Priority-based color indicators
Modal view for task details
Create/Edit forms with validation
Admin user management page
Logout and session handling

------⚙️ Setup Instructions-----
Backend Setup
cd backend
npm install
Create .env file:
PORT=8000
DATABASE_URL=postgres://username:password@localhost:5432/taskdb
JWT_SECRET=your_secret_key
Run server:
npm run dev

Frontend Setup
cd frontend
npm install
npm run dev

🧪 API Testing
APIs tested using Postman
JWT token passed in headers:
Authorization: Bearer <token>

🔐 Admin Account Creation Policy
Why Admin Is Created Manually
In this project, Admin accounts are not created via the public registration API.
This is an intentional security design decision to prevent:
Unauthorized users registering themselves as admins
Privilege escalation attacks
Accidental exposure of admin-level access
Only trusted system operators (e.g., company, backend team, DBA) can create admin users directly in the database.
This follows real-world production practices where:
Admins are provisioned internally
Public signup is restricted to normal users

🛠 How Admin Is Created (Manual Database Entry)
Admins are created by inserting a record into the users table with role = 'admin'.
Example SQL Insert (PostgreSQL)
INSERT INTO users (name, email, password, role)
VALUES (
  'System Admin',
  'admin@example.com',
  '$2b$10$w8Vb9Ww9wGfZ5q7u1mH9uO9Q6Rk0RZzXnRrMZpR0x8YpQJZK8kZ0y',
  'admin'
);

| Field    | Value               |
| -------- | ------------------- |
| Email    | `admin@example.com` |
| Password | `admin123`          |
| Role     | `admin`             |


🧪 How to Generate Admin Password Hash
To generate the bcrypt hash manually:

Using Node.js REPL

node
const bcrypt = require("bcrypt");
bcrypt.hash("admin123", 10).then(console.log);

Copy the output hash and store it in the database.

🖥 Login on Website
On the login page:
Select Login as Admin
Enter the admin email and password
Admin dashboard access is granted
If:
A user tries to log in as admin → ❌ Access denied
An admin tries to log in as user → ❌ Access denied
This ensures strict role separation.
