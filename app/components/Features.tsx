export default function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12">Recursos do ConectaAI Agro</h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">Diagnóstico rápido</h3>
            <p className="text-gray-600">Identificação de pragas e doenças.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">Nutrição</h3>
            <p className="text-gray-600">Recomendações de adubação personalizadas.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">Produtividade</h3>
            <p className="text-gray-600">Otimização do manejo da lavoura.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
