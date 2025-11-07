import { create } from 'zustand';
import type { Task, Project } from '../types/task';

interface TaskState {
  tasks: Task[];
  projects: Project[];
  selectedProject: string | null;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  setSelectedProject: (projectId: string | null) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [
    {
      id: '1',
      title: 'Разработать главную страницу',
      description: 'Создать адаптивный дизайн главной страницы с использованием Tailwind CSS',
      status: 'in-progress',
      priority: 'high',
      dueDate: new Date('2024-12-20'),
      assignee: 'Иван Петров',
      tags: ['frontend', 'ui', 'responsive'],
      createdAt: new Date('2024-12-01'),
      updatedAt: new Date('2024-12-01'),
    },
    {
      id: '2',
      title: 'Интеграция с CRM',
      description: 'Настроить синхронизацию данных с системой Salesforce',
      status: 'todo',
      priority: 'urgent',
      dueDate: new Date('2024-12-25'),
      assignee: 'Мария Сидорова',
      tags: ['backend', 'api', 'crm'],
      createdAt: new Date('2024-12-01'),
      updatedAt: new Date('2024-12-01'),
    }
  ],
  projects: [
    {
      id: '1',
      name: 'Веб-платформа',
      description: 'Разработка корпоративной веб-платформы',
      color: '#3b82f6',
      createdAt: new Date('2024-12-01'),
    }
  ],
  selectedProject: null,
  
  addTask: (taskData) => set((state) => ({
    tasks: [...state.tasks, {
      ...taskData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    }]
  })),
  
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    )
  })),
  
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter(task => task.id !== id)
  })),
  
  setTasks: (tasks) => set({ tasks }),
  
  addProject: (projectData) => set((state) => ({
    projects: [...state.projects, {
      ...projectData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    }]
  })),
  
  setSelectedProject: (projectId) => set({ selectedProject: projectId }),
}));