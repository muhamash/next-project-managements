# 📝 Task Management System

A **scalable and maintainable** full-stack Task Management System with advanced features for task tracking, user authentication, and performance optimizations.

## 🚀 Features

### 🔹 **Frontend (React.js with Next.js)**
✅ User authentication (Login/Signup).  
✅ Dashboard with **task filtering** (by status, due date, etc.).  
✅ Create, edit, and delete tasks **with validation**.  
✅ **Dark mode support** for better accessibility.  
✅ **Responsive design** (mobile & desktop).  

### 🔹 **Backend (Node.js + Express.js)**
✅ RESTful APIs for authentication & task management.  
✅ **Error handling** with structured response format.  
✅ **Bulk task updates** (batch editing).  
✅ **Task activity log** (track task creation, updates, and deletions).  

### 🔹 **Database (MySQL)**
✅ Tables: `Users`, `Tasks`, `Roles`, `Task Activities`.  
✅ **Relationships**:
   - `Users` ↔ `Tasks` (One-to-Many).  
   - `Tasks` ↔ `Task Activities` (One-to-Many).  
   - `Users` ↔ `Roles` (Many-to-Many).  
✅ **Optimizations**: Indexing, stored procedures, and soft deletes.  

### 🔹 **Enhancements**
🔹 **Caching**: Redis integration for faster API responses.  
🔹 **Testing**: Unit and integration tests for APIs.  
🔹 **Security**: CSRF protection, SQL injection prevention, and HTTPS support.  
🔹 **Performance**: Lazy loading, optimized database queries.  
🔹 **Analytics**: Task summary reports (total, completed, overdue).  

---

## 📂 **Project Structure**
task-management-system/ │── frontend/ # React + Next.js frontend
│──  # Node.js as backend
│── database/ # MySQL database schema & migrations
│──utils/ # Utility functions (caching, logging, etc.)
│──routes/ # API endpoints
│── middleware/ # Authentication & security middleware
│── .env.example # Environment variable configuration
│── README.md # Project documentation


## 🛠️ **Setup Instructions**
### **1️⃣ Prerequisites**
Ensure you have the following installed on your system:
- **[Node.js](https://nodejs.org/)** and **npm** (for package management).
- **[MySQL](https://www.mysql.com/)** (for database storage).
- **.env file configuration** 

---

### **2️⃣ Installation Steps**
#### **🔹 Clone the repository**
```bash
git clone https://github.com/muhamash/next-project-managements.git
cd task-management-system
npm install
npm run dev
or, 
yarn
yarn dev

Now, open http://localhost:3000 to access the app.

🔐 Security Best Practices
✅ Sanitize user inputs to prevent SQL injection.
✅ Use HTTPS and enable CSRF tokens.
✅ Store sensitive information in environment variables.
✅ Implement authentication with JWT tokens.

📊 Performance Optimizations
✅ async operations to loading for task lists.
✅ Optimized database queries (JOINs, indexing).
✅ Nextjs caching to improve response times.

🛡️ Testing
Run unit and integration tests using:

bash -->> npm test

📜 API Endpoints
🔹 Authentication
Method	Endpoint	Description
POST	/api/auth/login	User login
POST	/api/auth/signup	User registration
POST	/api/auth/logout	User logout
🔹 Task Management
Method	Endpoint	Description
GET	/api/tasks	Fetch all tasks
POST	/api/tasks	Create a new task
PUT	/api/tasks/:id	Update a task
DELETE	/api/tasks/:id	Delete a task
PATCH	/api/tasks/bulk	Bulk update tasks

GET /api/auth/download/excel?userId=${userId} to download user task on a excel file
GET /api/auth/download/csv?userId=${userId} to download csv file
GET api/tasks/user-tasks-states?userId=${userId} get user sates
GET /api/tasks?userId=${userId}&status=${status} get status based task or id based
GET api/auth/user-details?userId=${userId} user details


🏆 Evaluation Criteria
✔️ Code Quality: Clean, modular, DRY principles.
✔️ Functionality: Fully working core & advanced features.
✔️ UI/UX Design: Responsive, intuitive, and visually appealing.
✔️ Database Design: Efficient schema with normalization & indexing.
✔️ Security: Protection against common vulnerabilities.
✔️ Performance Optimization: Fast API responses with caching & optimized queries.
✔️ Documentation: Clear setup instructions and API references.


📝 License
This project is licensed under the MIT License.