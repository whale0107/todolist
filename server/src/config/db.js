const { Pool } = require('pg');

// 读取环境变量
const pool = new Pool({
  connectionString: process.env.DB_URL,  // ✅ 从环境变量读取
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

// 测试连接
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ 数据库连接失败:', err.stack);
  } else {
    console.log('✅ 数据库连接成功');
    release();
  }
});

module.exports = pool;