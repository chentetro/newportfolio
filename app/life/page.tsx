import ImageCarousel from '@/app/components/ImageCarousel';
import { lifeImages } from '@/content/life';
import LifeBeyondCode from '@/app/components/LifeBeyondCode';
import { interestsData } from '@/content/interests';

export default function Life() {
  return (
    <main>
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            My Life
          </h1>
        </div>
      </section>

      <LifeBeyondCode
        mainHeading="Life Beyond Code"
        description="When I'm not coding, I'm exploring the world, creating music, and finding inspiration in the little things that make life beautiful."
        sectionHeading="What I Love Doing"
        interests={interestsData}
      />

      <ImageCarousel title="Life Moments" items={lifeImages} />
    </main>
  );
}
