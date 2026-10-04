import express from 'express';
import {
    createTask,
    deleteTask,
    getAllTasks,
    updateTaskStatus,
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getAllTasks);   // Get all tasks
router.post('/', createTask);   // Add new task
router.put('/:id', updateTaskStatus);   // Update task status
router.delete('/:id', deleteTask);  // Delete task

export default router;