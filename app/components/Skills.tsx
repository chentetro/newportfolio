"use client";

import { SKILLS_DATA } from '../lib/skills';

export default function Skills() {
  if (!SKILLS_DATA || SKILLS_DATA.length === 0) {
    return null;
  }

  return (
    <section className="p-4 sm:p-6 lg:p-8" aria-label="Skills section">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
        Skills
      </h2>
      <div className="space-y-8">
        {SKILLS_DATA.map((categoryData) => (
          <div key={categoryData.category}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-4">
              {categoryData.category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {categoryData.skills.map((skill) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 min-h-[44px]"
                  >
                    <IconComponent className="w-5 h-5" aria-hidden="true" />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
