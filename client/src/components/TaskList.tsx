// 任务列表展示组件

import React from 'react';
import TaskItem from './TaskItem';
import type { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number, currentCompleted: 0 | 1) => Promise<{ success: boolean; error?: string }>;
  onEdit: (id: number, updates: { title?: string; description?: string }) => Promise<{ success: boolean; error?: string }>;
  onDelete: (id: number) => Promise<{ success: boolean; error?: string }>;
}

export default function TaskList({ tasks, onToggle, onEdit, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>🎯 暂无任务，添加一个吧！</p>
      </div>
    );
  }

  const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

  return (
    <div className="task-list">
      {sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}