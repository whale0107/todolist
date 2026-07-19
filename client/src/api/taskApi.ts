// API 接口封装文件，提供对任务相关的 API 请求方法

import request from './config';
import type { Task, CreateTaskParams, UpdateTaskParams } from '../types';

export function getTasks(): Promise<Task[]> {
  return request.get('/tasks');
}

export function createTask(data: CreateTaskParams): Promise<Task> {
  return request.post('/tasks', data);
}

export function updateTask(id: number, data: UpdateTaskParams): Promise<Task> {
  return request.put(`/tasks/${id}`, data);
}

export function deleteTask(id: number): Promise<{ id: number }> {
  return request.delete(`/tasks/${id}`);
}

export function toggleTaskStatus(id: number, currentCompleted: 0 | 1): Promise<Task> {
  return updateTask(id, { completed: currentCompleted === 0 ? 1 : 0 });
}