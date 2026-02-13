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
    imageAlt: 'Portrait photo of the author',
  },
  {
    id: 'life-2',
    imageUrl: '/images/life/placeholder-2.jpg',
    imageAlt: 'Photo of the author with their father',
  },
  {
    id: 'life-3',
    imageUrl: '/images/life/placeholder-3.jpg',
    imageAlt: 'Family photo of the author with their mother and twin sister',
  },
  {
    id: 'life-4',
    imageUrl: '/images/life/placeholder-4.jpg',
    imageAlt: 'Photo of the author with their twin sister',
  }
] satisfies CarouselItem[];

