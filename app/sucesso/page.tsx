"use client";

const WHATSAPP_LINK = "https://wa.me/556391002083?text=Ola%20ConectaAI,%20quero%20tirar%20minhas%20duvidas%20do%20agro.";
const SUPPORT_PHONE = "(62) 9 9436-8426";

export default function Sucesso() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 px-4">
      <div className="bg-white border border-green-300 shadow-xl rounded-2xl p-10 max-w-lg w-full text-center">
        {/* Header */}
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          🎉 Compra Confirmada!
        </h1>

        {/* Message */}
        <p className="text-gray-800 text-lg mb-4">
          Obrigado! Seu pagamento foi processado com sucesso.
        </p>

        {/* Description */}
        <p className="text-gray-700 mb-8 whitespace-normal">
          Nosso agente de IA ConectaAI já está disponível para te ajudar. Clique no botão abaixo para tirar todas as suas dúvidas do agro.
        </p>

        {/* WhatsApp Button */}
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl text-lg transition-all shadow-lg"
        >
          Falar com ConectaAI no WhatsApp 🌱
        </a>

        {/* Support Footer */}
        <div className="mt-10 border-t border-green-200 pt-6 text-gray-600 text-sm">
          Precisa de ajuda? Suporte: {SUPPORT_PHONE}
        </div>
      </div>
    </div>
  );
}