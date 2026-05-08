import { Star, Quote } from "lucide-react";
import mariaImg from "@/assets/testimonial-maria.jpg";
import joaoImg from "@/assets/testimonial-juliana.jpg";
import anaImg from "@/assets/testimonial-ana.jpg";

const testimonials = [
  {
    name: "Maria Silva",
    role: "Papelaria Festa Feliz",
    image: mariaImg,
    quote:
      "Antes eu achava que estava lucrando, mas quando comecei a usar o PreciArte percebi que estava no prejuízo em vários produtos! Agora meu lucro real aumentou 40%!",
    result: "+40% de lucro real",
    rating: 5,
  },
  {
    name: "Juliana Santos",
    role: "Arte em Papel",
    image: joaoImg,
    quote:
      "O catálogo online mudou minha vida! Agora meus clientes veem os produtos pelo WhatsApp e já chegam sabendo o que querem. Minhas vendas triplicaram!",
    result: "3x mais vendas",
    rating: 5,
  },
  {
    name: "Ana Costa",
    role: "Conviteria Encanto",
    image: anaImg,
    quote:
      "A IA de marketing me ajuda a criar conteúdo todo dia! Economizo horas e meu Instagram nunca esteve tão profissional.",
    result: "5h economizadas/semana",
    rating: 5,
  },
];

const TestimonialsLP2 = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
            Resultados{" "}
            <span className="text-primary">Reais</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Veja o que papelarias como a sua conquistaram
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 flex flex-col"
            >
              {/* Result badge */}
              <div className="mb-5">
                <span className="inline-block bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-bold px-4 py-1.5 rounded-full">
                  {t.result}
                </span>
              </div>

              {/* Quote */}
              <div className="relative flex-1 mb-6">
                <Quote className="w-8 h-8 text-primary/20 absolute -top-1 -left-1" />
                <p className="text-card-foreground leading-relaxed pl-6 italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <img
                  src={t.image}
                  alt={`${t.name} - ${t.role}`}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <p className="font-bold text-card-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsLP2;
