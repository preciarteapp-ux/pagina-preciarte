import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const HeroLP3 = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const scriptSrc = "https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js";
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      document.head.appendChild(script);
    }
    if (iframeRef.current) {
      iframeRef.current.src = `https://scripts.converteai.net/f04f0c1f-d8c5-4ccf-aa51-6f81483a882e/players/696bebcc521058214ca6e141/v4/embed.html${window.location.search || '?'}&vl=${encodeURIComponent(window.location.href)}`;
    }
  }, []);

  return (
    <section className="min-h-[90vh] flex items-center justify-center px-5 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <span
          className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in"
          style={{ background: 'rgba(139,26,74,0.1)', color: '#8B1A4A' }}
        >
          Sistema de gestão completo para criadores de produtos personalizados
        </span>

        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 animate-fade-in"
          style={{ color: '#2C2C2C', animationDelay: '0.15s', animationFillMode: 'both' }}
        >
          Tudo que seu negócio precisa.
          <br />
          <span style={{ color: '#8B1A4A' }}>Em um só sistema.</span>
        </h1>

        <p
          className="text-lg md:text-xl max-w-xl mx-auto mb-10 animate-fade-in"
          style={{ color: '#6B6B6B', animationDelay: '0.3s', animationFillMode: 'both' }}
        >
          Quem vive de produto personalizado merece um sistema que entende do seu negócio — e te ajuda a transformar produção em lucro real.
        </p>

        {/* VSL Video */}
        <div
          className="w-full max-w-2xl mx-auto mb-10 rounded-2xl overflow-hidden shadow-lg animate-fade-in"
          style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
        >
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <iframe
              ref={iframeRef}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
              referrerPolicy="origin"
            />
          </div>
        </div>

        <a
          href="#pricing"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold text-white transition-transform duration-200 hover:scale-105 animate-fade-in"
          style={{ background: '#E07B2A', animationDelay: '0.55s', animationFillMode: 'both' }}
        >
          Teste grátis por 7 dias <ArrowRight size={20} />
        </a>

        <p
          className="mt-4 text-sm animate-fade-in"
          style={{ color: '#6B6B6B', animationDelay: '0.65s', animationFillMode: 'both' }}
        >
          Sem cartão · Acesso imediato · Cancele quando quiser
        </p>
      </div>
    </section>
  );
};

export default HeroLP3;
