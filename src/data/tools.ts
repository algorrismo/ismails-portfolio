export interface Technology {
  name: string;
  /** SVG filename in public/icons, without the extension. */
  icon: string;
}

export const tools = [
  { name: 'Tailwind CSS', icon: 'tailwindcss' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'React', icon: 'react' },
  { name: 'Next.js', icon: 'nextjs' },
  { name: 'NestJS', icon: 'nestjs' },
  { name: 'Astro', icon: 'astro' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'HTML', icon: 'html5' },
  { name: 'CSS', icon: 'css3' },
  { name: 'Python', icon: 'python' },
  { name: 'C++', icon: 'cplusplus' },
  { name: 'C#', icon: 'csharp' },
  { name: 'Git', icon: 'git' },
] satisfies Technology[];
