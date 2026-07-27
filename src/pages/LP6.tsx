import SEOHead from '@/components/SEOHead';
import useAnalytics from '@/hooks/useAnalytics';

import HeroLP6 from '@/components/lp6/HeroLP6';
import ProblemaLP6 from '@/components/lp6/ProblemaLP6';
import CalculadoraLP6 from '@/components/lp6/CalculadoraLP6';
import ComoFuncionaLP6 from '@/components/lp6/ComoFuncionaLP6';
import CapacidadesLP6 from '@/components/lp6/CapacidadesLP6';
import DepoimentosLP6 from '@/components/lp6/DepoimentosLP6';
import ParaVoceLP6 from '@/components/lp6/ParaVoceLP6';
import PrecosLP6 from '@/components/lp6/PrecosLP6';
import FaqLP6 from '@/components/lp6/FaqLP6';
import CtaFinalLP6 from '@/components/lp6/CtaFinalLP6';
import FooterLP6 from '@/components/lp6/FooterLP6';

/**
 * LP6 — Ângulo "Seu preço não é seu"
 *
 * A página inteira existe para entregar um número. A dobra 3 não é uma seção
 * entre outras: é o clímax. As dobras 1 e 2 são a subida, 4 a 10 são a descida.
 *
 * Ritmo de background (nenhuma dobra repete a anterior):
 *   rosa → branco → ESCURO → branco → rosa-claro → ESCURO
 *   → branco → rosa-claro → branco → ESCURO → quase-preto
 *
 * Sem barra fixa de CTA e sem barra de escassez, de propósito:
 *   · a página já tem 4 pontos de conversão
 *   · no mobile o elemento sticky é o resultado da calculadora — uma barra
 *     fixa competiria com ele exatamente no momento da descoberta
 *   · não existe escassez real e esse ICP rejeita a fabricada
 */
const LP6 = () => {
  useAnalytics();

  return (
    <div className="min-h-screen font-lp6body bg-white text-lp6-text">
      <SEOHead />

      <main>
        <HeroLP6 />
        <ProblemaLP6 />
        <CalculadoraLP6 />
        <ComoFuncionaLP6 />
        <CapacidadesLP6 />
        <DepoimentosLP6 />
        <ParaVoceLP6 />
        <PrecosLP6 />
        <FaqLP6 />
        <CtaFinalLP6 />
      </main>

      <FooterLP6 />
    </div>
  );
};

export default LP6;
