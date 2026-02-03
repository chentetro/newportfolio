import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ExperienceEntry } from '../types/experience';

const experienceDirectory = path.join(process.cwd(), 'content/experience');

/**
 * Parses all experience markdown files and returns sorted entries.
 * Entries are sorted by date (most recent first), with "Present" entries appearing first.
 */
export function getAllExperienceEntries(): ExperienceEntry[] {
  // Check if directory exists
  if (!fs.existsSync(experienceDirectory)) {
    return [];
  }

  // Get all markdown files
  const fileNames = fs.readdirSync(experienceDirectory);
  const markdownFiles = fileNames.filter((name) => name.endsWith('.md'));

  // Parse each file
  const entries: ExperienceEntry[] = markdownFiles.map((fileName) => {
    const filePath = path.join(experienceDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Extract slug from filename (remove .md extension)
    const slug = fileName.replace(/\.md$/, '');

    return {
      slug,
      role: data.role || '',
      company: data.company || '',
      startDate: data.startDate || '',
      endDate: data.endDate || 'Present',
      content: content.trim(),
    };
  });

  // Sort entries by date (most recent first)
  entries.sort((a, b) => {
    // "Present" entries always come first
    if (a.endDate === 'Present' && b.endDate !== 'Present') {
      return -1;
    }
    if (a.endDate !== 'Present' && b.endDate === 'Present') {
      return 1;
    }
    if (a.endDate === 'Present' && b.endDate === 'Present') {
      // Both are "Present", sort by startDate (most recent first)
      return compareDates(b.startDate, a.startDate);
    }

    // Compare end dates (most recent first)
    const endDateComparison = compareDates(b.endDate, a.endDate);
    if (endDateComparison !== 0) {
      return endDateComparison;
    }

    // If end dates are equal, compare start dates (most recent first)
    return compareDates(b.startDate, a.startDate);
  });

  return entries;
}

/**
 * Compares two date strings in "MMM YYYY" format.
 * Returns negative if date1 < date2, positive if date1 > date2, 0 if equal.
 */
function compareDates(date1: string, date2: string): number {
  const parseDate = (dateStr: string): Date => {
    const [month, year] = dateStr.split(' ');
    const monthMap: Record<string, number> = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };
    return new Date(parseInt(year, 10), monthMap[month] || 0);
  };

  try {
    const d1 = parseDate(date1);
    const d2 = parseDate(date2);
    return d1.getTime() - d2.getTime();
  } catch {
    // If parsing fails, maintain original order
    return 0;
  }
}
