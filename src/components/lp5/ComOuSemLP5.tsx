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
    <section id="comparativo" className="relative overflow-hidden bg-lp5n-50 py-[80px] lg:py-[130px]">
      <div className="absolute inset-y-0 left-0 w-1/2 pointer-events-none hidden lg:block opacity-70"
           style={{ backgroundImage: 'repeating-linear-gradient(45deg, #EDEBE8 0 1px, transparent 1px 9px)' }} />
      <div className="absolute -right-40 top-1/4 w-[620px] h-[620px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(closest-side, rgba(246,106,147,0.20), transparent 70%)', filter: 'blur(46px)' }} />

      <div className="relative max-w-lp5-tight mx-auto px-5 lg:px-[80px]">
        <Reveal>
          <h2 className={`${T.h2} uppercase text-center text-lp5n-900`}>Com ou sem o PreciArte. Você escolhe.</h2>
        </Reveal>

        {/* dois painéis se encarando — o da direita elevado */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-7 mt-12 lg:mt-16 items-start">
          {/* SEM */}
          <Reveal>
            <div className="rounded-[24px] overflow-hidden bg-white/70"
                 style={{ border: '1px solid #DDD9D5', boxShadow: '0 14px 34px -22px rgba(33,31,28,0.18)' }}>
              <div className="px-6 lg:px-8 py-5 flex items-center gap-3" style={{ background: '#EDEBE8' }}>
                <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-white">
                  <Icon icon="solar:close-circle-linear" width={18} className="text-lp5s-danger" />
                </span>
                <span className={`${T.caption} text-lp5n-700`}>Sem o PreciArte</span>
              </div>
              <ul className="px-6 lg:px-8 py-3">
                {LINHAS.map(([sem]) => (
                  <li key={sem} className={`${T.body} text-lp5n-600 py-3.5 flex items-start gap-3 border-b border-lp5n-200 last:border-0`}>
                    <Icon icon="solar:close-circle-linear" width={18} className="shrink-0 mt-[5px] text-lp5n-400" />
                    {sem}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* COM */}
          <Reveal delay={120}>
            <div className="relative rounded-[24px] overflow-hidden lg:-mt-4"
                 style={{ border: '2px solid #972142', background: '#FFFFFF', boxShadow: '0 44px 90px -34px rgba(151,33,66,0.45)' }}>
              <div className="absolute -right-20 -top-20 w-[280px] h-[280px] rounded-full pointer-events-none"
                   style={{ background: 'radial-gradient(closest-side, rgba(246,106,147,0.22), transparent 70%)', filter: 'blur(26px)' }} />
              <div className="px-6 lg:px-8 py-5 flex items-center gap-3"
                   style={{ background: 'linear-gradient(120deg, #972142, #CE2252)' }}>
                <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-white">
                  <Icon icon="solar:check-circle-bold" width={18} className="text-lp5-700" />
                </span>
                <span className={`${T.caption} text-white`}>Com o PreciArte</span>
              </div>
              <ul className="relative px-6 lg:px-8 py-3">
                {LINHAS.map(([, com]) => (
                  <li key={com} className={`${T.body} text-lp5n-900 font-medium py-3.5 flex items-start gap-3 border-b border-lp5-100 last:border-0`}>
                    <Icon icon="solar:check-circle-bold" width={18} className="shrink-0 mt-[5px] text-lp5s-success" />
                    {com}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* qualificação */}
        <Reveal>
          <div className="relative mt-14 lg:mt-20 rounded-[24px] p-8 lg:p-12 bg-white"
               style={{ border: '1px solid #EDEBE8', boxShadow: '0 22px 54px -26px rgba(33,31,28,0.22)' }}>
            <h3 className={`${T.h3} uppercase text-lp5n-900 text-center`}>O PreciArte faz mais diferença se você:</h3>
            <ul className="mt-7 grid sm:grid-cols-2 gap-x-8 gap-y-4 max-w-[820px] mx-auto">
              {QUALIFICACAO.map((q, i) => (
                <li key={i} className={`${T.body} flex items-start gap-3 text-lp5n-700`}>
                  <span className="inline-flex w-7 h-7 shrink-0 items-center justify-center rounded-full mt-[2px]"
                        style={{ background: 'linear-gradient(150deg, #972142, #CE2252)' }}>
                    <Icon icon="solar:check-linear" width={15} className="text-white" />
                  </span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
            <p className={`${T.body} italic text-lp5n-600 mt-8 text-center max-w-[62ch] mx-auto`}>
              Se você produz para um cliente específico — com nome, com data, com identidade — o PreciArte é pra você.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
