// 新增任务的表单组件

import React, { useState } from 'react';
import { sanitizeInput } from '../utils/xssFilter';

interface TaskFormProps {
  onAdd: (title: string, description?: string) => Promise<{ success: boolean; error?: string }>;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      alert('请输入任务标题');
      return;
    }
    setSubmitting(true);
    const result = await onAdd(sanitizeInput(trimmedTitle), sanitizeInput(description.trim()));
    setSubmitting(false);
    if (result.success) {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          className="form-input"
          placeholder="请输入任务标题..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          disabled={submitting}
        />
        <input
          type="text"
          className="form-input"
          placeholder="任务描述（可选）"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={500}
          disabled={submitting}
        />
        <button type="submit" className="btn-submit" disabled={submitting}>
          {submitting ? '添加中...' : '添加任务'}
        </button>
      </div>
    </form>
  );
}