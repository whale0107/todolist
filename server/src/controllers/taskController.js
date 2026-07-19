const db = require('../config/db');

//处理 GET /api/tasks 请求
async function getAllTasks(req, res, next)  {
    try {
        const [rows] = await db.query(
            'SELECT id, title, description, completed, created_at, updated_at FROM tasks ORDER BY created_at DESC'
        );
        res.json({code: 0,data: rows, message: 'success'});
    } catch (error) {
        next(error);
    }
}

//处理 POST /api/tasks 请求
async function createTask(req, res, next) {
    const { title, description } = req.body;

    // 验证请求体中的 title 是否为空
    if(!title || title.trim() === '') {
        return res.status(400).json({
            code: 10001,
            data: null,
            message: 'Title is required'
        });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO tasks (title, description) VALUES (?, ?)',
            [title.trim(), description || '']//如果description为空，设为空字符串
        );

        //查询新插入的任务详情（返回完整数据给前端）
        const [rows] = await db.query(
            'SELECT id, title, description, completed, created_at, updated_at FROM tasks WHERE id = ?',
            [result.insertId]
        );

        //返回新创建的任务数据
        res.json({
            code: 0,
            data: rows[0],
            message: 'Task created successfully'
        })
    } catch (error) {
        next(error);
    }
}

//处理 PUT /api/tasks/:id 请求
async function updateTask(req, res, next) {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  console.log('🔥 [updateTask] 收到请求, id:', id, 'body:', req.body);

  try {
    const [existing] = await db.query('SELECT id FROM tasks WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        code: 10002,
        data: null,
        message: 'Task not found',
      });
    }

    const updates = [];
    const values = [];
    if (title !== undefined) {
      updates.push('title = ?');
      values.push(title.trim());
    }
    if (description !== undefined) {
      updates.push('description = ?');
      values.push(description || '');
    }
    if (completed !== undefined) {
      updates.push('completed = ?');
      values.push(completed ? 1 : 0);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        code: 10003,
        data: null,
        message: '没有需要更新的字段',
      });
    }

    values.push(id);
    await db.query(`UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`, values);

    const [rows] = await db.query(
      'SELECT id, title, description, completed, created_at, updated_at FROM tasks WHERE id = ?',
      [id]
    );

    res.json({
      code: 0,
      data: rows[0],
      message: '更新成功',
    });
  } catch (error) {
    console.error('🔥 [updateTask] 错误:', error);
    next(error);
  }
}


//处理 DELETE /api/tasks/:id 请求
async function deleteTask(req, res, next) {
    const { id } = req.params;  //获取任务ID
    try {
        const [result] = await db.query(
            'DELETE FROM tasks WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                code: 10002,
                data: null,
                message: 'Task not found'
            });
        }

        res.json({
            code: 0,
            data: null,
            message: 'Task deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}

//导出控制器函数
module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};