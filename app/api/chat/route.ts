import { streamText } from 'ai';
import { buildSystemPrompt } from '@/app/lib/system-prompt';

// Set runtime to nodejs for proper .env.local reading
export const runtime = 'nodejs';

// Maximum number of messages per request to prevent abuse
const MAX_MESSAGES_PER_REQUEST = 10;

/**
 * POST handler for chat API route.
 * Handles streaming chat requests with Claude 3.5 Sonnet via Vercel AI Gateway.
 *
 * @param request - The incoming request with messages array
 * @returns Streaming response with assistant messages
 */
export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { messages } = body;

    // Validate messages array exists and is an array
    if (!messages) {
      return new Response(
        JSON.stringify({ error: 'Messages array is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (!Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Messages must be an array' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate message count doesn't exceed limit
    if (messages.length > MAX_MESSAGES_PER_REQUEST) {
      return new Response(
        JSON.stringify({
          error: `Too many messages. Maximum ${MAX_MESSAGES_PER_REQUEST} messages per request.`,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
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
      return new Response(
        JSON.stringify({
          error:
            'Authentication error. Please ensure VERCEL_OIDC_TOKEN is set. For local development, use `vc dev` or run `vc env pull` before starting the server.',
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Handle other errors
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred while processing your request.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
