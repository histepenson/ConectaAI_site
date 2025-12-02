"use client";
import React, { useState } from "react";
import { CheckCircle, Zap, MessageCircle, Leaf, TrendingUp, AlertCircle } from "lucide-react";

declare const fbq: any;

export default function Home() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const features = [
    { icon: AlertCircle, title: "Dúvidas pontuais do campo", desc: "Esclareça suas dúvidas com base técnica, apoiada nas melhores fontes científicas." },
    { icon: Zap, title: "Recomendações de Adubação", desc: "Otimize a fertilização com base em sua cultura." },
    { icon: TrendingUp, title: "Produtos e Doses", desc: "Doses precisas e seguras para suas plantações." },
    { icon: Leaf, title: "Relatório de monitoramento", desc: "Monte relatório através de texto ou áudio sem sair da fazenda informando (fazenda, talhões, recomendaçoes, observações,etc)." },
    { icon: MessageCircle, title: "Cálculos gerais do campo", desc: "Realizar qualquer cálculo, seja de adubação, sementes, dentro do whatsapp." },
    { icon: Zap, title: "Consultoria 24h", desc: "Especialista agronômico disponível sempre" }
  ];

  const plans = [
    {
      name: "Plano Recorrente",
      price: "R$ 59,99",
      description: "Acesso contínuo com suporte prioritário",
      priceId: "price_1SZKlgERrGAbzA6MuzsnzL3o",
      highlighted: true,
      cta: "Assinar Agora",
      recorrente: true,
      value: 59.99,
    },
    {
      name: "Sem recorrência - Plano 30 dias",
      price: "R$ 89,99",
      description: "Ativação pontual do seu agente",
      priceId: "price_1SZKkyERrGAbzA6M9YT4y1XI",
      highlighted: false,
      cta: "Comprar Agora",
      recorrente: false,
      value: 89.99,
    }
  ];

  const examples = [
    {
      title: "Caso de Sucesso",
      image: "/img/case_1.jpeg",
      desc: "Relatório de Monitoramento"
    },
    {
      title: "Cálculo de dosagem adubo",
      image: "/img/exemplo_1.jpeg",
      desc: "Cálculos confiáveis"
    },
    {
      title: "Caso de Sucesso",
      image: "/img/case_2.jpeg",
      desc: "Usuário feliz com ferramenta de emitir relatorio através de áudio"
    },
    {
      title: "Cálculo de densidade de sementes",
      image: "/img/exemplo_1.jpeg",
      desc: "Passo a passo didático para ensinar o usuário a perguntar ao Agente"
    },
    {
      title: "Apoio para estudantes de agronomia e áreas afins",
      image: "/img/exemplo_4.jpeg",
      desc: "Direcionamento, artigos, estruturação de TCC e artigos"
    }
  ];

  const handleCheckout = async (planIndex: number) => {
    const plan = plans[planIndex];

    // Se for o plano sem recorrência (30 dias), redireciona para WhatsApp
    if (!plan.recorrente) {
      window.location.href = "https://wa.me/62994368426?text=Ol%C3%A1%20ConectaAI,%20quero%20Comprar%20Plano%2030%20dias";
      return;
    }

    // Para o plano recorrente, continua com o checkout Stripe
    try {
      setLoadingIndex(planIndex);

      console.log("PLAN:", plan);
      console.log("PRICEID:", plan.priceId);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          priceId: plan.priceId, 
          recurring: plan.recorrente 
        }),
      });

      const data = await res.json();

      if (data.url) {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'purchase', {
            'value': plan.value,
            'currency': 'BRL',
            'transaction_id': 'CHK' + Date.now(),
            'items': [{
              'item_name': plan.name,
              'price': plan.value
            }]
          });
        }

        window.location.href = data.url;
      } else {
        alert("Erro ao criar sessão de pagamento.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao iniciar pagamento.");
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <main className="bg-gradient-to-br from-slate-950 via-green-950 to-slate-900 min-h-screen text-white overflow-hidden">
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
            Inteligência artificial especializada em agronomia, disponível 24/7. Receba orientações técnicas, relatório de monitoramento, cálculos de adubação e muito mais em segundos, sem sair do WhatsApp.
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
          {[{ step: "1", title: "Escolha seu Plano", desc: "Selecione entre plano 30 dias ou assinatura mensal" },
          { step: "2", title: "Complete a Compra", desc: "Finalize o pagamento de forma segura via Stripe" },
          { step: "3", title: "Ative no WhatsApp", desc: "Receba o link e comece a usar seu agente imediatamente" }]
            .map((item, i) => (
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
          {[{ title: "Relatório de Monitoramento", videoId: "Rwfai-yAzUI", desc: "Monitore suas atividades do campo de forma simples pelo WhatsApp: envie o áudio e nosso agente transcreve, organizando tudo em um PDF pronto e estruturado." },
          { title: "Cálculo de população de sementes", videoId: "OEkkB3fIn5k", desc: "Cálculo fácil da densidade de soja e do comprimento em metros lineares" },
          { title: "Cálculo de dosagem", videoId: "CE169ueDVZg", desc: "Calcule de forma rápida e precisa a dosagem de aplicação. Tenha resultados confiáveis sem complicações" }]
            .map((video, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden bg-gradient-to-br from-green-900/20 to-slate-900/40 border border-green-500/20 hover:border-green-400/50 backdrop-blur-xl transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
                <div className="relative w-full h-56 bg-slate-800/50 overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    frameBorder="0"
                    allowFullScreen
                    className="rounded-2xl"
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white">{video.title}</h3>
                  <p className="text-slate-400 text-sm mt-2">{video.desc}</p>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* EXEMPLOS DE CONVERSA */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">
              Conversas Reais
            </span>
          </h2>
          <p className="text-slate-400 text-lg">Veja exemplos de interações com nosso agente agronômico</p>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory">
          {examples.map((example, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-80 group rounded-2xl overflow-hidden bg-gradient-to-br from-green-900/20 to-slate-900/40 border border-green-500/20 hover:border-green-400/50 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-2 snap-center flex flex-col"
            >
              <div className="relative w-full h-96 bg-slate-800/50 overflow-hidden flex items-center justify-center flex-shrink-0">
                <img
                  src={example.image}
                  alt={example.title}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-5 flex-grow flex flex-col justify-end">
                <h3 className="text-lg font-bold text-white">{example.title}</h3>
                <p className="text-slate-400 text-sm mt-2">{example.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTE GRÁTIS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="relative p-12 rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-600/30 via-green-600/20 to-teal-600/30 border-2 border-green-400/60 backdrop-blur-xl">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 rounded-full bg-green-500/20 border border-green-400/50 mb-6">
                <p className="text-sm font-bold text-green-300">⏱️ OFERTA LIMITADA</p>
              </div>
              <h2 className="text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-200 to-emerald-300 bg-clip-text text-transparent">
                  Teste Grátis
                </span>
                <br />
                <span className="text-white">por 15 dias</span>
              </h2>
              <p className="text-xl text-slate-200 mb-8 leading-relaxed">
                Teste todas as funcionalidades do seu agrônomo de IA sem pagar nada. Sem cartão de crédito necessário.
              </p>
              
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-slate-200 text-lg">Acesso completo a todas as funções</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-slate-200 text-lg">Consultoria 24/7 no WhatsApp</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-slate-200 text-lg">Sem compromisso - cancele quando quiser</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-slate-200 text-lg">Nenhum dado de cartão solicitado</span>
                </li>
              </ul>
                <button 
                  onClick={() => {
                    if (typeof window !== "undefined" && typeof fbq !== "undefined") {
                      fbq("trackCustom", "BotaoComecarTesteGratis");
                    }

                    fetch("/api/meta/events", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        event: "BotaoComecarTesteGratis",
                        url: window.location.href,
                      }),
                    });

                    handleCheckout(0);
                  }}
                  
                  disabled={loadingIndex === 0}
                  className="px-10 py-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl font-bold text-xl text-white shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 w-full md:w-auto"
                >
                  {loadingIndex === 0 ? "Aguarde..." : "Começar Teste Grátis →"}
                </button>

            </div>

            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-2xl"></div>
                <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-green-500/30">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Período de teste:</span>
                      <span className="font-bold text-green-300 text-lg">15 dias</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-green-500/20 to-transparent"></div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Custo:</span>
                      <span className="font-bold text-green-300 text-lg">GRÁTIS</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-green-500/20 to-transparent"></div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Cartão necessário:</span>
                      <span className="font-bold text-emerald-400">NÃO</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-green-500/20 to-transparent"></div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Cancelar:</span>
                      <span className="font-bold text-emerald-400">A qualquer hora</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-green-500/20 to-transparent"></div>
                    <div className="pt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                      <p className="text-sm text-green-300 font-semibold">✓ Após 15 dias, você escolhe se continua</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

              <button
                onClick={() => handleCheckout(i)}
                disabled={loadingIndex === i}
                className={`w-full py-6 rounded-2xl font-bold text-xl transition-all duration-300 text-center block ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg hover:shadow-2xl hover:scale-105"
                    : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                } ${loadingIndex === i ? "opacity-70 cursor-wait" : ""}`}
              >
                {loadingIndex === i ? "Aguarde..." : plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="bg-gradient-to-r from-green-600/20 to-green-900/20 border border-green-500/30 rounded-3xl p-12 backdrop-blur-xl">
          <h2 className="text-4xl font-bold mb-4">Pronto para Revolucionar Seus Resultados no Campo?</h2>
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

      {/* BOTÃO FLUTUANTE WHATSAPP */}
      <a
        href="https://wa.me/62994368426?text=Ol%C3%A1%2C%20ainda%20tenho%20d%C3%BAvidas"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-500 text-white px-5 py-4 rounded-full shadow-xl flex items-center gap-3 z-50 transition-all duration-300 hover:scale-105"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="font-semibold">Ainda com dúvidas? Clique aqui  </span>
      </a>

    </main>
  );
}