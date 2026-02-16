import type { SocialLink } from '@/app/types/social';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const LINKEDIN_PROFILE_URL =
  'https://www.linkedin.com/in/chen-tetroashvili-%D7%97%D7%9F-%D7%98%D7%98%D7%A8%D7%95%D7%90%D7%A9%D7%91%D7%99%D7%9C%D7%99-5-%D7%97%D7%95%D7%9E-%D7%97-%D7%99-junior-computer-science/';

/**
 * Social media links configuration for Footer and other components.
 * Follows the project's content folder pattern for data storage.
 */
export const socialLinks = [
  {
    href: 'https://github.com/chentetro',
    icon: FaGithub,
    label: 'Visit GitHub profile',
    external: true,
  },
  {
    href: LINKEDIN_PROFILE_URL,
    icon: FaLinkedin,
    label: 'Visit LinkedIn profile',
    external: true,
  },
  {
    href: 'mailto:chentetroo@gmail.com',
    icon: MdEmail,
    label: 'Contact via email',
    external: false,
  },
] satisfies SocialLink[];
