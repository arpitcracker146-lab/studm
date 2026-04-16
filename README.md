# Student Management CRUD Application

A comprehensive full-stack CRUD application for managing student records. Developed with the Node.js, Express, MongoDB, and Bootstrap tech stack. Built as a 2nd-year BTech minor project.

## Features Built
- Add, Edit, View, and Delete Student Records (CRUD capabilities)
- Real-time client-side search functionality
- Asynchronous API communication via modern `fetch` and async/await
- Responsive layout across desktop and mobile devices via Bootstrap 5
- Confirm dialogs before deletion and interactive modal for updating
- Standard MVC backend structure holding independent controllers and routes
- Seamless Error messaging and loaders to represent processing state.

## Folder Structure Hierarchy
```text
StudentManagementApp/
│
├── backend/
│   ├── config/
│   │   └── db.js (Mongoose connection)
│   ├── controllers/
│   │   └── studentController.js (CRUD algorithms)
│   ├── models/
│   │   └── Student.js (Mongoose DB Schema)
│   ├── routes/
│   │   └── studentRoutes.js (Express Route Mappings)
│   ├── package.json
│   ├── server.js (Server runner)
│   └── seed.js (Dummy data populator)
│
├── frontend/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── components.js (Dynamic Header/Footer generator)
│   │   └── script.js (Asynchronous DOM logic & API calls)
│   ├── index.html (Dashboard)
│   ├── add.html (Insertion form page)
│   ├── view.html (Data table view page)
│   └── about.html (Descriptive static page)
│
└── README.md
```

## How to Deploy and Run Locally

### Prerequisites
Make sure you have installed on your local computer:
1. **Node.js** (v14 or above) - https://nodejs.org
2. **MongoDB Database** (running locally on standard port 27017 or use Atlas) - https://mongodb.com

### Step 1: Install Backend Dependencies
Open your terminal, navigate to the `backend` folder and run `npm install`:
```bash
cd backend
npm install
```

### Step 2 (Optional): Load Dummy Data
If you'd like to test with some initial entries, populate your Mongo database by running the seed script:
```bash
node seed.js
```

### Step 3: Start Backend API Server
Start local Express API on port 5000 using Node:
```bash
node server.js
```
The console will log `MongoDB connection successful...` and `Server running on port 5000`.

### Step 4: Open the Frontend
Open `frontend/index.html` simply by double-clicking it via your file manager, or run it through a VS Code Live Server extension. You do NOT have to host the frontend on an HTTP server as it runs smoothly from local file URLs and hooks right into the background `localhost:5000` REST pipeline.

## API Endpoints References
| Method | Endpoint         | Purpose               |
|--------|------------------|-----------------------|
| `POST` | `/api/add`       | Add a new Student     |
| `GET`  | `/api/students`  | Retrieve all Students |
| `PUT`  | `/api/update/:id`| Modify Student status |
| `DELETE`| `/api/delete/:id`| Remove Student Record |

**Web Development Minor Project - Created exclusively with ❤️ by you!**
