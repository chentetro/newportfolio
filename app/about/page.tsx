import ExperienceTimeline from '../components/ExperienceTimeline';
import { getAllExperienceEntries } from '../lib/experience';

export default function About() {
  const experiences = getAllExperienceEntries();

  return (
    <main>
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Experience
          </h1>
        </div>
      </section>
      <div className="px-4 pb-12">
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-sm">
          <ExperienceTimeline experiences={experiences} />
        </div>
      </div>
    </main>
  );
}
