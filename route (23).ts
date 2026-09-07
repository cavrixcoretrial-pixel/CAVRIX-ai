import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const [
      totalUsers,
      totalConversations,
      totalMessages,
      totalProjects,
      totalAgents,
      activeSubscriptions,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.conversation.count(),
      prisma.message.count(),
      prisma.project.count(),
      prisma.agent.count(),
      prisma.subscription.count({ where: { status: "active" } }),
    ]);

    const planBreakdown = await prisma.subscription.groupBy({
      by: ["plan"],
      _count: true,
    });

    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        role: true,
      },
    });

    return NextResponse.json({
      totalUsers,
      totalConversations,
      totalMessages,
      totalProjects,
      totalAgents,
      activeSubscriptions,
      planBreakdown: planBreakdown.map((p) => ({
        plan: p.plan,
        count: p._count,
      })),
      recentUsers,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
