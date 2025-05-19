const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const auth = require('../middlewares/authMiddleware');
const Task = require('../models/Task');

const router = express.Router();

// Async error wrapper
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid task ID' });
  }
  next();
};

// Create a new task
router.post(
  '/',
  auth,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('status')
      .optional()
      .isIn(['Pending', 'Todo', 'In Progress', 'Completed'])
      .withMessage('Invalid status value'),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, status } = req.body;

    const task = new Task({
      title,
      description,
      status: status || 'Pending',
      userId: req.user.id,
    });

    await task.save();
    res.status(201).json(task);
  })
);

// Get all tasks for the authenticated user
router.get(
  '/',
  auth,
  asyncHandler(async (req, res) => {
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  })
);

// Update task by ID
router.put(
  '/:id',
  auth,
  validateObjectId,
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().notEmpty().withMessage('Description cannot be empty'),
    body('status')
      .optional()
      .isIn(['Pending', 'Todo', 'In Progress', 'Completed'])
      .withMessage('Invalid status value'),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    Object.assign(task, req.body);
    await task.save();
    res.status(200).json(task);
  })
);

// Delete task by ID
router.delete(
  '/:id',
  auth,
  validateObjectId,
  asyncHandler(async (req, res) => {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  })
);

module.exports = router;
