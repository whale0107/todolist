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

## GitHub Pages 部署说明

> 说明：GitHub Pages 只能托管前端静态页面。你的后端 Express + MySQL 服务仍然需要单独部署到 Render、Railway、Fly.io、阿里云、腾讯云或你自己的服务器上。

### 1. 前端部署到 GitHub Pages

项目已经配置好 GitHub Actions 自动部署流程，推送到 `main` 分支后会自动构建并发布到 GitHub Pages。

#### 你需要准备

- 一个 GitHub 仓库
- 一个可用的后端接口地址，例如：
  - `https://your-backend-domain.com/api`

#### 在 GitHub 仓库中设置变量

进入仓库的 Settings → Secrets and variables → Actions → Variables，新增以下变量：

- `REACT_APP_API_BASE_URL`：你的后端接口地址

例如：

```text
https://your-backend-domain.com/api
```

### 2. 自动部署流程

项目中已添加工作流文件：

- [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml)

每次推送到 `main` 分支后，GitHub Actions 会自动执行构建并部署。

### 3. 本地构建

```bash
cd client
npm install
npm run build
```

构建结果会输出到 `client/dist`。

### 4. 线上环境变量

前端构建时会读取这些变量：

```env
REACT_APP_API_BASE_URL=https://your-backend-domain.com/api
PUBLIC_URL=/your-repo-name
```

其中：
- `REACT_APP_API_BASE_URL`：后端接口地址
- `PUBLIC_URL`：GitHub Pages 项目路径，例如仓库名是 `todolist-fullstack`，则填写：`/todolist-fullstack`

### 5. 数据库准备

后端仍需要 MySQL 数据库，建议先准备好数据库表：

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