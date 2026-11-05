import type { Technology } from './tools';

export type ProjectIcon = 'pitch' | 'grid' | 'waves' | 'chart';

export interface Project {
  name: string;
  description: string;
  stack: Technology[];
  repository: string;
  icon: ProjectIcon;
}

export const projects = [
  {
    name: 'Fantasy XI Studio',
    description: 'A fantasy football squad builder with budget-based player selection and live credit tracking.',
    stack: [{ name: 'React', icon: 'react' }, { name: 'JavaScript', icon: 'javascript' }],
    repository: 'fantasy-xi-studio',
    icon: 'pitch',
  },
  {
    name: 'CattleCart',
    description: 'An academic cattle marketplace application with dashboards and transaction management.',
    stack: [{ name: 'C#', icon: 'csharp' }, { name: 'WinForms', icon: 'dot-net' }],
    repository: 'cattlecart-winform',
    icon: 'grid',
  },
  {
    name: 'Maritime World Journey',
    description: 'Animated environments, interactive controls, and scene transitions in a graphics application.',
    stack: [{ name: 'C++', icon: 'cplusplus' }, { name: 'OpenGL / GLUT', icon: 'opengl' }],
    repository: 'maritime-world-journey',
    icon: 'waves',
  },
  {
    name: 'Personal Expense Tracker',
    description: 'A university project for keeping track of personal expenses.',
    stack: [{ name: 'Python', icon: 'python' }],
    repository: 'expense-tracker',
    icon: 'chart',
  },
] satisfies Project[];
