import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { tokenStore } from "@/app/api/auth/forgot-password/route";

const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = resetPasswordSchema.parse(body);

    const tokenData = tokenStore.get(validated.token);

    if (!tokenData || new Date() > tokenData.expires) {
      if (tokenData) tokenStore.delete(validated.token);
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(validated.password, 12);

    await prisma.user.update({
      where: { email: tokenData.email },
      data: { password: hashedPassword },
    });

    tokenStore.delete(validated.token);

    return NextResponse.json({ message: "Password reset successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
