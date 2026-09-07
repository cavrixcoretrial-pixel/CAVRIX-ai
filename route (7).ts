import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature") || "";
    const razorpaySignature = request.headers.get("x-razorpay-signature") || "";

    let event: any;

    if (signature && process.env.STRIPE_WEBHOOK_SECRET) {
      const stripe = (await import("stripe")).default;
      const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY || "");

      try {
        event = stripeInstance.webhooks.constructEvent(
          body,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } catch (err) {
        console.error("Stripe webhook signature verification failed:", err);
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 400 }
        );
      }
    } else if (razorpaySignature) {
      const crypto = await import("crypto");
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET || "")
        .update(body)
        .digest("hex");

      if (expectedSignature !== razorpaySignature) {
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 400 }
        );
      }

      event = JSON.parse(body);
    } else {
      event = JSON.parse(body);
    }

    switch (event.type) {
      case "checkout.session.completed":
      case "payment.intent.succeeded": {
        const customerId =
          event.data?.object?.customer || event.data?.object?.metadata?.customerId;
        if (customerId) {
          await prisma.subscription.updateMany({
            where: { OR: [{ stripeCustomerId: customerId }, { razorpayId: customerId }] },
            data: { status: "active" },
          });
        }
        break;
      }

      case "customer.subscription.deleted":
      case "payment.failed": {
        const customerId =
          event.data?.object?.customer || event.data?.object?.metadata?.customerId;
        if (customerId) {
          await prisma.subscription.updateMany({
            where: { OR: [{ stripeCustomerId: customerId }, { razorpayId: customerId }] },
            data: { status: "inactive" },
          });
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const subscriptionId = event.data?.object?.subscription;
        if (subscriptionId) {
          const sub = await prisma.subscription.findFirst({
            where: { stripeSubId: subscriptionId },
          });
          if (sub) {
            await prisma.payment.create({
              data: {
                subscriptionId: sub.id,
                amount: event.data.object.amount_paid || 0,
                currency: event.data.object.currency || "inr",
                status: "succeeded",
                stripePaymentId: event.data.object.payment_intent,
              },
            });
          }
        }
        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
