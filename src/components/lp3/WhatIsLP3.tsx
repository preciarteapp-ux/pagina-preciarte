import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Calculator, FileText, Package, DollarSign, ShoppingBag, Sparkles } from 'lucide-react';

const items = [
  { icon: Calculator, label: 'Precificação automática' },
  { icon: FileText, label: 'Orçamentos em PDF' },
  { icon: Package, label: 'Controle de materiais' },
  { icon: DollarSign, label: 'Gestão financeira' },
  { icon: ShoppingBag, label: 'Catálogo online' },
  { icon: Sparkles, label: 'IA para fotos e marketing' },
];

const WhatIsLP3 = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="px-5 py-16 md:py-24">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#2C2C2C' }}>
          Um sistema completo. <span style={{ color: '#8B1A4A' }}>Feito para o seu negócio.</span>
        </h2>
        <p className="text-base md:text-lg mb-12 max-w-2xl mx-auto" style={{ color: '#6B6B6B' }}>
          O PreciArte reúne tudo que você precisa para gerir sua produção com profissionalismo.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {items.map((item, i) => (
            <div
              key={item.label}
              className="p-5 rounded-xl border transition-all duration-500"
              style={{
                borderColor: 'rgba(139,26,74,0.15)',
                background: 'white',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <item.icon size={28} style={{ color: '#8B1A4A' }} className="mx-auto mb-3" />
              <p className="text-sm md:text-base font-medium" style={{ color: '#2C2C2C' }}>{item.label}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-base" style={{ color: '#6B6B6B' }}>
          Tudo integrado. Tudo simples. Tudo criado para quem produz sob encomenda.
        </p>
      </div>
    </section>
  );
};

export default WhatIsLP3;
