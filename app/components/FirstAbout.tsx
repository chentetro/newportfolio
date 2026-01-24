import Image from 'next/image';

interface FirstAboutProps {
  imageUrl: string;
  imageAlt: string;
  mainHeading: string;
  subHeading: string;
  paragraphContent: string;
}

export default function FirstAbout({
  imageUrl,
  imageAlt,
  mainHeading,
  subHeading,
  paragraphContent,
}: FirstAboutProps) {
  return (
    <section
      className="relative bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 py-12 px-4"
      role="region"
      aria-label="First about section"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Left Column - Circular Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 lg:w-44 lg:h-44">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover rounded-full"
                sizes="(max-width: 640px) 144px, (max-width: 1024px) 160px, 176px"
                priority
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <header>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {mainHeading}
              </h2>
              <h3 className="text-xl lg:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
                {subHeading}
              </h3>
            </header>

            <p className="text-base lg:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {paragraphContent}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
