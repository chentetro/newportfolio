import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MarkdownRenderer from '@/app/components/MarkdownRenderer';

describe('MarkdownRenderer', () => {
  const mockContent = {
    heading: '# Heading 1\n## Heading 2\n### Heading 3',
    list: '- Item 1\n- Item 2\n- Item 3',
    link: '[Link text](https://example.com)',
    code: '`inline code` and ```\ncode block\n```',
    paragraph: 'This is a paragraph with **bold** and *italic* text.',
    blockquote: '> This is a blockquote',
  };

  // 1. Core Functionality Tests
  it('renders markdown content correctly', () => {
    render(<MarkdownRenderer content={mockContent.paragraph} />);
    expect(screen.getByText(/This is a paragraph/)).toBeInTheDocument();
  });

  it('renders headings correctly', () => {
    render(<MarkdownRenderer content={mockContent.heading} />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('Heading 1');
    expect(h1).toHaveProperty('tagName', 'H1');

    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent('Heading 2');
    expect(h2).toHaveProperty('tagName', 'H2');

    const h3 = screen.getByRole('heading', { level: 3 });
    expect(h3).toHaveTextContent('Heading 3');
    expect(h3).toHaveProperty('tagName', 'H3');
  });

  it('renders lists correctly', () => {
    render(<MarkdownRenderer content={mockContent.list} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('renders links with correct attributes', () => {
    render(<MarkdownRenderer content={mockContent.link} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveTextContent('Link text');
  });

  it('renders inline code correctly', () => {
    render(<MarkdownRenderer content="This has `inline code` in it" />);
    const code = screen.getByText('inline code');
    expect(code.tagName).toBe('CODE');
  });

  // 2. Structural Hierarchy Tests
  it('uses semantic HTML structure with article role', () => {
    const { container } = render(
      <MarkdownRenderer content={mockContent.paragraph} />
    );
    const article = container.querySelector('[role="article"]');
    expect(article).toBeInTheDocument();
    expect(article).toHaveAttribute('aria-label', 'Chat message content');
  });

  // 3. Accessibility Tests
  it('meets accessibility requirements', () => {
    const { container } = render(
      <MarkdownRenderer content={mockContent.paragraph} />
    );
    const article = container.querySelector('[role="article"]');
    expect(article).toHaveAttribute('aria-label', 'Chat message content');
  });

  // 4. Styling and Layout Tests
  it('applies correct styling classes', () => {
    const { container } = render(
      <MarkdownRenderer content={mockContent.paragraph} />
    );
    const article = container.querySelector('[role="article"]');
    expect(article).toHaveClass('prose', 'prose-sm', 'max-w-none');
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <MarkdownRenderer
        content={mockContent.paragraph}
        className="custom-class"
      />
    );
    const article = container.querySelector('[role="article"]');
    expect(article).toHaveClass('custom-class');
  });

  // 5. Edge Cases and Error Handling
  it('handles empty content gracefully', () => {
    render(<MarkdownRenderer content="" />);
    const { container } = render(<MarkdownRenderer content="" />);
    const article = container.querySelector('[role="article"]');
    expect(article).toBeInTheDocument();
  });

  it('handles content with special characters', () => {
    const specialContent = 'Content with <special> & "characters"';
    render(<MarkdownRenderer content={specialContent} />);
    expect(screen.getByText(/Content with/)).toBeInTheDocument();
  });
});
