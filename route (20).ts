import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { streamAIResponse } from "@/services/ai/provider";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { messages, model = "cavrix-pro", conversationId } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    const userId = (session.user as any).id;

    let activeConversationId = conversationId;

    if (!activeConversationId) {
      const conversation = await prisma.conversation.create({
        data: {
          userId,
          model,
          title: messages[0]?.content?.slice(0, 50) || "New Chat",
        },
      });
      activeConversationId = conversation.id;
    } else {
      const existing = await prisma.conversation.findFirst({
        where: { id: activeConversationId, userId },
      });
      if (!existing) {
        return NextResponse.json(
          { error: "Conversation not found" },
          { status: 404 }
        );
      }
    }

    const lastMessage = messages[messages.length - 1];
    await prisma.message.create({
      data: {
        conversationId: activeConversationId,
        role: "user",
        content: lastMessage.content,
        model,
      },
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        let fullContent = "";

        try {
          for await (const chunk of streamAIResponse({
            model,
            messages: messages.map((m: { role: string; content: string }) => ({
              role: m.role,
              content: m.content,
            })),
            stream: true,
          })) {
            fullContent += chunk;
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`)
            );
          }

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));

          await prisma.message.create({
            data: {
              conversationId: activeConversationId,
              role: "assistant",
              content: fullContent,
              model,
            },
          });

          await prisma.conversation.update({
            where: { id: activeConversationId },
            data: { updatedAt: new Date() },
          });

          controller.close();
        } catch (error) {
          console.error("Stream error:", error);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: "Stream interrupted" })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "X-Conversation-Id": activeConversationId,
      },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
