import Testimonials from "@/components/Testimonials";

const TestimonialsMae = () => (
  <section className="relative py-10 md:py-16 overflow-hidden" style={{ background: "linear-gradient(180deg,#fde7ed 0%,#fff8f0 100%)" }}>
    <div className="container mx-auto px-4 max-w-6xl text-center mb-2">
      <h2 className="font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.7rem,4.5vw,2.6rem)", color: "#5a2438" }}>
        Mães que já transformaram o negócio
      </h2>
      <p style={{ color: "#6b3a4d" }}>Histórias reais de quem deixou de trabalhar de graça.</p>
    </div>
    <Testimonials />
  </section>
);

export default TestimonialsMae;
