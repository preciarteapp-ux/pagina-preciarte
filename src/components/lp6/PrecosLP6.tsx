import { Icon } from '@iconify/react';
import { buildCheckoutUrl } from '@/lib/checkout';
import { T, Reveal, CTAButton, SecondaryButton, ArcDecor } from './ui';

/**
 * DOBRA 8 — Planos
 *
 * ATENÇÃO — CONFERIR ANTES DE PUBLICAR:
 * Estes links vieram do app (src/pages/Planos.tsx do rosa-precifica-facil),
 * onde os valores batem com a copy: mensal R$ 39,90 e anual R$ 119,90.
 * A LP5 usa outro par de links (Lastlink CBB8498E8 + Hotmart ?off=rns56vc4),
 * que pode corresponder a outra oferta. Se a oferta vigente for a da LP5,
 * troque as duas constantes abaixo E os valores da copy — os dois precisam
 * contar a mesma história.
 */
export const CHECKOUT_MENSAL = 'https://pay.hotmart.com/X105144057Q';
export const CHECKOUT_ANUAL = 'https://lastlink.com/p/CBAB11667/checkout-payment';

const ITENS_MENSAL = [
  'Acesso completo aos treze módulos',
  'Catálogo público, pedidos e financeiro',
  'Suporte por WhatsApp',
  'Sem fidelidade, cancele quando quiser',
];

const PrecosLP6 = () => (
  <section id="planos" className="relative overflow-hidden bg-lp6-50 py-[72px] lg:py-[120px]">
    <ArcDecor radii={[700]} color="rgba(194,24,91,0.07)" top="100%" left="0%" />

    <div className="relative max-w-lp6-tight mx-auto px-6 lg:px-10">
      <Reveal className="text-center">
        <h2 className={`${T.h2} uppercase text-lp6-text`}>Planos</h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-5 lg:gap-6 mt-10 lg:mt-14 items-start">
        {/* ANUAL — primeiro no mobile: em coluna única a ordem define o padrão */}
        <Reveal delay={120} className="order-1 md:order-2">
          <div className="relative h-full bg-white border-2 border-lp6-600 rounded-[20px] p-8 lg:p-10 md:-translate-y-3 shadow-[0_20px_44px_rgba(194,24,91,0.14)]">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-[6px] h-[30px] px-[18px] rounded-full bg-lp6-600 text-white whitespace-nowrap">
              <Icon icon="solar:crown-minimalistic-bold" width={14} />
              <span className={T.caption}>Mais escolhido</span>
            </span>

            <h3 className="font-lp6 font-semibold text-[22px] text-lp6-text mt-2">Plano Anual</h3>
            <div className="mt-3">
              <span className="font-lp6 font-bold text-[36px] lg:text-[48px] tracking-[-0.02em] text-lp6-text">
                R$ 119,90
              </span>
              <span className={`${T.small} text-lp6-muted block mt-1`}>
                por ano, ou <strong className="font-semibold text-lp6-600">12x de R$ 11,97</strong>
              </span>
            </div>
            <p className={`${T.small} text-lp6-muted mt-4`}>
              Para quem já decidiu que vai organizar o preço de vez
            </p>

            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-2">
                <Icon icon="solar:check-circle-outline" width={20} className="text-lp6-600 shrink-0 mt-[2px]" />
                <span className={`${T.small} text-lp6-text`}>Tudo do plano mensal</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="solar:check-circle-outline" width={20} className="text-lp6-600 shrink-0 mt-[2px]" />
                <span className={`${T.small} text-lp6-text`}>
                  <strong className="font-semibold">Economia de 71%</strong> em relação ao mensal
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="solar:check-circle-outline" width={20} className="text-lp6-600 shrink-0 mt-[2px]" />
                <span className={`${T.small} text-lp6-text`}>Edição de imagens com IA</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="solar:check-circle-outline" width={20} className="text-lp6-600 shrink-0 mt-[2px]" />
                <span className={`${T.small} text-lp6-text`}>Suporte prioritário</span>
              </li>
            </ul>

            <CTAButton
              href={buildCheckoutUrl(CHECKOUT_ANUAL)}
              className="w-full mt-8"
              trackId="lp6-checkout-anual"
            >
              ASSINAR ANUAL
            </CTAButton>
          </div>
        </Reveal>

        {/* MENSAL */}
        <Reveal className="order-2 md:order-1">
          <div className="h-full bg-white border border-lp6-line rounded-[20px] p-8 lg:p-10">
            <h3 className="font-lp6 font-semibold text-[22px] text-lp6-text">Plano Mensal</h3>
            <div className="mt-3">
              <span className="font-lp6 font-bold text-[36px] lg:text-[48px] tracking-[-0.02em] text-lp6-text">
                R$ 39,90
              </span>
              <span className={`${T.small} text-lp6-muted block mt-1`}>por mês</span>
            </div>
            <p className={`${T.small} text-lp6-muted mt-4`}>
              Para quem quer testar sem compromisso de prazo
            </p>

            <ul className="mt-6 space-y-3">
              {ITENS_MENSAL.map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <Icon icon="solar:check-circle-outline" width={20} className="text-lp6-600 shrink-0 mt-[2px]" />
                  <span className={`${T.small} text-lp6-text`}>{it}</span>
                </li>
              ))}
            </ul>

            <SecondaryButton
              href={buildCheckoutUrl(CHECKOUT_MENSAL)}
              className="w-full mt-8"
              trackId="lp6-checkout-mensal"
            >
              ASSINAR MENSAL
            </SecondaryButton>
          </div>
        </Reveal>
      </div>

      <Reveal delay={90} className="text-center">
        <p className={`${T.body} text-lp6-muted max-w-[64ch] mx-auto mt-10`}>
          Menos de <strong className="font-semibold text-lp6-text">R$ 10 por mês</strong> no plano
          anual.{' '}
          <em>
            Um único produto com preço R$ 4 abaixo do certo, vendido quinze vezes, já custou mais que
            um ano inteiro de sistema.
          </em>
        </p>
        <p className={`${T.small} text-lp6-muted mt-4`}>
          Você tem <strong className="font-semibold text-lp6-text">7 dias para pedir reembolso</strong>.
          Sem usar os créditos de IA, a devolução é integral.
        </p>
      </Reveal>
    </div>
  </section>
);

export default PrecosLP6;
