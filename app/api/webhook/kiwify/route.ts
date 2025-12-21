import { NextRequest, NextResponse } from "next/server";

// Se usar Prisma, Drizzle ou outro ORM, importe aqui
// import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const event = payload?.event;
    const data = payload?.data;

    if (!event || !data) {
      return NextResponse.json(
        { error: "Payload inválido" },
        { status: 400 }
      );
    }

    const email = data?.customer?.email;
    const productId = data?.product?.id;
    const orderId = data?.order_id;

    if (!email) {
      return NextResponse.json(
        { error: "Email não encontrado" },
        { status: 400 }
      );
    }

    // 🔒 (Opcional) validar produto
    const PRODUTOS_VALIDOS = [
      "CnkJsxq", // recorrente
      "Nn0PaxK", // pagamento único
    ];

    if (productId && !PRODUTOS_VALIDOS.includes(productId)) {
      return NextResponse.json(
        { error: "Produto inválido" },
        { status: 403 }
      );
    }

    // =============================
    // EVENTOS DA KIWIFY
    // =============================

    if (event === "order.paid" || event === "subscription.active") {
      const recorrente = event === "subscription.active";

      await ativarPlano({
        email,
        recorrente,
        productId,
        orderId,
      });
    }

    if (event === "subscription.canceled") {
      await cancelarPlano(email);
    }

    return NextResponse.json({ status: "ok" });

  } catch (error) {
    console.error("Webhook Kiwify erro:", error);
    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    );
  }
}
