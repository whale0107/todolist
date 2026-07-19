/**
 * 全局错误处理中间件
 * 有 4 个参数（err, req, res, next）表示这是错误处理中间件
 */
function errorHandler(err, req, res, next) {
  // 在服务器控制台打印错误堆栈，方便调试
  console.error('Server Error:', err.stack);

  // 根据不同的错误类型返回不同的错误信息
  if (err.code === 'ER_BAD_DB_ERROR') {
    // 数据库不存在或无法连接
    return res.status(500).json({
      code: 50001,
      data: null,
      message: '数据库连接失败，请检查数据库配置',
    });
  }

  // SQL 语法错误
  if (err.code === 'ER_PARSE_ERROR') {
    return res.status(500).json({
      code: 50002,
      data: null,
      message: '数据库查询错误',
    });
  }
  
  // 默认服务器错误
  res.status(500).json({
    code: 50000,
    data: null,
    message: err.message || '服务器内部错误',
  });
}

// 导出错误处理中间件
module.exports = errorHandler;