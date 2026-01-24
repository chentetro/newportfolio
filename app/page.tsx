import SocialButtons from './components/SocialButtons';
import FirstHome from './components/FirstHome';
import SkillCard from './components/SkillCard';

export default function Home() {
  return (
    <main>
      <FirstHome
        imageUrl="/images/1756311070767.jpg"
        imageAlt="Profile photo"
        mainHeading="Chen Tetroashvili"
        subHeading="Full Stack Developer"
        paragraphContent="I'm a passionate developer with experience in modern web technologies. I enjoy creating clean, efficient solutions and learning new technologies to solve complex problems."
      />

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <SocialButtons
            githubUrl="https://github.com/chentetro"
            cvUrl="/resume.pdf"
            linkedInUrl="https://www.linkedin.com/in/chen-tetroashvili-%D7%97%D7%9F-%D7%98%D7%98%D7%A8%D7%95%D7%90%D7%A9%D7%91%D7%99%D7%9C%D7%99-5-%D7%97%D7%95%D7%9E-%D7%97-%D7%99-junior-computer-science/"
            email="chentetroo@gmail.com"
          />
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Skills & Expertise
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Areas of technical expertise and professional experience
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkillCard
              title="UI architecture & infrastructure across multiple products"
              description="Design and implementation of scalable frontend architectures"
            />
            <SkillCard
              title="Frontend Development"
              description="Modern React, Next.js, and TypeScript applications"
            />
            <SkillCard
              title="Backend Systems"
              description="API design, database management, and server architecture"
            />
            <SkillCard
              title="Full Stack Integration"
              description="End-to-end application development and deployment"
            />
            <SkillCard
              title="Performance Optimization"
              description="Code optimization and application performance tuning"
            />
            <SkillCard
              title="Problem Solving"
              description="Complex technical challenges and efficient solution design"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
