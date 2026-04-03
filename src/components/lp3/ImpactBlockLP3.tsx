import { useScrollReveal } from '@/hooks/useScrollReveal';

const ImpactBlockLP3 = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className="px-5 py-20 md:py-28"
      style={{ background: '#2C2C2C' }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <p
          className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight transition-all duration-700"
          style={{
            color: '#F8F6F3',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.95)',
          }}
        >
          Produto bom não é suficiente.
          <br />
          <span className="block mt-2" style={{ color: '#E07B2A' }}>
            Negócio organizado é o que separa quem sobrevive de quem cresce.
          </span>
        </p>
        <p
          className="mt-6 text-lg md:text-xl font-semibold transition-all duration-700"
          style={{
            color: '#F8F6F3',
            opacity: isVisible ? 1 : 0,
            transitionDelay: '300ms',
          }}
        >
          O PreciArte é a virada.
        </p>
      </div>
    </section>
  );
};

export default ImpactBlockLP3;
