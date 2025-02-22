# Job Tracker

The **Job Tracker** is a full-stack web application designed to help users track and manage their job applications efficiently.
It provides **authentication, job management features (CRUD), filtering, search, pagination, and a statistics dashboard** to streamline the job search process.

## Key Features

**Pagination:** Efficiently handles a large number of job entries.  
**Filters:** Allows users to filter job applications by **status or date**.  
**Search:** Provides a search bar to find jobs by **title or company**.  
**Responsive UI:** A refined design for **mobile and desktop** experiences.  
**Authentication:** Secure login system for multi-user access.  
**Dashboard Metrics:** Displays job statistics, including total jobs and applications by status.  
**Individual Job Page:** A dedicated page for each job with full details.

---

## Technologies Used

### **Frontend:**

- **Next.js (TypeScript):** Provides a performant, scalable, and SEO-friendly UI.
- **Tailwind CSS:** Ensures a modern, mobile-first design.
- **SWR:** Handles data fetching with caching and revalidation.
- **Redux:** Manages the global state of the application efficiently.
- **React Chart:** Visualizes job application data with interactive charts.

### **Backend:**

- **Node.js (TypeScript):** Handles job management, authentication, and API requests.
- **Express.js:** Lightweight framework for building REST APIs.
- **MongoDB:** Stores job entries and user data.
- **Mongoose:** ORM for structuring and interacting with the database.
- **JWT:** Manages authentication and session security.

---

## Job Tracker Pages

### **Dashboard Page:**

Displays job application metrics and statistics.

### **Job List Page:**

Shows all job applications with pagination, filtering, and search options.

### **Individual Job Page:**

Provides a detailed view of a specific job entry.

---

## Environment Variables

Here’s a sample `.env` file to configure the project:

```env
# Database Configuration
MONGO_URI=<your_mongodb_connection_string>

# Authentication
ACCESS_TOKEN_SECRET=<your_secret_access_token>
REFRESH_TOKEN_SECRET=<your_secret_refresh_token>

# Frontend & Backend URLs
FRONTEND_URL=<your_frontend_url>

# Configuration
PORT=5000
NODE_ENV=dev
```

---

## Installation

### **Prerequisites:**

- **Node.js** (v16+)
- **MongoDB** (local or cloud-based)

### **Steps:**

1. Clone the repository:

   ```bash
   git clone https://github.com/cuteanbogdan/job-tracker.git
   cd job-tracker
   ```

2. Set up the `.env` file:

   - Create a `.env` file in the backend directory.
   - Copy the environment variables listed above and update them.

3. Install dependencies for both frontend and backend:

   ```bash
   npm install
   ```

4. Start the backend:

   ```bash
   cd backend
   npm start
   ```

5. Start the frontend:

   ```bash
   cd frontend
   npm run dev
   ```

6. Access the application:
   - Open in your browser:
     ```
     http://localhost:3000
     ```

---

## Contributing

Contributions are welcome! Feel free to submit pull requests or issues to improve the project.

---

## License

This project is licensed under the **MIT License**.
