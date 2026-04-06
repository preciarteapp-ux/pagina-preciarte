import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Package, Calculator, Send } from 'lucide-react';

const steps = [
  {
    num: 1,
    icon: Package,
    title: 'Cadastre seus materiais e custos',
    desc: 'Informe o que você usa e quanto paga. O sistema organiza tudo.',
  },
  {
    num: 2,
    icon: Calculator,
    title: 'Calcule o preço certo automaticamente',
    desc: 'O PreciArte soma custos, tempo e margem. Sem fórmula, sem planilha.',
  },
  {
    num: 3,
    icon: Send,
    title: 'Envie orçamentos profissionais e venda mais',
    desc: 'PDF com sua logo, pronto pra mandar no WhatsApp em 1 clique.',
  },
];

const HowItWorksLP3 = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="px-5 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: '#2C2C2C' }}>
          Como funciona em <span style={{ color: '#8B1A4A' }}>3 passos</span>
        </h2>
        <p className="text-center text-base md:text-lg mb-12" style={{ color: '#6B6B6B' }}>
          Simples o suficiente pra começar hoje. Poderoso o bastante pra transformar seu negócio.
        </p>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5"
            style={{ background: 'linear-gradient(90deg, #8B1A4A, #E07B2A)' }}
          />

          {steps.map((step, i) => (
            <div
              key={step.num}
              className="relative flex flex-col items-center text-center transition-all duration-500"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: `${i * 200}ms`,
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 relative z-10"
                style={{ background: '#8B1A4A' }}
              >
                <step.icon size={28} />
              </div>
              <span
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: '#E07B2A' }}
              >
                Passo {step.num}
              </span>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#2C2C2C' }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6B6B6B' }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksLP3;
