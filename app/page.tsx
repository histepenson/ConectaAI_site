"use client";
import React, { useState } from "react";
import { CheckCircle, Zap, MessageCircle, Leaf, TrendingUp, AlertCircle, ArrowRight, Star, Users, Clock, Shield } from "lucide-react";

declare const fbq: any;

export default function Home() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const features = [
    { icon: AlertCircle, title: "Dúvidas pontuais do campo", desc: "Esclareça suas dúvidas com base técnica, apoiada nas melhores fontes científicas." },
    { icon: Zap, title: "Recomendações de Adubação", desc: "Otimize a fertilização com base em sua cultura." },
    { icon: TrendingUp, title: "Produtos e Doses", desc: "Doses precisas e seguras para suas plantações." },
    { icon: Leaf, title: "Relatório de monitoramento", desc: "Monte relatório através de texto ou áudio sem sair da fazenda informando (fazenda, talhões, recomendações, observações, etc)." },
    { icon: MessageCircle, title: "Cálculos gerais do campo", desc: "Realize qualquer cálculo, seja de adubação, sementes, dentro do WhatsApp." },
    { icon: Zap, title: "Consultoria 24h", desc: "Especialista agronômico disponível sempre" }
  ];

  const plans = [
    {
      name: "Plano Recorrente",
      price: "R$ 37,00",
      priceDetail: "/mês",
      description: "Melhor custo-benefício com suporte prioritário",
      priceId: "price_1Sb3nIERrGAbzA6M2hHmaCV5",
      highlighted: true,
      cta: "Começar Teste Grátis 15 Dias",
      recorrente: true,
      value: 37.00,
      savings: "Economize R$ 10/mês",
      badge: "MAIS ESCOLHIDO"
    },
    {
      name: "Plano 30 Dias",
      price: "R$ 47,00",
      priceDetail: "/pagamento único",
      description: "Sem compromisso, cancele quando quiser",
      priceId: "price_1Sb5RcERrGAbzA6MZoqEwq6R",
      highlighted: false,
      cta: "Ativar Agora",
      recorrente: false,
      value: 47.00,
      badge: "SEM RECORRÊNCIA"
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
      desc: "Usuário feliz com ferramenta de emitir relatório através de áudio"
    },
    {
      title: "Cálculo de densidade de sementes",
      image: "/img/exemplo_1.jpeg",
      desc: "Passo a passo didático para ensinar o usuário a perguntar ao Agente"
    },
    {
      title: "Apoio para estudantes de agronomia",
      image: "/img/exemplo_4.jpeg",
      desc: "Direcionamento, artigos, estruturação de TCC e artigos"
    }
  ];

  const testimonials = [
    {
      name: "João Silva",
      role: "Produtor de Soja",
      text: "Economizei horas de trabalho com os relatórios automáticos. Recomendo!",
      rating: 5
    },
    {
      name: "Maria Santos",
      role: "Engenheira Agrônoma",
      text: "A precisão nos cálculos de adubação aumentou minha produtividade em 30%.",
      rating: 5
    },
    {
      name: "Carlos Mendes",
      role: "Fazendeiro",
      text: "Ter um agrônomo de IA 24/7 no WhatsApp mudou minha forma de trabalhar.",
      rating: 5
    }
  ];

  
 const gtag_report_conversion = (url?: string) => {
    const transactionId = 'TXN-' + Date.now() + '-' + Math.random().toString(36).substring(2, 11);

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-17766485655/p4-RCMKQzswbEJed3JdC',
        'value': 1.0,
        'currency': 'BRL',
        'transaction_id': transactionId,
        'event_callback': function() {
          if (typeof(url) != 'undefined') {
            window.location.href = url;
          }
        }
      });
    }
    return false;
  };

  

  const handleCheckout = async (planIndex: number) => {
    const plan = plans[planIndex];

    // Dispara evento de conversão do Google Ads
    gtag_report_conversion()


    if (!plan.recorrente) {
      // Dispara evento do Facebook Pixel para plano não recorrente
      if (typeof window !== "undefined" && typeof fbq !== "undefined") {
        fbq("track", "InitiateCheckout", {
          value: plan.value,
          currency: "BRL",
          content_name: plan.name,
          content_category: "Plano 30 dias"
        });
      }

      window.location.href = "https://wa.me/62994368426?text=Ol%C3%A1%20ConectaAI,%20quero%20Comprar%20Plano%2030%20dias";
      return;
    }

    try {
      setLoadingIndex(planIndex);

      // Dispara evento do Facebook Pixel para plano recorrente
      if (typeof window !== "undefined" && typeof fbq !== "undefined") {
        fbq("track", "InitiateCheckout", {
          value: plan.value,
          currency: "BRL",
          content_name: plan.name,
          content_category: "Plano Recorrente"
        });
      }

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

      {/* BARRA DE URGÊNCIA */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-3 text-center sticky top-0 z-50 shadow-lg">
        <p className="text-white font-bold text-sm md:text-base">
          ⚡ OFERTA ESPECIAL: 15 dias grátis + Desconto de 33% no plano mensal | Últimas vagas!
        </p>
      </div>

      {/* HERO MELHORADO */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="space-y-6">
          <div className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 backdrop-blur-sm animate-pulse">
            <p className="text-sm font-medium text-green-300">🌱 + de 1.000 produtores já confiam</p>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            <span className="bg-gradient-to-r from-green-300 via-green-200 to-green-400 bg-clip-text text-transparent">
              Seu Agrônomo de IA
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-300 to-green-400 bg-clip-text text-transparent">
              Disponível 24/7
            </span>
            <br />
            <span className="text-white text-3xl md:text-4xl">no seu WhatsApp</span>
          </h1>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            <strong className="text-green-300">Economize tempo e dinheiro</strong> com orientações técnicas precisas, cálculos automatizados e relatórios profissionais em segundos. Tudo sem sair do WhatsApp.
          </p>

          {/* PROVA SOCIAL RÁPIDA */}
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-400" />
              <span className="text-slate-300">1.000+ usuários ativos</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-slate-300">4.9/5 avaliação</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-slate-300">100% seguro</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <button
              onClick={() => {
                if (typeof window !== "undefined" && typeof fbq !== "undefined") {
                  fbq("trackCustom", "BotaoCTAHero");
                }
                handleCheckout(0);
              }}
              className="group px-8 py-5 bg-gradient-to-r from-green-400 to-green-600 rounded-xl font-bold text-lg text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Testar Grátis por 15 Dias
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#preco"
              className="px-8 py-5 border-2 border-green-500/50 rounded-xl font-bold text-lg hover:bg-green-500/10 transition-all duration-300"
            >
              Ver Planos e Preços
            </a>
          </div>

          <p className="text-sm text-slate-400 pt-2">
            ✓ Sem cartão de crédito | ✓ Cancelamento gratuito | ✓ Suporte em português
          </p>
        </div>
      </section>

      {/* RESULTADOS/BENEFÍCIOS */}
      <section className="max-w-7xl mx-auto px-6 py-16 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-3xl my-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">
            Resultados Comprovados
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl font-black text-green-400 mb-2">70%</div>
            <p className="text-slate-300">Redução no tempo de cálculos</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-black text-green-400 mb-2">24/7</div>
            <p className="text-slate-300">Disponibilidade sem parar</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-black text-green-400 mb-2">100%</div>
            <p className="text-slate-300">Precisão nos relatórios</p>
          </div>
        </div>
      </section>

      {/* VÍDEOS - MOVIDO PARA CIMA */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">
              Veja o Agente em Ação
            </span>
          </h2>
          <p className="text-slate-400 text-lg">Assista como é simples e rápido usar</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[{ title: "Relatório de Monitoramento", videoId: "Rwfai-yAzUI", desc: "Envie áudio e receba PDF estruturado" },
          { title: "Cálculo de população de sementes", videoId: "OEkkB3fIn5k", desc: "Densidade de soja em segundos" },
          { title: "Cálculo de dosagem", videoId: "CE169ueDVZg", desc: "Dosagem precisa e confiável" }]
            .map((video, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden bg-gradient-to-br from-green-900/20 to-slate-900/40 border border-green-500/20 hover:border-green-400/50 backdrop-blur-xl transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1">
                <div className="relative w-full h-56 bg-slate-800/50 overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    frameBorder="0"
                    allowFullScreen
                    className="rounded-t-2xl"
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{video.title}</h3>
                  <p className="text-slate-400 text-sm">{video.desc}</p>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">
              Tudo que Você Precisa em Um Só Lugar
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Ferramentas profissionais para aumentar sua produtividade no campo
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

      {/* DEPOIMENTOS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">
              O Que Nossos Clientes Dizem
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-green-900/20 to-slate-900/40 border border-green-500/20 backdrop-blur-xl">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-slate-300 mb-4 italic">"{testimonial.text}"</p>
              <div>
                <p className="font-bold text-white">{testimonial.name}</p>
                <p className="text-sm text-slate-400">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PREÇO - OTIMIZADO */}
      <section id="preco" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">
              Escolha Seu Plano
            </span>
          </h2>
          <p className="text-slate-400 text-lg">Comece grátis por 15 dias. Sem cartão de crédito necessário.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredPlan(i)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`relative p-8 rounded-3xl backdrop-blur-xl transition-all duration-300 ${
                plan.highlighted
                  ? "bg-gradient-to-br from-green-600/30 to-green-900/30 border-2 border-green-400 shadow-2xl shadow-green-500/20 scale-105"
                  : "bg-green-900/10 border-2 border-green-500/20 hover:border-green-400/50"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-3xl font-bold mb-2 text-white">{plan.name}</h3>
                <p className="text-slate-400">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-green-300">{plan.price}</span>
                  <span className="text-slate-400 text-lg">{plan.priceDetail}</span>
                </div>
                {plan.savings && (
                  <p className="text-green-400 font-semibold mt-2">✓ {plan.savings}</p>
                )}
              </div>

              {plan.highlighted && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <p className="text-green-300 font-bold text-center">
                    🎁 15 DIAS GRÁTIS para testar
                  </p>
                </div>
              )}

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-slate-300">Acesso completo ao agente de IA</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-slate-300">Respostas em segundos 24/7</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-slate-300">Relatórios profissionais</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-slate-300">Cálculos precisos automatizados</span>
                </li>
                {plan.highlighted && (
                  <>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300 font-semibold">Suporte prioritário</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300 font-semibold">Cancele quando quiser</span>
                    </li>
                  </>
                )}
              </ul>

              <button
                onClick={() => handleCheckout(i)}
                disabled={loadingIndex === i}
                className={`w-full py-5 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg hover:shadow-2xl hover:scale-105"
                    : "bg-white/10 text-white border-2 border-white/20 hover:bg-white/20"
                } ${loadingIndex === i ? "opacity-70 cursor-wait" : ""}`}
              >
                {loadingIndex === i ? "Aguarde..." : plan.cta}
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-center text-xs text-slate-500 mt-4">
                {plan.highlighted ? "Sem cartão de crédito necessário" : "Pagamento único, sem renovação"}
              </p>
            </div>
          ))}
        </div>

        {/* GARANTIA */}
        <div className="text-center mt-12 p-6 bg-green-900/20 border border-green-500/30 rounded-2xl max-w-2xl mx-auto">
          <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Garantia de 100% Satisfação</h3>
          <p className="text-slate-300">
            Teste por 15 dias sem risco. Se não gostar, cancele a qualquer momento sem custos.
          </p>
        </div>
      </section>

      {/* EXEMPLOS DE CONVERSA */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">
              Exemplos Reais de Uso
            </span>
          </h2>
          <p className="text-slate-400 text-lg">Veja como outros produtores estão usando</p>
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

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">
              Perguntas Frequentes
            </span>
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Como funciona o período de teste grátis?",
              a: "Você tem 15 dias para testar todas as funcionalidades sem pagar nada. Não cobramos até que seja expirado o período teste."
            },
            {
              q: "Posso cancelar a qualquer momento?",
              a: "Sim! Você pode cancelar quando quiser, sem multas ou taxas. É 100% livre de compromisso."
            },
            {
              q: "O agente realmente responde 24/7?",
              a: "Sim, nosso agente de IA está disponível 24 horas por dia, 7 dias por semana, incluindo finais de semana e feriados."
            },
            {
              q: "Preciso ter conhecimento técnico para usar?",
              a: "Não! É super simples. Se você sabe usar WhatsApp, você sabe usar nosso agente."
            }
          ].map((faq, i) => (
            <details key={i} className="p-6 rounded-xl bg-gradient-to-br from-green-900/20 to-slate-900/40 border border-green-500/20 backdrop-blur-xl">
              <summary className="font-bold text-lg cursor-pointer text-white">{faq.q}</summary>
              <p className="mt-4 text-slate-300">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA FINAL URGENTE */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="relative bg-gradient-to-r from-green-600/30 to-emerald-600/30 border-2 border-green-400/60 rounded-3xl p-12 backdrop-blur-xl overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          <div className="inline-block px-4 py-2 rounded-full bg-red-500/20 border border-red-400/50 mb-6">
            <p className="text-sm font-bold text-red-300">⏰ Oferta por tempo limitado</p>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Comece Hoje Mesmo.<br />
            <span className="bg-gradient-to-r from-green-200 to-emerald-300 bg-clip-text text-transparent">
              Teste Grátis por 15 Dias
            </span>
          </h2>

          <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
            Junte-se a mais de 1.000 produtores que já estão economizando tempo e aumentando sua produtividade com IA.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                if (typeof window !== "undefined" && typeof fbq !== "undefined") {
                  fbq("trackCustom", "BotaoCTAFinal");
                }
                handleCheckout(0);
              }}
              disabled={loadingIndex === 0}
              className="group px-10 py-5 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl font-bold text-xl text-white shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {loadingIndex === 0 ? "Aguarde..." : "Começar Teste Grátis Agora"}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <p className="text-sm text-slate-400 mt-4">
            ✓ Sem cartão de crédito | ✓ Ativação imediata | ✓ Cancele quando quiser
          </p>
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
        <span className="font-semibold">Ainda com dúvidas? Clique aqui</span>
      </a>

    </main>
  );
}