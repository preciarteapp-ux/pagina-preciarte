import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import DiscountPopup from "@/components/DiscountPopup";

const faqs = [
  {
    question: "Como calcular preço de papelaria personalizada?",
    answer: "O PreciArte calcula automaticamente o preço ideal considerando custos de materiais, mão de obra, tempo de produção e margem de lucro desejada. Basta cadastrar seus produtos e o sistema faz todo o cálculo para você, garantindo que você nunca mais venda no prejuízo."
  },
  {
    question: "Qual a margem de lucro ideal para convites personalizados?",
    answer: "A margem de lucro ideal para convites personalizados varia entre 50% e 100%, dependendo da complexidade do trabalho e do mercado local. O PreciArte ajuda você a definir a margem correta para cada tipo de produto, considerando todos os custos envolvidos."
  },
  {
    question: "Como calcular custo de impressão para papelaria?",
    answer: "Para calcular o custo de impressão, você precisa considerar: custo do papel por folha, tinta utilizada, desgaste da impressora e energia. O PreciArte automatiza esse cálculo, permitindo que você cadastre seus custos uma vez e o sistema calcule automaticamente para cada produto."
  },
  {
    question: "Como fazer orçamento profissional para papelaria?",
    answer: "Um orçamento profissional deve incluir: descrição detalhada dos produtos, quantidade, preço unitário, prazo de entrega e condições de pagamento. O PreciArte gera orçamentos profissionais automaticamente, com sua logo e layout personalizado, prontos para enviar ao cliente."
  },
  {
    question: "O PreciArte funciona para todos os tipos de papelaria?",
    answer: "Sim! O PreciArte foi desenvolvido para atender conviterias, papelarias de festa, scrapbook, artigos personalizados e qualquer negócio que trabalhe com produtos de papel. O sistema é flexível e permite cadastrar qualquer tipo de produto com seus custos específicos."
  },
  {
    question: "Como o PreciArte ajuda a aumentar o lucro?",
    answer: "O PreciArte identifica produtos que você está vendendo com margem baixa ou até no prejuízo. Com relatórios detalhados e precificação correta, nossos clientes relatam aumento médio de 40% no lucro real após começarem a usar o sistema."
  },
  {
    question: "O sistema funciona no celular?",
    answer: "Sim! O PreciArte é 100% responsivo e funciona perfeitamente em smartphones, tablets e computadores. Você pode acessar seus cálculos, catálogo e orçamentos de qualquer lugar, a qualquer momento."
  },
  {
    question: "Preciso de conhecimento técnico para usar?",
    answer: "Não! O PreciArte foi criado pensando em empreendedores de papelaria que não têm tempo para sistemas complicados. A interface é intuitiva e você consegue começar a usar em minutos, sem treinamento."
  },
  {
    question: "Como funciona o catálogo online?",
    answer: "O catálogo online permite que você compartilhe seus produtos via WhatsApp ou redes sociais. Seus clientes podem ver fotos, descrições e preços de forma profissional, facilitando as vendas e reduzindo o tempo gasto tirando dúvidas."
  },
  {
    question: "Posso testar antes de assinar?",
    answer: "Oferecemos garantia de 7 dias. Se você não ficar satisfeito por qualquer motivo, devolvemos 100% do seu dinheiro, sem perguntas. Assim você pode testar o sistema sem risco."
  }
];

const FAQ = () => {
  useEffect(() => {
    // Update page title for FAQ
    document.title = "FAQ - Perguntas Frequentes sobre Precificação de Papelaria | PreciArte";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Tire suas dúvidas sobre precificação de papelaria personalizada. Aprenda como calcular preços, margem de lucro, custos de impressão e muito mais.');
    }
  }, []);

  const scrollToPlans = () => {
    window.location.href = '/#pricing';
  };

  return (
    <main className="min-h-screen bg-background">
      <SEOHead includeFAQSchema />
      <DiscountPopup onClaimDiscount={() => undefined} />
      
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Voltar ao início</span>
          </Link>
          <Button variant="hero" size="sm" onClick={scrollToPlans}>
            Começar Agora
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20 mb-6">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Central de Ajuda</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Perguntas Frequentes sobre Precificação de Papelaria
            </h1>
            <p className="text-xl text-muted-foreground">
              Tire suas dúvidas sobre como calcular preços, definir margem de lucro e profissionalizar sua papelaria personalizada.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-card rounded-xl border border-border px-6 shadow-sm"
                >
                  <AccordionTrigger className="text-left text-lg font-medium text-card-foreground hover:text-primary py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Ainda tem dúvidas?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Conheça o PreciArte e veja como é fácil precificar seus produtos corretamente.
            </p>
            <Button variant="hero" size="lg" onClick={scrollToPlans}>
              Conhecer o PreciArte
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default FAQ;
