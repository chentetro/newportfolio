import {
  SiC,
  SiCplusplus,
  SiPython,
  SiNextdotjs,
  SiReact,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiVitest,
  SiPostman,
} from 'react-icons/si';
import { FaJava, FaTools, FaMicrosoft } from 'react-icons/fa';
import { TbBrandCSharp } from 'react-icons/tb';
import type { SkillCategoryData } from '../types/skills';

/**
 * Skills data organized by categories with icons from react-icons.
 * Contains skills across 5 categories: Languages, Frontend Development,
 * Backend & Database, Tools & Testing, and Other.
 */
export const SKILLS_DATA: SkillCategoryData[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'C', icon: SiC },
      { name: 'C++', icon: SiCplusplus },
      { name: 'C#', icon: TbBrandCSharp },
      { name: 'Java', icon: FaJava },
      { name: 'Python', icon: SiPython },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'TypeScript', icon: SiTypescript },
    ],
  },
  {
    category: 'Frontend Development',
    skills: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'React', icon: SiReact },
      { name: 'HTML5', icon: SiHtml5 },
      { name: 'CSS3', icon: SiCss3 },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ],
  },
  {
    category: 'Backend & Database',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Express', icon: SiExpress },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'MySQL', icon: SiMysql },
    ],
  },
  {
    category: 'Tools & Testing',
    skills: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Vitest', icon: SiVitest },
      { name: 'Postman', icon: SiPostman },
      { name: 'Cursor', icon: FaTools },
    ],
  },
  {
    category: 'Other',
    skills: [
      {
        name: 'Microsoft Office (Word, Excel, PowerPoint, Outlook)',
        icon: FaMicrosoft,
      },
    ],
  },
];
