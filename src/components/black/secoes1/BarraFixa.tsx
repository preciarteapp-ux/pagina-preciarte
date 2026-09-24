import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';

/**
 * Barra fixa de conversão — só no celular.
 *
 * A página tem mais de vinte telas de rolagem no telefone. Sem isto, a
 * pessoa que se convence no meio do caminho precisa rolar até o fim
 * para achar um botão. Some quando a seção de planos está na tela,
 * para não cobrir os botões de verdade.
 */
const BarraFixa = () => {
  const [visivel, setVisivel] = useState(false);
  const passouHero = useRef(false);
  const nosPlanos = useRef(false);
  const noRodape = useRef(false);

  useEffect(() => {
    const atualiza = () =>
      setVisivel(passouHero.current && !nosPlanos.current && !noRodape.current);

    const obs: IntersectionObserver[] = [];
    const liga = (sel: string, ao: (dentro: boolean) => void, opcoes?: IntersectionObserverInit) => {
      const alvo = document.querySelector(sel);
      if (!alvo) return;
      const o = new IntersectionObserver(([e]) => { ao(e.isIntersecting); atualiza(); }, opcoes);
      o.observe(alvo);
      obs.push(o);
    };

    // o gatilho é a primeira seção depois do hero entrar em cena
    liga('#sistema', (dentro) => { if (dentro) passouHero.current = true; });
    liga('#planos', (dentro) => { nosPlanos.current = dentro; });
    liga('footer', (dentro) => { noRodape.current = dentro; });

    return () => obs.forEach((o) => o.disconnect());
  }, []);

  return (
    <div
      className={`lg:hidden fixed inset-x-0 bottom-0 z-50 transition-all duration-300
        ${visivel ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}
    >
      <div className="bg-bf-ink/95 backdrop-blur-md border-t border-white/10 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]">
        <a
          href="#planos"
          data-track-id="black1-barra-fixa"
          className="flex items-center justify-center gap-2 h-[52px] w-full rounded-full
            bg-white text-bf-text font-lp7 font-medium text-[15px] active:scale-[0.98] transition-transform"
        >
          Pegar a oferta do ano
          <Icon icon="solar:arrow-right-linear" width={17} />
        </a>
        <p className="text-center font-lp7 text-[11.5px] text-white/60 mt-[7px]">
          Plano anual · 7 dias de garantia
        </p>
      </div>
    </div>
  );
};

export default BarraFixa;
