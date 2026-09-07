import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const adminPassword = await hash("admin123", 12);
  const userPassword = await hash("user123", 12);

  console.log("Creating users...");

  const admin = await prisma.user.upsert({
    where: { email: "admin@cavrix.ai" },
    update: {},
    create: {
      email: "admin@cavrix.ai",
      name: "Admin",
      username: "admin",
      password: adminPassword,
      role: "admin",
      emailVerified: new Date(),
    },
  });
  console.log(`  Admin user: ${admin.email} (${admin.id})`);

  const user = await prisma.user.upsert({
    where: { email: "user@cavrix.ai" },
    update: {},
    create: {
      email: "user@cavrix.ai",
      name: "Demo User",
      username: "demouser",
      password: userPassword,
      role: "user",
      emailVerified: new Date(),
    },
  });
  console.log(`  Demo user: ${user.email} (${user.id})`);

  await prisma.userSettings.create({
    data: { userId: admin.id },
  });
  await prisma.userSettings.create({
    data: { userId: user.id },
  });
  console.log("  Created user settings");

  await prisma.subscription.create({
    data: {
      userId: admin.id,
      plan: "pro",
      status: "active",
    },
  });
  await prisma.subscription.create({
    data: {
      userId: user.id,
      plan: "free",
      status: "active",
    },
  });
  console.log("  Created subscriptions");

  console.log("Creating agents...");

  const agents = await Promise.all([
    prisma.agent.upsert({
      where: { id: "agent-coding-expert" },
      update: {},
      create: {
        id: "agent-coding-expert",
        name: "Coding Expert",
        description: "Full-stack developer specializing in modern frameworks and best practices",
        instructions: "You are an expert software developer. Help users write clean, efficient code. Follow best practices and explain your reasoning.",
        personality: "Technical, precise, and helpful. Focuses on clean architecture and maintainable code.",
        model: "cavrix-code",
        isPublic: true,
        userId: admin.id,
      },
    }),
    prisma.agent.upsert({
      where: { id: "agent-research-assistant" },
      update: {},
      create: {
        id: "agent-research-assistant",
        name: "Research Assistant",
        description: "Deep research and analysis with source citations",
        instructions: "You are a research specialist. Help users find, analyze, and synthesize information. Always cite sources and provide balanced perspectives.",
        personality: "Thorough, analytical, and objective. Values accuracy and completeness.",
        model: "cavrix-research",
        isPublic: true,
        userId: admin.id,
      },
    }),
    prisma.agent.upsert({
      where: { id: "agent-content-writer" },
      update: {},
      create: {
        id: "agent-content-writer",
        name: "Content Writer",
        description: "Creative writing, copywriting, and content creation",
        instructions: "You are a talented content writer. Help users create engaging content including blog posts, articles, marketing copy, and creative writing.",
        personality: "Creative, engaging, and versatile. Adapts tone and style to match the user's needs.",
        model: "cavrix-pro",
        isPublic: true,
        userId: admin.id,
      },
    }),
  ]);
  console.log(`  Created ${agents.length} agents`);

  console.log("Creating projects...");

  const projects = await Promise.all([
    prisma.project.create({
      data: {
        name: "Cavrix AI Platform",
        description: "Main platform development",
        userId: admin.id,
      },
    }),
    prisma.project.create({
      data: {
        name: "Research Projects",
        description: "AI research and analysis work",
        userId: user.id,
      },
    }),
    prisma.project.create({
      data: {
        name: "Marketing Content",
        description: "Blog posts and marketing materials",
        userId: user.id,
      },
    }),
  ]);
  console.log(`  Created ${projects.length} projects`);

  console.log("Creating conversations...");

  const conversations = await Promise.all([
    prisma.conversation.create({
      data: {
        title: "Building a REST API with Next.js",
        userId: admin.id,
        projectId: projects[0].id,
        model: "cavrix-code",
        agentId: agents[0].id,
        messages: {
          create: [
            {
              role: "user",
              content: "Help me build a REST API endpoint for user authentication in Next.js",
              model: "cavrix-code",
              tokens: 24,
            },
            {
              role: "assistant",
              content: "I'll help you build a robust authentication API endpoint. Here's a complete implementation using Next.js App Router with NextAuth.js and Prisma...",
              model: "cavrix-code",
              tokens: 256,
            },
          ],
        },
      },
    }),
    prisma.conversation.create({
      data: {
        title: "Quantum Computing Research Summary",
        userId: user.id,
        projectId: projects[1].id,
        model: "cavrix-research",
        agentId: agents[1].id,
        messages: {
          create: [
            {
              role: "user",
              content: "Provide a comprehensive summary of recent quantum computing breakthroughs",
              model: "cavrix-research",
              tokens: 18,
            },
            {
              role: "assistant",
              content: "Here is a comprehensive overview of recent quantum computing breakthroughs, organized by category and impact...",
              model: "cavrix-research",
              tokens: 512,
            },
          ],
        },
      },
    }),
    prisma.conversation.create({
      data: {
        title: "Product Launch Blog Post",
        userId: user.id,
        projectId: projects[2].id,
        model: "cavrix-pro",
        agentId: agents[2].id,
        messages: {
          create: [
            {
              role: "user",
              content: "Write a blog post announcing our new AI features",
              model: "cavrix-pro",
              tokens: 16,
            },
            {
              role: "assistant",
              content: "Here's a compelling blog post draft announcing your new AI features, designed to generate excitement and drive engagement...",
              model: "cavrix-pro",
              tokens: 384,
            },
          ],
        },
      },
    }),
  ]);
  console.log(`  Created ${conversations.length} conversations with messages`);

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
