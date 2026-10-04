import db from '../config/db.js';

const ALLOWED_STATUSES = ['todo', 'in-progress', 'done'];

// GET /api/tasks (Retrieve all tasks)
export const getAllTasks = async (req, res) => {
    try {
        const [tasks] = await db.query(
            'SELECT * FROM tasks ORDER BY id DESC'
        );

        return res.status(200).json(tasks);
    } catch (error) {
        console.error('Get tasks error:', error)
        return res.status(500).json({ error: error.message });
    }
};

// POST /api/tasks (Create a new task)
export const createTask = async (req, res) => {
    try {
        const { title, status = 'todo' } = req.body;

        // Validate title
        if (!title || title.trim() === '') {
            return res.status(400).json({ error: "Task title is required!" });
        }

        // Validate status
        if (!status || ALLOWED_STATUSES.includes(status)) {
            return res.status(400).json({ error: "Status must be todo, in-progress or done." });
        }

        const [result] = await db.query(
            'INSERT INTO tasks (title, status) VALUES (?, ?)',
            [title.trim(), status]
        )

        return res.status(201).json({
            id: result.insertId,
            title: title.trim(),
            status,
        });

    } catch (error) {
        console.error('Create task error:', error);
        return res.status(500).json({ error: error.message });
    }
};

// PUT /api/tasks/:id/status
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const ALLOWED_STATUSES = ['todo', 'in-progress', 'done'];

        if (!ALLOWED_STATUSES.includes(status)) {
            return res.status(400).json({
                error: 'Status must be todo, in-progress, or done',
            });
        }

        const [result] = await db.query(
            'UPDATE tasks SET status = ? WHERE id = ?',
            [status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Task not found',
            });
        }

        const [tasks] = await db.query(
            'SELECT * FROM tasks WHERE id = ?',
            [id]
        );

        return res.status(200).json(tasks[0]);


    } catch (error) {
        console.error("Update task error:", error);
        return res.status(500).json({
            error: "Failed to update task"
        });
    }
};

// DELETE /api/tasks/:id 
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query(
            'DELETE FROM tasks WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Task not found',
            });
        }

        return res.status(200).json({
            message: 'Task deleted successfully',
        });
    } catch (error) {
        console.error('Delete task error:', error);

        return res.status(500).json({
            error: 'Failed to delete task',
        });
    }
};