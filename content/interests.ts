import type { InterestCard } from '@/app/types/interests';
// Icons from react-icons/fa (Font Awesome) for interest cards
import { FaUtensils, FaDumbbell, FaMusic, FaBook } from 'react-icons/fa';

/**
 * Personal interests data for the LifeBeyondCode component.
 * Displays four main interests: Cooking, Workout, Music, and Reading.
 */
export const interestsData: InterestCard[] = [
  {
    id: 'cooking',
    title: 'Cooking',
    description: 'Exploring new recipes and culinary techniques',
    icon: FaUtensils,
  },
  {
    id: 'workout',
    title: 'Workout',
    description: 'Kickboxing and Pilates to stay active and energized',
    icon: FaDumbbell,
  },
  {
    id: 'music',
    title: 'Music',
    description: 'Listening to Latin music and discovering new artists',
    icon: FaMusic,
  },
  {
    id: 'reading',
    title: 'Reading',
    description: 'Interested in personal development books',
    icon: FaBook,
  },
] satisfies InterestCard[];
