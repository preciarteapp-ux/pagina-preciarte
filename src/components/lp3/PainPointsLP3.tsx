import { useScrollReveal } from '@/hooks/useScrollReveal';

const blocks = [
  'O cliente pergunta o preço. Você hesita. Você calcula na cabeça, olha o que a concorrência cobra, e chuta um número que "parece justo".',
  'O mês fecha. O Pix caiu bastante. Mas o saldo não aparece.',
  'Você manda o preço no WhatsApp. O cliente some.',
  'Você sabe que seu produto é bom. Mas na hora de gerir o negócio — preço, financeiro, orçamento, organização — é um caos silencioso que vai consumindo o lucro sem você perceber.',
];

const PainPointsLP3 = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="px-5 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ color: '#2C2C2C' }}>
          Você reconhece alguma dessas situações?
        </h2>

        <div className="space-y-6">
          {blocks.map((text, i) => (
            <p
              key={i}
              className="text-base md:text-lg leading-relaxed pl-5 border-l-4 transition-all duration-500"
              style={{
                borderColor: '#8B1A4A',
                color: '#2C2C2C',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                transitionDelay: `${i * 150}ms`,
              }}
            >
              {text}
            </p>
          ))}
        </div>

        <p
          className="text-xl md:text-2xl font-bold text-center mt-12 transition-all duration-500"
          style={{
            color: '#8B1A4A',
            opacity: isVisible ? 1 : 0,
            transitionDelay: '700ms',
          }}
        >
          Não é falta de esforço. É falta de sistema.<br />E isso tem solução.
        </p>
      </div>
    </section>
  );
};

export default PainPointsLP3;
