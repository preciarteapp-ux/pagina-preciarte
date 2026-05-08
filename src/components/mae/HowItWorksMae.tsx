const steps = [
  { n: "1", title: "Cadastre seus produtos", desc: "Adicione materiais, custos e tempo de produção em poucos minutos." },
  { n: "2", title: "Calcule o preço justo", desc: "O sistema mostra o preço ideal com a margem de lucro que você quer." },
  { n: "3", title: "Venda com confiança", desc: "Acompanhe seu lucro real e cresça com decisões baseadas em números." },
];

const HowItWorksMae = () => (
  <section className="relative py-12 md:py-20 overflow-hidden" style={{ background: "#fff8f0" }}>
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.7rem,4.5vw,2.6rem)", color: "#5a2438" }}>
          Em 3 passos você muda o jogo
        </h2>
        <p style={{ color: "#6b3a4d" }}>Sem complicação, sem planilha, sem dor de cabeça.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {steps.map((s, i) => (
          <div key={i} className="relative rounded-2xl p-5 md:p-7 text-center" style={{ background: "rgba(255,255,255,0.92)", border: "1px solid rgba(212,175,55,0.4)", boxShadow: "0 12px 32px rgba(154,31,74,0.12)" }}>
            <div className="w-12 h-12 md:w-14 md:h-14 mx-auto rounded-full flex items-center justify-center text-white text-lg md:text-xl font-bold mb-3 md:mb-4" style={{ background: "linear-gradient(135deg,#c2185b,#d4af37)", boxShadow: "0 8px 20px rgba(212,175,55,0.4)", fontFamily: "'Playfair Display', serif" }}>
              {s.n}
            </div>
            <h3 className="font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#5a2438", fontSize: "1.2rem" }}>{s.title}</h3>
            <p className="text-sm" style={{ color: "#6b3a4d" }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksMae;
