import { Icon } from '@iconify/react';
import { T, Reveal, Badge } from './ui';

/** DOBRA 5 — Dúvidas. Mesmas respostas da LP6, no sistema visual da LP7. */

const PERGUNTAS = [
  {
    q: 'Quanto tempo leva para começar a usar?',
    a: 'Você entra no sistema no mesmo dia. Para o primeiro preço sair correto, precisa cadastrar seus custos fixos, os materiais daquele produto e o tempo de produção. Em uma tarde você tem seus principais produtos precificados.',
  },
  {
    q: 'Eu não sou boa com tecnologia. Vou conseguir?',
    a: 'O sistema foi feito para celular, com o produto na mão. Salva sozinho enquanto você digita, aceita vírgula no lugar do ponto, converte automaticamente as fotos do iPhone, e tem um vídeo com o passo a passo completo dentro da plataforma.',
  },
  {
    q: 'E tudo que já está na minha planilha?',
    a: 'Hoje o cadastro é manual, não existe importação de planilha. Mas você não precisa migrar tudo: comece pelos produtos que mais vendem e cadastre o resto conforme o pedido chega.',
  },
  {
    q: 'Já tenho uma planilha de precificação. Por que trocar?',
    a: 'A planilha não converte resma em folha sozinha, não atualiza seus preços quando o fornecedor aumenta, não gera proposta com a sua logo e não separa o que já entrou do que ainda vai entrar. Ela te tirou do zero. Ela não te tira daqui.',
  },
  {
    q: 'Como recebo meu acesso depois de pagar?',
    a: 'A conta é criada automaticamente com o e-mail que você usar no pagamento. Você recebe os dados de acesso e já entra.',
  },
  {
    q: 'Tem fidelidade? Consigo cancelar?',
    a: 'Não há fidelidade em nenhum dos planos. E você tem 7 dias para pedir reembolso, integral se não tiver usado créditos de IA. Se tiver usado, é descontado R$ 1,00 a cada 10 créditos consumidos.',
  },
  {
    q: 'O catálogo tem carrinho e pagamento online?',
    a: 'Não, e é de propósito. Seu produto é personalizado e o preço muda conforme quantidade, nome e data. A venda fecha conversando, por isso todo botão do catálogo leva para o seu WhatsApp.',
  },
];

const FaqLP7 = () => (
  <section className="bg-lp7-cream pb-[72px] lg:pb-[130px]">
    <div className="max-w-lp7-prose mx-auto px-5 lg:px-8">
      <Reveal className="text-center">
        <Badge tone="light">Dúvidas</Badge>
        <h2 className={`${T.h2} text-lp7-text mt-6`}>Perguntas que aparecem antes de assinar</h2>
      </Reveal>

      <div className="space-y-3 mt-10 lg:mt-14">
        {PERGUNTAS.map((p, i) => (
          <Reveal key={p.q} delay={i * 50}>
            <details open={i === 0} className="lp6-acc group bg-white rounded-[20px] px-6 py-5">
              <summary className="flex items-start justify-between gap-4 cursor-pointer">
                <span className="font-lp7 font-medium text-[16px] lg:text-[17px] text-lp7-text">{p.q}</span>
                <span className="inline-flex shrink-0 items-center justify-center w-[34px] h-[34px] rounded-full bg-gradient-to-br from-lp7-violet to-lp7-pink text-white transition-transform duration-[320ms] group-open:rotate-180">
                  <Icon icon="solar:alt-arrow-down-linear" width={17} />
                </span>
              </summary>
              <div className="lp6-acc-body">
                <div><p className={`${T.small} text-lp7-muted pt-4 max-w-[62ch]`}>{p.a}</p></div>
              </div>
            </details>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default FaqLP7;
