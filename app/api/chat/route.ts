import { groq } from '@ai-sdk/groq';
import { convertToModelMessages, streamText } from 'ai';
import { buildSystemPrompt } from '@/app/lib/system-prompt';

// Set runtime to nodejs for proper .env.local reading
export const runtime = 'nodejs';

// Maximum number of messages per request to prevent abuse
const MAX_MESSAGES_PER_REQUEST = 10;

// Rate limiting configuration
const RATE_LIMIT_REQUESTS = 20; // Maximum requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window

// In-memory rate limit store (for serverless, consider Redis in production)
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Creates a standardized error response.
 *
 * @param message - Error message to return
 * @param status - HTTP status code
 * @returns Formatted error response
 */
function createErrorResponse(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Gets the client IP address from the request.
 *
 * @param request - The incoming request
 * @returns Client IP address or 'unknown'
 */
function getClientIp(request: Request): string {
  // Try to get IP from various headers (Vercel, Cloudflare, etc.)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  return 'unknown';
}

/**
 * Checks if the request exceeds rate limits.
 *
 * @param ip - Client IP address
 * @returns Object with `allowed` boolean and optional `retryAfter` seconds
 */
function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  // Clean up expired entries periodically
  if (rateLimitStore.size > 1000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (value.resetAt < now) {
        rateLimitStore.delete(key);
      }
    }
  }

  // No entry or expired entry - allow request
  if (!entry || entry.resetAt < now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true };
  }

  // Check if limit exceeded
  if (entry.count >= RATE_LIMIT_REQUESTS) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  // Increment count
  entry.count++;
  return { allowed: true };
}

/**
 * POST handler for chat API route.
 * Handles streaming chat requests with Groq (free tier) via Groq provider API.
 *
 * @param request - The incoming request with messages array
 * @returns Streaming response with assistant messages
 */
export async function POST(request: Request) {
  try {
    // Rate limiting check
    const clientIp = getClientIp(request);
    const rateLimitCheck = checkRateLimit(clientIp);

    if (!rateLimitCheck.allowed) {
      return createErrorResponse(
        `Rate limit exceeded. Please try again in ${rateLimitCheck.retryAfter} seconds.`,
        429
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      // Handle JSON parsing errors (malformed JSON body)
      if (
        parseError instanceof SyntaxError ||
        parseError instanceof TypeError
      ) {
        return createErrorResponse('Invalid JSON in request body', 400);
      }
      // Re-throw if it's not a parsing error
      throw parseError;
    }

    const { messages } = body;

    // Validate messages array exists and is an array
    if (!messages) {
      return createErrorResponse('Messages array is required', 400);
    }

    if (!Array.isArray(messages)) {
      return createErrorResponse('Messages must be an array', 400);
    }

    // Validate message count doesn't exceed limit
    if (messages.length > MAX_MESSAGES_PER_REQUEST) {
      return createErrorResponse(
        `Too many messages. Maximum ${MAX_MESSAGES_PER_REQUEST} messages per request.`,
        400
      );
    }

    // Validate message content size (prevent oversized payloads)
    const MAX_MESSAGE_LENGTH = 1000; // Maximum characters per message
    for (const message of messages) {
      if (message.text && message.text.length > MAX_MESSAGE_LENGTH) {
        return createErrorResponse(
          `Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters per message.`,
          400
        );
      }
      if (message.content && message.content.length > MAX_MESSAGE_LENGTH) {
        return createErrorResponse(
          `Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters per message.`,
          400
        );
      }
    }

    // Load system prompt
    const systemPrompt = buildSystemPrompt();

    // Stream response using Groq (free tier) via Groq provider API
    // Messages from useChat hook are already in the correct format

    // Check if API key is available
    if (!process.env.GROQ_API_KEY) {
      console.error('GROQ_API_KEY is not set');
      return createErrorResponse(
        'API key not configured. Please set GROQ_API_KEY in your environment variables.',
        500
      );
    }

    try {
      const result = await streamText({
        model: groq('llama-3.1-8b-instant'), // Free-tier friendly model on Groq
        system: systemPrompt,
        messages: await convertToModelMessages(messages),
      });

      // Return streaming response compatible with DefaultChatTransport
      return result.toUIMessageStreamResponse();
    } catch (streamError) {
      console.error('Error in streamText:', streamError);
      // Log the full error for debugging
      if (streamError instanceof Error) {
        console.error('Error message:', streamError.message);
        console.error('Error stack:', streamError.stack);
      }
      throw streamError; // Re-throw to be caught by outer catch
    }
  } catch (error) {
    // Handle authentication errors specifically
    if (
      error instanceof Error &&
      (error.message.includes('401') ||
        error.message.includes('Unauthorized') ||
        error.message.includes('API key') ||
        error.message.includes('authentication') ||
        error.message.includes('VERCEL_OIDC_TOKEN'))
    ) {
      // Log detailed error server-side for debugging (not exposed to users)
      // In production, consider using a proper logging service
      // console.error('Authentication error details:', error.message);

      return createErrorResponse(
        'Authentication failed. Please try again later.',
        401
      );
    }

    // Handle other errors - return generic message to prevent information leakage
    // Log detailed error server-side for debugging
    console.error('Chat API error:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }

    return createErrorResponse(
      'An unexpected error occurred while processing your request. Please try again later.',
      500
    );
  }
}
