import { useState } from 'react';
import { Icon } from '@iconify/react';
import { T, Reveal, Rotulo } from './ui';
import { ANUAL_PARCELAS } from './oferta';

/**
 * FAQ curto — so o que trava a decisao de quem acabou de ver o video.
 *
 * Nao e o FAQ da pagina de vendas. Aqui entram cinco perguntas praticas
 * ("preciso instalar?", "como recebo o acesso?") e fica de fora tudo que e
 * objecao de venda. Numa pagina demonstrativa, responder objecao que a pessoa
 * nao fez e o mesmo que levantar a objecao.
 *
 * NAO FALA DE GARANTIA
 * Os Termos v2 (02/11/2026) acabaram com a garantia de 7 dias, e o anual nao
 * tem reembolso. A resposta sobre cancelamento diz isso de frente e vira a
 * frase para a escolha do plano, porque e assim que ela ajuda em vez de travar:
 * quem tem medo de doze meses tem o mensal do lado.
 *
 * Usa <details>/<summary> nativo: abre sem JavaScript, o teclado navega de
 * graca e o Ctrl+F do navegador acha o texto fechado.
 */

const PERGUNTAS: { q: string; a: string }[] = [
  {
    q: 'Preciso instalar alguma coisa?',
    a: 'Não. Abre no navegador do celular, do tablet ou do computador, com o mesmo login nos três. A maioria das clientes usa no celular, no meio da produção, e é para isso que as telas foram feitas.',
  },
  {
    q: 'Como eu recebo o acesso depois de pagar?',
    a: 'A conta é criada na hora, com o e-mail que você usar no pagamento. Você recebe os dados de acesso e já entra — não tem fila nem liberação manual.',
  },
  {
    q: 'Tem fidelidade? Consigo cancelar?',
    a: `No mensal você cancela quando quiser, sem multa e sem fidelidade. O anual é uma assinatura de ${ANUAL_PARCELAS} meses e não tem reembolso — se a sua ideia é ir testando mês a mês, o mensal é o plano certo para isso.`,
  },
  {
    q: 'Serve para o que eu faço?',
    a: 'O sistema foi feito para quem produz sob encomenda: papelaria personalizada, lembrancinha, sublimação, MDF, adesivo, caneca, topo de bolo. Se o seu preço muda conforme quantidade, nome e data, é esse o caso.',
  },
  {
    q: 'E se eu não entender de precificação?',
    a: 'É o ponto de partida do sistema, não um pré-requisito. Ele pergunta o que você comprou e quanto pagou, e as contas acontecem a partir daí. A Miris, a assistente que fica dentro do sistema, responde no meio do caminho quando você travar.',
  },
];

const Faq = () => {
  // Um aberto por vez: duas respostas longas abertas juntas empurram as
  // perguntas de baixo para fora da tela no celular, e a pessoa perde o lugar.
  const [aberta, setAberta] = useState<number | null>(null);

  return (
    <section className="bg-ap-creme">
      <div className="max-w-ap-prose mx-auto px-5 lg:px-8 py-16 lg:py-20">
        <div className="text-center">
          <Reveal>
            <Rotulo icon="solar:question-circle-bold">Dúvidas</Rotulo>
          </Reveal>
          <Reveal delay={70}>
            <h2 className={`${T.h2} text-ap-tinta mt-5`}>O que costumam perguntar</h2>
          </Reveal>
        </div>

        <div className="flex flex-col gap-[10px] mt-9 lg:mt-11">
          {PERGUNTAS.map((p, i) => (
            <Reveal key={p.q} delay={i * 40}>
              <details
                open={aberta === i}
                onToggle={(e) => {
                  const alvo = e.currentTarget as HTMLDetailsElement;
                  if (alvo.open) setAberta(i);
                  else if (aberta === i) setAberta(null);
                }}
                className="group ap-sombra-card rounded-[18px] border border-ap-linha bg-white overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-[18px] lg:px-7 lg:py-5 [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ap-rosaforte">
                  <span className={`${T.small} font-semibold text-ap-tinta`}>{p.q}</span>
                  <Icon
                    icon="solar:alt-arrow-down-linear"
                    width={19}
                    className="text-ap-rosaforte shrink-0 transition-transform duration-[260ms] group-open:rotate-180"
                  />
                </summary>
                <p className={`${T.small} text-ap-suave px-5 pb-[18px] lg:px-7 lg:pb-5 max-w-[58ch]`}>
                  {p.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
