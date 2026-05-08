import { Calculator, BarChart3, ShoppingBag, Users, Package, Bot } from "lucide-react";

const benefits = [
  { icon: Calculator, title: "Preço justo em segundos", desc: "Calculadoras inteligentes que consideram todos os custos automaticamente." },
  { icon: BarChart3, title: "Dashboard com lucro real", desc: "Veja exatamente quanto está sobrando no fim do mês." },
  { icon: ShoppingBag, title: "Catálogo online pronto", desc: "Compartilhe seus produtos com link próprio e venda mais." },
  { icon: Users, title: "Clientes e orçamentos", desc: "Organize tudo em um só lugar, profissional e bonito." },
  { icon: Package, title: "Materiais e estoque", desc: "Controle o que tem, o que falta e o custo real de cada produto." },
  { icon: Bot, title: "Assistente de IA", desc: "Tira dúvidas, sugere preços e ajuda nas vendas 24h por dia." },
];

const BenefitsMae = () => (
  <section className="relative py-16 md:py-20" style={{ background: "#fff8f0" }}>
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="text-center mb-12">
        <h2 className="font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.7rem,4.5vw,2.6rem)", color: "#5a2438" }}>
          Tudo que ela precisa em um só lugar
        </h2>
        <p style={{ color: "#6b3a4d" }}>Profissionalize o negócio sem precisar entender de tecnologia.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {benefits.map((b, i) => {
          const Icon = b.icon;
          return (
            <div key={i} className="rounded-2xl p-6 transition-all hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.92)", border: "1px solid rgba(212,175,55,0.35)", boxShadow: "0 10px 28px rgba(154,31,74,0.1)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg,#c2185b,#d4af37)" }}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#5a2438" }}>{b.title}</h3>
              <p className="text-sm" style={{ color: "#6b3a4d" }}>{b.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default BenefitsMae;
