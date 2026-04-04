import { ArrowRight, MessageCircle } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const CTAFinalLP3 = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className="px-5 py-20 md:py-28"
      style={{ background: '#2C2C2C' }}
    >
      <div
        className="max-w-3xl mx-auto text-center transition-all duration-700"
        style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: '#F8F6F3' }}>
          Tudo que seu negócio precisa.
          <br />
          <span style={{ color: '#E07B2A' }}>Em um só sistema.</span>
        </h2>

        <p className="mt-6 text-base md:text-lg max-w-xl mx-auto" style={{ color: 'rgba(248,246,243,0.8)' }}>
          Você já tem o que mais importa: o produto, o talento e os clientes. O PreciArte cuida do resto — para você produzir com tranquilidade, cobrar com segurança e crescer com clareza.
        </p>

        <a
          href="#pricing"
          className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-lg text-lg font-semibold text-white transition-transform hover:scale-105"
          style={{ background: '#E07B2A' }}
        >
          Quero começar agora <ArrowRight size={20} />
        </a>


        <div className="mt-8">
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:underline"
            style={{ color: 'rgba(248,246,243,0.7)' }}
          >
            <MessageCircle size={16} />
            Ficou com dúvida? Fala com a gente pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTAFinalLP3;
