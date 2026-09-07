import { getEnv } from '../env';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  system?: string;
  messages: ChatMessage[];
}

export async function streamChat(request: ChatRequest): Promise<ReadableStream<string>> {
  const env = getEnv();

  if (env.GEMINI_API_KEY) {
    const actualModel = env.CHAT_MODEL === 'gemini-1.5-flash' ? 'gemini-flash-latest' : env.CHAT_MODEL;
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${actualModel}:streamGenerateContent?alt=sse&key=${env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: request.system ? {
          parts: [{ text: request.system }]
        } : undefined,
        contents: request.messages.map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }))
      })
    });

    if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Gemini error: ${res.statusText} ${txt}`);
    }

    return createGeminiStream(res.body!);
  }

  if (env.GROQ_API_KEY) {
    const messages = [];
    if (request.system) {
        messages.push({ role: 'system', content: request.system });
    }
    messages.push(...request.messages);

    const model = env.CHAT_MODEL === 'gemini-1.5-flash' || env.CHAT_MODEL.startsWith('claude') ? 'llama-3.1-70b-versatile' : env.CHAT_MODEL;

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: env.MAX_CHAT_TOKENS,
        stream: true,
      })
    });

    if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Groq error: ${res.statusText} ${txt}`);
    }

    return createOpenAIStream(res.body!);
  }

  // Anthropic has priority if both are set as per prompt instructions
  if (env.ANTHROPIC_API_KEY) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: env.CHAT_MODEL,
        system: request.system,
        messages: request.messages,
        max_tokens: env.MAX_CHAT_TOKENS,
        stream: true,
      })
    });

    if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Anthropic error: ${res.statusText} ${txt}`);
    }

    return createAnthropicStream(res.body!);
  }

  if (env.OPENAI_API_KEY) {
    // Merge system message into messages array for OpenAI
    const messages = [];
    if (request.system) {
        messages.push({ role: 'system', content: request.system });
    }
    messages.push(...request.messages);

    // simple fallback if chat model defaults to claude
    const model = env.CHAT_MODEL.startsWith('claude') || env.CHAT_MODEL.startsWith('gemini') ? 'gpt-4o' : env.CHAT_MODEL;

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages,
        max_completion_tokens: env.MAX_CHAT_TOKENS,
        stream: true,
      })
    });

    if (!res.ok) {
        const txt = await res.text();
        throw new Error(`OpenAI error: ${res.statusText} ${txt}`);
    }

    return createOpenAIStream(res.body!);
  }

  throw new Error("No LLM provider configured");
}

function createGeminiStream(body: ReadableStream<Uint8Array>): ReadableStream<string> {
  const decoder = new TextDecoder();
  let buffer = '';

  return new ReadableStream({
    async start(controller) {
      const reader = body.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6);
              if (dataStr.trim() === '[DONE]') continue;
              try {
                const data = JSON.parse(dataStr);
                const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) {
                  controller.enqueue(text);
                }
              } catch (e) {}
            }
          }
        }
      } catch (e) {
        controller.error(e);
      } finally {
        controller.close();
        reader.releaseLock();
      }
    }
  });
}

function createAnthropicStream(body: ReadableStream<Uint8Array>): ReadableStream<string> {
  const decoder = new TextDecoder();
  let buffer = '';

  return new ReadableStream({
    async start(controller) {
      const reader = body.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; // Keep the incomplete line in the buffer
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6);
              if (dataStr === '[DONE]') continue;
              try {
                const data = JSON.parse(dataStr);
                if (data.type === 'content_block_delta' && data.delta?.text) {
                  controller.enqueue(data.delta.text);
                }
              } catch (e) {
                // ignore parse error on incomplete chunks
              }
            }
          }
        }
      } catch (e) {
        controller.error(e);
      } finally {
        controller.close();
        reader.releaseLock();
      }
    }
  });
}

function createOpenAIStream(body: ReadableStream<Uint8Array>): ReadableStream<string> {
  const decoder = new TextDecoder();
  let buffer = '';

  return new ReadableStream({
    async start(controller) {
      const reader = body.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6);
              if (dataStr.trim() === '[DONE]') continue;
              try {
                const data = JSON.parse(dataStr);
                const content = data.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(content);
                }
              } catch (e) {
                // ignore
              }
            }
          }
        }
      } catch (e) {
        controller.error(e);
      } finally {
        controller.close();
        reader.releaseLock();
      }
    }
  });
}

