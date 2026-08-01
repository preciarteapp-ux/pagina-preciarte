import { Icon } from '@iconify/react';
import { buildCheckoutUrl } from '@/lib/checkout';
import { CHECKOUT_ANUAL, CHECKOUT_MENSAL } from '@/components/lp6/PrecosLP6';
import { T, Reveal, Badge, CTAButton } from './ui';

/**
 * DOBRA 4 — Planos
 *
 * Reaproveita as constantes de checkout da LP6 para não haver dois pares
 * de links divergindo com o tempo. Valores conferidos com o app.
 */

const MENSAL = [
  'Acesso completo às treze áreas',
  'Catálogo público, pedidos e financeiro',
  'Suporte por WhatsApp',
  'Sem fidelidade, cancele quando quiser',
];
const ANUAL = [
  'Tudo do plano mensal',
  'Economia de 71% em relação ao mensal',
  'Edição de imagens com IA',
  'Suporte prioritário',
];

const PrecosLP7 = () => (
  <section id="planos" className="bg-lp7-cream pb-[72px] lg:pb-[130px]">
    <div className="max-w-lp7-narrow mx-auto px-5 lg:px-8">
      <Reveal className="text-center">
        <Badge tone="light">Planos</Badge>
        <h2 className={`${T.h2} text-lp7-text mt-6 max-w-[16ch] mx-auto`}>
          Menos de dez reais por mês no anual.
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-5 mt-12 items-start">
        {/* ANUAL primeiro no mobile: a ordem define o padrão em coluna única */}
        <Reveal delay={90} className="order-1 md:order-2">
          <div className="relative bg-lp7-ink rounded-[28px] p-8 lg:p-10 overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-24 w-[300px] h-[300px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(195,131,236,.28) 0%, transparent 70%)' }}
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 h-[30px] px-4 rounded-full bg-gradient-to-r from-lp7-violet to-lp7-pink text-white">
                <Icon icon="solar:crown-minimalistic-bold" width={13} />
                <span className={T.cap}>Mais escolhido</span>
              </span>
              <h3 className={`${T.h3} text-white mt-5`}>Plano Anual</h3>
              <p className="font-lp7 font-semibold text-[42px] lg:text-[52px] tracking-[-0.03em] text-white mt-2">R$ 197,00</p>
              <p className={`${T.small} text-white/55`}>por ano, ou 12x de R$ 20,98</p>

              <ul className="mt-7 space-y-3">
                {ANUAL.map((it) => (
                  <li key={it} className="flex items-start gap-3">
                    <Icon icon="solar:check-circle-bold" width={19} className="text-lp7-violet shrink-0 mt-[3px]" />
                    <span className={`${T.small} text-white/80`}>{it}</span>
                  </li>
                ))}
              </ul>

              <CTAButton href={buildCheckoutUrl(CHECKOUT_ANUAL)} tone="dark" size="lg" trackId="lp7-checkout-anual" className="w-full mt-8">
                Assinar anual
              </CTAButton>
            </div>
          </div>
        </Reveal>

        <Reveal className="order-2 md:order-1">
          <div className="bg-white rounded-[28px] p-8 lg:p-10">
            <h3 className={`${T.h3} text-lp7-text`}>Plano Mensal</h3>
            <p className="font-lp7 font-semibold text-[42px] lg:text-[52px] tracking-[-0.03em] text-lp7-text mt-2">R$ 39,90</p>
            <p className={`${T.small} text-lp7-muted`}>por mês</p>

            <ul className="mt-7 space-y-3">
              {MENSAL.map((it) => (
                <li key={it} className="flex items-start gap-3">
                  <Icon icon="solar:check-circle-bold" width={19} className="text-lp7-pink shrink-0 mt-[3px]" />
                  <span className={`${T.small} text-lp7-text`}>{it}</span>
                </li>
              ))}
            </ul>

            <CTAButton href={buildCheckoutUrl(CHECKOUT_MENSAL)} size="lg" trackId="lp7-checkout-mensal" className="w-full mt-8">
              Assinar mensal
            </CTAButton>
          </div>
        </Reveal>
      </div>

      <Reveal delay={60}>
        <p className={`${T.small} text-lp7-muted text-center mt-8`}>
          Você tem 7 dias para pedir reembolso. Sem usar os créditos de IA, a devolução é integral.
        </p>
      </Reveal>
    </div>
  </section>
);

export default PrecosLP7;
