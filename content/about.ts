import type { AboutContent } from '@/app/types/about';

/**
 * About page content data.
 * Follows the project's content folder pattern for data storage.
 */
export const aboutContent = {
  profile: {
    imageUrl: '/images/1756311070767.jpg',
    imageAlt: 'Profile photo',
    mainHeading: 'About Me',
    subHeading: 'Software Developer',
    paragraphContent:
      "I'm a passionate developer with experience in modern web technologies. I enjoy creating clean, efficient solutions and learning new technologies to solve complex problems. This page showcases my professional experience and technical skills.",
  },
  experience: {
    heading: 'Experience',
  },
  skills: {
    heading: 'Skills',
  },
} satisfies AboutContent;
