"use client";

export default function Sucesso() {
  const whatsappLink =
    "https://wa.me/556391002083?text=Ola%20ConectaAI,%20quero%20tirar%20minhas%20duvidas%20do%20agro.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center">
        
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          🎉 Compra Confirmada!
        </h1>

        <p className="text-gray-700 text-lg mb-6">
          Obrigado! Seu pagamento foi processado com sucesso.
        </p>

        <p className="text-gray-600 mb-8">
          Nosso agente de IA ConectaAI já está disponível para te ajudar.
          <br />
          Clique no botão abaixo para tirar todas suas dúvidas do agro.
        </p>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl text-lg transition-all shadow-md"
        >
          Falar com ConectaAI no WhatsApp 🌱
        </a>

        <div className="mt-10 border-t pt-6 text-gray-500 text-sm">
          Se precisar de ajuda, suporte (62) 9 943-68426.
        </div>
      </div>
    </div>
  );
}
