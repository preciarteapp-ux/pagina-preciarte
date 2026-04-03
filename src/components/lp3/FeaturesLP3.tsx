import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Calculator, FileText, Clock, Package, ShoppingBag, DollarSign, Camera, PenTool } from 'lucide-react';

const features = [
  {
    icon: Calculator,
    title: 'Precificação automática',
    desc: 'Informe os materiais, o tempo de produção e os custos fixos. O PreciArte calcula o custo real, a margem e o preço certo de cada pedido — automaticamente. Sem fórmula complicada. Sem planilha. Sem achismo. Com número. Com segurança. Com lucro.',
  },
  {
    icon: FileText,
    title: 'Orçamento profissional em PDF',
    desc: 'Com sua logo, os itens, os valores e a chave Pix. Gerado em 1 clique. Enviado pelo WhatsApp em segundos. Seu cliente recebe um documento profissional — e a percepção de valor muda na hora. Menos "vou pensar". Mais "pode confirmar".',
  },
  {
    icon: Clock,
    title: 'Valor real da sua hora',
    desc: 'Você define quanto quer ganhar por mês. O sistema calcula o valor da sua hora e aplica automaticamente em cada pedido. Para cada minuto do seu trabalho ser pago como merece.',
  },
  {
    icon: Package,
    title: 'Controle de materiais e insumos',
    desc: 'Cada material cadastrado com custo por unidade. O sistema calcula automaticamente quanto vai em cada pedido — e te mostra o custo real de cada peça que você faz.',
  },
  {
    icon: ShoppingBag,
    title: 'Catálogo online',
    desc: 'Sua vitrine digital com link personalizado para compartilhar com clientes. Apresentação profissional sem precisar de site, sem agência, sem custo extra.',
  },
  {
    icon: DollarSign,
    title: 'Controle financeiro',
    desc: 'Receitas, despesas e lucro real organizados em um só lugar. Separado do pessoal. Visível todo dia. Feche o mês sabendo exatamente quanto seu negócio gerou.',
  },
  {
    icon: Camera,
    title: 'Foto profissional com IA',
    desc: 'Transforme fotos caseiras em imagens profissionais em 1 clique. A IA troca o fundo — seu produto aparece idêntico, em um cenário limpo e profissional. Sem estúdio. Sem lençol branco. Sem edição complicada.',
  },
  {
    icon: PenTool,
    title: 'Assistente de marketing com IA',
    desc: 'Legendas, ideias de post e scripts de Reels gerados automaticamente. Para você aparecer nas redes com consistência — sem travar na hora de escrever.',
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      className="p-6 md:p-8 rounded-2xl border transition-all duration-600"
      style={{
        borderColor: 'rgba(139,26,74,0.1)',
        background: 'white',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${(index % 2) * 100}ms`,
      }}
    >
      <feature.icon size={32} style={{ color: '#E07B2A' }} className="mb-4" />
      <h3 className="text-xl font-bold mb-3" style={{ color: '#2C2C2C' }}>{feature.title}</h3>
      <p className="text-sm md:text-base leading-relaxed" style={{ color: '#6B6B6B' }}>{feature.desc}</p>
    </div>
  );
};

const FeaturesLP3 = () => (
  <section className="px-5 py-16 md:py-24">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: '#2C2C2C' }}>
        Funcionalidades
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {features.map((f, i) => (
          <FeatureCard key={f.title} feature={f} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesLP3;
