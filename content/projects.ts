import type { Project } from '@/app/types/project';

/**
 * Portfolio projects data.
 * Each project includes metadata for card display and detail page rendering.
 */
export const projects: Project[] = [
  {
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    shortDescription:
      'A modern, responsive portfolio website built with Next.js and TypeScript, featuring dark mode support and accessible design.',
    description:
      'This portfolio website showcases my work and skills using modern web technologies. Built with Next.js 16 and TypeScript for type safety, it features a mobile-first responsive design with Tailwind CSS. The site includes dark mode support, semantic HTML for accessibility, and follows best practices for performance and SEO. All components are tested with Vitest and React Testing Library to ensure reliability and accessibility standards.',
    technologies: [
      'Next.js',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'Vercel',
      'Git',
      'GitHub',
    ],
    languages: ['TypeScript', 'JavaScript'],
    githubUrl: 'https://github.com/chentetro/newportfolio',
    imageSrc: '/images/1756311070767.jpg',
    imageAlt:
      'Screenshot of the portfolio website homepage showing the hero section and navigation',
  },
  {
    slug: 'e-commerce-platform',
    title: 'E-Commerce Platform',
    shortDescription:
      'A full-stack e-commerce solution with user authentication, product management, and payment integration.',
    description:
      'A comprehensive e-commerce platform built with modern web technologies. Features include user authentication and authorization, product catalog with search and filtering, shopping cart functionality, secure payment processing, and an admin dashboard for managing products and orders. The application uses a RESTful API architecture with proper error handling and validation. Built with a focus on security, performance, and user experience.',
    technologies: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'REST API',
      'Docker',
      'AWS',
    ],
    languages: ['TypeScript', 'JavaScript'],
    githubUrl: 'https://github.com/chentetro/e-commerce-platform',
    imageSrc: '/images/1756311070767.jpg',
    imageAlt:
      'E-commerce platform showing product catalog with search and shopping cart',
  },
  {
    slug: 'task-management-app',
    title: 'Task Management App',
    shortDescription:
      'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    description:
      'A feature-rich task management application designed for teams to collaborate effectively. The app includes real-time updates using WebSockets, drag-and-drop task organization, project boards with customizable columns, user assignments, due dates, and priority levels. Built with a focus on intuitive user experience and responsive design, it works seamlessly across desktop and mobile devices. The backend uses GraphQL for efficient data fetching and includes comprehensive error handling.',
    technologies: [
      'React',
      'Next.js',
      'GraphQL',
      'Prisma',
      'PostgreSQL',
      'TypeScript',
      'Tailwind CSS',
    ],
    languages: ['TypeScript', 'JavaScript'],
    githubUrl: 'https://github.com/chentetro/task-management-app',
    imageSrc: '/images/1756311070767.jpg',
    imageAlt:
      'Task management app interface showing project boards with tasks and drag-and-drop functionality',
  },
  {
    slug: 'data-visualization-dashboard',
    title: 'Data Visualization Dashboard',
    shortDescription:
      'An interactive data visualization dashboard with real-time analytics, customizable charts, and export functionality.',
    description:
      'A powerful data visualization dashboard that transforms complex datasets into intuitive, interactive charts and graphs. Features include real-time data updates, multiple chart types (line, bar, pie, scatter plots), customizable date ranges, data filtering and sorting, and export capabilities to CSV and PDF. The dashboard is built with a focus on performance, handling large datasets efficiently with client-side data processing. Includes responsive design for viewing analytics on any device.',
    technologies: [
      'React',
      'TypeScript',
      'Python',
      'PostgreSQL',
      'REST API',
      'Docker',
    ],
    languages: ['TypeScript', 'JavaScript', 'Python'],
    githubUrl: 'https://github.com/chentetro/data-visualization-dashboard',
    imageSrc: '/images/1756311070767.jpg',
    imageAlt:
      'Data visualization dashboard displaying various charts and analytics graphs',
  },
];
