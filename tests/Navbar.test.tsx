import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from '@/app/components/Navbar';

describe('Navbar', () => {
  describe('Core Navigation & Links', () => {
    it.each([
      {
        label: 'Navigate to home page - Chen portfolio',
        text: 'Chen',
        href: '/',
      },
      {
        label: 'Navigate to home page',
        text: 'Home',
        href: '/',
      },
      {
        label: 'Navigate to about page',
        text: 'About',
        href: '/about',
      },
      {
        label: 'Navigate to projects page',
        text: 'Projects',
        href: '/projects',
      },
      {
        label: 'Navigate to life page',
        text: 'Life',
        href: '/life',
      },
    ])('renders link $label with correct text and href', ({ label, text, href }) => {
      render(<Navbar />);

      const link = screen.getByLabelText(label);

      expect(link).toBeInTheDocument();
      expect(link).toHaveTextContent(text);
      expect(link).toHaveAttribute('href', href);
    });
  });

  describe('Semantic Hierarchy & Accessibility', () => {
    it('uses semantic nav structure and provides accessible keyboard-friendly links', () => {
      const { container } = render(<Navbar />);

      const navElement = container.querySelector('nav');
      const links = container.querySelectorAll('a');

      expect(navElement).toBeInTheDocument();
      expect(navElement).toHaveAttribute('role', 'navigation');
      expect(navElement).toHaveAttribute('aria-label', 'Main navigation');

      expect(links).toHaveLength(5);
      links.forEach((link) => {
        expect(link).toHaveAttribute('aria-label');
        expect(link).toHaveClass('min-h-[44px]');
        expect(link).toHaveClass('focus:ring-2');
        expect(link).toHaveClass('focus:outline-none');
        expect(link).not.toHaveAttribute('tabindex', '-1');
      });
    });
  });

  describe('Styling & Responsive Layout', () => {
    it('applies the expected layout, border, and theme styling classes', () => {
      const { container } = render(<Navbar />);

      const navElement = container.querySelector('nav');
      const innerContainer = container.querySelector('.max-w-7xl.mx-auto');
      const flexContainer = container.querySelector('.flex.flex-col');
      const navLinksContainer = container.querySelector('.flex.flex-row.items-center.gap-6');
      const logoLink = screen.getByLabelText('Navigate to home page - Chen portfolio');
      const navLinks = navLinksContainer?.querySelectorAll('a') || [];

      expect(navElement).toHaveClass('w-full');
      expect(navElement).toHaveClass('bg-white', 'dark:bg-gray-950');
      expect(navElement).toHaveClass('border-b', 'border-gray-200', 'dark:border-gray-800');

      expect(innerContainer).toBeInTheDocument();
      expect(innerContainer).toHaveClass('max-w-7xl', 'mx-auto', 'px-4', 'py-4');

      expect(flexContainer).toBeInTheDocument();
      expect(flexContainer).toHaveClass('flex-col', 'sm:flex-row', 'sm:justify-between', 'gap-4');

      expect(navLinksContainer).toBeInTheDocument();
      expect(navLinks.length).toBe(4);

      navLinks.forEach((link) => {
        expect(link).toHaveClass(
          'text-gray-600',
          'dark:text-gray-400',
          'hover:text-gray-900',
          'dark:hover:text-gray-100',
          'transition-colors',
          'duration-200',
          'font-medium'
        );
      });

      expect(logoLink).toHaveClass('flex', 'items-center', 'rounded');
      expect(logoLink).toHaveTextContent('Chen');
    });

    it('renders the logo brand section with the expected text styles', () => {
      const { container } = render(<Navbar />);

      const logoText = container.querySelector('span.font-bold');

      expect(logoText).toBeInTheDocument();
      expect(logoText).toHaveTextContent('Chen');
      expect(logoText).toHaveClass('text-gray-900', 'dark:text-gray-100', 'text-xl', 'uppercase', 'tracking-tight');
    });
  });
});
