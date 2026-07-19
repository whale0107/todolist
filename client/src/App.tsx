import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Loading from './components/Loading';
import { useTasks } from './hooks/useTasks';
import './styles.css';

export default function App(): React.ReactElement {
  const { tasks, loading, error, addTask, editTask, toggleComplete, removeTask, loadTasks } = useTasks();

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 任务管理</h1>
        <span className="task-count">共 {tasks.length} 项任务</span>
        <button onClick={loadTasks} className="btn-refresh" title="刷新列表">
          🔄
        </button>
      </header>

      <TaskForm onAdd={addTask} />

      {error && (
        <div className="error-message">
          ⚠️ {error}
          <button onClick={() => loadTasks()} className="btn-retry">
            重试
          </button>
        </div>
      )}

      {loading ? <Loading /> : <TaskList tasks={tasks} onToggle={toggleComplete} onEdit={editTask} onDelete={removeTask} />}
    </div>
  );
}