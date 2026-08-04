// Calcula a perda mensal estimada com base nas respostas do quiz
// Modelo: faturamento * Σ(percentuais de perda por dor)

export type QuizAnswers = {
  segmento?: string; // qualitativo — não entra no cálculo
  precoPerdaPct?: number; // 0..0.38
  pedidos?: number; // pedidos/mês
  ticket?: number; // R$ médio por pedido
  tempoPerdaPct?: number; // 0..0.22
  fixoPerdaPct?: number; // 0..0.18
  descontoPerdaPct?: number; // 0..0.12
  controlePerdaPct?: number; // 0..0.12
  orcPerdaPct?: number; // 0..0.08
};

export type DiagnosticKey =
  | "preco"
  | "tempo"
  | "fixo"
  | "desconto"
  | "controle"
  | "orcamento";

export type Diagnostic = {
  key: DiagnosticKey;
  emoji: string;
  label: string;
  desc: string;
  value: number; // R$/mês
  weight: number; // 0..1 — peso relativo na perda total
  solution: string; // HTML simples (com <strong>)
};

export type QuizResult = {
  pedidos: number;
  ticket: number;
  faturamento: number;
  monthlyLoss: number;
  yearlyLoss: number;
  lossPercent: number; // 0..100
  diagnostics: Diagnostic[];
  phrase: string; // HTML
};

const DEFAULT_PCTS = {
  precoPerdaPct: 0.18,
  tempoPerdaPct: 0.14,
  fixoPerdaPct: 0.09,
  descontoPerdaPct: 0.07,
  controlePerdaPct: 0.07,
  orcPerdaPct: 0.04,
};

const brl = (n: number) =>
  "R$ " + Math.round(n).toLocaleString("pt-BR");

export const calculateLoss = (a: QuizAnswers): QuizResult => {
  const pedidos = a.pedidos ?? 20;
  const ticket = a.ticket ?? 80;
  const faturamento = pedidos * ticket;

  const pPreco = a.precoPerdaPct ?? DEFAULT_PCTS.precoPerdaPct;
  const pTempo = a.tempoPerdaPct ?? DEFAULT_PCTS.tempoPerdaPct;
  const pFixo = a.fixoPerdaPct ?? DEFAULT_PCTS.fixoPerdaPct;
  const pDesc = a.descontoPerdaPct ?? DEFAULT_PCTS.descontoPerdaPct;
  const pCtrl = a.controlePerdaPct ?? DEFAULT_PCTS.controlePerdaPct;
  const pOrc = a.orcPerdaPct ?? DEFAULT_PCTS.orcPerdaPct;

  const vPreco = faturamento * pPreco;
  const vTempo = faturamento * pTempo;
  const vFixo = faturamento * pFixo;
  const vDesc = faturamento * pDesc;
  const vCtrl = faturamento * pCtrl;
  const vOrc = faturamento * pOrc;

  const total = vPreco + vTempo + vFixo + vDesc + vCtrl + vOrc;
  const monthlyLoss = Math.max(total, 80);

  const rawDiags: Diagnostic[] = [
    {
      key: "preco",
      emoji: "💸",
      label: "Preço calculado errado",
      desc: "Você está cobrando menos do que deveria — sem perceber.",
      value: vPreco,
      weight: 0,
      solution:
        "<strong>O PreciArte calcula o preço certo automaticamente</strong> — material, tempo, custo fixo e margem. Em segundos, sem erro.",
    },
    {
      key: "tempo",
      emoji: "⏱️",
      label: "Seu tempo não está no preço",
      desc: "Horas de trabalho saindo de graça todo mês.",
      value: vTempo,
      weight: 0,
      solution:
        "<strong>A calculadora de hora do PreciArte</strong> define o valor real da sua hora e aplica em cada pedido automaticamente.",
    },
    {
      key: "fixo",
      emoji: "💡",
      label: "Custos fixos pagos do seu bolso",
      desc: "Luz, internet, aluguel — você está bancando isso sem cobrar.",
      value: vFixo,
      weight: 0,
      solution:
        "<strong>O PreciArte rateia seus custos fixos</strong> em cada pedido automaticamente. Você nunca mais paga essa conta sozinha.",
    },
    {
      key: "desconto",
      emoji: "🏷️",
      label: "Descontos sem base no custo real",
      desc: "Você cede porque não tem os números para dizer não.",
      value: vDesc,
      weight: 0,
      solution:
        "<strong>Com o PreciArte, você mostra o cálculo</strong> para o cliente. Ele para de pedir desconto quando vê o custo real.",
    },
    {
      key: "controle",
      emoji: "📊",
      label: "Sem controle do lucro real",
      desc: "Sem saber o que sobra, você não consegue crescer com segurança.",
      value: vCtrl,
      weight: 0,
      solution:
        "<strong>O controle financeiro do PreciArte</strong> mostra receitas, despesas e lucro real todo mês. Sem chute, sem surpresa.",
    },
    {
      key: "orcamento",
      emoji: "📄",
      label: "Perdendo vendas por falta de profissionalismo",
      desc: "Orçamento no WhatsApp faz o cliente não te levar a sério.",
      value: vOrc,
      weight: 0,
      solution:
        "<strong>O PreciArte gera orçamento em PDF</strong> com sua logo, itens e chave Pix em 1 clique. Seu cliente passa a te ver como empresária.",
    },
  ];

  const maxVal = Math.max(...rawDiags.map((d) => d.value), 1);
  const diagnostics = rawDiags
    .filter((d) => d.value > 0)
    .map((d) => ({ ...d, weight: d.value / maxVal }))
    .sort((a, b) => b.value - a.value);

  // Frase de impacto
  const lossRatio = total / Math.max(faturamento, 1);
  let phrase = "";
  if (lossRatio > 0.45) {
    phrase = `Você trabalha muito. Você entrega com qualidade. Mas está deixando <strong>${brl(
      monthlyLoss,
    )} por mês</strong> — ou <strong>${brl(
      monthlyLoss * 12,
    )} por ano</strong> — na mesa. Por <strong>R$ 10,43/mês</strong>, o PreciArte elimina cada um desses pontos.`;
  } else if (lossRatio > 0.25) {
    phrase = `Com ${pedidos} pedidos por mês, você está perdendo <strong>${brl(
      monthlyLoss,
    )} todo mês</strong> em custos que não entram no preço e dinheiro que escapa sem controle. O PreciArte custa <strong>R$ 10,43/mês</strong> — e se paga no primeiro pedido precificado certo.`;
  } else {
    phrase = `Você já está no caminho certo — mas ainda há <strong>${brl(
      monthlyLoss,
    )} por mês</strong> que podem voltar para o seu bolso. O PreciArte cuida dos detalhes que ainda escapam.`;
  }

  return {
    pedidos,
    ticket,
    faturamento,
    monthlyLoss: Math.round(monthlyLoss),
    yearlyLoss: Math.round(monthlyLoss * 12),
    lossPercent: Math.round(lossRatio * 100),
    diagnostics,
    phrase,
  };
};
