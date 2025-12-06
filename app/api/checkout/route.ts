import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

console.log("🔧 DEBUG: STRIPE_SECRET_KEY existe?", !!process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover", // versão atual e válida
});

export async function POST(req: NextRequest) {
  console.log("📩 Recebendo rquisição /api/checkout...");

  try {
    const body = await req.json();
    console.log("📦 Body recebido:", body);

    const { priceId, recurring } = body;

    if (!priceId) {
      console.error("❌ priceId não enviado");
      return NextResponse.json(
        { error: "priceId não enviado" },
        { status: 400 }
      );
    }

    console.log("💵 priceId:", priceId);
    console.log("🔄 recurring:", recurring);

    console.log("⚙ Criando sessão no Stripe...");

    const session = await stripe.checkout.sessions.create({
      mode: recurring ? "subscription" : "payment",
      payment_method_types: ["card"],

      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

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
      cancel_url: "https://conectaaii.com.br/",
    });

    console.log("✅ Sessão criada com sucesso:", session.id);

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });

  } catch (error: any) {
    console.error("❌ ERRO COMPLETO DO STRIPE:");
    console.error(error);

    const message =
      error?.raw?.message ||
      error?.message ||
      "Erro interno no servidor";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
