import { Icon } from '@iconify/react';
import { buildCheckoutUrl } from '@/lib/checkout';
import { T, Reveal, Badge, CTAButton, Glow } from '../ui';
import {
  PRECO_VISTA, PRECO_PARCELA, PARCELAS, PRECO_MENSAL,
  ECONOMIA, DESCONTO, CHECKOUT_MENSAL, destinoCta, ehCheckout,
} from '../oferta';

/**
 * Preço — dois planos, com o anual em destaque.
 *
 * Não repito a âncora riscada dentro do card anual: com o mensal ao
 * lado, a comparação já está na tela. Riscar um preço que está sendo
 * vendido na coluna vizinha confunde.
 *
 * O desconto aparece só aqui. Repetir no hero, na barra e no rodapé é
 * o que faz página de oferta parecer infoproduto.
 */
const ANUAL = [
  'As treze áreas do sistema, sem função bloqueada',
  'Catálogo público, pedidos, financeiro e estoque',
  'Edição de imagens com IA e assistente de escrita',
  'Suporte prioritário por WhatsApp',
  'Doze meses garantidos no preço da campanha',
];

const MENSAL = [
  'As treze áreas do sistema',
  'Catálogo público, pedidos e financeiro',
  'Suporte por WhatsApp',
  'Sem fidelidade, cancele quando quiser',
];

const Precos = () => (
  <section id="planos" className="relative overflow-hidden bg-bf-ink pt-[72px] lg:pt-[120px] pb-[72px] lg:pb-[120px]">
    <Glow x="50%" y="30%" size={900} opacity={0.28} />

    <div className="relative max-w-bf-narrow mx-auto px-5 lg:px-8">
      <Reveal className="text-center">
        <Badge icon="solar:tag-price-bold">Esquenta Black Friday</Badge>
        <h2 className={`${T.h2} text-white mt-6 max-w-[17ch] mx-auto`}>
          Um pedido seu paga o ano inteiro.
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-5 mt-12 items-start">
        {/* ANUAL primeiro no mobile: em coluna única ele é o que importa */}
        <Reveal delay={90} className="order-1 md:order-2">
          <div className="relative rounded-[28px] bg-bf-elevated border border-bf-gold/30 p-7 lg:p-9 overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-24 w-[320px] h-[320px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(212,175,55,.22) 0%, transparent 70%)' }}
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 h-[30px] px-4 rounded-full bg-gradient-to-r from-bf-gold to-bf-goldlight text-bf-ink">
                <Icon icon="solar:fire-bold" width={13} />
                <span className={T.cap}>{DESCONTO} de desconto</span>
              </span>

              <h3 className={`${T.h3} text-white mt-5`}>Plano Anual</h3>

              <p className="font-bf font-extrabold text-[52px] lg:text-[64px] tracking-[-0.04em] text-bf-goldlight mt-3 leading-none">
                {PRECO_PARCELA}
                <span className="font-bf font-bold text-[24px] lg:text-[28px] text-white/70">/mês</span>
              </p>
              <p className={`${T.small} text-white/65 mt-3`}>
                em {PARCELAS}x · ou <strong className="font-bold text-white/85">{PRECO_VISTA} à vista</strong>
              </p>

              <p className={`${T.body} text-bf-goldlight mt-5`}>
                Você economiza <strong className="font-bold">{ECONOMIA}</strong> no ano.
              </p>

              <ul className="mt-7 space-y-3">
                {ANUAL.map((it) => (
                  <li key={it} className="flex items-start gap-3">
                    <Icon icon="solar:check-circle-bold" width={19} className="text-bf-gold shrink-0 mt-[3px]" />
                    <span className={`${T.small} text-white/80`}>{it}</span>
                  </li>
                ))}
              </ul>

              <CTAButton
                href={ehCheckout() ? buildCheckoutUrl(destinoCta()) : '#planos'}
                tone="dark" size="lg" external={ehCheckout()}
                trackId="black-precos" className="w-full mt-8"
              >
                Pegar a oferta do ano
              </CTAButton>
            </div>
          </div>
        </Reveal>

        {/* MENSAL — preço de tabela, sem desconto de campanha */}
        <Reveal delay={150} className="order-2 md:order-1">
          <div className="rounded-[28px] bg-bf-surface border border-bf-line p-7 lg:p-9">
            <h3 className={`${T.h3} text-white`}>Plano Mensal</h3>
            <p className={`${T.small} text-white/60 mt-1`}>Sem compromisso de prazo</p>

            <p className="font-bf font-extrabold text-[44px] lg:text-[52px] tracking-[-0.03em] text-white mt-5 leading-none">
              {PRECO_MENSAL}
              <span className="font-bf font-bold text-[22px] lg:text-[26px] text-white/60">/mês</span>
            </p>
            <p className={`${T.small} text-white/60 mt-3`}>
              Preço de tabela — a campanha não mexe no mensal
            </p>

            <ul className="mt-7 space-y-3">
              {MENSAL.map((it) => (
                <li key={it} className="flex items-start gap-3">
                  <Icon icon="solar:check-circle-outline" width={19} className="text-white/45 shrink-0 mt-[3px]" />
                  <span className={`${T.small} text-white/70`}>{it}</span>
                </li>
              ))}
            </ul>

            <CTAButton
              href={buildCheckoutUrl(CHECKOUT_MENSAL)}
              size="lg"
              trackId="black-precos-mensal"
              className="w-full mt-8 !bg-transparent !text-white border border-white/25 hover:!bg-white/[0.06]"
            >
              Assinar mensal
            </CTAButton>
          </div>
        </Reveal>
      </div>

      <Reveal delay={200}>
        <p className={`${T.small} text-white/60 text-center mt-8`}>
          7 dias de garantia nos dois planos. Se não for para você, devolvemos.
        </p>
      </Reveal>
    </div>
  </section>
);

export default Precos;
