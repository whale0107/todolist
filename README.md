# TodoList Fullstack

这是一个基于 React + Express + MySQL 的待办事项管理系统，包含前端页面、后端 API 和数据库连接。

## 项目结构

```text
client/          # 前端 React 应用
server/          # 后端 Express 服务
```

## 技术栈

- 前端：React、TypeScript、Webpack、Axios
- 后端：Node.js、Express
- 数据库：MySQL
- 其他：dotenv、CORS、body-parser

## 功能特点

- 查看任务列表
- 新增任务
- 编辑任务
- 删除任务
- 切换任务完成状态
- 支持前后端分离部署

## 本地开发运行

### 1. 安装依赖

#### 前端

```bash
cd client
npm install
```

#### 后端

```bash
cd server
npm install
```

### 2. 配置环境变量

在服务端目录下创建 `.env` 文件，内容如下：

```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=todolist
```

### 3. 创建数据库

请在 MySQL 中创建数据库 `todolist`，并创建 `tasks` 表：

```sql
CREATE DATABASE todolist;

USE todolist;

CREATE TABLE tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(1000) DEFAULT '',
  completed TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 4. 启动项目

#### 启动后端

```bash
cd server
npm start
```

#### 启动前端

```bash
cd client
npm start
```

默认情况下：
- 前端地址：http://localhost:3000
- 后端地址：http://localhost:3001
- API 地址：http://localhost:3001/api

## 生产环境构建

### 构建前端

```bash
cd client
npm run build
```

构建后的静态文件会输出到 `client/dist`。

### 启动后端生产服务

```bash
cd server
npm start
```

## Vercel 部署说明

> 推荐方案：前端部署到 Vercel，后端部署到 Vercel 或单独的云服务。由于本项目依赖 MySQL，后端仍然需要一个可用的数据库环境。

### 1. 前端部署到 Vercel

#### 你需要准备

- 一个 GitHub 仓库
- 一个 Vercel 账号

#### 部署步骤

1. 打开 Vercel，点击 Import Project
2. 选择你的 GitHub 仓库
3. 设置项目根目录为仓库根目录
4. 构建命令填写：

```bash
cd client && npm install && npm run build
```

5. 输出目录填写：

```text
client/dist
```

6. 点击 Deploy

### 2. 后端部署到 Vercel

如果你希望前后端都部署在 Vercel 上，可以直接使用仓库根目录部署。Vercel 会根据 [vercel.json](vercel.json) 识别后端入口。

#### 需要设置的环境变量

在 Vercel 项目设置中添加：

```env
PORT=3001
CORS_ORIGIN=https://your-frontend-domain.vercel.app
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
```

### 3. 前端接口地址配置

前端会读取环境变量 `REACT_APP_API_BASE_URL`，请在 Vercel 中设置：

```env
REACT_APP_API_BASE_URL=https://your-backend-domain.vercel.app/api
```

如果你是前后端同一个 Vercel 项目，接口地址也可以写成：

```env
REACT_APP_API_BASE_URL=/api
```

### 4. 数据库准备

请确保你的 MySQL 数据库可被后端访问，并且包含 `tasks` 表。

```sql
CREATE DATABASE todolist;

USE todolist;

CREATE TABLE tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(1000) DEFAULT '',
  completed TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 许可证

本项目仅供学习和个人使用。