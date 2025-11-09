import { Plus, Mail, Phone, MoreVertical } from 'lucide-react'
import { Button } from '../ui/button'

const teamMembers = [
  {
    id: 1,
    name: 'Машка Неваляшка',
    role: 'Frontend Developer',
    email: 'maria@company.com',
    phone: '+7 (999) 123-45-67',
    avatar: 'MS',
    tasks: 12,
    projects: 3
  },
  {
    id: 2,
    name: 'Леха Грибоедов',
    role: 'Backend Developer',
    email: 'alex@company.com',
    phone: '+7 (999) 123-45-68',
    avatar: 'АИ',
    tasks: 8,
    projects: 2
  },
  {
    id: 3,
    name: 'Елена Летучая',
    role: 'UI/UX Designer',
    email: 'elena@company.com',
    phone: '+7 (999) 123-45-69',
    avatar: 'ЕП',
    tasks: 15,
    projects: 4
  },
  {
    id: 4,
    name: 'Димас Подпивас',
    role: 'Project Manager',
    email: 'dmitry@company.com',
    phone: '+7 (999) 123-45-70',
    avatar: 'ДС',
    tasks: 5,
    projects: 6
  }
]

export function TeamTab() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Участники команды</h2>
          <p className="text-gray-500">Всего участников: {teamMembers.length}</p>
        </div>
        <Button className="bg-white text-black hover:bg-gray-200 border-0">
          <Plus className="h-4 w-4 mr-2" />
          Добавить участника
        </Button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-black border border-gray-800 rounded-lg p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">{member.avatar}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
              <button className="text-gray-600 hover:text-gray-400">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="h-4 w-4" />
                <span>{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="h-4 w-4" />
                <span>{member.phone}</span>
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <div className="text-center">
                <div className="text-white font-semibold">{member.tasks}</div>
                <div className="text-gray-500">Задачи</div>
              </div>
              <div className="text-center">
                <div className="text-white font-semibold">{member.projects}</div>
                <div className="text-gray-500">Проекты</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}