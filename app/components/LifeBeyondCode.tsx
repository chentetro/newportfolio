import { FaHeart } from 'react-icons/fa';
import type { LifeBeyondCodeProps } from '@/app/types/interests';

/**
 * LifeBeyondCode component displays personal interests and hobbies
 * in a visually appealing card-based layout.
 *
 * Features:
 * - Gradient background section with heart icon and main heading
 * - Responsive grid of interest cards
 * - Proper heading hierarchy (H1 → H2 → H3)
 * - Full accessibility compliance (WCAG AA)
 * - Mobile-first responsive design
 *
 * @param mainHeading - Main heading text (e.g., "Life Beyond Code")
 * @param description - Descriptive paragraph text
 * @param sectionHeading - Section heading for interest cards
 * @param interests - Array of interest cards to display
 *
 * @returns JSX.Element
 */
export default function LifeBeyondCode({
  mainHeading,
  description,
  sectionHeading,
  interests,
}: LifeBeyondCodeProps) {
  return (
    <section
      className="w-full"
      aria-label="Life beyond code section"
      role="region"
    >
      {/* Gradient Background Section */}
      <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Heart Icon */}
            <FaHeart
              className="w-8 h-8 text-gray-700 dark:text-gray-300"
              aria-hidden="true"
            />

            {/* Main Heading (H1) */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
              {mainHeading}
            </h1>

            {/* Description */}
            <p className="text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* White Background Section with Interest Cards */}
      <div className="bg-white dark:bg-gray-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Heading (H2) */}
          <h2 className="text-center text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-8">
            {sectionHeading}
          </h2>

          {/* Interest Cards Grid */}
          {interests.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {interests.map((interest) => {
                const IconComponent = interest.icon;
                return (
                  <article
                    key={interest.id}
                    className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
                    aria-label={`Interest: ${interest.title}`}
                  >
                    {/* Icon Circle */}
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-gray-700 flex items-center justify-center">
                        <IconComponent
                          className="w-8 h-8 text-gray-700 dark:text-gray-300"
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    {/* Card Title (H3) */}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 text-center">
                      {interest.title}
                    </h3>

                    {/* Card Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                      {interest.description}
                    </p>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400 text-center">
              No interests to display.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
