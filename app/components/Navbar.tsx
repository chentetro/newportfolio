import Link from 'next/link';

type NavbarProps = Record<string, never> & {
  // Optional props for future customization
};

export default function Navbar({}: NavbarProps) {
  return (
    <nav
      className="w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-center sm:justify-center gap-2 sm:gap-4">
          {/* Home Link */}
          <Link
            href="/"
            className="flex items-center justify-center min-h-[44px] min-w-[44px] px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 font-medium focus:ring-2 focus:ring-gray-500 focus:outline-none"
            aria-label="Navigate to home page"
          >
            <span>Home</span>
          </Link>

          {/* About Link */}
          <Link
            href="/about"
            className="flex items-center justify-center min-h-[44px] min-w-[44px] px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 font-medium focus:ring-2 focus:ring-gray-500 focus:outline-none"
            aria-label="Navigate to about page"
          >
            <span>About</span>
          </Link>

          {/* Projects Link */}
          <Link
            href="/projects"
            className="flex items-center justify-center min-h-[44px] min-w-[44px] px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 font-medium focus:ring-2 focus:ring-gray-500 focus:outline-none"
            aria-label="Navigate to projects page"
          >
            <span>Projects</span>
          </Link>

          {/* Life Link */}
          <Link
            href="/life"
            className="flex items-center justify-center min-h-[44px] min-w-[44px] px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 font-medium focus:ring-2 focus:ring-gray-500 focus:outline-none"
            aria-label="Navigate to life page"
          >
            <span>Life</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
