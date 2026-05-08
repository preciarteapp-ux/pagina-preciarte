import { AlertCircle } from "lucide-react";

const problems = [
  { title: "Vendo bastante, mas o dinheiro não sobra", desc: "No fim do mês a conta não fecha e você não sabe pra onde foi o lucro." },
  { title: "Não sei se estou cobrando o preço certo", desc: "Fica no chute, copia o preço da concorrente e torce pra dar certo." },
  { title: "Perco horas calculando no caderno", desc: "Cada orçamento vira uma planilha gigante e cansativa." },
  { title: "Tenho medo de aumentar o preço", desc: "Receia perder cliente, então continua trabalhando quase de graça." },
];

const ProblemMae = () => (
  <section className="relative py-12 md:py-20 overflow-hidden" style={{ background: "#fff8f0" }}>
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="text-center mb-8 md:mb-10">
        <h2 className="font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.7rem,4.5vw,2.6rem)", color: "#5a2438" }}>
          Você se reconhece nisso, mãe?
        </h2>
        <p className="text-base md:text-lg" style={{ color: "#6b3a4d" }}>
          Se respondeu sim a qualquer um desses, o PreciArte foi feito pra você.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {problems.map((p, i) => (
          <div key={i} className="rounded-2xl p-5 md:p-6 flex gap-3 md:gap-4" style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(212,175,55,0.35)", boxShadow: "0 8px 24px rgba(154,31,74,0.08)" }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#c2185b,#d4af37)" }}>
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#5a2438" }}>{p.title}</h3>
              <p className="text-sm" style={{ color: "#6b3a4d" }}>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemMae;
