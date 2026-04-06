import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ArrowRight } from 'lucide-react';

interface CTABannerLP3Props {
  text?: string;
}

const CTABannerLP3 = ({ text = 'Pronto pra parar de perder dinheiro?' }: CTABannerLP3Props) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="px-5 py-10">
      <div
        className="max-w-3xl mx-auto rounded-2xl p-8 flex flex-col items-center gap-4 transition-all duration-500"
        style={{
          background: 'linear-gradient(135deg, #8B1A4A, #6B1038)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        <p className="text-white text-lg md:text-xl font-semibold text-center">{text}</p>
        <a
          href="#pricing"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white font-semibold text-lg transition-transform hover:scale-105"
          style={{ background: '#E07B2A' }}
        >
          Quero começar agora <ArrowRight size={20} />
        </a>
      </div>
    </section>
  );
};

export default CTABannerLP3;
