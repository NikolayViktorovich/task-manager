import { 
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  User,
  Bell,
  HelpCircle,
  BarChart3,
  MessageSquare
} from 'lucide-react'

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
  unreadNotifications?: number;
}

export function Sidebar({ activeTab, onTabChange, className, unreadNotifications = 2 }: SidebarProps) {
  return (
    <div className={`w-64 bg-black border-r border-gray-800 flex flex-col ${className}`}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold text-white">REDDTASK</h1>
        <p className="text-xs text-gray-500 mt-1">Управление проектами</p>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <nav className="space-y-1">
          <button 
            onClick={() => onTabChange('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'dashboard' 
                ? 'text-white bg-gray-900' 
                : 'text-gray-400 hover:text-white hover:bg-gray-900'
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Дашборд</span>
          </button>
          <button 
            onClick={() => onTabChange('team')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'team' 
                ? 'text-white bg-gray-900' 
                : 'text-gray-400 hover:text-white hover:bg-gray-900'
            }`}
          >
            <Users className="h-5 w-5" />
            <span>Команда</span>
          </button>
          <button 
            onClick={() => onTabChange('analytics')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'analytics' 
                ? 'text-white bg-gray-900' 
                : 'text-gray-400 hover:text-white hover:bg-gray-900'
            }`}
          >
            <BarChart3 className="h-5 w-5" />
            <span>Аналитика</span>
          </button>
          <button 
            onClick={() => onTabChange('messages')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'messages' 
                ? 'text-white bg-gray-900' 
                : 'text-gray-400 hover:text-white hover:bg-gray-900'
            }`}
          >
            <MessageSquare className="h-5 w-5" />
            <span>Сообщения</span>
            <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded-full">3</span>
          </button>
        </nav>

        {/* Divider */}
        <div className="my-4 border-t border-gray-800"></div>

        {/* Settings Section */}
        <div className="space-y-1">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 mb-2">
            Настройки
          </h3>
          <button 
            onClick={() => onTabChange('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'settings' 
                ? 'text-white bg-gray-900' 
                : 'text-gray-400 hover:text-white hover:bg-gray-900'
            }`}
          >
            <Settings className="h-5 w-5" />
            <span>Настройки</span>
          </button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-800">
        <button 
          onClick={() => onTabChange('profile')}
          className="w-full flex items-center gap-3 mb-4 p-2 rounded-lg hover:bg-gray-900 transition-colors"
        >
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-gray-300" />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-medium text-white truncate">Николай Викторович</p>
            <p className="text-xs text-gray-500 truncate">nikolayviktorovich@bk.ru</p>
          </div>
        </button>
        
        <div className="space-y-1">
          <button 
            onClick={() => onTabChange('notifications')}
            className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition-colors"
          >
            <Bell className="h-4 w-4" />
            <span className="text-sm">Уведомления</span>
            {unreadNotifications > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {unreadNotifications}
              </span>
            )}
          </button>
          <button 
            onClick={() => onTabChange('help')}
            className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition-colors"
          >
            <HelpCircle className="h-4 w-4" />
            <span className="text-sm">Помощь</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-red-400 hover:bg-gray-900 rounded-lg transition-colors">
            <LogOut className="h-4 w-4" />
            <span className="text-sm">Выйти</span>
          </button>
        </div>
      </div>
    </div>
  )
}