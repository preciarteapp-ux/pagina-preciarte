import { Icon } from '@iconify/react';
import { T, Reveal, Badge, Glow, G } from '../ui';

/**
 * Grid com todas as áreas do sistema.
 *
 * É a prova mais direta de que não é uma calculadora: a pessoa vê o
 * tamanho do sistema num olhar. Todas existem no app hoje — nenhuma
 * área inventada nem "em breve".
 */
const AREAS = [
  { i: 'solar:widget-5-outline', n: 'Painel', d: 'Entregas da semana e o que está em aberto' },
  { i: 'solar:users-group-rounded-outline', n: 'Clientes', d: 'Histórico, ticket médio e quem te deve' },
  { i: 'solar:document-text-outline', n: 'Orçamentos', d: 'Proposta em PDF e status de produção' },
  { i: 'solar:tag-price-outline', n: 'Itens de venda', d: 'Ficha do produto com custo e margem' },
  { i: 'solar:box-minimalistic-outline', n: 'Materiais', d: 'Conversão de unidade e estoque' },
  { i: 'solar:wallet-money-outline', n: 'Financeiro', d: 'Receitas, despesas e contas a receber' },
  { i: 'solar:refresh-circle-outline', n: 'Custos recorrentes', d: 'Lançados sozinhos todo mês' },
  { i: 'solar:shop-outline', n: 'Catálogo', d: 'Vitrine pública com link próprio' },
  { i: 'solar:calculator-outline', n: 'Calculadoras', d: 'Valor da hora e custo de impressão' },
  { i: 'solar:gallery-add-outline', n: 'Edição com IA', d: 'Foto de produto pronta para o catálogo' },
  { i: 'solar:chat-round-line-outline', n: 'Assistente', d: 'Legenda, roteiro e script de venda' },
  { i: 'solar:gift-outline', n: 'Indique e ganhe', d: 'Comissão por indicação com saque por PIX' },
  { i: 'solar:settings-outline', n: 'Configurações', d: 'Sua marca, suas cores e a chave PIX' },
];

const Areas = () => (
  <section className="relative overflow-hidden bg-bf-ink py-[72px] lg:py-[120px]">
    <Glow x="20%" y="20%" size={780} opacity={0.13} />

    <div className="relative max-w-bf-container mx-auto px-5 lg:px-8">
      <Reveal className="text-center">
        <Badge>O tamanho do sistema</Badge>
        <h2 className={`${T.h2} text-white mt-6 max-w-[17ch] mx-auto`}>
          Treze áreas. <G>Um sistema só.</G>
        </h2>
        <p className={`${T.body} text-white/65 mt-5 max-w-[54ch] mx-auto`}>
          Todas já existem hoje, sem "em breve". E todas puxam do mesmo lugar: o que você cadastra
          uma vez alimenta o resto.
        </p>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mt-10 lg:mt-16">
        {AREAS.map((a, i) => (
          <Reveal key={a.n} delay={i * 45}>
            <div className="h-full flex items-start gap-3 lg:gap-4 rounded-[18px] lg:rounded-[20px] border border-bf-line bg-bf-surface p-4 lg:p-6 transition-colors duration-300 hover:border-bf-gold/40">
              <span className="flex items-center justify-center w-[36px] h-[36px] lg:w-[42px] lg:h-[42px] rounded-[11px] lg:rounded-[13px] bg-white/[0.06] text-bf-gold shrink-0">
                <Icon icon={a.i} width={18} className="lg:w-[21px] lg:h-[21px]" />
              </span>
              <span className="min-w-0">
                <span className="block font-lp7 font-medium text-[15px] lg:text-[16px] text-white">{a.n}</span>
                <span className="block font-lp7 text-[12.5px] lg:text-[14px] leading-[1.35] text-white/50 mt-[3px] lg:mt-1">{a.d}</span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Areas;
