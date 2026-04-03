import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect, useState } from 'react';

const stats = [
  { value: 15000, prefix: '+', suffix: '', label: 'criadoras usando o PreciArte' },
  { value: 2, prefix: '+R$ ', suffix: 'M', label: 'em orçamentos gerados todo mês' },
  { value: 87, prefix: '', suffix: '%', label: 'descobrem que cobravam abaixo do ideal' },
  { value: 1, prefix: '', suffix: ' min', label: 'para gerar um orçamento profissional em PDF' },
];

function AnimatedNumber({ target, prefix, suffix, animate }: { target: number; prefix: string; suffix: string; animate: boolean }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!animate) return;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setVal(target);
        clearInterval(timer);
      } else {
        setVal(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [animate, target]);

  const display = target >= 1000 ? val.toLocaleString('pt-BR') : val;
  return <span>{prefix}{display}{suffix}</span>;
}

const StatsLP3 = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section ref={ref} className="px-5 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: '#2C2C2C' }}>
          Números que falam
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="text-center p-5 rounded-xl transition-all duration-500"
              style={{
                background: 'white',
                border: '1px solid rgba(139,26,74,0.1)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <p className="text-3xl md:text-4xl font-extrabold" style={{ color: '#8B1A4A' }}>
                <AnimatedNumber target={s.value} prefix={s.prefix} suffix={s.suffix} animate={isVisible} />
              </p>
              <p className="text-sm mt-2" style={{ color: '#6B6B6B' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsLP3;
