export interface AIProviderConfig {
  provider: string;
  apiKey: string;
  baseUrl?: string;
}

export interface AICompletionRequest {
  model: string;
  messages: { role: string; content: string }[];
  maxTokens?: number;
  temperature?: number;
  stream?: boolean;
}

export interface AICompletionResponse {
  content: string;
  model: string;
  tokens: number;
  finishReason: string;
}

async function openAIComplete(req: AICompletionRequest): Promise<AICompletionResponse> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: req.model,
      messages: req.messages,
      max_tokens: req.maxTokens || 4096,
      temperature: req.temperature ?? 0.7,
      stream: false,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`OpenAI API error: ${res.status} ${JSON.stringify(err)}`);
  }

  const data = await res.json();
  return {
    content: data.choices[0].message.content,
    model: data.model,
    tokens: data.usage.total_tokens,
    finishReason: data.choices[0].finish_reason,
  };
}

async function anthropicComplete(req: AICompletionRequest): Promise<AICompletionResponse> {
  const systemMsg = req.messages.find((m) => m.role === "system");
  const otherMsgs = req.messages.filter((m) => m.role !== "system");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY || "",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: req.model,
      max_tokens: req.maxTokens || 4096,
      system: systemMsg?.content,
      messages: otherMsgs.map((m) => ({ role: m.role, content: m.content })),
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Anthropic API error: ${res.status} ${JSON.stringify(err)}`);
  }

  const data = await res.json();
  return {
    content: data.content[0].text,
    model: data.model,
    tokens: data.usage.input_tokens + data.usage.output_tokens,
    finishReason: data.stop_reason,
  };
}

async function googleComplete(req: AICompletionRequest): Promise<AICompletionResponse> {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  const model = req.model.replace("cavrix-", "gemini-");
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: req.messages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
        generationConfig: {
          maxOutputTokens: req.maxTokens || 4096,
          temperature: req.temperature ?? 0.7,
        },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Google AI API error: ${res.status} ${JSON.stringify(err)}`);
  }

  const data = await res.json();
  return {
    content: data.candidates[0].content.parts[0].text,
    model: req.model,
    tokens: data.usageMetadata?.totalTokenCount || 0,
    finishReason: data.candidates[0].finishReason,
  };
}

const PROVIDERS: Record<string, (req: AICompletionRequest) => Promise<AICompletionResponse>> = {
  openai: openAIComplete,
  anthropic: anthropicComplete,
  google: googleComplete,
};

function getProviderForModel(modelId: string): string {
  if (modelId.includes("ultra") || modelId.includes("code")) return "anthropic";
  if (modelId.includes("research")) return "google";
  return "openai";
}

export async function generateAIResponse(req: AICompletionRequest): Promise<AICompletionResponse> {
  const providerName = getProviderForModel(req.model);
  const provider = PROVIDERS[providerName];
  if (!provider) throw new Error(`Unknown provider: ${providerName}`);
  return provider(req);
}

export async function* streamAIResponse(req: AICompletionRequest): AsyncGenerator<string> {
  const providerName = getProviderForModel(req.model);

  if (providerName === "openai") {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: req.model,
        messages: req.messages,
        max_tokens: req.maxTokens || 4096,
        temperature: req.temperature ?? 0.7,
        stream: true,
      }),
    });

    if (!res.ok) throw new Error(`OpenAI stream error: ${res.status}`);

    const reader = res.body?.getReader();
    if (!reader) throw new Error("No response body");
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith("data: ")) continue;
        const data = trimmed.slice(6);
        if (data === "[DONE]") return;
        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) yield content;
        } catch {}
      }
    }
  } else {
    const result = await generateAIResponse(req);
    yield result.content;
  }
}
