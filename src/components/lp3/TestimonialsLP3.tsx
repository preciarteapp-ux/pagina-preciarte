import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    text: 'Descobri que em vários pedidos eu estava no prejuízo. O PreciArte me mostrou isso nos primeiros 10 minutos. Reajustei os preços, fiquei com medo de perder cliente — e não perdi nenhum.',
    name: 'Ana Paula',
    niche: 'Papelaria personalizada',
    city: 'São Paulo',
  },
  {
    text: 'O orçamento em PDF mudou tudo. Antes mandava o preço no WhatsApp e o cliente sumia. Hoje recebe um documento profissional com minha logo — e a resposta é completamente diferente.',
    name: 'Fernanda',
    niche: 'Sublimação',
    city: 'Minas Gerais',
  },
  {
    text: 'Em dois anos de negócio, nunca coloquei o custo da impressora no preço. Nunca. O PreciArte me mostrou esse erro nos primeiros minutos. Foi o susto que eu precisava.',
    name: 'Carla',
    niche: 'Produtos em MDF',
    city: 'Paraná',
  },
  {
    text: 'Hoje quando o cliente pede desconto, eu mostro o cálculo. Ele para de pedir. Essa segurança sozinha já pagou o sistema várias vezes.',
    name: 'Juliana',
    niche: 'Caixinhas personalizadas',
    city: 'Rio de Janeiro',
  },
  {
    text: 'Finalmente consigo fechar o mês e saber se o negócio cresceu. Antes era tudo no feeling. Agora tenho controle de verdade — e isso mudou minha cabeça como empresária.',
    name: 'Mariana',
    niche: 'Lembrancinhas',
    city: 'Bahia',
  },
];

const TestimonialsLP3 = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="px-5 py-16 md:py-24" style={{ background: 'rgba(139,26,74,0.03)' }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: '#2C2C2C' }}>
          O que dizem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="p-6 rounded-2xl border transition-all duration-500"
              style={{
                background: 'white',
                borderColor: 'rgba(139,26,74,0.1)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <Quote size={24} style={{ color: '#8B1A4A', opacity: 0.3 }} className="mb-3" />
              <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: '#2C2C2C' }}>
                "{t.text}"
              </p>
              <div className="text-sm" style={{ color: '#6B6B6B' }}>
                <span className="font-semibold" style={{ color: '#8B1A4A' }}>{t.name}</span> · {t.niche} · {t.city}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsLP3;
