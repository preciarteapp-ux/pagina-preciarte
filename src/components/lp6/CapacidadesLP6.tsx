import { T, Reveal, Badge, IconCircle, ArcDecor, ImgSlot } from './ui';

/**
 * DOBRA 5 — O que você passa a conseguir fazer
 *
 * Justifica o preço da assinatura, não o valor da conta.
 * No mobile os cards COM imagem vêm primeiro (order-1..3): é a imagem
 * que segura o scroll. Os de texto vêm depois.
 */

type Card = {
  icon: string;
  titulo: string;
  corpo: React.ReactNode;
  img?: string;
  alt?: string;
  ordemMobile: number;
};

const CARDS: Card[] = [
  {
    icon: 'solar:tag-price-outline',
    titulo: 'Sabe o preço mínimo de cada produto, sem refazer conta',
    corpo: 'Cadastra o material uma vez. Quando o fornecedor aumentar, você muda em um lugar e todos os preços se corrigem.',
    ordemMobile: 4,
  },
  {
    icon: 'solar:document-text-outline',
    titulo: 'Manda proposta em PDF com a sua logo, não um número solto no WhatsApp',
    corpo: 'Documento numerado, com sua marca, sua chave PIX, prazo, condição de pagamento e itens discriminados. Sai do sistema direto para a conversa, em um toque.',
    img: 'capacidade-proposta-pdf.png',
    alt: 'proposta com logo, numeração e PIX',
    ordemMobile: 1,
  },
  {
    icon: 'solar:camera-outline',
    titulo: 'Transforma a foto do celular em foto de catálogo',
    corpo: (
      <>
        Você envia a foto como ela está, na mesa, com a luz que tem. Volta uma imagem{' '}
        <strong className="font-semibold text-lp6-text">em pé, com fundo limpo</strong>, pronta para o
        Instagram e para o catálogo.
      </>
    ),
    img: 'capacidade-foto-antes-depois.png',
    alt: 'antes e depois',
    ordemMobile: 2,
  },
  {
    icon: 'solar:shop-outline',
    titulo: 'Tem um link de catálogo próprio para mandar no lugar de 14 fotos soltas',
    corpo: 'Com as suas cores, suas categorias, preço no PIX, parcelamento e botão de WhatsApp em cada produto.',
    img: 'capacidade-catalogo-publico.png',
    alt: 'catálogo público com grid de produtos',
    ordemMobile: 3,
  },
  {
    icon: 'solar:hand-money-outline',
    titulo: 'Sabe quem te deve e quanto entra este mês',
    corpo: 'Venda parcelada não vira receita no dia da venda. Fica em contas a receber, com data, e só entra quando você confirmar que recebeu.',
    ordemMobile: 5,
  },
  {
    icon: 'solar:box-outline',
    titulo: 'Dá baixa no estoque sozinho quando o pedido sai',
    corpo: (
      <>
        Como você já disse quais materiais entram em cada produto, o sistema desconta na entrega. Você
        não faz controle de estoque, você{' '}
        <strong className="font-semibold text-lp6-text">ganha ele de brinde</strong>.
      </>
    ),
    ordemMobile: 6,
  },
];

const ORDER_MOBILE = ['order-1', 'order-2', 'order-3', 'order-4', 'order-5', 'order-6'];

const CapacidadesLP6 = () => (
  <section className="relative overflow-hidden bg-lp6-50 py-[72px] lg:py-[120px]">
    <ArcDecor radii={[800]} color="rgba(194,24,91,0.07)" top="0%" left="100%" />

    <div className="relative max-w-lp6-container mx-auto px-6 lg:px-10">
      <Reveal>
        <Badge>O sistema</Badge>
        <h2 className={`${T.h2} uppercase text-lp6-text mt-5 max-w-[20ch]`}>
          Não é uma calculadora.
          <br />É onde o seu negócio acontece.
        </h2>
        <p className={`${T.body} text-lp6-muted mt-4`}>
          Treze áreas dentro do mesmo sistema, todas conversando entre si.
        </p>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 lg:mt-14">
        {CARDS.map((c, i) => (
          <Reveal
            key={c.titulo}
            delay={i * 70}
            className={`${ORDER_MOBILE[c.ordemMobile - 1]} lg:order-none`}
          >
            <div className="group h-full bg-white border border-lp6-line rounded-[20px] p-7 shadow-[0_2px_8px_rgba(24,8,16,0.04)] transition-all duration-[240ms] hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(24,8,16,0.10)]">
              <IconCircle icon={c.icon} />
              <h3 className={`${T.h3} text-lp6-text mt-4`}>{c.titulo}</h3>
              <p className={`${T.small} text-lp6-muted mt-3`}>{c.corpo}</p>
              {c.img && <ImgSlot name={c.img} ratio="4/3" tone="light" label={c.alt} className="mt-6" />}
            </div>
          </Reveal>
        ))}
      </div>

      {/* fecho — funciona onde você já vende */}
      <div className="grid lg:grid-cols-[54fr_42fr] gap-10 lg:gap-16 items-center mt-16 lg:mt-20">
        <Reveal>
          <h3 className="font-lp6 font-bold text-[24px] lg:text-[34px] tracking-[-0.02em] leading-[1.15] uppercase text-lp6-text max-w-[20ch]">
            Você não precisa trocar o seu WhatsApp por um sistema
          </h3>
          <p className={`${T.body} text-lp6-muted mt-5 max-w-[62ch]`}>
            Todo sistema de gestão pede que você mude o jeito de trabalhar. Este não pede.
          </p>
          <p className={`${T.body} text-lp6-muted mt-4 max-w-[62ch]`}>
            Você continua vendendo por WhatsApp e por Instagram, conversando com o cliente, combinando
            o prazo. A proposta vai para a conversa pela tela de compartilhar do próprio celular, o
            link do catálogo abre com imagem e título em vez de link cru, e sua chave PIX já vai
            impressa no documento.
          </p>
          <p className="font-lp6 font-semibold italic text-[19px] lg:text-[20px] text-lp6-text mt-6 max-w-[40ch]">
            Não é para trocar o seu canal. É para o seu canal parar de parecer amador.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mx-auto w-[78%] lg:w-full lp6-float">
            <ImgSlot
              name="whatsapp-proposta-preview.png"
              ratio="4/5"
              tone="rose"
              className="!rounded-[28px] shadow-[0_30px_60px_rgba(24,8,16,0.14)]"
              label="PDF anexado + link com preview"
            />
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default CapacidadesLP6;
