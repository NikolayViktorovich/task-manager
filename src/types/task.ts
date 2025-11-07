export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: Date | null;
  assignee: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  projectId?: string;
  crmData?: {
    contactId?: string;
    dealId?: string;
    accountId?: string;
    customFields?: Record<string, any>;
  };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: Date;
}