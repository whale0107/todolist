const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://todolist_user:5FNHes7wndifxBaBhi3CploXMj0bjNIU@dpg-d9ecit6rnols73e0g6q0-a.ohio-postgres.render.com/todolist_ps7x',
  ssl: { rejectUnauthorized: false },
});

async function init() {
  try {
    console.log('📦 连接数据库...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ 表创建成功');

    await pool.query(`
      INSERT INTO tasks (title, description, completed) VALUES
      ('学习 React 18', '掌握 Hooks、并发模式等新特性', 0),
      ('搭建 Webpack 脚手架', '从零配置 Webpack 开发环境', 1),
      ('完成 Todolist 项目', '前后端联调并部署上线', 0)
    `);
    console.log('✅ 数据插入成功');

    const res = await pool.query('SELECT * FROM tasks');
    console.table(res.rows);
    console.log('✅ 数据库初始化完成！');
    await pool.end();
  } catch (err) {
    console.error('❌ 出错:', err.message);
    await pool.end();
  }
}

init();