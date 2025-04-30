import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { createTask, deleteTask, getTasks } from '../controllers/taskController.js';

const router = express.Router();

router.route('/')
    .get(protect, getTasks)
    .post(protect, createTask);

router.route('/:id')
    .delete(protect, deleteTask);

export default router;
