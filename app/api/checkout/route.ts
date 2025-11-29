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

      // ❌ Removido: allow_promotion_codes: true
  // 👇 onde habilita o telefone
      phone_number_collection: {
        enabled: true,
      },

      billing_address_collection: "required",
      shipping_address_collection: { allowed_countries: ["BR"] },

      ...(recurring
        ? { subscription_data: { trial_period_days: 15 } }
        : {}),

      success_url:
        "https://conectaaii.com.br/sucesso?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://conectaaii.com.br/cancelado",
    });

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error: any) {
    const message =
      error?.raw?.message || error?.message || "Erro interno no servidor";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
