import type { HomeContent } from '@/app/types/home';

/**
 * Home page content data.
 * Follows the project's content folder pattern for data storage.
 */
export const homeContent = {
  profile: {
    imageUrl: '/images/1756311070767.jpg',
    imageAlt: 'Profile photo',
    mainHeading: 'Chen Tetroashvili',
    subHeading: 'Software Developer',
    paragraphContent:
      "I'm a passionate developer with experience in modern web technologies. I enjoy creating clean, efficient solutions and learning new technologies to solve complex problems.",
  },
  socialButtons: {
    githubUrl: 'https://github.com/chentetro',
    cvUrl: '/resume.pdf',
    linkedInUrl:
      'https://www.linkedin.com/in/chen-tetroashvili-%D7%97%D7%9F-%D7%98%D7%98%D7%A8%D7%95%D7%90%D7%A9%D7%91%D7%99%D7%9C%D7%99-5-%D7%97%D7%95%D7%9E-%D7%97-%D7%99-junior-computer-science/',
    email: 'chentetroo@gmail.com',
  },
  skills: {
    heading: 'Skills & Expertise',
    description: 'Areas of technical expertise and professional experience',
    items: [
      {
        title: 'Frontend Development',
        description:
          'Modern React, Next.js, and TypeScript/JavaScript applications',
      },
      {
        title: 'Backend Systems',
        description: 'API design, database management, and server architecture',
      },
      {
        title: 'Full Stack Integration',
        description: 'End-to-end application development and deployment',
      },
      {
        title: 'Problem Solving',
        description:
          'Complex technical challenges and efficient solution design',
      },
    ],
  },
  now: {
    heading: 'Now',
    item: {
      title: 'Student in HIT',
      description:
        'Currently in my third year pursuing Computer Science at Holon Institute of Technology, combining academic learning with practical development experience.',
    },
  },
} satisfies HomeContent;
