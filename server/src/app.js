// 引入 Express 框架
const express = require('express');
// 引入 CORS 中间件（解决跨域问题）
const cors = require('cors');
// 引入 body-parser（解析请求体）
const bodyParser = require('body-parser');
// 引入 dotenv，读取 .env 文件
require('dotenv').config();

// 引入任务路由
const taskRoutes = require('./routes/taskRoutes');
// 引入错误处理中间件
const errorHandler = require('./middleware/errorHandler');

// 创建 Express 应用实例
const app = express();
// 从环境变量读取端口号，默认 3001
const PORT = process.env.PORT || 3001;
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

// ========== 注册中间件 ==========

// CORS：允许前端域名访问（开发环境是 localhost:3000）
app.use(cors({
  origin: allowedOrigins,
  credentials: true,                // 允许携带 Cookie
}));

// 解析 JSON 格式的请求体
app.use(bodyParser.json());
// 解析 URL 编码格式的请求体（表单提交）
app.use(bodyParser.urlencoded({ extended: true }));

// ========== 注册路由 ==========

// 所有 /api 开头的请求交给 taskRoutes 处理
app.use('/api', taskRoutes);

// 健康检查接口（用于检测服务是否正常运行）
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString() 
  });
});

// ========== 注册错误处理（必须放在所有路由之后）==========
app.use(errorHandler);

// ========== 启动服务器 ==========
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📋 API endpoints:`);
    console.log(`   GET    /api/tasks   - 获取所有任务`);
    console.log(`   POST   /api/tasks   - 创建任务`);
    console.log(`   PUT    /api/tasks/:id - 更新任务`);
    console.log(`   DELETE /api/tasks/:id - 删除任务`);
  });
}

module.exports = app;