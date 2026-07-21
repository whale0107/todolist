# 📋 TodoList 全栈任务管理平台

> 一个从零搭建的全栈任务管理应用，涵盖前端工程化、后端 API 开发、数据库设计与云部署。

[![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-blue)](https://whale0107.github.io/todolist/)
[![Render](https://img.shields.io/badge/Deployed-Render-46B8B8)](https://todolist-api-ymta.onrender.com/health)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 🚀 在线体验

- **前端地址**：https://whale0107.github.io/todolist/
- **后端 API**：https://todolist-api-ymta.onrender.com/api/tasks
- **健康检查**：https://todolist-api-ymta.onrender.com/health

---

## 📖 项目简介

这是一个**前后端完全分离**的任务管理 Web 应用，支持任务的**增删改查**和**完成状态切换**。数据通过后端 API 持久化存储于 PostgreSQL 数据库，页面刷新后数据不丢失。

### 核心功能

- ✅ 创建任务（标题 + 描述）
- ✅ 查看任务列表（按创建时间倒序）
- ✅ 编辑任务（标题 + 描述）
- ✅ 删除任务
- ✅ 切换完成状态（勾选/取消勾选）
- ✅ 数据持久化（PostgreSQL 存储）
- ✅ 响应式设计（适配移动端/平板/桌面）

---

## 🛠️ 技术栈

### 前端

| 技术 | 说明 |
|------|------|
| **React 18** | UI 框架，函数式组件 + Hooks |
| **TypeScript** | 静态类型检查，提升代码健壮性 |
| **Webpack 5** | 手动搭建工程化环境（非 CRA） |
| **Axios** | HTTP 请求封装 + 拦截器 |
| **CSS3** | 原生样式 + Flexbox/Grid 响应式布局 |

### 后端

| 技术 | 说明 |
|------|------|
| **Node.js** | JavaScript 运行时 |
| **Express** | Web 框架，提供 RESTful API |
| **PostgreSQL** | 关系型数据库（Render 云托管） |
| **pg** | PostgreSQL 驱动 + 连接池 |
| **CORS** | 跨域资源共享配置 |

### 部署

| 平台 | 用途 |
|------|------|
| **GitHub Pages** | 前端静态页面托管 |
| **Render** | 后端 API 服务 + PostgreSQL 数据库 |
| **Git** | 版本控制 |

---

## 📁 项目结构

```
todolist-fullstack/
├── client/                        # 前端项目
│   ├── public/
│   │   └── index.html            # HTML 模板
│   ├── src/
│   │   ├── api/                  # API 请求层
│   │   │   ├── config.ts         # Axios 实例 + 拦截器
│   │   │   └── taskApi.ts        # 任务 API 封装
│   │   ├── components/           # React 组件
│   │   │   ├── TaskForm.tsx      # 添加任务表单
│   │   │   ├── TaskItem.tsx      # 单个任务项
│   │   │   ├── TaskList.tsx      # 任务列表
│   │   │   └── Loading.tsx       # 加载状态
│   │   ├── hooks/
│   │   │   └── useTasks.ts       # 任务数据管理 Hook
│   │   ├── types/
│   │   │   └── index.ts          # TypeScript 类型定义
│   │   ├── utils/
│   │   │   └── xssFilter.ts      # XSS 安全防护
│   │   ├── App.tsx               # 根组件
│   │   ├── index.tsx             # 入口文件
│   │   └── styles.css            # 全局样式
│   ├── webpack.common.js         # Webpack 公共配置
│   ├── webpack.dev.js            # 开发环境配置
│   ├── webpack.prod.js           # 生产环境配置
│   ├── tsconfig.json             # TypeScript 配置
│   └── package.json
│
├── server/                        # 后端项目
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js             # 数据库连接配置
│   │   ├── controllers/
│   │   │   └── taskController.js # 业务逻辑控制器
│   │   ├── routes/
│   │   │   └── taskRoutes.js     # API 路由定义
│   │   ├── middleware/
│   │   │   └── errorHandler.js   # 全局错误处理
│   │   └── app.js                # 应用入口
│   └── package.json
│
└── README.md
```

---

## 🔧 本地开发

### 前置条件

- Node.js >= 16
- PostgreSQL（本地或云服务）
- Git

### 安装与启动

```bash
# 1. 克隆仓库
git clone https://github.com/whale0107/todolist.git
cd todolist-fullstack

# 2. 安装前端依赖
cd client
npm install

# 3. 安装后端依赖
cd ../server
npm install

# 4. 配置环境变量（server/.env）
cp .env.example .env
# 编辑 .env 填入数据库信息

# 5. 启动后端
npm run dev

# 6. 启动前端（新终端窗口）
cd client
npm start
```

### 访问地址

- 前端：http://localhost:3000
- 后端 API：http://localhost:3001/api/tasks

---

## 📦 部署

### 前端部署（GitHub Pages）

```bash
cd client
npm run build
# 将 dist 目录推送到 gh-pages 分支
```

### 后端部署（Render）

1. 将代码推送到 GitHub
2. 在 Render 创建 Web Service，连接仓库
3. 设置环境变量：`DB_URL`、`DB_SSL`、`CORS_ORIGIN`
4. 自动部署完成

---

## 🔒 安全措施

- **XSS 防护**：用户输入经过 `escapeHtml` 转义
- **SQL 注入防护**：使用参数化查询（`$1, $2...`）
- **CORS 配置**：限制允许的跨域来源
- **环境变量**：敏感信息不硬编码

---

## 🌟 项目亮点

| 亮点 | 说明 |
|------|------|
| **工程化能力** | 从零配置 Webpack，环境分离、代码分割、HMR |
| **类型安全** | 全量 TypeScript，接口类型定义完整 |
| **分层架构** | API 层 → Hooks 层 → 组件层，职责清晰 |
| **全栈实践** | 独立完成前后端开发与联调 |
| **安全意识** | XSS 过滤 + 参数化查询 |
| **部署经验** | GitHub Pages + Render 云部署 |

---

## 📝 API 文档

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/tasks` | 获取所有任务 |
| POST | `/api/tasks` | 创建新任务 |
| PUT | `/api/tasks/:id` | 更新任务 |
| DELETE | `/api/tasks/:id` | 删除任务 |

### 请求/响应示例

**创建任务**

```http
POST /api/tasks
Content-Type: application/json

{
  "title": "学习 React",
  "description": "掌握 Hooks 和 TypeScript"
}
```

```json
{
  "code": 0,
  "data": {
    "id": 10,
    "title": "学习 React",
    "description": "掌握 Hooks 和 TypeScript",
    "completed": 0,
    "created_at": "2026-07-21T10:00:00Z",
    "updated_at": "2026-07-21T10:00:00Z"
  },
  "message": "创建成功"
}
```

---

## 📄 License

MIT © [whale0107](https://github.com/whale0107)

---

## 🙏 致谢

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [Render](https://render.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

**如果这个项目对你有帮助，欢迎 Star ⭐ 支持！**