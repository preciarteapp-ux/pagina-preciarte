import { Check } from "lucide-react";

const features = [
  "Calculadora profissional de produtos",
  "Calculadora de combos e kits",
  "Cálculo automático de margem e lucro",
  "Dashboard financeiro completo",
  "Cadastro ilimitado de produtos",
  "Cadastro ilimitado de clientes",
  "Orçamentos profissionais em PDF",
  "Gestão de materiais e estoque",
  "Catálogo online com link próprio",
  "Controle de despesas fixas e variáveis",
  "Relatórios de vendas e lucros",
  "Assistente de IA com créditos inclusos",
  "Acesso pelo celular, tablet ou computador",
  "Atualizações constantes",
  "Suporte humano especializado",
  "7 dias de garantia incondicional",
];

const FeaturesMae = () => (
  <section className="relative py-16 md:py-20" style={{ background: "linear-gradient(180deg,#fff8f0 0%,#fde7ed 100%)" }}>
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="text-center mb-10">
        <h2 className="font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.7rem,4.5vw,2.6rem)", color: "#5a2438" }}>
          Veja tudo que está incluído
        </h2>
        <p style={{ color: "#6b3a4d" }}>Mais de 15 funcionalidades pensadas para o seu dia a dia.</p>
      </div>
      <div className="rounded-3xl p-6 md:p-10" style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(212,175,55,0.4)", boxShadow: "0 16px 40px rgba(154,31,74,0.12)" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg,#c2185b,#d4af37)" }}>
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
              <span style={{ color: "#3d1a26" }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default FeaturesMae;
