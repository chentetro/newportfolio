import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

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
          <Link
            href="https://github.com/chentetro"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center min-w-[44px] min-h-[44px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:outline-none rounded"
            aria-label="Visit GitHub profile"
          >
            <FaGithub className="w-5 h-5" aria-hidden="true" />
          </Link>

          <Link
            href="https://www.linkedin.com/in/chen-tetroashvili-%D7%97%D7%9F-%D7%98%D7%98%D7%A8%D7%95%D7%90%D7%A9%D7%91%D7%99%D7%9C%D7%99-5-%D7%97%D7%95%D7%9D-%D7%97-%D7%99-junior-computer-science/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center min-w-[44px] min-h-[44px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:outline-none rounded"
            aria-label="Visit LinkedIn profile"
          >
            <FaLinkedin className="w-5 h-5" aria-hidden="true" />
          </Link>

          <Link
            href="mailto:chentetroo@gmail.com"
            className="flex items-center justify-center min-w-[44px] min-h-[44px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:outline-none rounded"
            aria-label="Contact via email"
          >
            <MdEmail className="w-5 h-5" aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </footer>
  );
}
