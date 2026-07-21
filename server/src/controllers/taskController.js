// server/src/controllers/taskController.js

const db = require('../config/db');

// ============================================================
// 1. 获取所有任务
// ============================================================
async function getAllTasks(req, res, next) {
  try {
    const result = await db.query(
      'SELECT id, title, description, completed, created_at, updated_at FROM tasks ORDER BY created_at DESC'
    );
    res.json({
      code: 0,
      data: result.rows,
      message: 'success',
    });
  } catch (error) {
    next(error);
  }
}

// ============================================================
// 2. 创建任务
// ============================================================
async function createTask(req, res, next) {
  const { title, description } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({
      code: 10001,
      data: null,
      message: '任务标题不能为空',
    });
  }

  try {
    const result = await db.query(
      'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
      [title.trim(), description || '']
    );

    res.json({
      code: 0,
      data: result.rows[0],
      message: '创建成功',
    });
  } catch (error) {
    next(error);
  }
}

// ============================================================
// 3. 更新任务（PUT 请求）
// ============================================================
async function updateTask(req, res, next) {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  console.log(`[更新任务] ID: ${id}, 数据:`, req.body);

  try {
    // 检查任务是否存在
    const checkResult = await db.query('SELECT id FROM tasks WHERE id = $1', [id]);
    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        code: 10002,
        data: null,
        message: 'Task not found',
      });
    }

    // 动态构建更新语句
    const updates = [];
    const values = [];
    let paramIndex = 1;

    if (title !== undefined) {
      updates.push(`title = $${paramIndex}`);
      values.push(title.trim());
      paramIndex++;
    }
    if (description !== undefined) {
      updates.push(`description = $${paramIndex}`);
      values.push(description || '');
      paramIndex++;
    }
    if (completed !== undefined) {
      updates.push(`completed = $${paramIndex}`);
      values.push(completed ? 1 : 0);
      paramIndex++;
    }

    if (updates.length === 0) {
      return res.status(400).json({
        code: 10003,
        data: null,
        message: '没有需要更新的字段',
      });
    }

    values.push(id);
    const result = await db.query(
      `UPDATE tasks SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );

    res.json({
      code: 0,
      data: result.rows[0],
      message: '更新成功',
    });
  } catch (error) {
    next(error);
  }
}

// ============================================================
// 4. 删除任务（DELETE 请求）
// ============================================================
async function deleteTask(req, res, next) {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM tasks WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        code: 10002,
        data: null,
        message: 'Task not found',
      });
    }

    res.json({
      code: 0,
      data: { id: parseInt(id) },
      message: '删除成功',
    });
  } catch (error) {
    next(error);
  }
}

// ============================================================
// 5. 切换任务完成状态
// ============================================================
async function toggleComplete(req, res, next) {
  const { id } = req.params;

  try {
    // 先获取当前状态
    const checkResult = await db.query('SELECT completed FROM tasks WHERE id = $1', [id]);
    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        code: 10002,
        data: null,
        message: 'Task not found',
      });
    }

    const currentCompleted = checkResult.rows[0].completed;
    const newCompleted = currentCompleted === 0 ? 1 : 0;

    const result = await db.query(
      'UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *',
      [newCompleted, id]
    );

    res.json({
      code: 0,
      data: result.rows[0],
      message: '切换成功',
    });
  } catch (error) {
    next(error);
  }
}

// ============================================================
// ✅ 导出所有函数
// ============================================================
module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleComplete,
};