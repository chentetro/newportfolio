import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import type { SocialLink } from '@/app/types/social';

// Social media links configuration
const LINKEDIN_PROFILE_URL =
  'https://www.linkedin.com/in/chen-tetroashvili-%D7%97%D7%9F-%D7%98%D7%98%D7%A8%D7%95%D7%90%D7%A9%D7%91%D7%99%D7%9C%D7%99-5-%D7%97%D7%95%D7%9E-%D7%97-%D7%99-junior-computer-science/';

const socialLinks: SocialLink[] = [
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
];

// Shared link styles for consistency
const linkClassName =
  'flex items-center justify-center min-w-[44px] min-h-[44px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:outline-none rounded';

/**
 * Footer component displaying social media links (GitHub, LinkedIn, Email).
 * Appears at the bottom of all pages with sticky footer behavior.
 * Follows monochrome design system and meets WCAG AA accessibility standards.
 */
export default function Footer() {
  return (
    <footer
      className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
      role="contentinfo"
      aria-label="Site footer with social media links"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav
          className="flex items-center justify-center gap-6"
          aria-label="Social media links"
        >
          {socialLinks.map(({ href, icon: Icon, label, external }) => (
            <Link
              key={href}
              href={href}
              {...(external && {
                target: '_blank',
                rel: 'noopener noreferrer',
              })}
              className={linkClassName}
              aria-label={label}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
