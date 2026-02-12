import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { FaGithub } from 'react-icons/fa';
import { projects } from '@/content/projects';
import type { Project } from '@/app/types/project';

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Finds a project by its slug.
 * Returns undefined if no project matches the slug.
 */
function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * Generates static params for all project slugs at build time.
 * This enables static generation for all project detail pages.
 */
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

/**
 * Generates metadata for each project detail page.
 * Provides SEO-friendly titles and descriptions.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Projects`,
    description: project.description,
  };
}

/**
 * Project detail page component.
 * Displays full project information including description, technologies, languages, and GitHub link.
 */
export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const {
    title,
    description,
    technologies,
    languages,
    githubUrl,
    imageSrc,
    imageAlt,
  } = project;

  return (
    <main>
      <article className="py-12 px-4 overflow-x-hidden">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <header className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {title}
            </h1>
          </header>

          {/* Project Image */}
          <div className="relative w-full h-64 sm:h-80 lg:h-96 mb-8 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 896px"
              priority
            />
          </div>

          {/* About This Project Section */}
          <section className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              About this project
            </h2>
            <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </section>

          {/* Stack & Languages Section */}
          <section className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Stack & languages
            </h2>

            {technologies.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Technologies
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <li
                      key={tech}
                      className="text-sm text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {languages.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Languages
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <li
                      key={lang}
                      className="text-sm text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600"
                    >
                      {lang}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Repository Section */}
          <section className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Repository
            </h2>
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${title} repository on GitHub`}
              className="inline-flex items-center gap-2 px-4 py-2 min-h-[44px] bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <FaGithub className="w-5 h-5" aria-hidden="true" />
              View on GitHub
            </Link>
          </section>
        </div>
      </article>
    </main>
  );
}
