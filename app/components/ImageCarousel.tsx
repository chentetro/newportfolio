'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { CarouselItem } from '@/app/types/carousel';

interface ImageCarouselProps {
  title: string;
  items: CarouselItem[];
}

export default function ImageCarousel({ title, items }: ImageCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  useEffect(() => {
    checkScrollability();

    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', checkScrollability);
    window.addEventListener('resize', checkScrollability);

    return () => {
      container.removeEventListener('scroll', checkScrollability);
      window.removeEventListener('resize', checkScrollability);
    };
  }, [checkScrollability, items]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    const targetScroll =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  }, []);

  // Keyboard navigation handler
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if container is focused
      if (document.activeElement === container) {
        if (e.key === 'ArrowLeft' && canScrollLeft) {
          e.preventDefault();
          scroll('left');
        } else if (e.key === 'ArrowRight' && canScrollRight) {
          e.preventDefault();
          scroll('right');
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [canScrollLeft, canScrollRight, scroll]);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="py-12 px-4" aria-label={`${title} carousel`}>
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
        </header>

        <div className="relative">
          {/* Left Navigation Button */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full p-3 hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900 dark:disabled:hover:bg-gray-100 transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Scroll carousel left"
          >
            <svg
              className="w-5 h-5"
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

          {/* Scrollable Image Container */}
          <div
            ref={scrollContainerRef}
            tabIndex={0}
            role="region"
            aria-label={`${title} carousel - use arrow keys to navigate`}
            className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="relative flex-shrink-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                />
              </div>
            ))}
          </div>

          {/* Right Navigation Button */}
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full p-3 hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900 dark:disabled:hover:bg-gray-100 transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Scroll carousel right"
          >
            <svg
              className="w-5 h-5"
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
      </div>
    </section>
  );
}
