"use client";

import { useEffect, useState } from "react";
import ChatArea from "@/components/chat/chat-area";
import { Loader2 } from "lucide-react";

interface ConversationPageProps {
  params: {
    id: string;
  };
}

export default function ConversationPage({ params }: ConversationPageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadConversation() {
      try {
        const res = await fetch(`/api/chat/${params.id}`);
        if (!res.ok) {
          throw new Error("Failed to load conversation");
        }
        const data = await res.json();
        if (data.messages && Array.isArray(data.messages)) {
          setError(null);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load conversation");
      } finally {
        setLoading(false);
      }
    }

    loadConversation();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex h-full min-h-0 flex-1 flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-cavrix-500" />
          <p className="text-sm text-slate-500">Loading conversation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full min-h-0 flex-1 flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <ChatArea conversationId={params.id} />
    </div>
  );
}
