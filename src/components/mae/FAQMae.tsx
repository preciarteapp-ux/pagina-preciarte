import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Funciona no celular?", a: "Sim! O PreciArte funciona 100% no celular, tablet e computador. Não precisa instalar nada, é só acessar pelo navegador." },
  { q: "Posso cancelar quando quiser?", a: "Pode sim. No plano mensal você cancela a qualquer momento, sem multa." },
  { q: "Preciso entender de tecnologia?", a: "Não. O sistema foi feito para ser simples e intuitivo. Se sabe usar WhatsApp, sabe usar o PreciArte." },
  { q: "Atende quais nichos?", a: "Papelaria personalizada, festas, convites, lembrancinhas, scrapbook, artesanato em geral e qualquer produto feito à mão." },
  { q: "Como recebo o acesso?", a: "Imediatamente após a compra, no e-mail cadastrado. Você já pode começar a usar em poucos minutos." },
  { q: "Como funcionam os créditos de IA?", a: "Cada plano vem com créditos para usar a IA assistente. Plano Mensal tem 50/mês e Anual tem 700/ano." },
  { q: "Posso presentear minha mãe ou amiga?", a: "Pode sim! Basta cadastrar o e-mail dela na hora da compra. Vai ser o presente que ela nunca esquecerá." },
];

const FAQMae = () => (
  <section className="relative py-16 md:py-20" style={{ background: "#fff8f0" }}>
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="text-center mb-10">
        <h2 className="font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.7rem,4.5vw,2.6rem)", color: "#5a2438" }}>
          Perguntas frequentes
        </h2>
        <p style={{ color: "#6b3a4d" }}>Tirando suas dúvidas com carinho.</p>
      </div>
      <div className="rounded-2xl p-4 md:p-6" style={{ background: "rgba(255,255,255,0.92)", border: "1px solid rgba(212,175,55,0.4)", boxShadow: "0 12px 30px rgba(154,31,74,0.1)" }}>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} data-track-id={`faq-mae-${i}`}>
              <AccordionTrigger className="text-left font-semibold" style={{ color: "#5a2438", fontFamily: "'Playfair Display', serif" }}>
                {f.q}
              </AccordionTrigger>
              <AccordionContent style={{ color: "#6b3a4d" }}>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default FAQMae;
