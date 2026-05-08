import { Sparkles } from "lucide-react";

const WhatIsMae = () => (
  <section className="relative py-16 md:py-20 overflow-hidden" style={{ background: "linear-gradient(180deg,#fde7ed 0%,#fff8f0 100%)" }}>
    <div className="absolute -top-10 right-0 w-72 h-72 rounded-full opacity-25 blur-3xl pointer-events-none" style={{ background: "#d4af37" }} />
    <div className="container mx-auto px-4 max-w-6xl relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ background: "rgba(154,31,74,0.08)", color: "#9a1f4a", border: "1px solid rgba(212,175,55,0.5)" }}>
            <Sparkles className="w-3 h-3" /> O que é o PreciArte
          </div>
          <h2 className="font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.7rem,4.5vw,2.6rem)", color: "#5a2438" }}>
            O sistema feito para a papelarista que quer transformar talento em renda real
          </h2>
          <p className="mb-4" style={{ color: "#6b3a4d", fontSize: "1.05rem" }}>
            O PreciArte é um sistema completo de precificação, gestão e crescimento para quem trabalha com papelaria personalizada, festas, convites, lembrancinhas e produtos artesanais.
          </p>
          <p style={{ color: "#6b3a4d" }}>
            Em poucos cliques você descobre o preço justo, o lucro real, organiza clientes, orçamentos, materiais e ainda conta com uma IA que te ajuda a precificar e vender mais.
          </p>
        </div>
        <div className="relative">
          <div className="absolute -inset-3 rounded-3xl opacity-50 blur-2xl" style={{ background: "linear-gradient(135deg,#c2185b,#d4af37)" }} />
          <div className="relative rounded-2xl overflow-hidden" style={{ border: "2px solid rgba(212,175,55,0.5)", boxShadow: "0 18px 40px rgba(154,31,74,0.25)" }}>
            <img src="/placeholder.svg" alt="PreciArte dashboard" className="w-full h-auto" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default WhatIsMae;
