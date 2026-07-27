import { Icon } from '@iconify/react';
import { T, Reveal, Badge, IconCircle } from './ui';

/**
 * DOBRA 9 — Perguntas frequentes
 *
 * Acordeão nativo com <details>. A animação usa grid-template-rows 0fr→1fr
 * (classe .lp6-acc-body no index.css): max-height fixo causa salto quando o
 * conteúdo tem altura variável.
 */

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
    q: 'Meus dados ficam seguros? Consigo tirar eles de lá?',
    a: 'Cada conta é isolada e ninguém acessa os dados de outra. Você exporta suas movimentações financeiras quando quiser.',
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

const FaqLP6 = () => (
  <section className="relative overflow-hidden bg-white py-[56px] lg:py-[120px]">
    <div className="max-w-lp6-container mx-auto px-6 lg:px-10">
      <div className="grid lg:grid-cols-[38fr_58fr] gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-[100px]">
          <Reveal>
            <Badge>FAQ</Badge>
            <h2 className={`${T.h2} uppercase text-lp6-text mt-5`}>Perguntas frequentes</h2>
            <p className={`${T.body} text-lp6-muted mt-4`}>
              Veja algumas dúvidas que aparecem antes de assinar.
            </p>

            <div className="hidden lg:block bg-lp6-50 border border-lp6-line rounded-[20px] p-7 mt-8">
              <IconCircle icon="solar:chat-round-line-outline" />
              <h3 className="font-lp6 font-semibold text-[19px] text-lp6-text mt-4">
                Ainda precisa de ajuda?
              </h3>
              <p className={`${T.small} text-lp6-muted mt-2`}>
                Entre em{' '}
                <a href="#planos" className="text-lp6-600 underline underline-offset-4">
                  contato conosco
                </a>
              </p>
            </div>
          </Reveal>
        </div>

        <div className="space-y-3">
          {PERGUNTAS.map((p, i) => (
            <Reveal key={p.q} delay={i * 60}>
              <details
                open={i === 0}
                className="lp6-acc group bg-lp6-50 border border-lp6-line rounded-[16px] px-6 py-5"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer">
                  <span className="font-lp6 font-semibold text-[16px] lg:text-[17px] text-lp6-text">
                    {p.q}
                  </span>
                  <span className="inline-flex shrink-0 items-center justify-center w-[36px] h-[36px] rounded-full bg-lp6-600 text-white transition-transform duration-[320ms] group-open:rotate-180">
                    <Icon icon="solar:alt-arrow-down-linear" width={18} />
                  </span>
                </summary>
                <div className="lp6-acc-body">
                  <div>
                    <p className={`${T.small} text-lp6-muted pt-4 max-w-[68ch]`}>{p.a}</p>
                  </div>
                </div>
              </details>
            </Reveal>
          ))}

          <Reveal className="lg:hidden">
            <div className="bg-lp6-50 border border-lp6-line rounded-[20px] p-7 mt-3">
              <IconCircle icon="solar:chat-round-line-outline" />
              <h3 className="font-lp6 font-semibold text-[19px] text-lp6-text mt-4">
                Ainda precisa de ajuda?
              </h3>
              <p className={`${T.small} text-lp6-muted mt-2`}>
                Entre em{' '}
                <a href="#planos" className="text-lp6-600 underline underline-offset-4">
                  contato conosco
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

export default FaqLP6;
