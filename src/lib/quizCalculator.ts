// Calcula a perda mensal estimada com base nas respostas do quiz

export type QuizAnswers = {
  segmento?: string;
  volume?: number; // peças por mês (valor médio da faixa)
  ticket?: number; // ticket médio em R$ (valor médio da faixa)
  metodo?: "chute" | "copia" | "soma" | "planilha";
  sabeLucro?: "sim" | "mais_ou_menos" | "nao";
  prejuizo?: "varias" | "algumas" | "raramente" | "nunca";
  tempo?: "muito" | "medio" | "pouco" | "nada";
};

export type Diagnostic = {
  icon: "alert" | "clock" | "trending" | "calculator";
  title: string;
  description: string;
};

export type QuizResult = {
  monthlyLoss: number;
  yearlyLoss: number;
  lossPerPiece: number;
  errorPercent: number; // 0..100
  diagnostics: Diagnostic[];
};

const METODO_FATOR: Record<NonNullable<QuizAnswers["metodo"]>, number> = {
  chute: 0.35,
  copia: 0.25,
  soma: 0.15,
  planilha: 0.05,
};

const SABE_LUCRO_FATOR: Record<NonNullable<QuizAnswers["sabeLucro"]>, number> = {
  nao: 0.15,
  mais_ou_menos: 0.08,
  sim: 0,
};

const PREJUIZO_FATOR: Record<NonNullable<QuizAnswers["prejuizo"]>, number> = {
  varias: 0.1,
  algumas: 0.05,
  raramente: 0.02,
  nunca: 0,
};

export const calculateLoss = (a: QuizAnswers): QuizResult => {
  const ticket = a.ticket ?? 50;
  const volume = a.volume ?? 15;

  const fatorErro = Math.min(
    0.6,
    (METODO_FATOR[a.metodo ?? "chute"] ?? 0.2) +
      (SABE_LUCRO_FATOR[a.sabeLucro ?? "mais_ou_menos"] ?? 0.05) +
      (PREJUIZO_FATOR[a.prejuizo ?? "algumas"] ?? 0.05),
  );

  const lossPerPiece = ticket * fatorErro;
  let monthlyLoss = lossPerPiece * volume;

  // Garante valor mínimo relevante para conversão
  monthlyLoss = Math.max(monthlyLoss, 80);

  const diagnostics: Diagnostic[] = [];

  if (a.metodo === "chute" || a.metodo === "copia") {
    diagnostics.push({
      icon: "calculator",
      title: "Você precifica sem fórmula",
      description:
        "Artesãos que chutam o preço ou copiam concorrentes perdem em média 25–35% de margem em cada peça.",
    });
  }

  if (a.sabeLucro === "nao" || a.sabeLucro === "mais_ou_menos") {
    diagnostics.push({
      icon: "trending",
      title: "Sem clareza do lucro real",
      description:
        "Quem não sabe o lucro exato por peça vende no prejuízo sem perceber — principalmente em peças sob encomenda.",
    });
  }

  if (a.prejuizo === "varias" || a.prejuizo === "algumas") {
    diagnostics.push({
      icon: "alert",
      title: "Prejuízos invisíveis acumulam",
      description:
        "Cada peça vendida abaixo do custo real consome o lucro de outras 3 peças vendidas corretamente.",
    });
  }

  if (a.tempo === "muito" || a.tempo === "medio") {
    diagnostics.push({
      icon: "clock",
      title: "Tempo demais no operacional",
      description:
        "Horas calculando no caderno ou planilha são horas que você não está produzindo nem vendendo.",
    });
  }

  // Garante pelo menos 2 diagnósticos
  if (diagnostics.length < 2) {
    diagnostics.push({
      icon: "trending",
      title: "Sua margem pode ser maior",
      description:
        "Mesmo precificando bem, ajustes finos de custo de material e tempo aumentam o lucro em até 20%.",
    });
  }

  return {
    monthlyLoss: Math.round(monthlyLoss),
    yearlyLoss: Math.round(monthlyLoss * 12),
    lossPerPiece: Math.round(lossPerPiece),
    errorPercent: Math.round(fatorErro * 100),
    diagnostics: diagnostics.slice(0, 4),
  };
};
