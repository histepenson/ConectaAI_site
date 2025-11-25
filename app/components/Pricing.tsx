export default function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12">Planos</h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-10 bg-white border rounded-xl shadow">
            <h3 className="text-2xl font-bold mb-4">Pacote Simples</h3>
            <p className="text-5xl font-bold mb-4">R$ 49</p>
            <p className="text-gray-600 mb-6">Sem mensalidade</p>
            <a
              href="#"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Comprar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
