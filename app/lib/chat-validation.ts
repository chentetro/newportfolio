import { z } from 'zod';

/**
 * Maximum number of characters allowed per message.
 * Prevents oversized payloads and ensures reasonable message length.
 */
export const MAX_MESSAGE_LENGTH = 1000;

/**
 * Maximum number of messages allowed per request.
 * Prevents abuse and ensures reasonable request sizes.
 */
export const MAX_MESSAGES_PER_REQUEST = 10;

/**
 * Validates a single chat message part.
 * Parts are used in UI message formats and contain typed content.
 */
const MessagePartSchema = z.object({
  type: z.string(),
  text: z.string().optional(),
});

/**
 * Validates a single chat message.
 * 
 * Supports multiple message formats for compatibility with different UI libraries:
 * - `text` field (string, max 1000 chars) - Simple text messages
 * - `content` field (string, max 1000 chars) - Alternative text field name
 * - `parts` array - UI message format with typed parts (e.g., text parts)
 * 
 * At least one of `text`, `content`, or `parts` must be present.
 * The `role` field must be one of: 'user', 'assistant', or 'system'.
 * 
 * @example
 * ```ts
 * // Valid message with text field
 * { role: 'user', text: 'Hello' }
 * 
 * // Valid message with content field
 * { role: 'user', content: 'Hello' }
 * 
 * // Valid message with parts array
 * { role: 'user', parts: [{ type: 'text', text: 'Hello' }] }
 * ```
 */
export const MessageSchema = z
  .object({
    role: z.enum(['user', 'assistant', 'system']),
    text: z.string().max(MAX_MESSAGE_LENGTH).optional(),
    content: z.string().max(MAX_MESSAGE_LENGTH).optional(),
    parts: z.array(MessagePartSchema).optional(),
  })
  .refine(
    (data) =>
      data.text || data.content || (data.parts && data.parts.length > 0),
    {
      message: 'Message must have either text, content, or parts',
    }
  );

/**
 * Validates the entire chat API request body.
 * 
 * Requires:
 * - `messages` array with at least 1 message and at most MAX_MESSAGES_PER_REQUEST messages
 * - Each message must conform to MessageSchema
 * 
 * @example
 * ```ts
 * // Valid request
 * {
 *   messages: [
 *     { role: 'user', text: 'Hello' },
 *     { role: 'assistant', text: 'Hi there!' }
 *   ]
 * }
 * ```
 */
export const RequestSchema = z.object({
  messages: z.array(MessageSchema).max(MAX_MESSAGES_PER_REQUEST).min(1),
});

/**
 * Formats Zod validation errors into user-friendly error messages.
 * 
 * Handles common validation errors with specific, actionable messages:
 * - Too many messages: Provides the limit
 * - Message too long: Provides the character limit
 * - Missing required fields: Clear field name
 * - Invalid role: Lists valid roles
 * 
 * @param error - The Zod error object from validation
 * @returns User-friendly error message string
 */
export function formatZodError(error: z.ZodError): string {
  const firstError = error.issues[0];
  if (!firstError) {
    return 'Invalid request format';
  }

  // Handle common validation errors with friendly messages
  if (firstError.code === 'too_big') {
    const pathStr = firstError.path.join('.');
    if (pathStr === 'messages') {
      return `Too many messages. Maximum ${MAX_MESSAGES_PER_REQUEST} messages per request.`;
    }
    if (pathStr.includes('text') || pathStr.includes('content')) {
      return `Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters per message.`;
    }
  }

  if (firstError.code === 'too_small') {
    const pathStr = firstError.path.join('.');
    if (pathStr === 'messages') {
      return 'At least one message is required.';
    }
  }

  // Handle invalid enum values (for role field)
  if (firstError.code === 'invalid_value') {
    const pathStr = firstError.path.join('.');
    if (pathStr.includes('role')) {
      return `Invalid message role. Must be one of: user, assistant, or system.`;
    }
  }

  if (firstError.code === 'invalid_type') {
    if (firstError.path.length === 0) {
      return 'Invalid request format. Expected an object with a messages array.';
    }
    const fieldName = firstError.path.join('.');
    // Check if error has expected/received properties (for invalid_type errors)
    if (
      'expected' in firstError &&
      'received' in firstError &&
      typeof firstError.expected === 'string' &&
      typeof firstError.received === 'string'
    ) {
      return `Invalid value for ${fieldName}. Expected ${firstError.expected}, got ${firstError.received}.`;
    }
  }

  // Default: use path + message, but make it more readable
  if (firstError.path.length > 0) {
    const fieldName = firstError.path.join('.');
    return `${fieldName}: ${firstError.message}`;
  }

  return firstError.message;
}

