# 📚 Bookkeeper SQL API

A simple RESTful API built with **Node.js**, **Express**, and **SQLite** that allows users to manage books and associated notes. This project demonstrates core backend skills including SQL schema design, relational data, REST endpoints, and proper HTTP status handling.

---

## ✨ Features

* Create, read, and delete books
* Add notes associated with specific books
* Fetch a single book along with all its notes
* SQLite database with foreign key constraints
* Cascading deletes (removing a book removes its notes)

---

## 🛠 Tech Stack

* **Node.js**
* **Express**
* **SQLite** (via `better-sqlite3`)
* JavaScript (ES6)

---

## 📁 Project Structure

```
project-root/
├── app.js          # Express application and routes
├── database.js     # SQLite database setup and seeding
├── package.json
└── README.md
```

---

## 🗄 Database Schema

### books

| Column | Type    | Description      |
| ------ | ------- | ---------------- |
| id     | INTEGER | Primary key      |
| title  | TEXT    | Book title       |
| author | TEXT    | Book author      |
| year   | INTEGER | Publication year |

### notes

| Column  | Type    | Description         |
| ------- | ------- | ------------------- |
| id      | INTEGER | Primary key         |
| book_id | INTEGER | References books.id |
| content | TEXT    | Note text           |

Foreign key constraints ensure notes are deleted automatically when their associated book is removed.

---

## 🚀 API Endpoints

### Get all books

```
GET /books
```

Response:

```json
{
  "books": [ { "id": 1, "title": "1984", "author": "George Orwell", "year": 1949 } ]
}
```

---

### Get a single book and its notes
