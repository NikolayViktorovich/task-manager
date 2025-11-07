import { useState, useEffect } from 'react';
import type { Task } from '../../types/task';
import { Button } from '../ui/button';
import { CardContent, CardHeader, CardTitle } from '../ui/card';
import { useTaskStore } from '../../stores/task-store';
import { Dialog, DialogContent } from '../ui/dialog';
import { Calendar, User, Tag, AlertCircle } from 'lucide-react';

interface TaskFormProps {
  task?: Task;
  isOpen: boolean;
  onClose: () => void;
}

export function TaskForm({ task, isOpen, onClose }: TaskFormProps) {
  const { addTask, updateTask } = useTaskStore();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo' as Task['status'],
    priority: 'medium' as Task['priority'],
    dueDate: '',
    assignee: '',
    tags: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        assignee: task.assignee,
        tags: task.tags.join(', '),
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        dueDate: '',
        assignee: '',
        tags: '',
      });
    }
    setErrors({});
  }, [task, isOpen]);

  const validateForm = () => {
  const newErrors: Record<string, string> = {};
  
  if (!formData.title.trim()) {
    newErrors.title = 'Название задачи обязательно';
  }
  
  if (!formData.assignee.trim()) {
    newErrors.assignee = 'Укажите исполнителя';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }

  const taskData = {
    title: formData.title.trim(),
    description: formData.description.trim(),
    status: formData.status,
    priority: formData.priority,
    dueDate: formData.dueDate ? new Date(formData.dueDate) : null,
    assignee: formData.assignee.trim(),
    tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
  };

  if (task) {
    updateTask(task.id, taskData);
  } else {
    addTask(taskData);
  }
  
  onClose();
};

const handleChange = (field: string, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }));
  // Очищаем ошибку при вводе
  if (errors[field]) {
    setErrors(prev => ({ ...prev, [field]: '' }));
  }
};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 shadow-corporate-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-white">
            {task ? 'Редактировать задачу' : 'Создать новую задачу'}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Название задачи *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className={`w-full p-3 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-colors
                    ${errors.title ? 'ring-2 ring-red-500' : ''}`}
                  placeholder="Введите название задачи"
                />
                {errors.title && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                )}
              </div>
              {errors.title && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.title}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Описание
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full p-3 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-colors h-24 resize-none"
                placeholder="Опишите детали задачи"
              />
            </div>

            {/* Status and Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Статус
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full p-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <option value="todo">К выполнению</option>
                  <option value="in-progress">В работе</option>
                  <option value="review">На проверке</option>
                  <option value="completed">Завершено</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Приоритет
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                  className="w-full p-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <option value="low">Низкий</option>
                  <option value="medium">Средний</option>
                  <option value="high">Высокий</option>
                  <option value="urgent">Срочный</option>
                </select>
              </div>
            </div>

            {/* Due Date and Assignee */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  <Calendar className="inline h-4 w-4 mr-2" />
                  Срок выполнения
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleChange('dueDate', e.target.value)}
                  className="w-full p-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  <User className="inline h-4 w-4 mr-2" />
                  Исполнитель *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.assignee}
                    onChange={(e) => handleChange('assignee', e.target.value)}
                    className={`w-full p-3 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-colors
                      ${errors.assignee ? 'ring-2 ring-red-500' : ''}`}
                    placeholder="ФИО исполнителя"
                  />
                  {errors.assignee && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400">
                      <AlertCircle className="h-4 w-4" />
                    </div>
                  )}
                </div>
                {errors.assignee && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.assignee}
                  </p>
                )}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                <Tag className="inline h-4 w-4 mr-2" />
                Теги (через запятую)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => handleChange('tags', e.target.value)}
                className="w-full p-3 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="urgent, frontend, meeting"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="px-6 py-2.5 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                Отмена
              </Button>
              <Button 
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                {task ? 'Обновить задачу' : 'Создать задачу'}
              </Button>
            </div>
          </form>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
}