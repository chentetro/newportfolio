'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ProjectImageProps } from '@/app/types/projectimage';

export default function ProjectImage({
  src,
  alt,
  className = 'object-cover',
  sizes,
  priority = false,
}: ProjectImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800"
        role="img"
        aria-label={`${alt} - Image failed to load`}
      >
        <div className="text-center px-4">
          <svg
            className="w-12 h-12 mx-auto mb-2 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Image unavailable
          </p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => setHasError(true)}
    />
  );
}
