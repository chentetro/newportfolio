import type { Project } from '@/app/types/project';

/**
 * Portfolio projects data.
 * Each project includes metadata for card display and detail page rendering.
 */
export const projects = [
  {
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    shortDescription:
      'A professional portfolio built with Next.js and TypeScript, developed using the AIDD (AI-Driven Development) methodology. The project integrates AI Agents and custom architectural rules to ensure code consistency, full accessibility, and automated quality assurance.',
    description:
      'This portfolio is a sophisticated software engineering environment, developed using the AI-Driven Development (AIDD) methodology. It represents a paradigm shift in development by integrating AI Agents as a core part of the lifecycle to enforce superior technical standards.\n\nAIDD & Agentic Code Review: The development process is powered by an "Agentic Review" system. Using custom Commands, an AI Agent audits code changes against predefined Rules to ensure architectural integrity before deployment.',
    technologies: [
      'Next.js',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'Vercel',
      'Git',
      'GitHub',
    ],
    languages: ['TypeScript'],
    githubUrl: 'https://github.com/chentetro/newportfolio',
    imageSrc: '/images/projects/portfolio.png',
    imageAlt:
      'Screenshot of the portfolio website homepage showing the hero section and navigation',
    liveUrl: 'https://newportfolio-sigma-seven.vercel.app/',
    videoUrl: 'https://www.youtube.com/watch?v=Ti4bBHfuUgE',
  },
  {
    slug: 'expense-management-system',
    title: 'Expense Management System',
    shortDescription: 'Full-Stack Expense Management System',
    description:
      'Full-Stack Expense Management System.\n\nA powerful Full-Stack Expense Management System. This application was designed to provide users with a seamless, secure, and intuitive way to track their daily spending and visualize financial patterns.',
    technologies: [
      'React',
      'Vite',
      'Material UI (MUI)',
      'Axios',
      'JavaScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Mongoose',
      'Git',
      'GitHub',
    ],
    languages: ['JavaScript'],
    githubUrl: 'https://github.com/chentetro/expensemanagmentsystem',
    imageSrc: '/images/projects/expense managment system.png',
    imageAlt: 'screenshot of the expense managment system',
    liveUrl: 'https://expensemanagmentsystem-frontend.onrender.com',
    videoUrl: 'https://youtu.be/sdXNX5fvA0E',
  },
] satisfies Project[];
