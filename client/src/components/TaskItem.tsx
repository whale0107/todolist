// 单个任务项组件

import React, { useState, memo } from 'react';
import { escapeHtml } from '../utils/xssFilter';
import type { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number, currentCompleted: 0 | 1) => Promise<{ success: boolean; error?: string }>;
  onEdit: (id: number, updates: { title?: string; description?: string }) => Promise<{ success: boolean; error?: string }>;
  onDelete: (id: number) => Promise<{ success: boolean; error?: string }>;
}

function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(task.title);
  const [editDescription, setEditDescription] = useState<string>(task.description || '');

  const handleSave = async () => {
    if (!editTitle.trim()) {
      alert('任务标题不能为空');
      return;
    }
    const result = await onEdit(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
    });
    if (result.success) {
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <input
          type="text"
          className="edit-input"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="任务标题"
          autoFocus
        />
        <input
          type="text"
          className="edit-input"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          placeholder="任务描述（可选）"
        />
        <div className="task-actions">
          <button onClick={handleSave} className="btn-save">保存</button>
          <button onClick={() => setIsEditing(false)} className="btn-cancel">取消</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-item ${task.completed === 1 ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed === 1}
        onChange={() => onToggle(task.id, task.completed)}
      />
      <div className="task-content">
        <span className="task-title">{escapeHtml(task.title)}</span>
        {task.description && <span className="task-description">{escapeHtml(task.description)}</span>}
        <span className="task-time">{new Date(task.created_at).toLocaleString('zh-CN')}</span>
      </div>
      <div className="task-actions">
        <button onClick={() => setIsEditing(true)} className="btn-edit">编辑</button>
        <button onClick={() => onDelete(task.id)} className="btn-delete">删除</button>
      </div>
    </div>
  );
}

export default memo(TaskItem);