import { T, Reveal, Badge, G } from '../ui';
import { BlocosAlternados, type Bloco } from './Blocos';
import TelaMaterial from '../telas/TelaMaterial';
import TelaCusto from '../telas/TelaCusto';
import TelaMargem from '../telas/TelaMargem';
import TelaWhatsApp from '../telas/TelaWhatsApp';

/** SEÇÃO — do custo até a proposta na mão do cliente. */
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

const Recursos = () => (
  <section id="como-funciona" className="bg-bf-bone pt-[72px] lg:pt-[130px] pb-[36px] lg:pb-[60px]">
    <div className="max-w-bf-container mx-auto px-5 lg:px-8">
      <Reveal className="text-center">
        <Badge tone="light">Parte 1 · O preço</Badge>
        <h2 className={`${T.h2} text-bf-text mt-6 max-w-[19ch] mx-auto`}>
          Do custo real até a proposta na mão do cliente.
        </h2>
      </Reveal>
      <BlocosAlternados blocos={BLOCOS} />
    </div>
  </section>
);

export default Recursos;
