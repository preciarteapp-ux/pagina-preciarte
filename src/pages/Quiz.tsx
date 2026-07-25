import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Sparkle, CheckCircle2 } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import DiscountPopup from "@/components/DiscountPopup";
import WeekendPromoPopup from "@/components/WeekendPromoPopup";
import QuizHero from "@/components/quiz/QuizHero";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuizQuestion, { QuizOption } from "@/components/quiz/QuizQuestion";
import QuizTicketInput from "@/components/quiz/QuizTicketInput";
import QuizResult from "@/components/quiz/QuizResult";
import { Button } from "@/components/ui/button";
import { calculateLoss, QuizAnswers } from "@/lib/quizCalculator";
import useAnalytics from "@/hooks/useAnalytics";
import { trackQuizEvent } from "@/lib/quizTracking";

type QuestionDef =
  | {
      kind: "options";
      id: keyof QuizAnswers;
      title: string;
      subtitle?: string;
      options: QuizOption[];
    }
  | {
      kind: "ticket";
      id: "ticket";
    };

const QUESTIONS: QuestionDef[] = [
  {
    kind: "options",
    id: "segmento" as any,
    title: "O que você produz?",
    subtitle: "Para personalizarmos seu diagnóstico.",
    options: [
      { label: "Papelaria personalizada", value: "papelaria", emoji: "📝" },
      { label: "Artesanato em geral", value: "artesanato", emoji: "🎨" },
      { label: "Lembrancinhas e festas", value: "lembrancinhas", emoji: "🎁" },
      { label: "Costura / crochê / tricô", value: "costura", emoji: "🧵" },
      { label: "Confeitaria / bolos", value: "confeitaria", emoji: "🍰" },
      { label: "Bijuterias / acessórios", value: "bijuterias", emoji: "💍" },
      { label: "Outro segmento", value: "outro", emoji: "✨" },
    ],
  },
  {
    kind: "options",
    id: "precoPerdaPct",
    title: "Como você define o preço dos seus produtos hoje?",
    subtitle: "Seja honesta. Essa resposta impacta diretamente no resultado.",
    options: [
      {
        label: "Olho o que a concorrência cobra e cobro parecido",
        sublabel: "Sem calcular o meu custo real",
        value: 0.38,
        emoji: "🎲",
      },
      {
        label: "Multiplico o material por 2 ou 3",
        sublabel: "Um número que aprendi em algum lugar",
        value: 0.28,
        emoji: "✖️",
      },
      {
        label: "Calculo materiais e adiciono algo pelo meu tempo",
        sublabel: "Mas sem muito rigor",
        value: 0.18,
        emoji: "🤔",
      },
      {
        label: "Calculo material + tempo + custo fixo + margem",
        sublabel: "Com método definido e consistente",
        value: 0.04,
        emoji: "📊",
      },
    ],
  },
  {
    kind: "options",
    id: "pedidos",
    title: "Quantos pedidos você entrega por mês em média?",
    subtitle: "Pense nos últimos 3 meses.",
    options: [
      { label: "Menos de 10 pedidos", sublabel: "Ainda estou crescendo", value: 7, emoji: "🌱" },
      { label: "Entre 10 e 30 pedidos", sublabel: "Movimento constante", value: 20, emoji: "📈" },
      { label: "Entre 30 e 60 pedidos", sublabel: "Agenda cheia", value: 45, emoji: "🔥" },
      { label: "Mais de 60 pedidos", sublabel: "Operação robusta", value: 80, emoji: "🚀" },
    ],
  },
  { kind: "ticket", id: "ticket" },
  {
    kind: "options",
    id: "tempoPerdaPct",
    title: "Você cobra pelo seu tempo de trabalho?",
    subtitle: "Não o material — as horas que você gasta produzindo cada peça.",
    options: [
      {
        label: "Não — nunca calculei isso",
        sublabel: "Faço por amor e cobro o material",
        value: 0.22,
        emoji: "❌",
      },
      {
        label: "Às vezes — adiciono um valor sem base",
        sublabel: "É mais um chute do que um cálculo",
        value: 0.14,
        emoji: "😅",
      },
      {
        label: "Sim — mas não sei se o valor está certo",
        sublabel: "Coloco algo mas não tenho certeza",
        value: 0.06,
        emoji: "🤷",
      },
      {
        label: "Sim — calculo o valor/hora e aplico",
        sublabel: "Com método consistente",
        value: 0,
        emoji: "✅",
      },
    ],
  },
  {
    kind: "options",
    id: "fixoPerdaPct",
    title: "Seus custos fixos entram no preço de cada pedido?",
    subtitle: "Luz, internet, aluguel do ateliê, sistemas — quem paga isso no final?",
    options: [
      {
        label: "Não — esses custos ficam no meu bolso",
        sublabel: "Nunca pensei em incluir no preço",
        value: 0.18,
        emoji: "😰",
      },
      {
        label: "Parcialmente — incluo alguns mas não todos",
        sublabel: "Embalagem sim, luz não",
        value: 0.09,
        emoji: "🤷",
      },
      {
        label: "Sim — rateio tudo por pedido",
        sublabel: "Sei exatamente quanto cada pedido custa",
        value: 0,
        emoji: "✅",
      },
    ],
  },
  {
    kind: "options",
    id: "descontoPerdaPct",
    title: "O que acontece quando um cliente pede desconto?",
    subtitle: "Seja honesta — o que você faz na maioria das vezes?",
    options: [
      {
        label: "Dou — fico com medo de perder a venda",
        sublabel: "Aceito quase sempre",
        value: 0.12,
        emoji: "😬",
      },
      {
        label: "Às vezes dou, às vezes não",
        sublabel: "Depende do humor e do cliente",
        value: 0.07,
        emoji: "😐",
      },
      {
        label: "Raramente — sei quanto posso ceder",
        sublabel: "Tenho os números na mão",
        value: 0,
        emoji: "💪",
      },
    ],
  },
  {
    kind: "options",
    id: "controlePerdaPct",
    title: "Você sabe quanto lucrou no mês passado?",
    subtitle: "Não quanto faturou — o lucro real, depois de pagar tudo.",
    options: [
      {
        label: "Não — não tenho ideia",
        sublabel: "Sei que entrou dinheiro, não sei quanto sobrou",
        value: 0.12,
        emoji: "😰",
      },
      {
        label: "Mais ou menos — tenho uma estimativa",
        sublabel: "Mas pode estar bem errada",
        value: 0.07,
        emoji: "🤷",
      },
      {
        label: "Sim — tenho controle financeiro claro",
        sublabel: "Sei receitas, despesas e lucro real",
        value: 0,
        emoji: "📊",
      },
    ],
  },
  {
    kind: "options",
    id: "orcPerdaPct",
    title: "Como você envia o orçamento para o cliente?",
    subtitle: "Depois de calcular o preço, como você apresenta ao cliente?",
    options: [
      {
        label: "Mando o valor numa mensagem no WhatsApp",
        sublabel: "Sem documento, sem detalhamento",
        value: 0.08,
        emoji: "📱",
      },
      {
        label: "Mando uma foto ou print",
        sublabel: "Da planilha ou do bloco de notas",
        value: 0.04,
        emoji: "📸",
      },
      {
        label: "Envio um documento ou PDF organizado",
        sublabel: "Com minha logo, itens e valores",
        value: 0,
        emoji: "📄",
      },
    ],
  },
];

type Step = { key: "intro" } | { key: "question"; index: number } | { key: "result" };

const Quiz = () => {
  useAnalytics();
  const [step, setStep] = useState<Step>({ key: "intro" });
  const [answers, setAnswers] = useState<QuizAnswers>({});




  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const result = useMemo(() => calculateLoss(answers), [answers]);

  const handleStart = () => {
    trackQuizEvent({ event_type: "quiz_started" });
    setStep({ key: "question", index: 0 });
  };

  const handleAnswer = (value: any) => {
    if (step.key !== "question") return;
    const q = QUESTIONS[step.index];
    const newAnswers = { ...answers, [q.id]: value } as QuizAnswers;

    // Resolve label legível para o dashboard
    let answerLabel: string | null = null;
    if (q.kind === "options") {
      const opt = q.options.find((o) => o.value === value);
      answerLabel = opt?.label ?? String(value);
    } else if (q.kind === "ticket") {
      answerLabel = `R$ ${value}`;
    }

    trackQuizEvent({
      event_type: "question_answered",
      question_index: step.index,
      question_id: q.id,
      answer_value: typeof value === "number" ? value : null,
      answer_label: answerLabel,
    });

    setAnswers(newAnswers);
    if (step.index + 1 < QUESTIONS.length) {
      setStep({ key: "question", index: step.index + 1 });
    } else {
      const finalResult = calculateLoss(newAnswers);
      trackQuizEvent({
        event_type: "quiz_completed",
        monthly_loss: finalResult.monthlyLoss,
      });
      setStep({ key: "result" });
    }
  };

  const handleBack = () => {
    if (step.key === "question" && step.index > 0) {
      setStep({ key: "question", index: step.index - 1 });
    } else if (step.key === "question") {
      setStep({ key: "intro" });
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setStep({ key: "intro" });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 via-background to-background">
      <SEOHead />
      <DiscountPopup onClaimDiscount={() => undefined} />
      <WeekendPromoPopup />

      {step.key === "intro" && <QuizHero />}

      {step.key === "question" && (
        <QuizProgress
          current={step.index + 1}
          total={QUESTIONS.length}
          onBack={handleBack}
        />
      )}

      <div className="flex-1">
        {step.key === "intro" && (
          <div className="mx-auto w-full max-w-md px-5 pb-12 pt-8 text-center animate-fade-in">
            <div className="mb-8 rounded-2xl border border-border bg-card p-5 text-left">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                <Sparkle className="h-3 w-3" />
                Diagnóstico em 2 minutos
              </div>
              <h2 className="font-display text-xl font-bold leading-tight text-card-foreground">
                Quanto você está deixando de lucrar por mês?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Responda 9 perguntas rápidas e descubra o valor exato que sua precificação está
                tirando do seu bolso todo mês.
              </p>
              <ul className="mt-4 space-y-2.5">
                {[
                  "Diagnóstico personalizado em reais",
                  "Identifica onde você perde margem",
                  "100% gratuito e sem cadastro",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-card-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button variant="hero" size="xl" className="w-full" onClick={handleStart}>
              Começar diagnóstico
              <ArrowRight className="h-5 w-5" />
            </Button>

            <p className="mt-4 text-xs text-muted-foreground">
              Mais de 12.000 artesãs já descobriram seu prejuízo invisível
            </p>
          </div>
        )}

        {step.key === "question" &&
          (QUESTIONS[step.index].kind === "ticket" ? (
            <QuizTicketInput
              key={`ticket-${step.index}`}
              number={step.index + 1}
              total={QUESTIONS.length}
              onSubmit={handleAnswer}
            />
          ) : (
            <QuizQuestion
              key={`q-${step.index}`}
              questionKey={`${step.index}`}
              number={step.index + 1}
              total={QUESTIONS.length}
              title={(QUESTIONS[step.index] as any).title}
              subtitle={(QUESTIONS[step.index] as any).subtitle}
              options={(QUESTIONS[step.index] as any).options}
              onSelect={handleAnswer}
            />
          ))}

        {step.key === "result" && <QuizResult result={result} onRestart={handleRestart} />}
      </div>
    </main>
  );
};

export default Quiz;
