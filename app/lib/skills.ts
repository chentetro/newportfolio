import {
  SiC,
  SiCplusplus,
  SiPython,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiMysql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiPostman,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { TbBrandCSharp } from 'react-icons/tb';
import type { SkillCategoryData } from '../types/skills';

/**
 * Skills data organized by categories with icons from react-icons.
 * Contains 14 skills across 4 categories: Programming Languages, Web Development,
 * Databases, and Tools & Environment.
 */
export const SKILLS_DATA: SkillCategoryData[] = [
  {
    category: 'Programming Languages',
    skills: [
      { name: 'C', icon: SiC },
      { name: 'C++', icon: SiCplusplus },
      { name: 'C#', icon: TbBrandCSharp },
      { name: 'Java', icon: FaJava },
      { name: 'Python', icon: SiPython },
    ],
  },
  {
    category: 'Web Development',
    skills: [
      { name: 'HTML', icon: SiHtml5 },
      { name: 'CSS', icon: SiCss3 },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'TypeScript', icon: SiTypescript },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'MySQL', icon: SiMysql },
      { name: 'MongoDB', icon: SiMongodb },
    ],
  },
  {
    category: 'Tools & Environment',
    skills: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Postman', icon: SiPostman },
    ],
  },
];
