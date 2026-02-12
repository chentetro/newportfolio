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
    languages: ['TypeScript'],
    githubUrl: 'https://github.com/chentetro/newportfolio',
    imageSrc: '/images/portfolio.png',
    imageAlt:
      'Screenshot of the portfolio website homepage showing the hero section and navigation',
  },
] satisfies Project[];
