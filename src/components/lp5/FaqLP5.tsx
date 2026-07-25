import { useState } from 'react';
import { Icon } from '@iconify/react';
import { T, Reveal, Badge, IconCircle } from './ui';

const PERGUNTAS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'Vou ter que cadastrar tudo antes de conseguir usar?',
    a: <>Não. Você começa com três números — quantas horas trabalha por dia, quantos dias por semana e quanto quer ganhar por mês — e <strong className="font-semibold text-lp5n-900">já descobre o valor da sua hora no primeiro acesso</strong>. Os materiais e produtos você cadastra no seu ritmo, conforme for orçando. A maioria cadastra os 5 ou 6 materiais que mais usa e já consegue precificar quase tudo.</>,
  },
  {
    q: 'Não sou boa com sistema. Vou conseguir usar?',
    a: <>O PreciArte foi feito pra ser usado no celular, entre um pedido e outro. Não tem plano de contas, não tem centro de custo, não tem termo de contador. Os campos são os que você já usa todo dia: material, tempo de produção, meu preço, cliente, orçamento. E não existe botão de salvar — <strong className="font-semibold text-lp5n-900">o sistema salva sozinho</strong> enquanto você digita.</>,
  },
  {
    q: 'Eu já tenho minha planilha. Vale a pena trocar?',
    a: <>Sua planilha calcula. Ela não faz três coisas: quando o preço de um material sobe, ela não corrige os outros produtos sozinha; ela não vira um PDF com a sua logo pra mandar no WhatsApp; e ela não fecha o seu mês. A pergunta que vale fazer é outra: <strong className="font-semibold text-lp5n-900">quando foi a última vez que você atualizou os custos ali?</strong> Se faz mais de dois meses, os preços que você mandou desde então saíram de uma conta velha.</>,
  },
  {
    q: 'E se eu descobrir que estou cobrando errado e não puder mudar?',
    a: <>Você pode. E vai descobrir que dá menos medo do que parece — foi o que aconteceu com a Ana Paula, que reajustou os preços achando que perderia clientes e não perdeu nenhum. A diferença é que <strong className="font-semibold text-lp5n-900">você passa a ter a conta pra mostrar</strong>. Cliente aceita preço explicado. O que ele não aceita é preço que parece inventado na hora.</>,
  },
  {
    q: 'Meu negócio é pequeno. Isso não é coisa de empresa grande?',
    a: <>É o contrário. Empresa grande sobrevive a seis meses de margem errada porque tem volume e caixa. Quem produz sozinha, não. Um erro de três reais por peça faz muito mais estrago no seu negócio do que no de uma fábrica. <strong className="font-semibold text-lp5n-900">Se você vende o que faz, você já tem uma empresa</strong> — a questão é se ela tem números.</>,
  },
  {
    q: 'Como funciona a cobrança? Tem fidelidade?',
    a: <>No plano mensal você cancela quando quiser, sem multa e sem fidelidade. No anual você paga uma vez e tem acesso por 12 meses. Todos os planos têm <strong className="font-semibold text-lp5n-900">7 dias de garantia incondicional</strong> — o pedido de reembolso é feito por você mesma, dentro do sistema.</>,
  },
  {
    q: 'Meus dados de cliente ficam seguros?',
    a: <>Sim. Cada conta é isolada das outras: <strong className="font-semibold text-lp5n-900">só você acessa os seus clientes, os seus preços e o seu financeiro</strong>. Nenhuma outra criadora vê nada seu.</>,
  },
  {
    q: 'Tem suporte? Falo com gente de verdade?',
    a: <>Sim, pelo WhatsApp, em português, com gente que conhece o produto.</>,
  },
];

function CardAjuda() {
  return (
    <div className="rounded-[20px] bg-white border border-lp5n-200 p-6">
      <IconCircle icon="solar:chat-round-line-linear" variant="soft" />
      <h3 className={`${T.h3} text-lp5n-900 mt-4`}>Ainda com dúvida?</h3>
      <p className={`${T.small} text-lp5n-700 mt-2`}>Fala com a gente pelo WhatsApp.</p>
      <a
        href="https://wa.me/5511999999999"
        target="_blank" rel="noopener noreferrer"
        data-track-id="lp5-faq-whatsapp"
        className={`${T.small} inline-flex items-center min-h-[44px] mt-1 font-semibold text-lp5-700 underline underline-offset-4`}
      >
        Falar no WhatsApp
      </a>
    </div>
  );
}

export default function FaqLP5() {
  const [aberta, setAberta] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-lp5n-100 py-[72px] lg:py-[120px]">
      {/* símbolo da logo em marca d'água */}
      <img
        src="/lp5/logo-preciarte-simbolo.png" alt="" aria-hidden="true" loading="lazy"
        className="hidden lg:block absolute -left-20 top-[15%] w-[420px] opacity-[0.35] pointer-events-none select-none"
        style={{ filter: 'grayscale(1) brightness(1.9) sepia(1) hue-rotate(295deg) saturate(2)' }}
      />

      <div className="relative max-w-lp5-container mx-auto px-5 lg:px-[120px]">
        <div className="grid lg:grid-cols-[38fr_62fr] gap-10 lg:gap-[80px]">
          <div>
            <Reveal>
              <Badge icon="solar:question-circle-linear">Dúvidas</Badge>
              <h2 className={`${T.h2} uppercase text-lp5n-900 mt-5`}>O que as criadoras perguntam antes de assinar</h2>
              <p className={`${T.body} text-lp5n-700 mt-4`}>As dúvidas mais comuns de quem está decidindo.</p>
              <div className="hidden lg:block mt-8"><CardAjuda /></div>
            </Reveal>
          </div>

          <div>
            {PERGUNTAS.map((p, i) => {
              const on = aberta === i;
              return (
                <Reveal key={p.q} delay={i * 80}>
                  <div className="rounded-[16px] bg-white border border-lp5n-200 mb-3 overflow-hidden">
                    <button
                      onClick={() => setAberta(on ? null : i)}
                      aria-expanded={on}
                      aria-controls={`faq-p-${i}`}
                      className="w-full flex items-center justify-between gap-4 p-6 text-left"
                    >
                      <span className={`${T.h3} text-lp5n-900`}>{p.q}</span>
                      <span className={`inline-flex w-9 h-9 shrink-0 items-center justify-center rounded-full bg-lp5-700 text-white transition-transform duration-[320ms] ${on ? 'rotate-180' : ''}`}>
                        <Icon icon="solar:alt-arrow-down-linear" width={18} />
                      </span>
                    </button>
                    {/* grid-template-rows 0fr→1fr: anima altura real, sem max-height mágico */}
                    <div
                      id={`faq-p-${i}`} role="region" aria-labelledby={`faq-b-${i}`}
                      className="grid transition-[grid-template-rows,opacity] duration-[320ms] ease-out"
                      style={{ gridTemplateRows: on ? '1fr' : '0fr', opacity: on ? 1 : 0 }}
                    >
                      <div className="overflow-hidden">
                        <p className={`${T.body} text-lp5n-700 px-6 pb-6 max-w-[65ch]`}>{p.a}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
            <div className="lg:hidden mt-6"><CardAjuda /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
