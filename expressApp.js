import express from 'express';

const app = express();
const PORT = 4000;

// Middleware to parse JSON requests
app.use(express.json());

// Initial employee task records
let tasks = [
    {
        id: 1,
        taskName: 'Develop Login Page',
        assignedTo: 'Rahul Sharma',
        status: 'Pending',
        priority: 'High'
    },
    {
        id: 2,
        taskName: 'Design Dashboard',
        assignedTo: 'Amit Kumar',
        status: 'In Progress',
        priority: 'Medium'
    },
    {
        id: 3,
        taskName: 'Test Application',
        assignedTo: 'Priya Singh',
        status: 'Completed',
        priority: 'Low'
    }
];

// GET - Retrieve all tasks
app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

// GET - Retrieve task by ID
app.get('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }

    res.status(200).json(task);
});

// POST - Add a new task
app.post('/tasks', (req, res) => {
    const { id, taskName, assignedTo, status, priority } = req.body;

    if (
        !Number.isInteger(id) ||
        id <= 0 ||
        typeof taskName !== 'string' || !taskName.trim() ||
        typeof assignedTo !== 'string' || !assignedTo.trim() ||
        typeof status !== 'string' || !status.trim() ||
        typeof priority !== 'string' || !priority.trim()
    ) {
        return res.status(400).json({
            message: 'All required fields are mandatory'
        });
    }

    if (tasks.some(t => t.id === id)) {
        return res.status(409).json({
            message: 'Task ID already exists'
        });
    }

    const newTask = {
        id,
        taskName: taskName.trim(),
        assignedTo: assignedTo.trim(),
        status: status.trim(),
        priority: priority.trim()
    };

    tasks.push(newTask);

    res.status(201).json({
        message: 'Task added successfully',
        task: newTask
    });
});

// PUT - Update an existing task
app.put('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }

    const { taskName, assignedTo, status, priority } = req.body;

    if (
        typeof taskName !== 'string' || !taskName.trim() ||
        typeof assignedTo !== 'string' || !assignedTo.trim() ||
        typeof status !== 'string' || !status.trim() ||
        typeof priority !== 'string' || !priority.trim()
    ) {
        return res.status(400).json({
            message: 'All required fields are mandatory'
        });
    }

    task.taskName = taskName.trim();
    task.assignedTo = assignedTo.trim();
    task.status = status.trim();
    task.priority = priority.trim();

    res.status(200).json({
        message: 'Task updated successfully',
        task
    });
});

// DELETE - Delete a task
app.delete('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }

    const deletedTask = tasks.splice(index, 1);

    res.status(200).json({
        message: 'Task deleted successfully',
        task: deletedTask[0]
    });
});

// Handle invalid JSON and other request errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            message: 'Invalid JSON request'
        });
    }

    res.status(500).json({
        message: 'Internal Server Error'
    });
});

// Handle invalid routes
app.use((req, res) => {
    res.status(404).json({
        message: '404 - Route Not Found'
    });
});

// Start Express server
app.listen(PORT, () => {
    console.log(`Express Server running at http://localhost:${PORT}`);
});