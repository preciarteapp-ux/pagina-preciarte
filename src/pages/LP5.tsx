import { useEffect } from 'react';
import SEOHead from '@/components/SEOHead';
import useAnalytics from '@/hooks/useAnalytics';
import { buildCheckoutUrl } from '@/lib/checkout';

import HeaderLP5 from '@/components/lp5/HeaderLP5';
import HeroLP5 from '@/components/lp5/HeroLP5';
import ProblemaLP5 from '@/components/lp5/ProblemaLP5';
import MecanismoLP5 from '@/components/lp5/MecanismoLP5';
import ComoFuncionaLP5 from '@/components/lp5/ComoFuncionaLP5';
import RecursosLP5 from '@/components/lp5/RecursosLP5';
import CoragemLP5 from '@/components/lp5/CoragemLP5';
import ComOuSemLP5 from '@/components/lp5/ComOuSemLP5';
import PrecosLP5, { CHECKOUT_ANUAL } from '@/components/lp5/PrecosLP5';
import FaqLP5 from '@/components/lp5/FaqLP5';
import CtaFinalLP5 from '@/components/lp5/CtaFinalLP5';
import FooterLP5 from '@/components/lp5/FooterLP5';
import { FixedCTABar } from '@/components/lp5/ui';

/**
 * LP5 — Ângulo "O custo invisível"
 *
 * Ritmo de background (nenhuma dobra repete a anterior):
 *   ameixa → claro → carvão → claro → branco → FRAMBOESA → claro → branco → claro → carvão
 *
 * Regra crítica de CTA: rosa #CE2252 em fundo claro, BRANCO em fundo escuro.
 * O rosa sobre a ameixa do hero dá 2,82:1 e o botão afunda.
 */
const LP5 = () => {
  useAnalytics();

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('init', '1503006167441659');
      (window as any).fbq('track', 'PageView');
    }
  }, []);

  return (
    <div className="min-h-screen font-lp5 bg-white text-lp5n-900">
      <SEOHead />
      <HeaderLP5 />

      <main>
        <HeroLP5 />
        <ProblemaLP5 />
        <MecanismoLP5 />
        <ComoFuncionaLP5 />
        <RecursosLP5 />
        <CoragemLP5 />
        <ComOuSemLP5 />
        <PrecosLP5 />
        <FaqLP5 />
        <CtaFinalLP5 />
      </main>

      <FooterLP5 />
      <FixedCTABar href={buildCheckoutUrl(CHECKOUT_ANUAL)} />
    </div>
  );
};

export default LP5;
