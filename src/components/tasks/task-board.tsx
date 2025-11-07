import { useState } from 'react'
import type { Task } from '../../types/task'
import { useTaskStore } from '../../stores/task-store'
import { TaskCard } from './task-card'
import { TaskForm } from './task-form'
import { Button } from '../ui/button'
import { 
  Plus, 
  Search, 
  LayoutGrid, 
  List, 
  Settings, 
  BarChart3
} from 'lucide-react'
import { 
  FaClipboardList,
  FaRegClock,
  FaPlayCircle,
  FaEye,
  FaCheckCircle
} from 'react-icons/fa'

export function TaskBoard() {
  const { tasks } = useTaskStore()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | undefined>()
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const statusColumns = [
    { 
      key: 'todo', 
      title: 'К выполнению', 
      color: 'bg-gray-600',
      icon: FaRegClock
    },
    { 
      key: 'in-progress', 
      title: 'В работе', 
      color: 'bg-blue-600',
      icon: FaPlayCircle
    },
    { 
      key: 'review', 
      title: 'На проверке', 
      color: 'bg-purple-600',
      icon: FaEye
    },
    { 
      key: 'completed', 
      title: 'Завершено', 
      color: 'bg-emerald-600',
      icon: FaCheckCircle
    },
  ] as const

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingTask(undefined)
  }

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesStatus && matchesSearch
  })

  const getTasksByStatus = (status: Task['status']) => {
    return filteredTasks.filter(task => task.status === status)
  }

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.status === 'completed').length
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="animate-fade-in">
          <div className="bg-gray-900 rounded-lg p-6 mb-6 shadow-corporate-lg">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">
                      REDDWEB
                    </h1>
                    <p className="text-gray-400 mt-1">
                      Корпоративная система управления задачами
                    </p>
                  </div>
                </div>
                
                {/* Progress Stats */}
                <div className="flex items-center gap-6 mt-6">
                  <div className="text-center">
                    <div className="text-xl font-semibold text-white">{totalTasks}</div>
                    <div className="text-sm text-gray-400">Всего задач</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-emerald-400">{completedTasks}</div>
                    <div className="text-sm text-gray-400">Выполнено</div>
                  </div>
                  <div className="flex-1 max-w-xs">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Прогресс команды</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => setIsFormOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Новая задача
              </Button>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="animate-slide-up">
          <div className="bg-gray-900 rounded-lg p-4 mb-6 shadow-corporate">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="flex-1 max-w-md relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Поиск задач..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>

              {/* Filters and View Toggle */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-gray-800 text-white rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <option value="all">Все статусы</option>
                  <option value="todo">К выполнению</option>
                  <option value="in-progress">В работе</option>
                  <option value="review">На проверке</option>
                  <option value="completed">Завершено</option>
                </select>

                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Task Form Modal */}
        <TaskForm 
          task={editingTask}
          isOpen={isFormOpen}
          onClose={handleCloseForm}
        />

        {/* Task Board */}
        <div className={`gap-4 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'space-y-4'}`}>
          {statusColumns.map((column, index) => {
            const columnTasks = getTasksByStatus(column.key)
            const IconComponent = column.icon
            
            return (
              <div 
                key={column.key} 
                className="bg-gray-900 rounded-lg p-4 shadow-corporate animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4 pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${column.color} rounded-md flex items-center justify-center`}>
                      <IconComponent className="text-white text-sm" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-white text-sm">
                        {column.title}
                      </h2>
                      <p className="text-xs text-gray-400">{columnTasks.length} задач</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 ${column.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                    {columnTasks.length}
                  </div>
                </div>
                
                <div className={`space-y-3 ${viewMode === 'list' ? 'max-h-96 overflow-y-auto' : ''}`}>
                  {columnTasks.map((task, taskIndex) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={handleEditTask}
                      viewMode={viewMode}
                      animationDelay={taskIndex * 50}
                    />
                  ))}
                  {columnTasks.length === 0 && (
                    <div className="text-center text-gray-500 py-6 bg-gray-800/50 rounded">
                      <FaClipboardList className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                      <p className="text-sm">Нет задач</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && tasks.length > 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Задачи не найдены</h3>
            <p className="text-gray-400 mb-6">Попробуйте изменить параметры поиска или фильтрации</p>
            <Button 
              onClick={() => { setSearchQuery(''); setFilterStatus('all'); }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Сбросить фильтры
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}