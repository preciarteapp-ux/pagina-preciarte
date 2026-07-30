import { ReactNode } from 'react';
import { T, Reveal, Badge, Chip } from './ui';
import { Celular } from './telas/base';
import TelaMaterial from './telas/TelaMaterial';
import TelaCusto from './telas/TelaCusto';
import TelaMargem from './telas/TelaMargem';
import TelaWhatsApp from './telas/TelaWhatsApp';

/**
 * DOBRA 3 — Seção creme com blocos alternados
 *
 * As telas do produto são componentes vivos, não imagem: os números
 * contam, o gráfico de custo enche, a margem muda de cor conforme o
 * preço desce e a conversa entra mensagem a mensagem.
 * Cada uma só anima quando entra na viewport.
 */

type Bloco = {
  badge: string; icone: string; titulo: string; texto: string;
  chips: string[]; tela: ReactNode;
};

const BLOCOS: Bloco[] = [
  {
    badge: 'Custo real',
    icone: 'solar:box-minimalistic-outline',
    titulo: 'Cadastre do jeito que você compra.',
    texto:
      'Você compra em resma e usa em folha. Compra em rolo e usa em centímetro. O sistema faz a conversão e guarda quanto custa cada unidade que você realmente consome.',
    chips: ['Resma, rolo, galão, metro, caixa', 'O preço por folha aparece na hora', 'Mudou o fornecedor, muda em um lugar só'],
    tela: <TelaMaterial />,
  },
  {
    badge: 'Composição',
    icone: 'solar:calculator-outline',
    titulo: 'O custo aparece completo, não pela metade.',
    texto:
      'Material, impressão, a sua mão de obra pelo valor real da hora e as taxas. As quatro parcelas que a regra de multiplicar por três deixa de fora.',
    chips: ['Sua hora já inclui os custos fixos', 'Tempo em horas, minutos e segundos', 'Taxa de marketplace e embalagem entram'],
    tela: <TelaCusto />,
  },
  {
    badge: 'Decisão',
    icone: 'solar:chart-2-outline',
    titulo: 'A margem muda de cor enquanto você mexe no preço.',
    texto:
      'Verde acima de 60%, amarelo acima de 40%, vermelho abaixo. O sistema não decide o seu preço: mostra o que ele está fazendo com o seu lucro, antes de você responder o cliente.',
    chips: ['Preço sugerido ao lado do seu preço', 'Você sabe onde é o piso antes de dar desconto', 'Lucro em reais, não só em porcentagem'],
    tela: <TelaMargem />,
  },
  {
    badge: 'Na conversa',
    icone: 'solar:chat-round-line-outline',
    titulo: 'A proposta sai do sistema direto para o WhatsApp.',
    texto:
      'Um toque no botão Enviar e o PDF numerado, com a sua logo e a sua chave PIX, cai na conversa. O link do catálogo abre com imagem e título, não como link cru.',
    chips: ['Proposta em PDF com a sua marca', 'Catálogo abre com prévia na conversa', 'Você continua vendendo onde já vende'],
    tela: <TelaWhatsApp />,
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
              <div className="bg-white rounded-[28px] p-8 lg:p-12 flex flex-col justify-center">
                <Badge tone="grad" icon={b.icone} className="self-start">{b.badge}</Badge>
                <h3 className={`${T.h2} !text-[26px] lg:!text-[34px] text-lp7-text mt-5 max-w-[18ch]`}>{b.titulo}</h3>
                <p className={`${T.body} text-lp7-muted mt-4 max-w-[46ch]`}>{b.texto}</p>
                <div className="flex flex-col items-start gap-[10px] mt-7">
                  {b.chips.map((c) => <Chip key={c}>{c}</Chip>)}
                </div>
              </div>

              <div className="bg-white rounded-[28px] p-6 lg:p-10 flex items-center justify-center">
                <div className="w-full max-w-[300px]">
                  <Celular className="!shadow-[0_30px_70px_-28px_rgba(20,18,26,0.45)]">
                    {b.tela}
                  </Celular>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default RecursosLP7;
