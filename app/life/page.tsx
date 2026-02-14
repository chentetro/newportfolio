import ImageCarousel from '@/app/components/ImageCarousel';
import { lifeImages } from '@/content/life';

export default function Life() {
  return (
    <main>
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Life
          </h1>
        </div>
      </section>

      <ImageCarousel title="Life Moments" items={lifeImages} />
    </main>
  );
}
