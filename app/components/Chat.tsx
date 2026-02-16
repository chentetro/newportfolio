'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useEffect, useRef, useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import type { ChatProps } from '@/app/types/chat';

// Constants for input validation
const MAX_INPUT_LENGTH = 100;
const CHAR_COUNTER_THRESHOLD = 70;
const CHAR_WARNING_THRESHOLD = 80;
const CHAR_DANGER_THRESHOLD = 90;

const chatTransport = new DefaultChatTransport({ api: '/api/chat' });

type RenderMessage = {
  id: string;
  role: string;
  content?: string;
  text?: string;
  parts?: Array<{ type: string; text?: string }>;
};

function getMessageText(message: RenderMessage): string {
  if (typeof message.content === 'string') return message.content;
  if (typeof message.text === 'string') return message.text;

  if (Array.isArray(message.parts)) {
    return message.parts
      .filter((part) => part.type === 'text' && typeof part.text === 'string')
      .map((part) => part.text as string)
      .join('');
  }

  return '';
}

/**
 * Chat component with message display, input, and streaming support.
 * Follows monochrome design system and accessibility standards.
 */
export default function Chat({ inputRef }: ChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');

  const { messages, sendMessage, status, error } = useChat({
    transport: chatTransport,
  });

  const messagesList = (messages as unknown as RenderMessage[]) || [];
  const isLoading = status === 'submitted' || status === 'streaming';

  // Auto-scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current?.scrollIntoView) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messagesList]);

  const remainingChars = MAX_INPUT_LENGTH - inputValue.length;
  const showCounter = remainingChars <= CHAR_COUNTER_THRESHOLD;
  const counterColor =
    remainingChars <= CHAR_DANGER_THRESHOLD
      ? 'text-gray-900 dark:text-gray-100'
      : remainingChars <= CHAR_WARNING_THRESHOLD
        ? 'text-gray-700 dark:text-gray-300'
        : 'text-gray-600 dark:text-gray-400';

  const isInputDisabled = isLoading || inputValue.trim().length === 0;

  const sendCurrentMessage = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    setInputValue('');
    await sendMessage({ text: trimmed });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void sendCurrentMessage();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= MAX_INPUT_LENGTH) {
      setInputValue(newValue);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[600px] min-h-[400px]">
      {/* Messages area */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
      >
        {messagesList.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Ask me anything about Chen&apos;s background, experience, skills,
              projects, or interests!
            </p>
          </div>
        ) : (
          messagesList.map((message) => {
            const messageText = getMessageText(message);
            return (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <MarkdownRenderer content={messageText} />
                  ) : (
                    <p className="whitespace-pre-wrap break-words">
                      {messageText}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-3">
              <div className="flex gap-1">
                <span
                  className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0ms' }}
                  aria-hidden="true"
                />
                <span
                  className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '150ms' }}
                  aria-hidden="true"
                />
                <span
                  className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '300ms' }}
                  aria-hidden="true"
                />
              </div>
              <span className="sr-only">Assistant is typing</span>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 max-w-[85%]">
              <p className="text-gray-900 dark:text-gray-100 text-sm">
                {error.message || 'An error occurred. Please try again.'}
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-200 dark:border-gray-700 p-4"
      >
        <div className="flex flex-col gap-2">
          {/* Character counter */}
          {showCounter && (
            <div className="flex justify-end">
              <span
                className={`text-xs ${counterColor}`}
                aria-live="polite"
                aria-atomic="true"
              >
                {remainingChars} characters remaining
              </span>
            </div>
          )}

          {/* Input and button container */}
          <div className="flex gap-2">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && !isInputDisabled) {
                  e.preventDefault();
                  void sendCurrentMessage();
                }
              }}
              placeholder="Type your message..."
              maxLength={MAX_INPUT_LENGTH}
              disabled={isLoading}
              rows={2}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Chat message input"
              aria-describedby={showCounter ? 'char-counter' : undefined}
            />
            <button
              type="submit"
              disabled={isInputDisabled}
              className="px-6 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 font-medium min-h-[44px] min-w-[44px] disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-gray-500 focus:outline-none"
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
