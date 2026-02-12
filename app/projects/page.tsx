import ProjectCard from '@/app/components/ProjectCard';
import { projects } from '@/content/projects';

export default function Projects() {
  return (
    <main>
      <section className="py-12 px-4 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Projects
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              A collection of projects showcasing my work in web development,
              featuring modern technologies and best practices.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
