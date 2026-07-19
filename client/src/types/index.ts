// TypeScript 类型定义文件

/**
 * 任务对象
 */
export interface Task {
  id: number;
  title: string;
  description: string;
  completed: 0 | 1;  // 0-未完成，1-已完成
  created_at: string;
  updated_at: string;
}

/**
 * 创建任务时的参数
 */
export interface CreateTaskParams {
  title: string;
  description?: string;
}

/**
 * 更新任务时的参数
 * 所有字段都是可选的
 */
export interface UpdateTaskParams {
  title?: string;
  description?: string;
  completed?: 0 | 1;
}

/**
 * API 响应格式
 */
export interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

/**
 * useTasks Hook 返回值
 */
export interface UseTasksReturn {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  loadTasks: () => Promise<void>;
  addTask: (title: string, description?: string) => Promise<{ success: boolean; error?: string }>;
  editTask: (id: number, updates: UpdateTaskParams) => Promise<{ success: boolean; error?: string }>;
  toggleComplete: (id: number, currentCompleted: 0 | 1) => Promise<{ success: boolean; error?: string }>;
  removeTask: (id: number) => Promise<{ success: boolean; error?: string }>;
}