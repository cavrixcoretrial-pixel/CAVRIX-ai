import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

const checkoutSchema = z.object({
  plan: z.enum(["pro", "enterprise"]),
  paymentMethod: z.enum(["stripe", "razorpay"]).optional(),
});

const PLANS = {
  pro: { amount: 999, name: "Pro", currency: "inr" },
  enterprise: { amount: 2999, name: "Enterprise", currency: "inr" },
};

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await request.json();
    const validated = checkoutSchema.parse(body);

    const planDetails = PLANS[validated.plan];

    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      return NextResponse.json(
        { error: "No subscription found" },
        { status: 400 }
      );
    }

    const paymentMethod = validated.paymentMethod || "razorpay";

    if (paymentMethod === "stripe" && process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({
        sessionId: "placeholder_stripe_session",
        url: `https://checkout.stripe.com/pay/placeholder?plan=${validated.plan}`,
      });
    }

    if (paymentMethod === "razorpay" && process.env.RAZORPAY_KEY_ID) {
      return NextResponse.json({
        orderId: "placeholder_razorpay_order",
        amount: planDetails.amount,
        currency: planDetails.currency,
        key: process.env.RAZORPAY_KEY_ID,
      });
    }

    return NextResponse.json({
      sessionId: "placeholder_session",
      url: `/billing/checkout?plan=${validated.plan}`,
      plan: planDetails,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
