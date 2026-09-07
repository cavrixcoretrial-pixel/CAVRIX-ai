import { NextResponse } from "next/server";
import { z } from "zod";
import { nanoid } from "nanoid";
import prisma from "@/lib/prisma";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const tokenStore = new Map<string, { email: string; expires: Date }>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = forgotPasswordSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "If an account exists with that email, a reset link has been sent" },
        { status: 200 }
      );
    }

    const token = nanoid(32);
    tokenStore.set(token, {
      email: validated.email,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });

    return NextResponse.json({
      message: "If an account exists with that email, a reset link has been sent",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export { tokenStore };
