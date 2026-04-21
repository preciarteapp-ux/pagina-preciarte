import { useEffect, useMemo, useState } from "react";
import {
  Palette,
  Cake,
  Scissors,
  Sparkles,
  Flame,
  Package,
  HelpCircle,
  Eye,
  Calculator,
  FileSpreadsheet,
  Copy,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Zap,
  Sparkle,
  ArrowRight,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuizQuestion, { QuizOption } from "@/components/quiz/QuizQuestion";
import QuizResult from "@/components/quiz/QuizResult";
import { Button } from "@/components/ui/button";
import { calculateLoss, QuizAnswers } from "@/lib/quizCalculator";
import useAnalytics from "@/hooks/useAnalytics";

type Step =
  | { key: "intro" }
  | { key: "question"; index: number }
  | { key: "result" };

type QuestionDef = {
  id: keyof QuizAnswers;
  title: string;
  subtitle?: string;
  options: QuizOption[];
};

const QUESTIONS: QuestionDef[] = [
  {
    id: "segmento",
    title: "O que você produz?",
    subtitle: "Vamos personalizar seu diagnóstico",
    options: [
      { label: "Artesanato em geral", value: "artesanato", icon: Palette },
      { label: "Confeitaria / Doces", value: "confeitaria", icon: Cake },
      { label: "Costura / Crochê", value: "costura", icon: Scissors },
      { label: "Resina / Acessórios", value: "resina", icon: Sparkles },
      { label: "Velas / Aromas", value: "velas", icon: Flame },
      { label: "Outros produtos", value: "outros", icon: Package },
    ],
  },
  {
    id: "volume",
    title: "Quantas peças você vende por mês?",
    subtitle: "Considere uma média realista",
    options: [
      { label: "Até 10 peças", sublabel: "Começando", value: 7, emoji: "🌱" },
      { label: "11 a 30 peças", sublabel: "Em ritmo", value: 20, emoji: "📈" },
      { label: "31 a 60 peças", sublabel: "Vendendo bem", value: 45, emoji: "🔥" },
      { label: "Mais de 60", sublabel: "Em alta produção", value: 80, emoji: "🚀" },
    ],
  },
  {
    id: "ticket",
    title: "Qual o preço médio que você cobra?",
    subtitle: "Por peça vendida",
    options: [
      { label: "Até R$ 30", value: 22, emoji: "💵" },
      { label: "R$ 31 a R$ 80", value: 55, emoji: "💰" },
      { label: "R$ 81 a R$ 150", value: 115, emoji: "💎" },
      { label: "Mais de R$ 150", value: 200, emoji: "👑" },
    ],
  },
  {
    id: "metodo",
    title: "Como você define o preço hoje?",
    subtitle: "Sem julgamento — a maioria começa assim",
    options: [
      { label: "Eu chuto um valor", sublabel: "No feeling mesmo", value: "chute", icon: HelpCircle },
      { label: "Copio o concorrente", sublabel: "Olho o que outros cobram", value: "copia", icon: Copy },
      { label: "Somo material e adiciono uma %", sublabel: "Conta de cabeça", value: "soma", icon: Calculator },
      { label: "Uso planilha ou calculadora", sublabel: "Tenho um método", value: "planilha", icon: FileSpreadsheet },
    ],
  },
  {
    id: "sabeLucro",
    title: "Você sabe exatamente quanto lucra por peça?",
    options: [
      { label: "Sim, sei o valor exato", value: "sim", icon: CheckCircle2 },
      { label: "Mais ou menos", sublabel: "Tenho uma noção", value: "mais_ou_menos", icon: AlertCircle },
      { label: "Não faço ideia", sublabel: "Vendo no escuro", value: "nao", icon: XCircle },
    ],
  },
  {
    id: "prejuizo",
    title: "Já vendeu e percebeu que saiu no prejuízo?",
    subtitle: "Seja sincera — isso é mais comum do que parece",
    options: [
      { label: "Várias vezes", sublabel: "Acontece muito", value: "varias", emoji: "😩" },
      { label: "Algumas vezes", value: "algumas", emoji: "😕" },
      { label: "Raramente", value: "raramente", emoji: "🙂" },
      { label: "Nunca aconteceu", value: "nunca", emoji: "💪" },
    ],
  },
  {
    id: "tempo",
    title: "Quanto tempo gasta calculando preço e organizando finanças?",
    subtitle: "Por semana",
    options: [
      { label: "Mais de 5h", sublabel: "Toma muito tempo", value: "muito", icon: Clock },
      { label: "Entre 2h e 5h", value: "medio", icon: Clock },
      { label: "Menos de 2h", value: "pouco", icon: Zap },
      { label: "Não organizo nada", sublabel: "Faço só quando precisa", value: "nada", icon: Eye },
    ],
  },
];

const Quiz = () => {
  useAnalytics();
  const [step, setStep] = useState<Step>({ key: "intro" });
  const [answers, setAnswers] = useState<QuizAnswers>({});

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("init", "1503006167441659");
      (window as any).fbq("track", "PageView");
    }
  }, []);

  const result = useMemo(() => calculateLoss(answers), [answers]);

  const handleStart = () => {
    setStep({ key: "question", index: 0 });
  };

  const handleAnswer = (value: any) => {
    if (step.key !== "question") return;
    const q = QUESTIONS[step.index];
    const newAnswers = { ...answers, [q.id]: value } as QuizAnswers;
    setAnswers(newAnswers);

    if (step.index + 1 < QUESTIONS.length) {
      setStep({ key: "question", index: step.index + 1 });
    } else {
      setStep({ key: "result" });
    }
  };

  const handleBack = () => {
    if (step.key === "question" && step.index > 0) {
      setStep({ key: "question", index: step.index - 1 });
    } else if (step.key === "question" && step.index === 0) {
      setStep({ key: "intro" });
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setStep({ key: "intro" });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 via-background to-background">
      <SEOHead
        title="Quiz: Quanto você está deixando de lucrar? | PreciArte"
        description="Descubra em 1 minuto quanto seu negócio de artesanato perde por mês com precificação errada."
      />

      <div className="min-h-screen flex flex-col">
        {step.key === "question" && (
          <QuizProgress
            current={step.index + 1}
            total={QUESTIONS.length}
            onBack={handleBack}
          />
        )}

        <div className="flex-1 flex items-center justify-center">
          {step.key === "intro" && (
            <div className="w-full max-w-md mx-auto px-4 py-10 text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
                <Sparkle className="w-3.5 h-3.5" />
                Diagnóstico gratuito · 1 minuto
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
                Quanto você está deixando de lucrar por mês?
              </h1>
              <p className="text-base text-muted-foreground mb-8 leading-relaxed">
                Responda 7 perguntas rápidas e descubra o valor real que sua precificação está
                tirando do seu bolso todo mês.
              </p>

              <div className="bg-card border border-border rounded-2xl p-5 mb-8 text-left space-y-3">
                {[
                  "Diagnóstico personalizado em reais",
                  "Identifica onde você perde margem",
                  "100% gratuito e sem cadastro",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-card-foreground">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Button variant="hero" size="xl" className="w-full" onClick={handleStart}>
                Começar diagnóstico
                <ArrowRight className="w-5 h-5" />
              </Button>

              <p className="text-xs text-muted-foreground mt-4">
                Mais de 12.000 artesãs já descobriram seu prejuízo invisível
              </p>
            </div>
          )}

          {step.key === "question" && (
            <QuizQuestion
              questionKey={QUESTIONS[step.index].id}
              title={QUESTIONS[step.index].title}
              subtitle={QUESTIONS[step.index].subtitle}
              options={QUESTIONS[step.index].options}
              onSelect={handleAnswer}
            />
          )}

          {step.key === "result" && <QuizResult result={result} onRestart={handleRestart} />}
        </div>
      </div>
    </main>
  );
};

export default Quiz;
