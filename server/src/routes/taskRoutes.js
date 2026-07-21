// server/src/routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/tasks', taskController.getAllTasks);
router.post('/tasks', taskController.createTask);
router.put('/tasks/:id', taskController.updateTask);       // ← PUT 在这里
router.delete('/tasks/:id', taskController.deleteTask);    // ← DELETE 在这里
router.patch('/tasks/:id/toggle', taskController.toggleComplete);  // ← 切换状态

module.exports = router;