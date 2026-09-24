import { Icon } from '@iconify/react';
import { buildCheckoutUrl } from '@/lib/checkout';
import { T, Reveal, Badge, CTAButton, Glow } from '../ui';
import {
  PRECO_VISTA, PRECO_PARCELA, PARCELAS, PRECO_ANCORA,
  ECONOMIA, DESCONTO, destinoCta, ehCheckout,
} from '../oferta';

/**
 * Preço — card único, plano anual apenas.
 *
 * O desconto aparece SÓ aqui. Repetir no hero, na barra e no rodapé é o
 * que faz página de oferta parecer infoproduto. O número que carrega o
 * argumento é a economia em reais, não o percentual: porcentagem é
 * linguagem de promoção, real é linguagem de quem faz conta.
 */
const INCLUI = [
  'As treze áreas do sistema, sem função bloqueada',
  'Catálogo público, pedidos, financeiro e estoque',
  'Edição de imagens com IA e assistente de escrita',
  'Suporte por WhatsApp',
  'Doze meses inteiros, sem renovação automática surpresa',
];

const Precos = () => (
  <section id="planos" className="relative overflow-hidden bg-bf-ink pt-[72px] lg:pt-[120px] pb-[72px] lg:pb-[120px]">
    <Glow x="50%" y="34%" size={900} opacity={0.30} />

    <div className="relative max-w-bf-narrow mx-auto px-5 lg:px-8">
      <Reveal className="text-center">
        <Badge icon="solar:tag-price-bold">Esquenta Black Friday</Badge>
        <h2 className={`${T.h2} text-white mt-6 max-w-[17ch] mx-auto`}>
          Um pedido seu paga o ano inteiro.
        </h2>
      </Reveal>

      <Reveal delay={90}>
        <div className="max-w-[520px] mx-auto mt-12">
          <div className="relative rounded-[28px] bg-bf-elevated border border-bf-gold/25 p-7 lg:p-10 overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-24 w-[320px] h-[320px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(212,175,55,.22) 0%, transparent 70%)' }}
            />

            <div className="relative">
              <h3 className={`${T.h3} text-white`}>Plano Anual</h3>
              <p className={`${T.small} text-white/60 mt-1`}>Doze meses de PreciArte</p>

              {/* a âncora: o que custaria pagando mês a mês */}
              <p className={`${T.small} text-white/55 mt-7`}>
                <span className="line-through">{PRECO_ANCORA}</span> em doze meses do plano mensal
              </p>

              {/* selo em linha própria: ao lado do riscado estoura em 390px */}
              <span className="inline-flex items-center gap-2 h-[30px] px-4 rounded-full bg-gradient-to-r from-bf-gold to-bf-goldlight text-bf-ink mt-3">
                <Icon icon="solar:fire-bold" width={13} />
                <span className={T.cap}>{DESCONTO} de desconto</span>
              </span>

              <p className="font-bf font-extrabold text-[46px] lg:text-[58px] tracking-[-0.03em] text-bf-goldlight mt-4 leading-none">
                {PRECO_VISTA}
              </p>
              <p className={`${T.small} text-white/65 mt-2`}>
                à vista, o ano inteiro
                {PRECO_PARCELA ? ` · ou ${PARCELAS}x de ${PRECO_PARCELA}` : ''}
              </p>

              <p className={`${T.body} text-bf-goldlight mt-5`}>
                Você economiza <strong className="font-bold">{ECONOMIA}</strong> no ano.
              </p>

              <ul className="mt-7 space-y-3">
                {INCLUI.map((it) => (
                  <li key={it} className="flex items-start gap-3">
                    <Icon icon="solar:check-circle-bold" width={19} className="text-bf-gold shrink-0 mt-[3px]" />
                    <span className={`${T.small} text-white/80`}>{it}</span>
                  </li>
                ))}
              </ul>

              <CTAButton
                href={ehCheckout() ? buildCheckoutUrl(destinoCta()) : destinoCta()}
                tone="dark"
                size="lg"
                external={ehCheckout()}
                trackId="black1-precos"
                className="w-full mt-8"
              >
                Pegar a oferta do ano
              </CTAButton>

              <p className={`${T.small} text-white/55 text-center mt-4`}>
                7 dias de garantia. Se não for para você, devolvemos.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={150}>
        <p className={`${T.small} text-white/55 text-center mt-8 max-w-[46ch] mx-auto`}>
          Não existe plano mensal nesta oferta. O sistema só devolve resultado
          depois que você cadastra seus produtos, e um ano é o prazo honesto
          para isso acontecer.
        </p>
      </Reveal>
    </div>
  </section>
);

export default Precos;
