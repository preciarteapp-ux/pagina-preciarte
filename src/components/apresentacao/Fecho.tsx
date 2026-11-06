import { T, Reveal, R, Botao } from './ui';
import { buildAssinarUrl } from '@/lib/checkout';
import { CHECKOUT_ANUAL, ANUAL_PARCELA, ANUAL_PARCELAS } from './oferta';

/**
 * Fecho e rodape.
 *
 * Um CTA so no fim, e ele vai DIRETO para o checkout do anual — nao para a
 * ancora. Quem chegou aqui ja passou pela secao de planos e pelas duvidas; uma
 * ancora neste ponto mandaria a pessoa rolar de volta para um lugar que ela
 * acabou de ler.
 *
 * O rodape nao tem CNPJ nem razao social porque esses dados nao existem em
 * nenhum lugar do repositorio e inventa-los num rodape e exatamente o tipo de
 * coisa que vira problema juridico. Quando o Douglas mandar, entram aqui.
 */
const Fecho = () => (
  <>
    <section className="relative overflow-hidden bg-white">
      <div className="ap-malha absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-ap-prose mx-auto px-5 lg:px-8 py-16 lg:py-24 text-center">
        <Reveal>
          <h2 className={`${T.h2} text-ap-tinta`}>
            Você já viu o que ele faz. <R>O resto é começar.</R>
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className={`${T.body} text-ap-suave mt-4 max-w-[48ch] mx-auto`}>
            Uma tarde cadastrando os seus materiais e, a partir daí, cada orçamento
            sai com o preço certo em dois minutos.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <div className="flex flex-col items-center gap-3 mt-8">
            <Botao
              href={buildAssinarUrl(CHECKOUT_ANUAL)}
              size="lg"
              trackId="ap-fecho"
              className="w-full sm:w-auto"
            >
              Assinar por {ANUAL_PARCELA} por mês
            </Botao>
            <p className={`${T.mini} text-ap-suave`}>
              {ANUAL_PARCELAS}x no cartão ou à vista no Pix · acesso na hora
            </p>
          </div>
        </Reveal>
      </div>
    </section>

    <footer className="bg-ap-tinta">
      <div className="max-w-ap-container mx-auto px-5 lg:px-8 py-10 lg:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <span className="font-ap font-bold text-[18px] tracking-[-0.02em] text-white">
            Preci<span className="text-ap-rosa">Arte</span>
          </span>
          <nav className={`flex flex-wrap items-center gap-x-6 gap-y-2 ${T.mini} text-white/60`}>
            <a
              href="https://preciarte.com.br/termos"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ap-rosa rounded"
            >
              Termos de uso
            </a>
            <a
              href="https://preciarte.com.br/privacidade"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ap-rosa rounded"
            >
              Privacidade
            </a>
            <a
              href="https://preciarte.com.br/auth"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ap-rosa rounded"
            >
              Já sou assinante
            </a>
          </nav>
        </div>
        {/* /50 e nao /40: sobre o tinta, /40 da 3,77:1 e reprova em texto. */}
        <p className={`${T.mini} text-white/50 mt-7`}>
          PreciArte · sistema de precificação e gestão para quem produz sob encomenda.
        </p>
      </div>
    </footer>
  </>
);

export default Fecho;
