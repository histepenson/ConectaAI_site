"use client";
import React, { useState } from 'react';
import { CheckCircle, Zap, MessageCircle, Leaf, TrendingUp, AlertCircle } from 'lucide-react';

export default function Home() {
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const features = [
    { icon: AlertCircle, title: "Diagnóstico de Pragas", desc: "Identifique pragas e doenças com precisão técnica" },
    { icon: Zap, title: "Recomendações de Adubação", desc: "Otimize a fertilização com base em sua cultura" },
    { icon: TrendingUp, title: "Cálculo de Misturas", desc: "Doses precisas e seguras para suas plantações" },
    { icon: Leaf, title: "Planejamento de Safra", desc: "Estratégias completas do plantio à colheita" },
    { icon: MessageCircle, title: "Alertas Climáticos", desc: "Notificações em tempo real via WhatsApp" },
    { icon: Zap, title: "Consultoria 24h", desc: "Especialista agronômico disponível sempre" }
  ];

  const plans = [
    {
      name: "Plano Recorrente",
      price: "R$ 79,99",
      description: "Acesso contínuo com suporte prioritário",
      link: "https://buy.stripe.com/7sY6oH8RV3ZU3rgdB653O01",
      highlighted: true,
      cta: "Assinar Agora"
    },
    {
      name: "Plano Único",
      price: "R$ 109,90",
      description: "Ativação pontual do seu agente",
      link: "https://buy.stripe.com/28E8wP2txfICd1Q1So53O02",
      highlighted: false,
      cta: "Comprar Agora"
    }
  ];

  return (
    <main className="bg-gradient-to-br from-slate-950 via-green-950 to-slate-900 min-h-screen text-white overflow-hidden">
      {/* Background animated elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-600/5 rounded-full blur-3xl"></div>
      </div>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-24 text-center">
        <div className="space-y-6">
          <div className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 backdrop-blur-sm">
            <p className="text-sm font-medium text-green-300">🌱 Tecnologia Agrícola Inteligente</p>
          </div>

          <h1 className="text-6xl md:text-7xl font-black leading-tight">
            <span className="bg-gradient-to-r from-green-300 via-green-200 to-green-400 bg-clip-text text-transparent">
              Seu Agrônomo de IA
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-300 to-green-400 bg-clip-text text-transparent">
              Direto no WhatsApp
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Inteligência artificial especializada em agronomia, disponível 24/7. Receba orientações técnicas, diagnósticos de pragas, cálculos de adubação e muito mais em segundos, sem sair do WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <a
              href="#preco"
              className="px-8 py-4 bg-gradient-to-r from-green-400 to-green-600 rounded-xl font-bold text-lg text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Ativar Agora →
            </a>
            <a
              href="#features"
              className="px-8 py-4 border-2 border-green-500/50 rounded-xl font-bold text-lg hover:bg-green-500/10 transition-all duration-300"
            >
              Conhecer Recursos
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">
              Tudo que Você Precisa
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Ferramentas técnicas e orientações profissionais para otimizar sua produção agrícola
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="group p-7 rounded-2xl bg-gradient-to-br from-green-900/20 to-slate-900/40 border border-green-500/20 hover:border-green-400/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/10"
              >
                <div className="mb-4 p-3 rounded-lg bg-green-500/15 w-fit group-hover:bg-green-500/25 transition-colors">
                  <Icon className="w-6 h-6 text-green-300" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-5xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">
            Como Começar
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "1", title: "Escolha seu Plano", desc: "Selecione entre pagamento único ou assinatura mensal" },
            { step: "2", title: "Complete a Compra", desc: "Finalize o pagamento de forma segura via Stripe" },
            { step: "3", title: "Ative no WhatsApp", desc: "Receba o link e comece a usar seu agente imediatamente" }
          ].map((item, i) => (
            <div key={i} className="relative">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 font-bold text-lg">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              </div>
              {i < 2 && (
                <div className="hidden md:block absolute -right-4 top-6 text-green-500/40 text-2xl">→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* VÍDEOS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">
              Veja na Prática
            </span>
          </h2>
          <p className="text-slate-400 text-lg">Conheça como o agente funciona em ação</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Diagnóstico de Pragas", placeholder: "Vídeo 1" },
            { title: "Cálculo de Adubação", placeholder: "Vídeo 2" },
            { title: "Consultoria ao Vivo", placeholder: "Vídeo 3" }
          ].map((video, i) => (
            <div
              key={i}
              className="group rounded-2xl overflow-hidden bg-gradient-to-br from-green-900/20 to-slate-900/40 border border-green-500/20 hover:border-green-400/50 backdrop-blur-xl transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10"
            >
              <div className="relative w-full h-56 bg-slate-800/50 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-slate-900/40 group-hover:from-green-600/20 transition-all duration-300"></div>
                <button className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-green-600 hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
                  </svg>
                </button>
                <span className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  {video.placeholder}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white">{video.title}</h3>
                <p className="text-slate-400 text-sm mt-2">Veja como o agente resolve problemas reais em tempo real</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PREÇO */}
      <section id="preco" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">
              Planos Simples e Transparentes
            </span>
          </h2>
          <p className="text-slate-400 text-lg">Sem taxas ocultas, sem surpresas. Escolha o que melhor se encaixa na sua necessidade</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredPlan(i)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`relative p-8 rounded-2xl backdrop-blur-xl transition-all duration-300 ${
                plan.highlighted
                  ? "bg-gradient-to-br from-green-600/20 to-green-900/20 border-2 border-green-400 shadow-2xl shadow-green-500/20 -translate-y-2"
                  : "bg-green-900/10 border border-green-500/20 hover:border-green-400/50"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    ⭐ Mais Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm">{plan.description}</p>
              </div>

              <div className="mb-8 pb-8 border-b border-green-500/20">
                <p className="text-slate-400 text-sm">Investimento</p>
                <p className="text-3xl font-bold text-green-300">{plan.price}</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-slate-300">Acesso completo ao agente de IA</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-slate-300">Respostas 24/7 no WhatsApp</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-slate-300">Atualizações automáticas</span>
                </li>
                {plan.highlighted && (
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300">Suporte prioritário</span>
                  </li>
                )}
              </ul>

              <a
                href={plan.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-6 rounded-2xl font-bold text-xl transition-all duration-300 text-center block ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg hover:shadow-2xl hover:scale-105"
                    : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="bg-gradient-to-r from-green-600/20 to-green-900/20 border border-green-500/30 rounded-3xl p-12 backdrop-blur-xl">
          <h2 className="text-4xl font-bold mb-4">Pronto para Revolucionar Seu Agronegócio?</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Milhares de produtores já confiam em orientações técnicas de IA. Não fique para trás.
          </p>
          <a
            href="#preco"
            className="inline-block px-10 py-4 bg-gradient-to-r from-green-400 to-green-600 rounded-xl font-bold text-lg text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Começar Agora →
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-green-500/10 text-center text-slate-500 text-sm">
        <p>© 2024 Agente de IA Agrônomo. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}