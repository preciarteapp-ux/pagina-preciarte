import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Check, Star, PiggyBank, Minus } from 'lucide-react';
import { buildCheckoutUrl } from '@/lib/checkout';

const annualFeatures = [
  'Acesso completo a todos os recursos',
  'Menos que uma pizza por mês',
  'O sistema se paga na 1ª venda corrigida',
  'Suporte prioritário incluso',
];

const PricingLP3 = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} id="pricing" className="px-5 py-16 md:py-24">
      <div
        className="max-w-5xl mx-auto transition-all duration-500"
        style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ color: '#2C2C2C' }}>
          Simples assim. <span style={{ color: '#8B1A4A' }}>Sem pegadinha.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 items-start">
          {/* Anual */}
          <div
            className="relative rounded-2xl p-6 md:p-8 border-2 overflow-hidden"
            style={{ borderColor: '#8B1A4A', background: 'white' }}
          >
            <div
              className="absolute top-0 right-0 px-4 py-1.5 text-xs font-bold text-white rounded-bl-xl flex items-center gap-1"
              style={{ background: '#8B1A4A' }}
            >
              <Star size={12} /> Melhor oferta
            </div>

            <h3 className="text-2xl font-bold mt-6 mb-3" style={{ color: '#2C2C2C' }}>Anual</h3>

            <div className="mb-3">
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                style={{ background: 'rgba(224,123,42,0.15)', color: '#E07B2A' }}
              >
                48% OFF
              </span>
            </div>
            <span className="text-sm line-through block mb-1" style={{ color: '#6B6B6B' }}>R$ 478,80/ano</span>
            <p className="text-4xl md:text-5xl font-extrabold leading-tight" style={{ color: '#8B1A4A' }}>
              12x R$ 14,48
            </p>
            <p className="text-sm mt-1" style={{ color: '#6B6B6B' }}>
              ou R$ 139,90 à vista
            </p>

            <div
              className="mt-4 flex items-center gap-2 rounded-xl px-3 py-2.5 border"
              style={{ background: 'rgba(22,163,74,0.08)', borderColor: 'rgba(22,163,74,0.3)' }}
            >
              <PiggyBank className="w-4 h-4 flex-shrink-0" style={{ color: '#16a34a' }} />
              <span className="text-sm font-semibold" style={{ color: '#16a34a' }}>
                Você economiza R$ 338,90 por ano
              </span>
            </div>

            <ul className="space-y-3 my-6">
              {annualFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm md:text-base" style={{ color: '#2C2C2C' }}>
                  <Check size={18} style={{ color: '#16a34a' }} className="shrink-0 mt-0.5" strokeWidth={3} />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={buildCheckoutUrl("https://pay.onprofit.com.br/CUTCm7GF?off=0jene1")}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center mt-2 py-4 rounded-lg text-white font-semibold text-lg transition-transform hover:scale-105"
              style={{ background: '#E07B2A' }}
              data-track-id="checkout-lp3-anual"
              data-track-type="checkout"
            >
              Assinar Anual agora
            </a>
          </div>

          {/* Mensal */}
          <div
            className="rounded-2xl p-6 md:p-8 border"
            style={{ borderColor: 'rgba(139,26,74,0.15)', background: 'white' }}
          >
            <h3 className="text-2xl font-bold mb-3 mt-6" style={{ color: '#2C2C2C' }}>Mensal</h3>
            <p className="text-4xl md:text-5xl font-extrabold leading-tight" style={{ color: '#2C2C2C' }}>
              R$ 39,90<span className="text-base font-medium" style={{ color: '#6B6B6B' }}>/mês</span>
            </p>
            <p className="text-sm mt-2" style={{ color: '#6B6B6B' }}>Acesso completo, sem fidelidade</p>

            <ul className="space-y-3 my-6 mt-8">
              <li className="flex items-start gap-3 text-sm md:text-base" style={{ color: '#2C2C2C' }}>
                <Check size={18} style={{ color: '#16a34a' }} className="shrink-0 mt-0.5" strokeWidth={3} />
                Acesso completo
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base" style={{ color: '#2C2C2C' }}>
                <Check size={18} style={{ color: '#16a34a' }} className="shrink-0 mt-0.5" strokeWidth={3} />
                Cancele quando quiser
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base" style={{ color: '#6B6B6B' }}>
                <Minus size={18} className="shrink-0 mt-0.5" />
                Sem desconto anual
              </li>
            </ul>

            <a
              href={buildCheckoutUrl("https://pay.hotmart.com/X105144057Q")}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-4 rounded-lg font-semibold text-lg border-2 transition-transform hover:scale-105 mb-4"
              style={{ borderColor: '#8B1A4A', color: '#8B1A4A' }}
              data-track-id="checkout-lp3-mensal"
              data-track-type="checkout"
            >
              Assinar Mensal
            </a>

            <div
              className="rounded-xl px-3 py-2.5 text-center border"
              style={{ background: 'rgba(139,26,74,0.05)', borderColor: 'rgba(139,26,74,0.15)' }}
            >
              <p className="text-sm" style={{ color: '#6B6B6B' }}>
                No anual você paga <span className="font-bold" style={{ color: '#8B1A4A' }}>R$ 14,48/mês</span> — apenas 36% do preço mensal
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm" style={{ color: '#6B6B6B' }}>Garantia de 7 dias em todos os planos</p>
        </div>
      </div>
    </section>
  );
};

export default PricingLP3;
