import { useEffect } from 'react';
import Hero from '@/components/apresentacao/Hero';
import Dentro from '@/components/apresentacao/Dentro';
import Planos from '@/components/apresentacao/Planos';
import Faq from '@/components/apresentacao/Faq';
import Fecho from '@/components/apresentacao/Fecho';
import BarraFixa from '@/components/apresentacao/BarraFixa';

/**
 * /apresentacao — pagina demonstrativa do sistema.
 *
 * Nao e pagina de venda: o centro dela e o video passando por dentro do app, e
 * os planos vem depois, para quem ja viu. Os botoes vao para o checkout PROPRIO
 * (preciarte.com.br/assinar), nao para Hotmart nem OnProfit, levando a query
 * inteira da pagina para medir se ela vende.
 *
 * SEM SEOHead, IGUAL AS PAGINAS DA BLACK
 * O <SEOHead> do repo afirma `price: 39.90` no schema e canonicaliza para a
 * home. Numa pagina cujo preco em destaque e o anual, isso publica preco errado
 * em dado estruturado e manda o Google tratar a pagina como copia da home.
 *
 * SEM o WhatsAppButton compartilhado: ele carrega o numero das paginas de venda
 * antigas. Se o Douglas quiser WhatsApp aqui, entra com numero proprio.
 */
const Apresentacao = () => {
  // Chegar na pagina por uma ancora de outra pagina deixaria a pessoa no meio
  // dela, sem ver o video — que e a unica razao desta pagina existir.
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-white font-ap text-ap-tinta antialiased">
      <Hero />
      <Dentro />
      <Planos />
      <Faq />
      <Fecho />
      <BarraFixa />
    </main>
  );
};

export default Apresentacao;
