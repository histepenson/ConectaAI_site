import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
});

export async function POST(req: NextRequest) {
  try {
    const { priceId, recurring } = await req.json();

    if (!priceId) {
      return NextResponse.json(
        { error: "priceId não enviado" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: recurring ? "subscription" : "payment", // ← AQUI ESTÁ O SEGREDO
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: "https://conectaaii.com.br/sucesso",
      cancel_url: "https://conectaaii.com.br/cancelado",
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
