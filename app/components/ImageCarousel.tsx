'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { ImageCarouselProps } from '@/app/types/carousel';

/**
 * ImageCarousel component displays a scrollable carousel of images with navigation controls.
 *
 * Features:
 * - Single-slide display with smooth transform transitions
 * - Navigation arrows (left/right) for manual navigation
 * - Indicator dots showing current slide position
 * - Optional auto-slide functionality with configurable interval
 * - Keyboard navigation support (ArrowLeft/ArrowRight)
 * - Full accessibility compliance (WCAG AA)
 *
 * @param title - Title displayed above the carousel (required)
 * @param items - Array of carousel items to display (required)
 * @param autoSlide - Whether the carousel should automatically slide (default: false)
 * @param autoSlideInterval - Interval in milliseconds between automatic slides (default: 3000)
 *
 * @returns JSX.Element or null if items array is empty
 *
 * @example
 * ```tsx
 * <ImageCarousel
 *   title="Life Moments"
 *   items={lifeImages}
 *   autoSlide={true}
 *   autoSlideInterval={5000}
 * />
 * ```
 */
export default function ImageCarousel({
  title,
  items,
  autoSlide = false,
  autoSlideInterval = 3000,
}: ImageCarouselProps) {
  const [curr, setCurr] = useState(0);

  const prev = useCallback(() => {
    setCurr((curr) => (curr === 0 ? items.length - 1 : curr - 1));
  }, [items.length]);

  const next = useCallback(() => {
    setCurr((curr) => (curr === items.length - 1 ? 0 : curr + 1));
  }, [items.length]);

  useEffect(() => {
    if (!autoSlide || items.length === 0) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, next, items.length]);

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if no input/textarea is focused
      const activeElement = document.activeElement;
      if (
        activeElement?.tagName === 'INPUT' ||
        activeElement?.tagName === 'TEXTAREA' ||
        activeElement?.getAttribute('contenteditable') === 'true'
      ) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [prev, next]);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="py-12 px-4" aria-label={`${title} carousel`}>
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 text-center">
            {title}
          </h2>
        </header>

        <div className="relative overflow-hidden rounded-lg">
          {/* Carousel Container */}
          {/* Dynamic transform for carousel positioning - inline style required
              as Tailwind utilities cannot handle dynamic percentage-based transforms */}
          <div
            className="flex transition-transform ease-out duration-500"
            style={
              {
                '--carousel-translate': `-${curr * 100}%`,
                transform: 'translateX(var(--carousel-translate))',
              } as React.CSSProperties
            }
            role="region"
            aria-label={`${title} carousel - slide ${curr + 1} of ${items.length}`}
            aria-live="polite"
            tabIndex={0}
          >
            {items.map((item, index) => (
              <div
                key={item.id}
                className="relative w-full flex-shrink-0 min-h-[450px]"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
            <button
              onClick={prev}
              className="p-3 rounded-full shadow-lg bg-gray-900/80 dark:bg-gray-100/80 text-white dark:text-gray-900 hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center pointer-events-auto"
              aria-label="Previous image"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={next}
              className="p-3 rounded-full shadow-lg bg-gray-900/80 dark:bg-gray-100/80 text-white dark:text-gray-900 hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center pointer-events-auto"
              aria-label="Next image"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Indicator Dots */}
          <div className="absolute bottom-4 left-0 right-0">
            <div
              className="flex items-center justify-center gap-2"
              role="tablist"
              aria-label="Carousel indicators"
            >
              {items.map((_, i) => (
                <button
                  key={`indicator-${i}`}
                  onClick={() => setCurr(i)}
                  className="transition-all rounded-full focus:ring-2 focus:ring-gray-500 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center p-2 bg-transparent"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-selected={curr === i}
                  role="tab"
                >
                  <span
                    className={`transition-all rounded-full ${
                      curr === i
                        ? 'bg-white dark:bg-gray-100 w-2 h-2'
                        : 'bg-white/50 dark:bg-gray-100/50 w-2 h-2 hover:bg-white/75 dark:hover:bg-gray-100/75'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
