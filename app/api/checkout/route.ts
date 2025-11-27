import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

// Inicializa Stripe
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

    // Apenas cartão em todos os casos
    const paymentMethods: Stripe.Checkout.SessionCreateParams.PaymentMethodType[] = ["card"];

    // Cria a sessão
    const session = await stripe.checkout.sessions.create({
      mode: recurring ? "subscription" : "payment",
      payment_method_types: paymentMethods,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: "https://conectaaii.com.br/sucesso?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://conectaaii.com.br/cancelado",
    });

    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error("Stripe error:", error);

    let message = "Erro interno no servidor";
    if (error?.raw?.message) message = error.raw.message;

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
