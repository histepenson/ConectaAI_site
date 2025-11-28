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
      mode: recurring ? "subscription" : "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      // ⬇️⬇️ HABILITA CUPOM NO CHECKOUT ⬇️⬇️
      allow_promotion_codes: true,
      billing_address_collection: "required",
      success_url: "https://conectaaii.com.br/sucesso?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://conectaaii.com.br/cancelado",
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Falha ao gerar link de checkout" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error: any) {
    console.error("Stripe error:", error);
    const message = error?.raw?.message || error?.message || "Erro interno no servidor";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
