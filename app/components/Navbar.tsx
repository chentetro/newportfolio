import Link from 'next/link';

export default function Navbar() {
  return (
    <nav
      className="w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
          {/* Logo/Brand Section */}
          <Link
            href="/"
            className="flex items-center gap-2 min-h-[44px] focus:ring-2 focus:ring-gray-500 focus:outline-none rounded"
            aria-label="Navigate to home page - Chen portfolio"
          >
            <div className="w-3 h-3 rounded-full bg-gray-900 dark:bg-gray-100"></div>
            <span className="font-bold text-gray-900 dark:text-gray-100 text-lg">
              Chen
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-row items-center gap-6">
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 font-medium min-h-[44px] flex items-center focus:ring-2 focus:ring-gray-500 focus:outline-none rounded px-2"
              aria-label="Navigate to home page"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 font-medium min-h-[44px] flex items-center focus:ring-2 focus:ring-gray-500 focus:outline-none rounded px-2"
              aria-label="Navigate to about page"
            >
              About
            </Link>

            <Link
              href="/projects"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 font-medium min-h-[44px] flex items-center focus:ring-2 focus:ring-gray-500 focus:outline-none rounded px-2"
              aria-label="Navigate to projects page"
            >
              Projects
            </Link>

            <Link
              href="/life"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 font-medium min-h-[44px] flex items-center focus:ring-2 focus:ring-gray-500 focus:outline-none rounded px-2"
              aria-label="Navigate to life page"
            >
              Life
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
