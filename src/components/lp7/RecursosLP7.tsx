import { T, Reveal, Badge, Chip } from './ui';

/**
 * DOBRA 3 — Seção creme com blocos alternados
 *
 * Estrutura da referência: fundo creme, cartões brancos de canto muito
 * arredondado, badge em gradiente, título curto, parágrafo e uma lista
 * de chips com check. Ao lado, o produto num cartão próprio.
 *
 * As telas são as nossas, geradas em mockups/ a partir do código do app.
 */

const BLOCOS = [
  {
    badge: 'Custo real',
    icone: 'solar:box-minimalistic-outline',
    titulo: 'Cadastre do jeito que você compra.',
    texto:
      'Você compra em resma e usa em folha. Compra em rolo e usa em centímetro. O sistema faz a conversão e guarda quanto custa cada unidade que você realmente consome.',
    chips: ['Resma, rolo, galão, metro, caixa', 'O preço por folha aparece na hora', 'Mudou o fornecedor, muda em um lugar só'],
    img: '/lp6/passo-01-material-conversao.png',
    alt: 'Tela de cadastro de material do PreciArte mostrando a conversão de resma para folha',
  },
  {
    badge: 'Composição',
    icone: 'solar:calculator-outline',
    titulo: 'O custo aparece completo, não pela metade.',
    texto:
      'Material, impressão, a sua mão de obra pelo valor real da hora e as taxas. As quatro parcelas que a regra de multiplicar por três deixa de fora.',
    chips: ['Sua hora já inclui os custos fixos', 'Tempo em horas, minutos e segundos', 'Taxa de marketplace e embalagem entram'],
    img: '/lp6/passo-02-item-composicao.png',
    alt: 'Tela do PreciArte com a composição de custo de um item: impressão, materiais, mão de obra e taxas',
  },
  {
    badge: 'Decisão',
    icone: 'solar:chart-2-outline',
    titulo: 'A margem colorida diz o que fazer.',
    texto:
      'Verde acima de 60%, amarelo acima de 40%, vermelho abaixo. O sistema não decide o seu preço: mostra o que ele está fazendo com o seu lucro.',
    chips: ['Preço sugerido ao lado do seu preço', 'Você sabe onde é o piso antes de dar desconto', 'Lucro em reais, não só em porcentagem'],
    img: '/lp6/passo-03-margem-colorida.png',
    alt: 'Tela do PreciArte com a margem em vermelho ao lado do preço sugerido e do preço definido',
  },
];

const RecursosLP7 = () => (
  <section id="como-funciona" className="bg-lp7-cream py-[72px] lg:py-[130px]">
    <div className="max-w-lp7-container mx-auto px-5 lg:px-8">
      <Reveal className="text-center">
        <Badge tone="light">Como funciona</Badge>
        <h2 className={`${T.h2} text-lp7-text mt-6 max-w-[20ch] mx-auto`}>
          Uma tarde para configurar. Depois, dois minutos por orçamento.
        </h2>
      </Reveal>

      <div className="space-y-5 lg:space-y-6 mt-12 lg:mt-16">
        {BLOCOS.map((b, i) => (
          <Reveal key={b.titulo} delay={i * 60}>
            <div className={`grid lg:grid-cols-2 gap-5 lg:gap-6 ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              {/* cartão de texto */}
              <div className="bg-white rounded-[28px] p-8 lg:p-12 flex flex-col justify-center">
                <Badge tone="grad" icon={b.icone} className="self-start">{b.badge}</Badge>
                <h3 className={`${T.h2} !text-[26px] lg:!text-[34px] text-lp7-text mt-5 max-w-[18ch]`}>{b.titulo}</h3>
                <p className={`${T.body} text-lp7-muted mt-4 max-w-[46ch]`}>{b.texto}</p>
                <div className="flex flex-col items-start gap-[10px] mt-7">
                  {b.chips.map((c) => <Chip key={c}>{c}</Chip>)}
                </div>
              </div>

              {/* cartão da tela do produto */}
              <div className="bg-white rounded-[28px] p-6 lg:p-10 flex items-center justify-center">
                <img
                  src={b.img}
                  alt={b.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full max-w-[330px] rounded-[20px] shadow-[0_24px_60px_-24px_rgba(20,18,26,0.30)]"
                />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default RecursosLP7;
