interface SkillCardProps {
  title: string;
  description?: string;
  className?: string;
}

export default function SkillCard({
  title,
  description,
  className = '',
}: SkillCardProps) {
  return (
    <article
      className={`bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200 min-h-[44px] cursor-pointer focus:ring-2 focus:ring-gray-500 focus:outline-none ${className}`}
      role="article"
      tabIndex={0}
      aria-label={`Skill: ${title}`}
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-relaxed">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
          {description}
        </p>
      )}
    </article>
  );
}
