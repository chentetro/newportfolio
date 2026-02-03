import { ExperienceEntry } from '../types/experience';

interface ExperienceTimelineProps {
  experiences: ExperienceEntry[];
}

export default function ExperienceTimeline({
  experiences,
}: ExperienceTimelineProps) {
  if (experiences.length === 0) {
    return null;
  }

  return (
    <section
      className="p-6 lg:p-8"
      aria-label="Professional experience timeline"
    >
      <div className="w-full max-w-full">
        <div className="relative space-y-8">
          {/* Vertical timeline line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-600"
            aria-hidden="true"
          />

          {experiences.map((experience) => (
            <article
              key={experience.slug}
              className="relative pl-8"
              aria-label={`Experience: ${experience.role} at ${experience.company}`}
            >
              {/* Circular bullet point on timeline */}
              <div
                className="absolute left-0 top-2 w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-500 border-2 border-white dark:border-gray-900 -translate-x-1/2"
                aria-hidden="true"
              />

              {/* Timeline card */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6 lg:p-8">
                {/* Role and Company */}
                <header className="mb-4">
                  <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {experience.role}
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-3">
                    {experience.company}
                  </p>
                  {/* Date range */}
                  <time
                    className="text-sm text-gray-600 dark:text-gray-400"
                    dateTime={formatDateTime(
                      experience.startDate,
                      experience.endDate
                    )}
                  >
                    {formatDateRange(experience.startDate, experience.endDate)}
                  </time>
                </header>

                {/* Content bullet points */}
                {experience.content && (
                  <div className="mt-4">
                    <ul className="space-y-2 list-none">
                      {parseBulletPoints(experience.content).map(
                        (point, pointIndex) => (
                          <li
                            key={pointIndex}
                            className="text-base text-gray-700 dark:text-gray-300 leading-relaxed flex items-start"
                          >
                            <span className="mr-2 text-gray-400 dark:text-gray-500">
                              •
                            </span>
                            <span>{point}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Formats a date range string for display.
 * Handles "Present" endDate correctly.
 */
function formatDateRange(
  startDate: string,
  endDate: string | 'Present'
): string {
  if (endDate === 'Present') {
    return `${startDate} — Present`;
  }
  return `${startDate} — ${endDate}`;
}

/**
 * Formats a date range for the dateTime attribute.
 * Returns ISO 8601 format or empty string if dates are invalid.
 */
function formatDateTime(
  startDate: string,
  endDate: string | 'Present'
): string {
  const parseDate = (dateStr: string): string | null => {
    const [month, year] = dateStr.split(' ');
    const monthMap: Record<string, string> = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12',
    };
    const monthNum = monthMap[month];
    if (!monthNum || !year) {
      return null;
    }
    // Use first day of month for start, last day for end
    return `${year}-${monthNum}`;
  };

  const start = parseDate(startDate);
  if (!start) {
    return '';
  }

  if (endDate === 'Present') {
    return `${start}/..`;
  }

  const end = parseDate(endDate);
  if (!end) {
    return start;
  }

  return `${start}/${end}`;
}

/**
 * Parses markdown bullet points from content string.
 * Handles both `-` and `*` markdown list markers.
 */
function parseBulletPoints(content: string): string[] {
  return content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      // Remove markdown list markers (- or *)
      return line.replace(/^[-*]\s+/, '').trim();
    })
    .filter((line) => line.length > 0);
}
