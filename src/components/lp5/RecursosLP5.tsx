import { Icon } from '@iconify/react';
import { T, Reveal, Badge, SecondaryButton } from './ui';

type Card = {
  icon: string; titulo: string; corpo: React.ReactNode;
  span?: string; destaque?: boolean; img?: string; alt?: string; placeholder?: string;
};

const CARDS: Card[] = [
  {
    icon: 'solar:calculator-linear', span: 'lg:col-span-2', destaque: true,
    titulo: 'Saber o preço certo de cada peça — sem abrir planilha',
    corpo: <>Informe os materiais, o tempo de produção e os custos fixos. O PreciArte calcula o custo real, a margem e o preço de cada pedido. <strong className="font-semibold text-white">Sem fórmula. Sem achismo.</strong></>,
  },
  {
    icon: 'solar:document-text-linear',
    titulo: 'Mandar orçamento que o cliente responde',
    corpo: <>PDF com a sua logo, os itens, o prazo e a chave Pix. Gerado em 1 clique, enviado pelo WhatsApp em segundos. <strong className="font-semibold text-lp5n-900">Menos "vou pensar". Mais "pode confirmar".</strong></>,
  },
  {
    icon: 'solar:box-linear',
    titulo: 'Saber quanto cada material custa dentro de cada peça',
    corpo: <>Cada insumo cadastrado com custo por unidade. O sistema calcula sozinho quanto vai em cada produto — e <strong className="font-semibold text-lp5n-900">mostra o custo real de cada peça que sai da sua mão</strong>.</>,
  },
  {
    icon: 'solar:wallet-money-linear',
    titulo: 'Fechar o mês sabendo se você lucrou',
    corpo: <>Receitas, despesas e lucro separados do seu dinheiro pessoal. <strong className="font-semibold text-lp5n-900">O pedido marcado como pago entra no financeiro sozinho.</strong></>,
  },
  {
    icon: 'solar:shop-linear',
    titulo: 'Ter uma vitrine com link seu, pra colar na bio',
    corpo: <>Catálogo online com endereço próprio, banners e botão que abre a conversa no seu WhatsApp. <strong className="font-semibold text-lp5n-900">Sem site, sem agência, sem custo extra.</strong></>,
    placeholder: 'img-recurso-catalogo',
  },
  {
    icon: 'solar:magic-stick-3-linear',
    titulo: 'Transformar foto de celular em foto de catálogo',
    corpo: <>A IA troca o fundo e seu produto aparece idêntico, em um cenário limpo. <strong className="font-semibold text-lp5n-900">Sem estúdio, sem lençol branco, sem edição.</strong></>,
    placeholder: 'img-recurso-ia-antes-depois',
  },
];

export default function RecursosLP5() {
  return (
    <section id="recursos" className="relative overflow-hidden bg-white py-[80px] lg:py-[130px]">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[520px] pointer-events-none"
           style={{ background: 'radial-gradient(closest-side, rgba(246,106,147,0.14), transparent 72%)', filter: 'blur(40px)' }} />

      <div className="relative max-w-lp5-container mx-auto px-5 lg:px-[80px]">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-[640px]">
              <Badge icon="solar:widget-linear">Recursos</Badge>
              <h2 className={`${T.h2} uppercase text-lp5n-900 mt-5`}>Tudo que seu negócio precisa, no mesmo lugar</h2>
              <p className={`${T.body} text-lp5n-700 mt-4 max-w-[62ch]`}>
                Não são funcionalidades soltas. É a mesma informação percorrendo o caminho inteiro: do custo até o dinheiro na conta.
              </p>
            </div>
            <SecondaryButton href="#precos" external={false} className="w-full lg:w-auto shrink-0" trackId="lp5-recursos">
              QUERO SABER MEU PREÇO CERTO
            </SecondaryButton>
          </div>
        </Reveal>

        {/* bento: o primeiro card ocupa duas colunas e é escuro */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mt-12 lg:mt-16">
          {CARDS.map((c, i) => (
            <Reveal key={c.titulo} delay={i * 90} className={c.span ?? ''}>
              <div
                className={`relative h-full rounded-[24px] overflow-hidden p-7 lg:p-9 transition-transform duration-[260ms] hover:-translate-y-1.5 ${c.destaque ? '' : 'bg-white'}`}
                style={
                  c.destaque
                    ? { background: 'radial-gradient(130% 130% at 8% 0%, #6B1230 0%, #3E0A1B 48%, #22050F 100%)', boxShadow: '0 40px 90px -34px rgba(33,31,28,0.55)' }
                    : { border: '1px solid #EDEBE8', boxShadow: '0 18px 44px -22px rgba(33,31,28,0.20)' }
                }
              >
                {c.destaque && (
                  <>
                    <div className="absolute -right-16 -top-16 w-[300px] h-[300px] rounded-full border border-white/[0.07]" />
                    <div className="absolute -left-20 bottom-[-90px] w-[280px] h-[280px] rounded-full pointer-events-none"
                         style={{ background: 'radial-gradient(closest-side, rgba(246,106,147,0.30), transparent 70%)', filter: 'blur(28px)' }} />
                  </>
                )}

                <span
                  className="relative inline-flex w-[54px] h-[54px] items-center justify-center rounded-[18px]"
                  style={
                    c.destaque
                      ? { background: 'linear-gradient(150deg, rgba(255,255,255,0.20), rgba(255,255,255,0.05))', border: '1px solid rgba(255,255,255,0.22)', color: '#FFFFFF' }
                      : { background: 'linear-gradient(150deg, #972142, #CE2252)', color: '#FFFFFF', boxShadow: '0 12px 26px -10px rgba(206,34,82,0.55)' }
                  }
                >
                  <Icon icon={c.icon} width={24} />
                </span>

                <h3 className={`${T.h3} uppercase mt-5 relative ${c.destaque ? 'text-white' : 'text-lp5n-900'}`}>{c.titulo}</h3>
                <p className={`${T.body} mt-3 relative ${c.destaque ? 'text-white/[0.76]' : 'text-lp5n-700'}`}>{c.corpo}</p>

                {c.placeholder && (
                  <div className="mt-6 w-full aspect-[16/10] rounded-[14px] flex items-center justify-center"
                       style={{ border: '2px dashed #DDD9D5', background: '#F6F5F3' }}>
                    <span className={`${T.caption} text-lp5n-500 text-center px-3`}>{c.placeholder}</span>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* barra de fechamento */}
        <Reveal>
          <div className="relative mt-14 lg:mt-20 rounded-[24px] overflow-hidden p-8 lg:p-12"
               style={{ background: 'linear-gradient(120deg, #FDE3EC 0%, #FDF1F6 55%, #FFFFFF 100%)', border: '1px solid #FCC5D7' }}>
            <div className="absolute -right-16 -bottom-24 w-[320px] h-[320px] rounded-full pointer-events-none"
                 style={{ background: 'radial-gradient(closest-side, rgba(246,106,147,0.30), transparent 70%)', filter: 'blur(30px)' }} />
            <div className="relative max-w-[64ch]">
              <h3 className={`${T.h3} uppercase text-lp5n-900`}>E nada disso pede que você mude seu jeito de vender</h3>
              <p className={`${T.body} text-lp5n-700 mt-4`}>
                O orçamento sai em PDF e vai <strong className="font-semibold text-lp5-700">direto pro WhatsApp</strong>, do jeito que você já manda tudo.
                O catálogo tem um link pra <strong className="font-semibold text-lp5-700">colar na bio do Instagram</strong>. Quem abre, clica e cai na conversa com você.
                E funciona no celular, feito pra ser usado no celular.
              </p>
              <p className={`${T.body} italic text-lp5n-600 mt-4`}>
                Você não precisa mudar como vende. Precisa mudar o que você manda.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
