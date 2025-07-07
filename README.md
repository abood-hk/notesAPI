# 🔸 Notes API

Notes API is a **full-stack web application** for managing notes with a RESTful API backend and interactive frontend interface. Built with **Express.js** backend and **vanilla HTML/CSS/JavaScript** frontend, featuring secure data validation, MongoDB integration, and comprehensive CRUD operations.

## 🌐 Live Demo

- **Frontend:** [https://notesapi-bach.onrender.com](https://notesapi-bach.onrender.com)
- **API Base URL:** `https://notesapi-bach.onrender.com/api`

---

## 📁 Project Structure

```
Day-15-22-Project/
│
├── api/                    → JSON data files
├── controllers/           → Route logic (api, main)
│   ├── apiController.js   → API endpoints logic
│   └── mainController.js  → Main routes logic
├── dataBase/             → Database configuration
│   ├── connect.js        → MongoDB connection
│   └── models/           → Mongoose models
│       ├── notes.js      → Note schema
│       └── users.js      → User schema
├── meddleware/           → Custom middleware
│   ├── errorHandler.js   → Error handling
│   ├── logger.js         → Request logging
│   └── validation.js     → Input validation
├── public/               → Static files
│   ├── html/            → HTML files
│   ├── images/          → Image assets
│   ├── script/          → JavaScript files
│   ├── style/           → CSS files
│   └── index.html       → Main page
├── routers/             → Express routers
│   ├── apiRouter.js     → API routes
│   └── mainRouter.js    → Main routes
├── views/               → EJS templates
│   └── notes.ejs        → Notes view
├── server.js            → App entry point
├── package.json         → Dependencies and scripts
└── README.md           → This file
```

---

## 🚀 Tech Stack

### Backend

- **Server:** Express.js
- **Database:** MongoDB with Mongoose
- **Template Engine:** EJS
- **Security:** Helmet.js, CORS
- **Validation:** Express-validator
- **Logging:** Custom logger middleware

### Frontend

- **Framework:** Vanilla HTML/CSS/JavaScript
- **Styling:** Custom CSS
- **Real-time:** Form-based API testing

---

## 🔐 Security & Validation

- **Input Validation:** Express-validator for API endpoints
- **Security Headers:** Helmet.js for enhanced security
- **CORS Support:** Cross-origin resource sharing enabled
- **Error Handling:** Centralized error handling middleware
- **Request Logging:** Custom logger for all incoming requests

---

## 📦 API Endpoints

### Status Routes

| Method | Endpoint    | Description    |
| ------ | ----------- | -------------- |
| GET    | /api/status | Get API status |

### Notes Routes

| Method | Endpoint       | Description                |
| ------ | -------------- | -------------------------- |
| GET    | /api/notes     | Get all notes (with limit) |
| GET    | /api/notes/:id | Get note by ID             |
| POST   | /api/notes     | Create new note            |
| PUT    | /api/notes/:id | Update note by ID          |
| DELETE | /api/notes/:id | Delete note by ID          |

### Query Parameters

| Parameter | Type   | Description               |
| --------- | ------ | ------------------------- |
| limit     | number | Number of notes to return |
| id        | string | MongoDB ObjectId for note |

### Request Body (POST/PUT)

```json
{
  "title": "Note Title",
  "content": "Note content here"
}
```

---

## 💡 Features

- ✅ Complete CRUD operations for notes
- ✅ RESTful API with proper HTTP methods
- ✅ Interactive web interface for API testing
- ✅ Data validation and error handling
- ✅ MongoDB integration with Mongoose
- ✅ User association for notes
- ✅ Real-time form-based API testing
- ✅ Responsive design
- ✅ Security headers and CORS support
- ✅ Cloud deployment on Render

---

## ⚙️ Environment Variables

### `.env`

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/notes-api
```

---

## 🛠️ Scripts

```bash
# Install dependencies
npm install

# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

---

## 🎨 Frontend Interface

The application includes a user-friendly web interface at the root URL (`/`) that allows you to:

- Test all CRUD operations through a form interface
- Select HTTP methods (GET, POST, PUT, DELETE)
- Input note data (title, content, ID)
- View API responses
- Set limits for GET requests

---

## 📊 Data Models

### Note Schema

```javascript
{
  title: String (required, 3-50 characters),
  content: String (required, 1-250 characters),
  user: ObjectId (references users collection),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-updated)
}
```

---

## ☁️ Deployment

- **Platform:** Render
- **Live URL:** [https://notesapi-bach.onrender.com](https://notesapi-bach.onrender.com)
- **Database:** MongoDB Atlas (cloud-hosted)

---

## 🧑‍💻 Author

Made by **Abdulrahman Khatib**

---

## 📝 License

This project is licensed under the ISC License.
