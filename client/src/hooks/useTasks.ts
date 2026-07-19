import { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api/taskApi';
import type { Task, UpdateTaskParams, UseTasksReturn } from '../types';

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : '加载任务失败';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = useCallback(
    async (title: string, description?: string) => {
      try {
        const newTask = await createTask({ title, description });
        setTasks((prev) => [newTask, ...prev]);
        return { success: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : '添加任务失败';
        setError(message);
        return { success: false, error: message };
      }
    },
    []
  );

  const editTask = useCallback(
    async (id: number, updates: UpdateTaskParams) => {
      try {
        const updated = await updateTask(id, updates);
        setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
        return { success: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : '更新任务失败';
        setError(message);
        return { success: false, error: message };
      }
    },
    []
  );

  const toggleComplete = useCallback(
    async (id: number, currentCompleted: 0 | 1) => {
      const newCompleted = currentCompleted === 0 ? 1 : 0;
      return editTask(id, { completed: newCompleted });
    },
    [editTask]
  );

  const removeTask = useCallback(
    async (id: number) => {
      try {
        await deleteTask(id);
        setTasks((prev) => prev.filter((task) => task.id !== id));
        return { success: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : '删除任务失败';
        setError(message);
        return { success: false, error: message };
      }
    },
    []
  );

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return {
    tasks,
    loading,
    error,
    loadTasks,
    addTask,
    editTask,
    toggleComplete,
    removeTask,
  };
}