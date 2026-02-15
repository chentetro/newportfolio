import ExperienceTimeline from '../components/ExperienceTimeline';
import Skills from '../components/Skills';
import FirstHome from '../components/FirstHome';
import { getAllExperienceEntries } from '../lib/experience';

export default function About() {
  const experiences = getAllExperienceEntries();

  return (
    <main>
      <FirstHome
        imageUrl="/images/1756311070767.jpg"
        imageAlt="Profile photo"
        mainHeading="About Me"
        subHeading="Software Developer"
        paragraphContent="I'm a passionate developer with experience in modern web technologies. I enjoy creating clean, efficient solutions and learning new technologies to solve complex problems. This page showcases my professional experience and technical skills."
        noBackground={true}
      />
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Experience
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
            Skills
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
