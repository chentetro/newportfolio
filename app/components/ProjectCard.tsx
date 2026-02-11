import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/app/types/project';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const {
    slug,
    title,
    shortDescription,
    technologies,
    languages,
    imageSrc,
    imageAlt,
  } = project;

  return (
    <article
      className="group bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 min-h-[44px]"
      aria-label={`Project: ${title}`}
    >
      <Link
        href={`/projects/${slug}`}
        aria-label={`View project: ${title}`}
        className="flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        <div className="relative w-full h-52 sm:h-56">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4 gap-2">
            {technologies.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-100 mb-1">
                  Stack
                </p>
                <ul className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <li
                      key={tech}
                      className="text-xs text-gray-100 bg-gray-900/70 px-2 py-1 rounded-md border border-gray-500"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {languages.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-100 mt-2 mb-1">
                  Languages
                </p>
                <ul className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <li
                      key={lang}
                      className="text-xs text-gray-100 bg-gray-900/70 px-2 py-1 rounded-md border border-gray-500"
                    >
                      {lang}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-relaxed">
            {title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {shortDescription}
          </p>
        </div>
      </Link>
    </article>
  );
}
