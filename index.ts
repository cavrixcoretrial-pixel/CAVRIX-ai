export type AIProvider = "openai" | "anthropic" | "google";

export interface AIModel {
  id: string;
  name: string;
  description: string;
  provider: AIProvider;
  maxTokens: number;
  speed: "fast" | "medium" | "slow";
  capabilities: string[];
  plan: "free" | "plus" | "pro";
  icon?: string;
}

export const AI_MODELS: AIModel[] = [
  {
    id: "cavrix-lite",
    name: "Cavrix Lite",
    description: "Fast and efficient for everyday tasks",
    provider: "openai",
    maxTokens: 4096,
    speed: "fast",
    capabilities: ["text", "basic-reasoning"],
    plan: "free",
  },
  {
    id: "cavrix-pro",
    name: "Cavrix Pro",
    description: "Advanced reasoning and better coding",
    provider: "openai",
    maxTokens: 8192,
    speed: "medium",
    capabilities: ["text", "reasoning", "coding", "image-understanding"],
    plan: "plus",
  },
  {
    id: "cavrix-ultra",
    name: "Cavrix Ultra",
    description: "Maximum intelligence with deep reasoning",
    provider: "anthropic",
    maxTokens: 16384,
    speed: "slow",
    capabilities: ["text", "deep-reasoning", "advanced-coding", "large-context"],
    plan: "pro",
  },
  {
    id: "cavrix-vision",
    name: "Cavrix Vision",
    description: "Image and document analysis",
    provider: "openai",
    maxTokens: 8192,
    speed: "medium",
    capabilities: ["text", "image-analysis", "document-understanding"],
    plan: "plus",
  },
  {
    id: "cavrix-code",
    name: "Cavrix Code",
    description: "Specialized for programming tasks",
    provider: "anthropic",
    maxTokens: 16384,
    speed: "medium",
    capabilities: ["text", "coding", "debugging", "code-generation"],
    plan: "plus",
  },
  {
    id: "cavrix-research",
    name: "Cavrix Research",
    description: "Web research and source analysis",
    provider: "google",
    maxTokens: 8192,
    speed: "medium",
    capabilities: ["text", "web-research", "source-analysis", "deep-research"],
    plan: "pro",
  },
];

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  model?: string;
  tokens?: number;
  imageUrl?: string;
  attachments?: string;
  liked?: boolean | null;
  createdAt: string;
}

export interface ConversationData {
  id: string;
  title: string;
  model: string;
  pinned: boolean;
  archived: boolean;
  projectId?: string | null;
  agentId?: string | null;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface ProjectData {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    conversations: number;
    files: number;
  };
}

export interface AgentData {
  id: string;
  name: string;
  description?: string;
  instructions?: string;
  personality?: string;
  model: string;
  tools?: string;
  avatar?: string;
  isPublic: boolean;
  createdAt: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: string;
  features: string[];
  badge?: string;
  recommended?: boolean;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    currency: "INR",
    interval: "month",
    features: [
      "Cavrix Lite",
      "Limited daily messages",
      "Basic AI chat",
      "Limited file uploads",
      "Basic image generation",
      "Standard support",
    ],
  },
  {
    id: "plus",
    name: "Cavrix Plus",
    price: 499,
    currency: "INR",
    interval: "month",
    features: [
      "Everything in Free",
      "Cavrix Pro",
      "Faster responses",
      "Higher message limits",
      "Image generation",
      "File analysis",
      "Vision AI",
      "Voice mode",
      "Priority support",
    ],
    badge: "MOST POPULAR",
    recommended: true,
  },
  {
    id: "pro",
    name: "Cavrix Pro",
    price: 999,
    currency: "INR",
    interval: "month",
    features: [
      "Everything in Plus",
      "Cavrix Ultra",
      "Deep Research",
      "Advanced coding",
      "Larger context window",
      "More image generation",
      "Advanced agents",
      "Priority processing",
      "Premium support",
    ],
  },
  {
    id: "business",
    name: "Cavrix Business",
    price: -1,
    currency: "INR",
    interval: "month",
    features: [
      "Team workspace",
      "Multiple users",
      "Admin dashboard",
      "Shared projects",
      "Advanced security",
      "API access",
      "Dedicated support",
      "Custom AI models",
    ],
  },
];

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalConversations: number;
  totalMessages: number;
  revenue: number;
  apiUsage: number;
}
