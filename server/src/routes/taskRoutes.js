// 引入 Express 框架
const express = require('express');
// 创建路由对象（用于挂载路由）
const router = express.Router();
// 引入任务控制器
const taskController = require('../controllers/taskController');

// 定义 RESTful 风格的路由
// router.METHOD(PATH, HANDLER)

// 获取所有任务（GET 请求）
router.get('/tasks', taskController.getAllTasks);
// 创建任务（POST 请求）
router.post('/tasks', taskController.createTask);
// 更新任务（PUT 请求，:id 是路径参数）
router.put('/tasks/:id', taskController.updateTask);
// 删除任务（DELETE 请求）
router.delete('/tasks/:id', taskController.deleteTask);

// 导出路由，供 app.js 使用
module.exports = router;