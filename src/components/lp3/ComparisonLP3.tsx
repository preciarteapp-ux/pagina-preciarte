import { useScrollReveal } from '@/hooks/useScrollReveal';
import { X, Check } from 'lucide-react';

const rows = [
  ['Preço no achismo', 'Preço calculado com custo real'],
  ['Orçamento no WhatsApp', 'PDF profissional em 1 clique'],
  ['Não sabe se lucrou', 'Lucro visível em cada pedido'],
  ['Material sem controle', 'Custo por pedido automático'],
  ['Foto caseira', 'Imagem profissional com IA'],
  ['Financeiro bagunçado', 'Receitas e despesas organizadas'],
  ['Cede desconto por insegurança', 'Tem número pra justificar o preço'],
  ['Fecha o mês sem saber o resultado', 'Sabe exatamente quanto gerou'],
];

const ComparisonLP3 = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="px-5 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: '#2C2C2C' }}>
          Com ou sem o PreciArte. <span style={{ color: '#8B1A4A' }}>Você escolhe.</span>
        </h2>

        <div
          className="mt-10 rounded-2xl overflow-hidden border transition-all duration-500"
          style={{
            borderColor: 'rgba(139,26,74,0.15)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          {/* Header */}
          <div className="grid grid-cols-2 text-center text-sm md:text-base font-bold">
            <div className="p-4" style={{ background: '#f1f1f1', color: '#6B6B6B' }}>Sem o PreciArte</div>
            <div className="p-4" style={{ background: '#8B1A4A', color: 'white' }}>Com o PreciArte</div>
          </div>

          {rows.map(([without, withP], i) => (
            <div
              key={i}
              className="grid grid-cols-2 text-sm md:text-base border-t"
              style={{ borderColor: 'rgba(0,0,0,0.06)' }}
            >
              <div className="p-4 flex items-start gap-2" style={{ color: '#6B6B6B' }}>
                <X size={16} className="shrink-0 mt-0.5" style={{ color: '#dc2626' }} />
                {without}
              </div>
              <div className="p-4 flex items-start gap-2" style={{ color: '#2C2C2C', background: 'rgba(139,26,74,0.03)' }}>
                <Check size={16} className="shrink-0 mt-0.5" style={{ color: '#16a34a' }} />
                {withP}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonLP3;
