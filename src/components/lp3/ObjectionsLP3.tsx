import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const objections = [
  {
    q: '"Sou ruim com tecnologia."',
    a: 'Se você usa WhatsApp, você usa o PreciArte. Nenhum termo técnico. Nenhuma configuração complicada. Você aprende o essencial em menos de 30 minutos — e o suporte está disponível se precisar.',
  },
  {
    q: '"Meu produto é muito específico."',
    a: 'Se tem material e tem tempo de produção — o PreciArte calcula. Papelaria, MDF, sublimação, laser, impressão 3D, velas, acrílico, encadernação. Se você faz sob encomenda, o sistema funciona.',
  },
  {
    q: '"Já uso planilha e me viro."',
    a: 'Planilha não calcula sozinha, não gera PDF, não tem catálogo, não edita foto e não te avisa quando você erra uma fórmula. Quando o preço tá errado na planilha, você não percebe. No PreciArte, o número é automático — sem margem pra erro humano.',
  },
  {
    q: '"R$ 29,90 tá pesado agora."',
    a: 'É menos que um kit de material. E 87% dos usuários descobrem nos primeiros dias que estavam cobrando abaixo do ideal. Quando você ajusta o preço de um único pedido, o sistema já se paga.',
  },
  {
    q: '"A IA vai estragar minha peça na foto?"',
    a: 'Não. A IA troca só o fundo — seu produto aparece idêntico. Cada detalhe, cada acabamento, cada textura preservada. O que muda é o cenário ao redor.',
  },
  {
    q: '"E se eu não gostar?"',
    a: '7 dias grátis, sem cadastrar cartão. Você testa tudo, usa de verdade, e decide com calma. Se não resolver, não paga nada — sem complicação.',
  },
];

const ObjectionsLP3 = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="px-5 py-16 md:py-24">
      <div
        className="max-w-3xl mx-auto transition-all duration-500"
        style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ color: '#2C2C2C' }}>
          Dúvidas frequentes
        </h2>

        <Accordion type="single" collapsible className="space-y-3">
          {objections.map((o, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-xl border px-5"
              style={{ borderColor: 'rgba(139,26,74,0.15)', background: 'white' }}
            >
              <AccordionTrigger className="text-left text-base md:text-lg font-semibold" style={{ color: '#2C2C2C' }}>
                {o.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm md:text-base leading-relaxed" style={{ color: '#6B6B6B' }}>
                {o.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default ObjectionsLP3;
