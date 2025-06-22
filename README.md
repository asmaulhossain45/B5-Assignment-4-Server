# 📖 Library Management Project

This project is a Library Management System API built with **Express**, **TypeScript**, and **MongoDB (via Mongoose)**. It provides a robust backend for managing books and borrowing records, including schema validation, business logic enforcement, aggregation pipelines and filtering features.

## 🚀 Features
- Create, read, update, and delete books with proper validation.
- Borrow books with availability checks and quantity management.
- Auto-update book availability using Mongoose middleware.
- Summarize borrowed books with total quantities using aggregation pipeline.
- Filter books by genre and sort by fields like createdAt.
- Centralized error handling.

## ⚙️ Tech Stack
- Node.js: Runtime environment
- Express: Web framework for building the API
- TypeScript: Strongly-typed JavaScript for better code reliability
- MongoDB: NoSQL database for storing books and borrow records
- Mongoose: ODM for MongoDB to handle schema validation and queries

## 📁 Project Structure
```
src/
├── app/
│   ├── controllers/        # Route controllers
│   ├── interfaces/         # TypeScript interfaces
│   ├── middlewares/        # Error handling & validation
│   ├── models/             # Mongoose models
│   └── routes/             # Express routes
├── config/                 # env config
├── server.ts               # Entry point
├── app.ts                  # Express app setup
└── package.json
```

## 📦 Installation
```bash
gh repo clone asmaulhossain45/B5-Assignment-3
cd B5-Assignment-3
npm install
```

## ⚙️ Environment Variables
Create a `.env` file in the root:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/library
```

## 🛠️ Scripts
```bash
npm run dev      # Run in dev mode using ts-node-dev
npm run build    # Compile TypeScript to JavaScript
npm start        # Run compiled app from dist/
```

## 📚 API Endpoints

### Book Endpoints
#### Create Book
```http
POST /api/books
```
#### Get All Books (with filter, sort, limit)
```http
GET /api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5
```
#### Get Book by ID
```http
GET /api/books/:bookId
```
#### Update Book
```http
PUT /api/books/:bookId
```
#### Delete Book
```http
DELETE /api/books/:bookId
```

### Borrow Endpoints
#### Borrow Book
```http
POST /api/borrow
```
#### Borrow Summary
```http
GET /api/borrow
```

## 🧪 Sample Request
```json
// POST /api/borrow
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}

---
Built for Assignment 3 — Library Management API
