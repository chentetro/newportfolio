import SocialButtons from './components/SocialButtons';
import FirstHome from './components/FirstHome';
import SkillCard from './components/SkillCard';
import { homeContent } from '@/content/home';

export default function Home() {
  const { profile, socialButtons, skills, now } = homeContent;

  return (
    <main>
      <FirstHome
        imageUrl={profile.imageUrl}
        imageAlt={profile.imageAlt}
        mainHeading={profile.mainHeading}
        subHeading={profile.subHeading}
        paragraphContent={profile.paragraphContent}
      />

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <SocialButtons
            githubUrl={socialButtons.githubUrl}
            cvUrl={socialButtons.cvUrl}
            linkedInUrl={socialButtons.linkedInUrl}
            email={socialButtons.email}
          />
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {skills.heading}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {skills.description}
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.items.map((skill) => (
              <SkillCard
                key={skill.title}
                title={skill.title}
                description={skill.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {now.heading}
            </h2>
          </header>

          <SkillCard
            title={now.item.title}
            description={now.item.description}
          />
        </div>
      </section>
    </main>
  );
}
