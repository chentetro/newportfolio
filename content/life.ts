import type { CarouselItem } from '@/app/types/carousel';

/**
 * Life images data for the carousel component.
 * Each entry includes metadata for image display and accessibility.
 *
 * Note: Update image paths and alt text with actual photos placed in public/images/life/
 */
export const lifeImages = [
  {
    id: 'life-1',
    imageUrl: '/images/life/placeholder-1.jpg',
    imageAlt: 'Life moment placeholder image 1',
  },
  {
    id: 'life-2',
    imageUrl: '/images/life/placeholder-2.jpg',
    imageAlt: 'Life moment placeholder image 2',
  },
  {
    id: 'life-3',
    imageUrl: '/images/life/placeholder-3.jpg',
    imageAlt: 'Life moment placeholder image 3',
  },
] satisfies CarouselItem[];
