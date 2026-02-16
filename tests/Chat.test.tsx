import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chat from '@/app/components/Chat';

// Mock useChat hook
const mockUseChat = vi.fn();
vi.mock('@ai-sdk/react', () => ({
  useChat: () => mockUseChat(),
}));

// Mock DefaultChatTransport
vi.mock('ai', () => ({
  DefaultChatTransport: vi.fn(),
}));

describe('Chat', () => {
  const mockInputRef = vi.fn();

  const defaultMockReturn = {
    messages: [],
    sendMessage: vi.fn(),
    status: 'ready',
    error: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseChat.mockReturnValue(defaultMockReturn);
  });

  // 1. Core Functionality Tests
  it('renders empty state correctly', () => {
    render(<Chat />);
    expect(
      screen.getByText(/Ask me anything about Chen's background/)
    ).toBeInTheDocument();
  });

  it('renders input field with correct attributes', () => {
    render(<Chat />);
    const input = screen.getByLabelText('Chat message input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Type your message...');
    expect(input).toHaveAttribute('maxLength', '100');
    expect(input.tagName).toBe('TEXTAREA');
  });

  it('renders send button with correct attributes', () => {
    render(<Chat />);
    const button = screen.getByLabelText('Send message');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled(); // Disabled when input is empty
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('displays user messages correctly', () => {
    mockUseChat.mockReturnValue({
      ...defaultMockReturn,
      messages: [
        {
          id: '1',
          role: 'user',
          content: 'Test user message',
        },
      ],
    });
    render(<Chat />);
    expect(screen.getByText('Test user message')).toBeInTheDocument();
  });

  it('displays assistant messages correctly', () => {
    mockUseChat.mockReturnValue({
      ...defaultMockReturn,
      messages: [
        {
          id: '1',
          role: 'assistant',
          parts: [{ type: 'text', text: 'Test assistant message' }],
        },
      ],
    });
    render(<Chat />);
    expect(screen.getByText('Test assistant message')).toBeInTheDocument();
  });

  it('shows loading indicator when status is streaming', () => {
    mockUseChat.mockReturnValue({
      ...defaultMockReturn,
      status: 'streaming',
    });
    render(<Chat />);
    expect(screen.getByText('Assistant is typing')).toBeInTheDocument();
  });

  it('displays error message when error exists', () => {
    mockUseChat.mockReturnValue({
      ...defaultMockReturn,
      error: { message: 'Test error message' },
    });
    render(<Chat />);
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  // 2. Structural Hierarchy Tests
  it('uses semantic HTML structure with log role', () => {
    const { container } = render(<Chat />);
    const logElement = container.querySelector('[role="log"]');
    expect(logElement).toBeInTheDocument();
    expect(logElement).toHaveAttribute('aria-label', 'Chat messages');
    expect(logElement).toHaveAttribute('aria-live', 'polite');
  });

  // 3. Accessibility Tests
  it('meets accessibility requirements', () => {
    render(<Chat />);
    const input = screen.getByLabelText('Chat message input');
    expect(input).toBeInTheDocument();

    const button = screen.getByLabelText('Send message');
    expect(button).toBeInTheDocument();

    const messagesArea = screen.getByLabelText('Chat messages');
    expect(messagesArea).toHaveAttribute('role', 'log');
    expect(messagesArea).toHaveAttribute('aria-live', 'polite');
  });

  // 4. Interactive Behavior Tests
  it('enables send button when input has content', async () => {
    const user = userEvent.setup();
    render(<Chat />);

    const input = screen.getByLabelText('Chat message input');
    const button = screen.getByLabelText('Send message');

    await user.type(input, 'Test message');
    expect(button).not.toBeDisabled();
  });

  it('disables send button when input is empty', () => {
    render(<Chat />);
    const button = screen.getByLabelText('Send message');
    expect(button).toBeDisabled();
  });

  it('disables send button when loading', () => {
    mockUseChat.mockReturnValue({
      ...defaultMockReturn,
      status: 'streaming',
    });
    render(<Chat />);
    const button = screen.getByLabelText('Send message');
    expect(button).toBeDisabled();
  });

  it('shows character counter when approaching limit', async () => {
    const user = userEvent.setup();
    render(<Chat />);

    const input = screen.getByLabelText('Chat message input');
    await user.type(input, 'a'.repeat(75));

    expect(screen.getByText(/characters remaining/)).toBeInTheDocument();
  });

  it('does not show character counter when under threshold', async () => {
    const user = userEvent.setup();
    render(<Chat />);

    const input = screen.getByLabelText('Chat message input');
    await user.type(input, 'Short message');

    expect(screen.queryByText(/characters remaining/)).not.toBeInTheDocument();
  });

  // 5. Edge Cases and Error Handling
  it('handles empty messages array gracefully', () => {
    render(<Chat />);
    expect(
      screen.getByText(/Ask me anything about Chen's background/)
    ).toBeInTheDocument();
  });

  it('handles inputRef callback correctly', () => {
    render(<Chat inputRef={mockInputRef} />);
    expect(mockInputRef).toHaveBeenCalled();
  });
});
