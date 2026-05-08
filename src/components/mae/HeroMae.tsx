import { useEffect, useRef } from "react";
import { ArrowRight, Heart } from "lucide-react";
import FallingPetals from "./FallingPetals";

const HeroMae = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const scrollToPlans = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const scriptSrc = "https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js";
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      document.head.appendChild(script);
    }
    if (iframeRef.current) {
      iframeRef.current.src = `https://scripts.converteai.net/f04f0c1f-d8c5-4ccf-aa51-6f81483a882e/players/696bebcc521058214ca6e141/v4/embed.html${window.location.search || "?"}&vl=${encodeURIComponent(window.location.href)}`;
    }
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at top, #fff0f4 0%, #fde7ed 35%, #f8d8e2 100%)",
      }}
    >
      <FallingPetals count={14} />

      {/* decorative blurred blobs */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full opacity-40 blur-3xl pointer-events-none" style={{ background: "#f5b7c8" }} />
      <div className="absolute bottom-0 -right-20 w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none" style={{ background: "#d4af37" }} />

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-6 animate-fade-in">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(212,175,55,0.6)",
                color: "#9a1f4a",
              }}
            >
              <Heart className="w-4 h-4 fill-current" />
              Especial Dia das Mães
            </div>
          </div>

          {/* Heading */}
          <h1
            className="text-center font-bold mb-4 leading-tight animate-fade-in"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 6vw, 4rem)",
              background: "linear-gradient(120deg, #9a1f4a 0%, #c2185b 40%, #d4af37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Um presente que transforma o<br className="hidden sm:block" /> negócio dela
          </h1>

          <p
            className="text-center mb-3 font-semibold"
            style={{
              color: "#5a2438",
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            PreciArte — o sistema que toda papelarista merece
          </p>

          <p className="text-center text-base md:text-lg max-w-2xl mx-auto mb-8" style={{ color: "#6b3a4d" }}>
            Nesta semana especial do Dia das Mães, dê (ou ganhe) o presente que vai
            organizar, profissionalizar e fazer o negócio lucrar de verdade.
          </p>

          {/* CTA */}
          <div className="flex justify-center mb-12">
            <button
              onClick={scrollToPlans}
              data-track-id="hero-mae-cta"
              data-track-type="cta"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold text-base sm:text-lg transition-all hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #c2185b 0%, #9a1f4a 50%, #d4af37 100%)",
                boxShadow: "0 12px 32px rgba(154,31,74,0.45), 0 0 0 1px rgba(212,175,55,0.4) inset",
              }}
            >
              Quero meu presente
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* VSL */}
          <div className="relative max-w-4xl mx-auto">
            <div
              className="absolute -inset-2 rounded-3xl opacity-60 blur-2xl"
              style={{ background: "linear-gradient(135deg, #c2185b, #d4af37)" }}
            />
            <div
              className="relative rounded-2xl overflow-hidden bg-black"
              style={{
                border: "2px solid rgba(212,175,55,0.6)",
                boxShadow: "0 24px 60px rgba(154,31,74,0.35)",
              }}
            >
              <div id="ifr_696bebcc521058214ca6e141_wrapper" style={{ margin: "0 auto", width: "100%" }}>
                <div style={{ position: "relative", paddingTop: "56.25%" }} id="ifr_696bebcc521058214ca6e141_aspect">
                  <iframe
                    ref={iframeRef}
                    frameBorder="0"
                    allowFullScreen
                    src="about:blank"
                    id="ifr_696bebcc521058214ca6e141"
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                    referrerPolicy="origin"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroMae;
