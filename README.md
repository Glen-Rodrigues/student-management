<<<<<<< HEAD
# Student Management System

A full-stack web application for managing student records with CRUD operations. Built with React (frontend), Node.js/Express (backend), and MongoDB (database).

## Features

- ✅ View all students in a list
- ✅ Add new students with validation
- ✅ Edit existing student details
- ✅ Delete students with confirmation
- ✅ Search students by name or course
- ✅ View detailed student information
- ✅ Responsive and mobile-friendly UI
- ✅ Real-time search filtering

## Tech Stack

### Frontend
- React 18.2.0
- React Router DOM 6.8.1
- Axios for API calls
- Bootstrap 5.2.3 for styling
- Custom CSS

### Backend
- Node.js
- Express 4.18.2
- MongoDB with Mongoose 7.5.0
- CORS enabled
- dotenv for environment variables

## Project Structure

```
Glen/
├── backend/
│   ├── server.js          # Express server and API routes
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables (create this)
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── StudentList.js    # Functional component
│   │   │   ├── AddStudent.js     # Functional component
│   │   │   ├── EditStudent.js    # Class component
│   │   │   └── StudentDetails.js
│   │   ├── utils/
│   │   │   └── withRouter.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json      # Frontend dependencies
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (running locally or MongoDB Atlas account)

## Setup Instructions

### 1. Clone or Download the Project

Navigate to the project directory:
```bash
cd Glen
```

### 2. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `backend` directory:
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/student-management
```

   **For MongoDB Atlas (cloud):**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student-management
   ```

4. Make sure MongoDB is running:
   - **Local MongoDB**: Start MongoDB service on your machine
   - **MongoDB Atlas**: Use your connection string in the `.env` file

5. Start the backend server:
```bash
npm start
```

   Or for development with auto-reload:
```bash
npm run dev
```

   The server will run on `http://localhost:5000`

### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

   The frontend will run on `http://localhost:3000` and automatically open in your browser.

## API Endpoints

The backend provides the following RESTful API endpoints:

- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create a new student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student
- `GET /api/health` - Health check endpoint

### Example API Request

**Create a student:**
```bash
POST http://localhost:5000/api/students
Content-Type: application/json

{
  "name": "John Doe",
  "age": 20,
  "course": "Computer Science",
  "email": "john.doe@example.com"
}
```

## Frontend Routes

- `/` - Student List Page (with search)
- `/add` - Add New Student
- `/edit/:id` - Edit Student (Class Component)
- `/student/:id` - Student Details View

## Component Details

### Functional Components
- **StudentList**: Displays all students with search functionality
- **AddStudent**: Form to add new students
- **StudentDetails**: View detailed student information
- **Navbar**: Navigation bar

### Class Component
- **EditStudent**: Form to edit existing students (uses React class component with lifecycle methods)

## Student Schema

```javascript
{
  name: String (required),
  age: Number (required, min: 1),
  course: String (required),
  email: String (required, valid email format),
  createdAt: Date (auto-generated)
}
```

## Features Implementation

### Search Functionality
- Real-time filtering by student name or course
- Case-insensitive search
- Updates the list as you type

### Form Validation
- Client-side validation for all fields
- Server-side validation with meaningful error messages
- Email format validation
- Age must be a positive number

### Delete Confirmation
- Modal dialog appears before deleting
- Shows student name for confirmation
- Prevents accidental deletions

## Troubleshooting

### Backend Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally, or
   - Check your MongoDB Atlas connection string in `.env`
   - Verify network connectivity

2. **Port Already in Use**
   - Change the PORT in `.env` file
   - Or stop the process using port 5000

### Frontend Issues

1. **Cannot Connect to Backend**
   - Ensure backend server is running on port 5000
   - Check CORS settings in `server.js`
   - Verify API_URL in components matches your backend URL

2. **Dependencies Installation Fails**
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` and `package-lock.json`, then reinstall

## Development Notes

- The Edit Student page uses a React class component to demonstrate lifecycle methods (`componentDidMount`)
- All other components use functional components with React Hooks
- Bootstrap is included for responsive design
- Custom CSS provides additional styling and animations
- Error handling is implemented on both frontend and backend

## Future Enhancements

- Pagination for large student lists
- Sorting functionality
- Export to CSV/PDF
- User authentication
- Image upload for students
- Advanced filtering options

## License

This project is open source and available for educational purposes.

## Author

Student Management System - Full Stack Application

---

**Happy Coding! 🚀**

=======
# student-management
>>>>>>> 456b6829135eb65fb0403da0dc8ae98c3182f72d
