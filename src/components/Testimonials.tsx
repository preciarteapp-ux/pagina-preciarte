import { Star } from "lucide-react";
import mariaImg from "@/assets/testimonial-maria.jpg";
import joaoImg from "@/assets/testimonial-joao.jpg";
import anaImg from "@/assets/testimonial-ana.jpg";

const testimonials = [
  {
    name: "Maria Silva",
    role: "Papelaria Festa Feliz",
    image: mariaImg,
    quote: "Antes eu achava que estava lucrando, mas quando comecei a usar o PreciArte percebi que estava no prejuízo em vários produtos! Agora meu lucro real aumentou 40%!",
    rating: 5
  },
  {
    name: "João Santos",
    role: "Arte em Papel",
    image: joaoImg,
    quote: "O catálogo online mudou minha vida! Agora meus clientes veem os produtos pelo WhatsApp e já chegam sabendo o que querem. Minhas vendas triplicaram!",
    rating: 5
  },
  {
    name: "Ana Costa",
    role: "Conviteria Encanto",
    image: anaImg,
    quote: "A IA de marketing me ajuda a criar conteúdo todo dia! Economizo horas e meu Instagram nunca esteve tão profissional.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-xl text-muted-foreground">
            Centenas de papelarias já transformaram seus negócios com o PreciArte
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-card rounded-2xl p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 border border-border"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-card-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <p className="font-semibold text-card-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
