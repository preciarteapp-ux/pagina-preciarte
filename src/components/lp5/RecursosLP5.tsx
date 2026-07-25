import { T, Reveal, Badge, IconCircle, SecondaryButton } from './ui';

const CARDS = [
  {
    icon: 'solar:calculator-linear',
    titulo: 'Saber o preço certo de cada peça — sem abrir planilha',
    corpo: <>Informe os materiais, o tempo de produção e os custos fixos. O PreciArte calcula o custo real, a margem e o preço de cada pedido. <strong className="font-semibold text-lp5n-900">Sem fórmula. Sem achismo.</strong></>,
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
    corpo: <>Receitas, despesas e lucro separados do seu dinheiro pessoal. <strong className="font-semibold text-lp5n-900">O pedido marcado como pago entra no financeiro sozinho.</strong> No fim do mês o número já está lá.</>,
  },
  {
    icon: 'solar:shop-linear',
    titulo: 'Ter uma vitrine com link seu, pra colar na bio',
    corpo: <>Catálogo online com endereço próprio, banners e botão que abre a conversa no seu WhatsApp. <strong className="font-semibold text-lp5n-900">Sem site, sem agência, sem custo extra.</strong></>,
    placeholder: 'img-recurso-catalogo.webp',
  },
  {
    icon: 'solar:magic-stick-3-linear',
    titulo: 'Transformar foto de celular em foto de catálogo',
    corpo: <>A IA troca o fundo e seu produto aparece idêntico, em um cenário limpo. <strong className="font-semibold text-lp5n-900">Sem estúdio, sem lençol branco, sem edição.</strong></>,
    placeholder: 'img-recurso-ia-antes-depois.webp',
  },
];

export default function RecursosLP5() {
  return (
    <section id="recursos" className="bg-white py-[72px] lg:py-[120px]">
      <div className="max-w-lp5-container mx-auto px-5 lg:px-[120px]">
        {/* header assimétrico */}
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-[640px]">
              <Badge icon="solar:widget-linear">Recursos</Badge>
              <h2 className={`${T.h2} uppercase text-lp5n-900 mt-5`}>Tudo que seu negócio precisa, no mesmo lugar</h2>
              <p className={`${T.body} text-lp5n-700 mt-4 max-w-[65ch]`}>
                Não são funcionalidades soltas. É a mesma informação percorrendo o caminho inteiro: do custo até o
                dinheiro na conta.
              </p>
            </div>
            <SecondaryButton href="#precos" external={false} className="w-full lg:w-auto shrink-0" trackId="lp5-recursos">
              QUERO SABER MEU PREÇO CERTO
            </SecondaryButton>
          </div>
        </Reveal>

        {/* grade de 6 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 lg:mt-16">
          {CARDS.map((c, i) => (
            <Reveal key={c.titulo} delay={i * 100}>
              <div className="h-full rounded-[20px] bg-white border border-lp5n-200 shadow-[0_4px_16px_-4px_rgba(33,31,28,0.10)] p-7 lg:p-8
                              transition-all duration-[240ms] hover:-translate-y-1 hover:shadow-[0_12px_32px_-8px_rgba(33,31,28,0.14)]">
                <IconCircle icon={c.icon} variant="solid" />
                <h3 className={`${T.h3} uppercase text-lp5n-900 mt-5`}>{c.titulo}</h3>
                <p className={`${T.body} text-lp5n-700 mt-3`}>{c.corpo}</p>
                {c.placeholder && (
                  <div className="mt-6 w-full aspect-[16/10] rounded-[12px] border-2 border-dashed border-lp5n-300 bg-lp5n-100 flex items-center justify-center">
                    <span className={`${T.caption} text-lp5n-500 text-center px-3`}>{c.placeholder}</span>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* barra de fechamento */}
        <Reveal>
          <div className="mt-14 lg:mt-20 rounded-[20px] bg-lp5-100 p-8 lg:p-10">
            <h3 className={`${T.h3} uppercase text-lp5n-900`}>E nada disso pede que você mude seu jeito de vender</h3>
            <p className={`${T.body} text-lp5n-700 mt-4 max-w-[65ch]`}>
              O orçamento sai em PDF e vai <strong className="font-semibold text-lp5-700">direto pro WhatsApp</strong>, do jeito
              que você já manda tudo. O catálogo tem um link pra{' '}
              <strong className="font-semibold text-lp5-700">colar na bio do Instagram</strong>. Quem abre, clica e cai na
              conversa com você. E funciona no celular, feito pra ser usado no celular.
            </p>
            <p className={`${T.body} italic text-lp5n-600 mt-4`}>
              Você não precisa mudar como vende. Precisa mudar o que você manda.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
