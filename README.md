# Employee Task Management System

A simple Employee Task Management System built using Node.js and Express.js. This project demonstrates the implementation of HTTP servers, Express routing, REST API development, request handling, input validation, and CRUD operations.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- HTML
- EchoAPI (API testing)

## Project Structure

```text
MT1-LABEXAM/
│
├── public/
│   └── index.html
│
├── screenshots/
│   ├── 01-http-server.png
│   ├── 02-home-route.png
│   ├── ...
│   └── 16-get-tasks-after-deletion.png
│
├── expressApp.js
├── httpServer.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/DishankDevrani/MT1-LABEXAM.git
```

2. Navigate to the project directory:

```bash
cd MT1-LABEXAM
```

3. Install dependencies:

```bash
npm install
```

## Running the Project

Start the Express application:

```bash
node expressApp.js
```

The application runs locally on:

```text
http://localhost:4000
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/tasks` | Retrieve all tasks |
| GET | `/tasks/:id` | Retrieve a task by ID |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update an existing task |
| DELETE | `/tasks/:id` | Delete a task |

## Task Data Format

```json
{
  "taskName": "Develop REST API",
  "assignedTo": "Amit Kumar",
  "status": "Pending",
  "priority": "High"
}
```

## Features

- HTTP server implementation using Node.js.
- Express application and