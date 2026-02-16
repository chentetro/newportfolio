import { streamText } from 'ai';
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
 * Handles streaming chat requests with Claude 3.5 Sonnet via Vercel AI Gateway.
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
      if (parseError instanceof SyntaxError || parseError instanceof TypeError) {
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

    // Load system prompt
    const systemPrompt = buildSystemPrompt();

    // Stream response using Claude 3.5 Sonnet via Vercel AI Gateway
    // Messages from useChat hook are already in the correct format
    const result = await streamText({
      model: 'anthropic/claude-3.5-sonnet',
      system: systemPrompt,
      messages: messages,
    });

    // Return streaming response compatible with DefaultChatTransport
    return result.toUIMessageStreamResponse();
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

    // Handle other errors
    return createErrorResponse(
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred while processing your request.',
      500
    );
  }
}
