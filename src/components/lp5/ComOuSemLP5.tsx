import { Icon } from '@iconify/react';
import { T, Reveal } from './ui';

const LINHAS: [string, string][] = [
  ['Preço no achismo', 'Preço calculado com custo real'],
  ['Sua hora entra como zero', 'Sua hora entra em cada peça'],
  ['Orçamento solto no WhatsApp', 'PDF profissional em 1 clique'],
  ['Não sabe se lucrou', 'Lucro visível em cada pedido'],
  ['Material sem controle', 'Custo por pedido automático'],
  ['Cede desconto por insegurança', 'Mostra a conta e sustenta o preço'],
  ['Foto caseira', 'Imagem profissional com IA'],
  ['Financeiro bagunçado', 'Receitas e despesas organizadas'],
  ['Fecha o mês sem saber o resultado', 'Sabe exatamente quanto gerou'],
];

const QUALIFICACAO = [
  <>Vende <strong className="font-semibold text-lp5n-900">por encomenda</strong>, não pronta-entrega em prateleira</>,
  <>Responde preço no WhatsApp e <strong className="font-semibold text-lp5n-900">já perdeu venda sem saber por quê</strong></>,
  <>Usa uma planilha que <strong className="font-semibold text-lp5n-900">você não atualiza desde que criou</strong> — ou não usa nada</>,
  <>Já desconfia que <strong className="font-semibold text-lp5n-900">alguns pedidos não estão dando lucro</strong>, mas não sabe quais</>,
];

export default function ComOuSemLP5() {
  return (
    <section id="comparativo" className="relative overflow-hidden bg-lp5n-50 py-[72px] lg:py-[120px]">
      {/* diagonais só na metade esquerda — o ruído fica do lado do problema */}
      <div
        className="absolute inset-y-0 left-0 w-1/2 pointer-events-none hidden lg:block"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, #FDF1F6 0 1px, transparent 1px 8px)' }}
      />

      <div className="relative max-w-lp5-table mx-auto px-5 lg:px-[120px]">
        <Reveal>
          <h2 className={`${T.h2} uppercase text-center text-lp5n-900`}>Com ou sem o PreciArte. Você escolhe.</h2>
        </Reveal>

        {/* desktop: tabela */}
        <Reveal>
          <div className="hidden md:block mt-12 rounded-[16px] overflow-hidden border border-lp5n-200">
            <div className="grid grid-cols-2">
              <div className={`${T.caption} bg-lp5n-200 text-lp5n-700 px-5 py-4`}>Sem o PreciArte</div>
              <div className={`${T.caption} bg-lp5-700 text-white px-5 py-4`}>Com o PreciArte</div>
            </div>
            {LINHAS.map(([sem, com], i) => (
              <div key={sem} className={`grid grid-cols-2 ${i % 2 === 0 ? 'bg-white' : 'bg-lp5-25'}`}>
                <div className={`${T.body} flex items-start gap-3 px-5 py-4 text-lp5n-700`}>
                  <Icon icon="solar:close-circle-linear" width={20} className="shrink-0 mt-[3px] text-lp5s-danger" />
                  {sem}
                </div>
                <div className={`${T.body} flex items-start gap-3 px-5 py-4 text-lp5n-900 font-medium`}>
                  <Icon icon="solar:check-circle-linear" width={20} className="shrink-0 mt-[3px] text-lp5s-success" />
                  {com}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* mobile: cards pareados — nunca scroll horizontal */}
        <div className="md:hidden mt-10 space-y-3">
          {LINHAS.map(([sem, com], i) => (
            <Reveal key={sem} delay={i * 60}>
              <div className="rounded-[16px] overflow-hidden border border-lp5n-200">
                <div className={`${T.small} flex items-start gap-2 bg-lp5n-200 text-lp5n-700 px-4 py-3`}>
                  <Icon icon="solar:close-circle-linear" width={18} className="shrink-0 mt-[2px] text-lp5s-danger" />
                  {sem}
                </div>
                <div className={`${T.small} flex items-start gap-2 bg-lp5-50 text-lp5n-900 font-medium px-4 py-3`}>
                  <Icon icon="solar:check-circle-linear" width={18} className="shrink-0 mt-[2px] text-lp5s-success" />
                  {com}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* qualificação */}
        <Reveal>
          <div className="mt-14 lg:mt-20 text-center">
            <h3 className={`${T.h3} uppercase text-lp5n-900`}>O PreciArte faz mais diferença se você:</h3>
            <ul className="mt-6 space-y-3 max-w-[62ch] mx-auto text-left">
              {QUALIFICACAO.map((q, i) => (
                <li key={i} className={`${T.body} flex items-start gap-3 text-lp5n-700`}>
                  <Icon icon="solar:check-linear" width={18} className="shrink-0 mt-[6px] text-lp5-700" />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
            <p className={`${T.body} italic text-lp5n-600 mt-6 max-w-[65ch] mx-auto`}>
              Se você produz para um cliente específico — com nome, com data, com identidade — o PreciArte é pra você.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
