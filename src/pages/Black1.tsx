import Hero from '@/components/black/secoes1/Hero';
import Beneficios from '@/components/black/secoes1/Beneficios';
import Precos from '@/components/black/secoes1/Precos';
import Depoimentos from '@/components/black/secoes1/Depoimentos';
import Faq from '@/components/black/secoes1/Faq';
import CtaFaixa from '@/components/black/secoes1/CtaFaixa';
import Footer from '@/components/black/secoes1/Footer';
import BarraFixa from '@/components/black/secoes1/BarraFixa';

/**
 * /black1 — Esquenta Black Friday, estrutura curta (herdada da LP1).
 *
 * Mesma identidade da /black, ângulo diferente: lá a entrada é a
 * aritmética do erro, aqui é a decisão adiada. Assim o teste A/B
 * compara argumento, e não só layout.
 *
 * Como na /black, sem SEOHead e sem WhatsAppButton — os motivos estão
 * documentados em src/pages/Black.tsx.
 */
const Black1 = () => (
  <div className="min-h-screen font-bfbody bg-bf-ink text-white">
    <main>
      <Hero />
      <Beneficios />
      <Precos />
      <Depoimentos />
      <Faq />
      <CtaFaixa />
    </main>
    <Footer />
    <BarraFixa />
  </div>
);

export default Black1;
