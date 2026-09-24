import Hero from '@/components/black/secoes7/Hero';
import Pilares from '@/components/black/secoes7/Pilares';
import Areas from '@/components/black/secoes7/Areas';
import Recursos from '@/components/black/secoes7/Recursos';
import Gestao from '@/components/black/secoes7/Gestao';
import Precos from '@/components/black/secoes7/Precos';
import Faq from '@/components/black/secoes7/Faq';
import CtaFinal from '@/components/black/secoes7/CtaFinal';
import Footer from '@/components/black/secoes7/Footer';
import BarraFixa from '@/components/black/secoes7/BarraFixa';

/**
 * /black — Esquenta Black Friday, estrutura longa (herdada da LP7).
 *
 * Preto e dourado, plano anual apenas. Não renderiza SEOHead: o schema
 * dele afirma "price: 39.90" e canonicaliza para a home, o que numa
 * página de oferta é dado divergente.
 *
 * Também não traz o WhatsAppButton: ele é fixed bottom-right z-50 e se
 * sobrepõe à barra fixa em 390px, bem em cima do único CTA persistente.
 */
const Black = () => (
  <div className="min-h-screen font-bfbody bg-bf-ink text-white">
    <main>
      <Hero />
      <Pilares />
      <Areas />
      <Recursos />
      <Gestao />
      <Precos />
      <Faq />
      <CtaFinal />
    </main>
    <Footer />
    <BarraFixa />
  </div>
);

export default Black;
