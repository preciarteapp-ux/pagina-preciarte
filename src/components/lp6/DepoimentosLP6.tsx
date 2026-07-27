import { Icon } from '@iconify/react';
import { T, Reveal, Badge, ArcDecor } from './ui';

/**
 * DOBRA 6 — Resultados de quem já usa
 *
 * Depoimento em fundo escuro ganha peso de testemunho.
 * SEM hover: depoimento não é clicável, e hover sugere interação que não existe.
 *
 * FOTOS: as quatro clientes são reais e as fotos ainda não foram autorizadas.
 * Enquanto não forem, o avatar é a inicial em círculo. Nunca usar foto de banco
 * de imagem para representar cliente real — seria prova fabricada.
 */

const DEPOIMENTOS = [
  {
    rotulo: 'A descoberta',
    citacao: 'Descobri que em vários pedidos eu estava no prejuízo.',
    nome: 'Ana Paula',
    contexto: 'papelaria personalizada, SP',
    reforco: (
      <>
        Ana Paula reajustou os preços com medo de perder cliente.{' '}
        <strong className="font-semibold text-white">Não perdeu nenhum.</strong>
      </>
    ),
  },
  {
    rotulo: 'A autoridade',
    citacao: 'Hoje quando o cliente pede desconto, eu mostro o cálculo. Ele para de pedir.',
    nome: 'Juliana',
    contexto: '',
  },
  {
    rotulo: 'A apresentação',
    citacao:
      'Antes mandava o preço no WhatsApp e o cliente sumia. Hoje recebe um documento profissional com minha logo, e a resposta é completamente diferente.',
    nome: 'Fernanda',
    contexto: 'sublimação, MG',
  },
  {
    rotulo: 'O controle',
    citacao: 'Finalmente consigo fechar o mês e saber se o negócio cresceu. Antes era tudo no feeling.',
    nome: 'Mariana',
    contexto: 'lembrancinhas, BA',
  },
];

const DepoimentosLP6 = () => (
  <section className="relative overflow-hidden bg-lp6-ink py-[56px] lg:py-[120px]">
    <div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(194,24,91,0.12) 0%, transparent 60%)',
      }}
    />
    <ArcDecor radii={[1000]} color="rgba(255,255,255,0.05)" top="130%" left="50%" />

    <div className="relative max-w-lp6-narrow mx-auto px-6 lg:px-10">
      <Reveal className="text-center">
        <Badge variant="dark">Quem já usa</Badge>
        <h2 className={`${T.h2} uppercase text-white mt-5`}>O que muda depois da primeira conta</h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-5 lg:gap-6 mt-8 lg:mt-14">
        {DEPOIMENTOS.map((d, i) => (
          <Reveal key={d.nome} delay={i * 100}>
            <div className="relative h-full rounded-[20px] bg-white/[0.05] border border-white/[0.10] backdrop-blur-[12px] p-7">
              <Icon
                icon="solar:quote-up-square-outline"
                width={20}
                className="absolute top-6 right-6 text-white/25"
              />

              <div className="flex items-center gap-4">
                {/* fallback de inicial — trocar por <img> só quando a foto for autorizada */}
                <span className="inline-flex shrink-0 items-center justify-center w-[64px] h-[64px] lg:w-[72px] lg:h-[72px] rounded-full bg-lp6-600 font-lp6 font-bold text-[26px] lg:text-[28px] text-white">
                  {d.nome.charAt(0)}
                </span>
                <span className={`${T.caption} text-lp6-300`}>{d.rotulo}</span>
              </div>

              <p className={`${T.body} italic text-white mt-5`}>"{d.citacao}"</p>

              <p className={`${T.small} text-white/60 mt-3`}>
                <strong className="font-semibold text-white">{d.nome}</strong>
                {d.contexto && `, ${d.contexto}`}
              </p>

              {d.reforco && (
                <p className={`${T.small} text-white/[0.78] mt-4 pt-4 border-t border-white/[0.10]`}>
                  {d.reforco}
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default DepoimentosLP6;
