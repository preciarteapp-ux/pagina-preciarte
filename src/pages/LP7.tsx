import SEOHead from '@/components/SEOHead';
import useAnalytics from '@/hooks/useAnalytics';

import HeroLP7 from '@/components/lp7/HeroLP7';
import PilaresLP7 from '@/components/lp7/PilaresLP7';
import AreasLP7 from '@/components/lp7/AreasLP7';
import RecursosLP7 from '@/components/lp7/RecursosLP7';
import GestaoLP7 from '@/components/lp7/GestaoLP7';
import PrecosLP7 from '@/components/lp7/PrecosLP7';
import FaqLP7 from '@/components/lp7/FaqLP7';
import CtaFinalLP7 from '@/components/lp7/CtaFinalLP7';
import FooterLP7 from '@/components/lp7/FooterLP7';

/**
 * LP7 — "O sistema que sabe seu preço certo, no seu celular"
 *
 * Sistema visual com a estrutura de meuassessor.com: ritmo escuro →
 * faixa preta de prova → escuro → creme → fechamento escuro, cantos
 * muito arredondados, chips em pílula, acento em gradiente violeta→rosa.
 *
 * Cores, copy, funcionalidades e telas são nossas. As animações Rive
 * deles viraram vocabulário CSS: reveal com stagger, flutuação, brilho
 * que respira e a faixa de prova rolando.
 *
 * Nenhum número inventado: a faixa de prova lista só o que o produto
 * entrega de fato, porque não temos as métricas de base que eles têm.
 */
const LP7 = () => {
  useAnalytics();

  return (
    <div className="min-h-screen font-lp7 bg-lp7-ink text-white">
      <SEOHead />
      <main>
        <HeroLP7 />
        <PilaresLP7 />
        <AreasLP7 />
        <RecursosLP7 />
        <GestaoLP7 />
        <PrecosLP7 />
        <FaqLP7 />
        <CtaFinalLP7 />
      </main>
      <FooterLP7 />
    </div>
  );
};

export default LP7;
