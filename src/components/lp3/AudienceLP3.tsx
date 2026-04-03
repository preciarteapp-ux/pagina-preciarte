import { useScrollReveal } from '@/hooks/useScrollReveal';

const niches = [
  '🎀 Papelaria personalizada',
  '🎉 Lembrancinhas de festa',
  '🎁 Caixinhas e kits personalizados',
  '🕯️ Sabonetes e velas artesanais',
  '🪵 Produtos em MDF',
  '👕 Sublimação',
  '🏢 Brindes corporativos',
  '🖨️ Impressão 3D',
  '⚡ Gravação a laser',
  '💎 Acrílico personalizado',
  '📒 Encadernação personalizada',
  '✨ Qualquer produto feito ou personalizado por encomenda',
];

const AudienceLP3 = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="px-5 py-16 md:py-24">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10" style={{ color: '#2C2C2C' }}>
          Feito para quem <span style={{ color: '#8B1A4A' }}>produz sob encomenda</span>:
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {niches.map((n, i) => (
            <span
              key={n}
              className="px-4 py-2 rounded-full text-sm md:text-base font-medium border transition-all duration-500"
              style={{
                borderColor: 'rgba(139,26,74,0.2)',
                background: 'white',
                color: '#2C2C2C',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transitionDelay: `${i * 60}ms`,
              }}
            >
              {n}
            </span>
          ))}
        </div>

        <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: '#6B6B6B' }}>
          Se você produz para um cliente específico, com nome, com data, com identidade — o PreciArte é para você.
        </p>
      </div>
    </section>
  );
};

export default AudienceLP3;
