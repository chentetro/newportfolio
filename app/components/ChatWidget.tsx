'use client';

import { useState, useEffect, useRef } from 'react';
import Chat from './Chat';

/**
 * ChatWidget component with floating button and modal dialog.
 * Follows monochrome design system and accessibility standards.
 */
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // Callback ref to store input reference
  const handleInputRef = (node: HTMLTextAreaElement | null) => {
    inputRef.current = node;
  };

  // Get all focusable elements within the dialog
  const getFocusableElements = (): HTMLElement[] => {
    if (!dialogRef.current) return [];

    const focusableSelectors = [
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'a[href]',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    return Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
    ).filter((el) => {
      // Filter out elements that are not visible
      return (
        el.offsetWidth > 0 &&
        el.offsetHeight > 0 &&
        !el.hasAttribute('aria-hidden')
      );
    });
  };

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Use requestAnimationFrame to ensure dialog is fully rendered
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isOpen]);

  // Focus trap: keep focus within dialog
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      // Only trap if active element is within the dialog
      const activeElement = document.activeElement as HTMLElement;
      if (!dialogRef.current?.contains(activeElement)) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // If Shift+Tab on first element, focus last element
      if (e.shiftKey && activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
        return;
      }

      // If Tab on last element, focus first element
      if (!e.shiftKey && activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
        return;
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isOpen]);

  // Restore focus to trigger button when dialog closes
  useEffect(() => {
    if (!isOpen && triggerButtonRef.current) {
      // Small delay to ensure dialog is fully closed
      requestAnimationFrame(() => {
        triggerButtonRef.current?.focus();
      });
    }
  }, [isOpen]);

  // Handle Escape key to close dialog
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when dialog is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Floating button */}
      <button
        ref={triggerButtonRef}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full shadow-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:outline-none z-40 flex items-center justify-center"
        aria-label="Open chat"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {/* Modal dialog */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            data-testid="chat-backdrop"
            className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-50"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Dialog */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Chat with assistant"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={(e) => {
              // Close if clicking backdrop (not dialog content)
              if (e.target === e.currentTarget) {
                setIsOpen(false);
              }
            }}
          >
            <div
              ref={dialogRef}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl h-[80vh] max-h-[700px] flex flex-col border border-gray-200 dark:border-gray-700"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Chat with Assistant
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:outline-none min-w-[44px] min-h-[44px]"
                  aria-label="Close chat"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Chat component */}
              <div className="flex-1 overflow-hidden">
                <Chat inputRef={handleInputRef} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
