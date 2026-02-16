import ExperienceTimeline from '../components/ExperienceTimeline';
import Skills from '../components/Skills';
import FirstHome from '../components/FirstHome';
import { getAllExperienceEntries } from '../lib/experience';
import { aboutContent } from '@/content/about';

export default function About() {
  const experiences = getAllExperienceEntries();
  const { profile, experience, skills } = aboutContent;

  return (
    <main>
      <FirstHome
        imageUrl={profile.imageUrl}
        imageAlt={profile.imageAlt}
        mainHeading={profile.mainHeading}
        subHeading={profile.subHeading}
        paragraphContent={profile.paragraphContent}
        noBackground={true}
      />
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {experience.heading}
          </h2>
        </div>
      </section>
      <div className="px-4 pb-12">
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-sm">
          <ExperienceTimeline experiences={experiences} />
        </div>
      </div>
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {skills.heading}
          </h2>
        </div>
      </section>
      <div className="px-4 pb-12">
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-sm">
          <Skills />
        </div>
      </div>
    </main>
  );
}
