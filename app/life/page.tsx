import ImageCarousel from '@/app/components/ImageCarousel';
import { lifeImages } from '@/content/life';
import LifeBeyondCode from '@/app/components/LifeBeyondCode';
import { interestsData } from '@/content/interests';

export default function Life() {
  return (
    <main>
      <LifeBeyondCode
        mainHeading="Life Beyond Code"
        description="When I'm not coding, I'm exploring the world and finding inspiration in the little things that make life beautiful."
        sectionHeading="What I Love Doing"
        interests={interestsData}
      />

      <ImageCarousel title="Life Moments" items={lifeImages} />
    </main>
  );
}
