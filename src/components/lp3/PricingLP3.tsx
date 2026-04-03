import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Check, Star } from 'lucide-react';

const features = [
  'Precificação automática com custo real',
  'Orçamento profissional em PDF',
  'Calculadora do valor da sua hora',
  'Controle de materiais e insumos',
  'Catálogo online com link personalizado',
  'Controle financeiro completo',
  'Edição de fotos com IA',
  'Assistente de marketing com IA',
  'Suporte disponível para te ajudar',
];

const PricingLP3 = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} id="pricing" className="px-5 py-16 md:py-24">
      <div
        className="max-w-4xl mx-auto transition-all duration-500"
        style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ color: '#2C2C2C' }}>
          Simples assim. <span style={{ color: '#8B1A4A' }}>Sem pegadinha.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
          {/* Anual */}
          <div
            className="relative rounded-2xl p-6 md:p-8 border-2 overflow-hidden"
            style={{ borderColor: '#8B1A4A', background: 'white' }}
          >
            <div
              className="absolute top-0 right-0 px-4 py-1 text-xs font-bold text-white rounded-bl-xl flex items-center gap-1"
              style={{ background: '#8B1A4A' }}
            >
              <Star size={12} /> Mais escolhido
            </div>

            <h3 className="text-xl font-bold mt-4 mb-1" style={{ color: '#2C2C2C' }}>Anual</h3>

            <div className="mb-1">
              <span className="text-sm line-through" style={{ color: '#6B6B6B' }}>R$ 478,80</span>
            </div>
            <p className="text-3xl md:text-4xl font-extrabold" style={{ color: '#8B1A4A' }}>
              R$ 84,90<span className="text-base font-medium">/ano</span>
            </p>
            <p className="text-sm mt-1" style={{ color: '#6B6B6B' }}>12x de R$ 8,03</p>
            <p className="text-sm font-semibold mt-1" style={{ color: '#16a34a' }}>Você economiza R$ 394,10 por ano</p>

            <a
              href="https://pay.onprofit.com.br/CUTCm7GF?off=0jene1"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center mt-6 py-4 rounded-lg text-white font-semibold text-lg transition-transform hover:scale-105"
              style={{ background: '#E07B2A' }}
            >
              Começar agora
            </a>
          </div>

          {/* Mensal */}
          <div
            className="rounded-2xl p-6 md:p-8 border"
            style={{ borderColor: 'rgba(139,26,74,0.15)', background: 'white' }}
          >
            <h3 className="text-xl font-bold mb-1 mt-4" style={{ color: '#2C2C2C' }}>Mensal</h3>

            <p className="text-3xl md:text-4xl font-extrabold mt-3" style={{ color: '#2C2C2C' }}>
              R$ 39,90<span className="text-base font-medium">/mês</span>
            </p>
            <p className="text-sm mt-1" style={{ color: '#6B6B6B' }}>Acesso completo a tudo. Cancele quando quiser.</p>

            <a
              href="https://pay.hotmart.com/X105144057Q"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center mt-6 py-4 rounded-lg font-semibold text-lg border-2 transition-transform hover:scale-105"
              style={{ borderColor: '#8B1A4A', color: '#8B1A4A' }}
            >
              Começar agora
            </a>
          </div>
        </div>

        {/* Features list */}
        <div className="mt-12 max-w-md mx-auto">
          <p className="text-sm font-semibold text-center mb-4" style={{ color: '#6B6B6B' }}>
            Nos dois planos, tudo incluso:
          </p>
          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm md:text-base" style={{ color: '#2C2C2C' }}>
                <Check size={18} style={{ color: '#16a34a' }} className="shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PricingLP3;
