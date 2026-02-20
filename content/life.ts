import type { CarouselItem } from '@/app/types/carousel';

/**
 * Life media data for the carousel component.
 * Each entry includes metadata for image or video display and accessibility.
 *
 * Note: Update media paths and alt text with actual photos/videos placed in public/images/life/
 */
export const lifeImages = [
  {
    type: 'image' as const,
    id: 'life-1',
    imageUrl: '/images/life/placeholder-1.jpg',
    imageAlt: 'Portrait photo of the author',
  },
  {
    type: 'image' as const,
    id: 'life-2',
    imageUrl: '/images/life/placeholder-2.jpg',
    imageAlt: 'Photo of the author with their father',
  },
  {
    type: 'image' as const,
    id: 'life-3',
    imageUrl: '/images/life/placeholder-3.jpg',
    imageAlt: 'Family photo of the author with their mother and twin sister',
  },
  {
    type: 'image' as const,
    id: 'life-4',
    imageUrl: '/images/life/placeholder-4.jpg',
    imageAlt: 'Photo of the author with their twin sister',
  },
  {
    type: 'image' as const,
    id: 'life-5',
    imageUrl: '/images/life/WhatsApp Image 2026-02-20 at 11.59.22.jpeg',
    imageAlt: 'Life moment captured',
  },
  {
    type: 'image' as const,
    id: 'life-6',
    imageUrl: '/images/life/WhatsApp Image 2026-02-20 at 12.00.37 (2).jpeg',
    imageAlt: 'Life moment captured',
  },
  {
    type: 'image' as const,
    id: 'life-7',
    imageUrl: '/images/life/WhatsApp Image 2026-02-20 at 12.00.48.jpeg',
    imageAlt: 'Life moment captured',
  },
  {
    type: 'image' as const,
    id: 'life-8',
    imageUrl: '/images/life/WhatsApp Image 2026-02-20 at 12.00.53.jpeg',
    imageAlt: 'Life moment captured',
  },
  {
    type: 'video' as const,
    id: 'life-9',
    videoUrl: '/images/life/WhatsApp Video 2026-02-20 at 12.01.22.mp4',
    videoAlt: 'Life moment video',
  },
] satisfies CarouselItem[];
