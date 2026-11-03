import http from 'node:http';
import fs from 'node:fs';

let tasks = [
    {
        id: 1,
        taskName: 'Develop Login Page',
        assignedTo: 'Rahul Sharma',
        status: 'Pending'
    },
    {
        id: 2,
        taskName: 'Design Dashboard',
        assignedTo: 'Amit Kumar',
        status: 'In Progress'
    },
    {
        id: 3,
        taskName: 'Test Application',
        assignedTo: 'Priya Singh',
        status: 'Completed'
    }
];

const server = http.createServer((req, res) => {

    // GET /
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Welcome to Employee Task Management System</h1>');
    }

    // GET /tasks
    else if (req.method === 'GET' && req.url === '/tasks') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tasks));
    }

    // GET /about
    else if (req.method === 'GET' && req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h2>Employee Task Management Application</h2><p>Manage and track employee tasks efficiently.</p>');
    }

    // GET /home
    else if (req.method === 'GET' && req.url === '/home') {
        fs.readFile('./public/index.html', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading HTML file');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }

    // POST /add-task
    else if (req.method === 'POST' && req.url === '/add-task') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                const task = JSON.parse(body);

                if (
                    task.id === undefined ||
                    !task.taskName ||
                    !task.assignedTo ||
                    !task.status
                ) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'All required fields are mandatory' }));
                    return;
                }

                tasks.push(task);

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: 'Task added successfully',
                    task: task
                }));

            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid JSON request' }));
            }
        });
    }

    // Invalid routes
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Page Not Found');
    }

});

server.listen(3000, () => {
    console.log('HTTP Server running at http://localhost:3000');
});