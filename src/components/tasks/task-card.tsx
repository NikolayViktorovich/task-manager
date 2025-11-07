import type { Task } from '../../types/task';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { useTaskStore } from '../../stores/task-store';
import { Calendar, User, Edit, Trash2, Clock, MoreVertical } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useState } from 'react';
import { 
  FaCircle,
  FaRegCircle,
  FaEye,
  FaCheckCircle,
  FaSpinner,
  FaExclamationCircle
} from 'react-icons/fa';
import { DeleteConfirmModal } from '../ui/delete-confirm-modal';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  viewMode?: 'grid' | 'list';
  animationDelay?: number;
}

const priorityConfig = {
  low: { color: 'bg-emerald-600', label: 'Низкий', icon: FaCircle },
  medium: { color: 'bg-blue-600', label: 'Средний', icon: FaExclamationCircle },
  high: { color: 'bg-orange-600', label: 'Высокий', icon: FaCircle },
  urgent: { color: 'bg-red-600', label: 'Срочный', icon: FaCircle },
};

const statusConfig = {
  todo: { bg: 'bg-gray-800', icon: FaRegCircle },
  'in-progress': { bg: 'bg-gray-800', icon: FaSpinner },
  review: { bg: 'bg-gray-800', icon: FaEye },
  completed: { bg: 'bg-gray-800', icon: FaCheckCircle },
};

export function TaskCard({ task, onEdit, viewMode = 'grid', animationDelay = 0 }: TaskCardProps) {
  const { deleteTask, updateTask } = useTaskStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleStatusChange = (newStatus: Task['status']) => {
    updateTask(task.id, { status: newStatus });
  };

  const handleDelete = () => {
    deleteTask(task.id);
    setIsDeleteModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';
  const PriorityIcon = priorityConfig[task.priority].icon;
  const StatusIcon = statusConfig[task.status].icon;

  return (
    <>
      <Card 
        className={cn(
          'group bg-gray-800 shadow-corporate transition-all duration-200 hover:bg-gray-750',
          statusConfig[task.status].bg,
          viewMode === 'list' ? 'flex items-center p-4' : 'p-3'
        )}
        style={{ 
          animationDelay: `${animationDelay}ms`,
          animation: 'fadeIn 0.3s ease-out both'
        }}
      >
        <CardContent className={cn(
          'p-0',
          viewMode === 'list' && 'flex-1 flex items-center gap-4'
        )}>
          {/* Header */}
          <div className={cn(
            'flex items-start justify-between mb-2',
            viewMode === 'list' && 'flex-1 mb-0'
          )}>
            <div className={cn('flex-1', viewMode === 'list' && 'flex items-center gap-4')}>
              {/* Priority and Title */}
              <div className="flex items-center gap-2 mb-2">
                <div className={cn(
                  'inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-white',
                  priorityConfig[task.priority].color
                )}>
                  <PriorityIcon className="h-3 w-3" />
                  {priorityConfig[task.priority].label}
                </div>
              </div>

              {/* Title */}
              <h3 className={cn(
                'font-medium text-white line-clamp-2 text-sm',
                viewMode === 'list' && 'text-base flex-1'
              )}>
                {task.title}
              </h3>
            </div>

            {/* Actions Menu */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="h-7 w-7 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
              >
                <MoreVertical className="h-3.5 w-3.5" />
              </Button>
              
              {isMenuOpen && (
                <div className="absolute right-0 top-8 z-10 bg-gray-800 rounded-lg shadow-corporate-lg py-1 min-w-32 animate-scale-in">
                  <button
                    onClick={() => { onEdit(task); setIsMenuOpen(false); }}
                    className="w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Редактировать
                  </button>
                  <button
                    onClick={openDeleteModal}
                    className="w-full px-3 py-2 text-sm text-red-400 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Удалить
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <p className={cn(
              'text-sm text-gray-400 mb-2 line-clamp-2',
              viewMode === 'list' && 'flex-1 mb-0'
            )}>
              {task.description}
            </p>
          )}

          {/* Metadata */}
          <div className={cn(
            'flex items-center gap-3 text-xs text-gray-500 mb-3',
            viewMode === 'list' && 'mb-0'
          )}>
            {/* Assignee */}
            <div className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              <span className="text-gray-300">{task.assignee}</span>
            </div>

            {/* Due Date */}
            {task.dueDate && (
              <div className={cn(
                'flex items-center gap-1',
                isOverdue && 'text-red-400 font-medium'
              )}>
                <Calendar className="h-3.5 w-3.5" />
                <span>{new Date(task.dueDate).toLocaleDateString('ru-RU')}</span>
                {isOverdue && <Clock className="h-3 w-3 ml-1" />}
              </div>
            )}
          </div>

          {/* Tags */}
          {task.tags.length > 0 && (
            <div className={cn(
              'flex flex-wrap gap-1 mb-3',
              viewMode === 'list' && 'mb-0'
            )}>
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Status Selector */}
          <div className="flex items-center gap-2">
            <StatusIcon className={cn(
              "h-4 w-4",
              task.status === 'todo' && 'text-gray-400',
              task.status === 'in-progress' && 'text-blue-400',
              task.status === 'review' && 'text-purple-400',
              task.status === 'completed' && 'text-emerald-400'
            )} />
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(e.target.value as Task['status'])}
              className={cn(
                'w-full p-2 bg-gray-700 rounded text-sm text-white focus:ring-2 focus:ring-blue-500 transition-colors',
                viewMode === 'list' && 'max-w-32'
              )}
            >
              <option value="todo">К выполнению</option>
              <option value="in-progress">В работе</option>
              <option value="review">На проверке</option>
              <option value="completed">Завершено</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Модальное окно подтверждения удаления */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Удалить задачу"
        description={`Задача "${task.title}" будет удалена безвозвратно.`}
      />
    </>
  );
}