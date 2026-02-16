import Link from 'next/link';
import { socialLinks } from '@/content/social';

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
