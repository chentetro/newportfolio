/**
 * Props for the MarkdownRenderer component.
 */
export interface MarkdownRendererProps {
  /** Markdown content to render */
  content: string;
  /** Optional CSS class name */
  className?: string;
}

/**
 * Props for the Chat component.
 */
export interface ChatProps {
  /** Optional callback ref for the input textarea element */
  inputRef?: (node: HTMLTextAreaElement | null) => void;
}
