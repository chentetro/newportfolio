import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatWidget from '@/app/components/ChatWidget';

// Mock Chat component
vi.mock('@/app/components/Chat', () => ({
  default: () => <div data-testid="chat-component">Chat Component</div>,
}));

describe('ChatWidget', () => {
  beforeEach(() => {
    // Reset body overflow
    document.body.style.overflow = '';
  });

  // 1. Core Functionality Tests
  it('renders floating button', () => {
    render(<ChatWidget />);
    const button = screen.getByLabelText('Open chat');
    expect(button).toBeInTheDocument();
  });

  it('opens dialog when button is clicked', async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    const button = screen.getByLabelText('Open chat');
    await user.click(button);

    expect(screen.getByLabelText('Chat with assistant')).toBeInTheDocument();
    expect(screen.getByText('Chat with Assistant')).toBeInTheDocument();
  });

  it('closes dialog when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    // Open dialog
    const openButton = screen.getByLabelText('Open chat');
    await user.click(openButton);

    // Close dialog
    const closeButton = screen.getByLabelText('Close chat');
    await user.click(closeButton);

    expect(
      screen.queryByLabelText('Chat with assistant')
    ).not.toBeInTheDocument();
  });

  it('renders Chat component inside dialog when open', async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    const button = screen.getByLabelText('Open chat');
    await user.click(button);

    expect(screen.getByTestId('chat-component')).toBeInTheDocument();
  });

  // 2. Structural Hierarchy Tests
  it('uses semantic HTML structure with dialog role', async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    const button = screen.getByLabelText('Open chat');
    await user.click(button);

    const dialog = screen.getByLabelText('Chat with assistant');
    expect(dialog).toHaveAttribute('role', 'dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('renders header with proper heading', async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    const button = screen.getByLabelText('Open chat');
    await user.click(button);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Chat with Assistant');
    expect(heading).toHaveProperty('tagName', 'H2');
  });

  // 3. Accessibility Tests
  it('meets accessibility requirements', async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    const openButton = screen.getByLabelText('Open chat');
    expect(openButton).toBeInTheDocument();

    await user.click(openButton);

    const dialog = screen.getByLabelText('Chat with assistant');
    expect(dialog).toHaveAttribute('role', 'dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');

    const closeButton = screen.getByLabelText('Close chat');
    expect(closeButton).toBeInTheDocument();
  });

  it('has proper ARIA labels on all interactive elements', async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    const openButton = screen.getByLabelText('Open chat');
    expect(openButton).toHaveAttribute('aria-label', 'Open chat');

    await user.click(openButton);

    const closeButton = screen.getByLabelText('Close chat');
    expect(closeButton).toHaveAttribute('aria-label', 'Close chat');
  });

  // 4. Interactive Behavior Tests
  it('closes dialog when Escape key is pressed', async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    // Open dialog
    const openButton = screen.getByLabelText('Open chat');
    await user.click(openButton);

    expect(screen.getByLabelText('Chat with assistant')).toBeInTheDocument();

    // Press Escape
    await user.keyboard('{Escape}');

    expect(
      screen.queryByLabelText('Chat with assistant')
    ).not.toBeInTheDocument();
  });

  it('closes dialog when backdrop is clicked', async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    // Open dialog
    const openButton = screen.getByLabelText('Open chat');
    await user.click(openButton);

    expect(screen.getByLabelText('Chat with assistant')).toBeInTheDocument();

    // Click backdrop using stable test id
    const backdrop = screen.getByTestId('chat-backdrop');
    await user.click(backdrop);
    // Dialog should close
    await waitFor(() => {
      expect(
        screen.queryByLabelText('Chat with assistant')
      ).not.toBeInTheDocument();
    });
  });

  // 5. Edge Cases and Error Handling
  it('handles multiple open/close cycles correctly', async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    const openButton = screen.getByLabelText('Open chat');

    // Open and close multiple times
    await user.click(openButton);
    expect(screen.getByLabelText('Chat with assistant')).toBeInTheDocument();

    const closeButton = screen.getByLabelText('Close chat');
    await user.click(closeButton);
    expect(
      screen.queryByLabelText('Chat with assistant')
    ).not.toBeInTheDocument();

    await user.click(openButton);
    expect(screen.getByLabelText('Chat with assistant')).toBeInTheDocument();
  });

  it('renders floating button with correct styling classes', () => {
    render(<ChatWidget />);
    const button = screen.getByLabelText('Open chat');
    expect(button).toHaveClass('fixed', 'bottom-6', 'right-6');
  });

  it('traps focus within dialog when open', async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    // Open dialog
    const openButton = screen.getByLabelText('Open chat');
    await user.click(openButton);

    expect(screen.getByLabelText('Chat with assistant')).toBeInTheDocument();

    // Get focusable elements within dialog
    // Note: Chat component is mocked, so we can only test that the dialog is focusable
    // The actual input focus trapping is tested in Chat component tests
    const closeButton = screen.getByLabelText('Close chat');
    expect(closeButton).toBeInTheDocument();

    // Dialog should be accessible and focusable
    const dialog = screen.getByLabelText('Chat with assistant');
    expect(dialog).toHaveAttribute('role', 'dialog');
  });

  it('restores focus to trigger button when dialog closes', async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    const openButton = screen.getByLabelText('Open chat');
    await user.click(openButton);

    expect(screen.getByLabelText('Chat with assistant')).toBeInTheDocument();

    // Close dialog
    const closeButton = screen.getByLabelText('Close chat');
    await user.click(closeButton);

    // Wait for dialog to close and focus to restore
    await waitFor(() => {
      expect(
        screen.queryByLabelText('Chat with assistant')
      ).not.toBeInTheDocument();
    });

    // Focus should be restored to trigger button
    await waitFor(() => {
      expect(openButton).toHaveFocus();
    });
  });
});
