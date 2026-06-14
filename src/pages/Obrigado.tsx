import { useEffect, useState } from "react";
import { CheckCircle2, Copy, Check, ExternalLink, Mail, Lock, MessageCircle } from "lucide-react";

const PRECIARTE_URL = "https://preciarte.com.br/";
const SENHA = "preci123@";
const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1!%20Acabei%20de%20comprar%20o%20PreciArte%20e%20preciso%20de%20ajuda%20com%20o%20acesso.";

const Obrigado = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "Acesso Confirmado - PreciArte";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Seu acesso ao PreciArte foi confirmado. Faça login agora e comece a precificar com lucro.");
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex, nofollow");

    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Purchase");
      (window as any).fbq("track", "PageView");
    }
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SENHA);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <>


      <div
        className="min-h-screen w-full flex flex-col items-center justify-start px-4 py-10 md:py-16"
        style={{ background: "#F8F6F3", color: "#2C2C2C", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <div className="w-full max-w-2xl">
          {/* Hero confirmação */}
          <div className="text-center mb-10">
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
              style={{ background: "rgba(34,197,94,0.12)" }}
            >
              <CheckCircle2 size={56} strokeWidth={2} style={{ color: "#16a34a" }} />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-3" style={{ color: "#2C2C2C", letterSpacing: "-1px" }}>
              Parabéns! Seu acesso ao <span style={{ color: "#8B1A4A" }}>PreciArte</span> está confirmado
            </h1>
            <p className="text-base md:text-lg" style={{ color: "rgba(44,44,44,0.7)" }}>
              Sua compra foi aprovada com sucesso. Siga o passo a passo abaixo para começar a usar agora mesmo.
            </p>
          </div>

          {/* CTA principal */}
          <a
            href={PRECIARTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-full font-bold text-base md:text-lg mb-8 transition-transform hover:scale-[1.02] shadow-lg"
            style={{
              background: "linear-gradient(135deg, #8B1A4A, #E07B2A)",
              color: "#fff",
              boxShadow: "0 10px 30px rgba(139,26,74,0.3)",
            }}
          >
            Acessar PreciArte agora
            <ExternalLink size={18} />
          </a>

          {/* Card de credenciais */}
          <div
            className="rounded-2xl p-6 md:p-8 mb-8"
            style={{
              background: "#fff",
              border: "1.5px solid rgba(139,26,74,0.15)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
            }}
          >
            <h2 className="text-xl font-bold mb-5" style={{ color: "#2C2C2C" }}>
              Seus dados de acesso
            </h2>

            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "#F8F6F3" }}>
                <Mail size={20} style={{ color: "#8B1A4A", marginTop: 2 }} />
                <div className="flex-1">
                  <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "rgba(44,44,44,0.5)" }}>
                    E-mail
                  </div>
                  <div className="text-sm md:text-base font-medium" style={{ color: "#2C2C2C" }}>
                    Use o <strong>mesmo e-mail</strong> que você usou na compra
                  </div>
                </div>
              </div>

              {/* Senha */}
              <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "#F8F6F3" }}>
                <Lock size={20} style={{ color: "#8B1A4A", marginTop: 2 }} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "rgba(44,44,44,0.5)" }}>
                    Senha
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <code
                      className="text-lg md:text-xl font-bold px-3 py-1.5 rounded-lg"
                      style={{ background: "#fff", color: "#8B1A4A", border: "1px solid rgba(139,26,74,0.2)", fontFamily: "monospace" }}
                    >
                      {SENHA}
                    </code>
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all"
                      style={{
                        background: copied ? "rgba(22,163,74,0.12)" : "#8B1A4A",
                        color: copied ? "#16a34a" : "#fff",
                      }}
                    >
                      {copied ? <><Check size={14} /> Copiada</> : <><Copy size={14} /> Copiar</>}
                    </button>
                  </div>
                  <div className="text-xs mt-2" style={{ color: "rgba(44,44,44,0.6)" }}>
                    Recomendamos alterar a senha após o primeiro acesso.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Passo a passo */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-5 text-center" style={{ color: "#2C2C2C" }}>
              Passo a passo para acessar
            </h2>
            <div className="space-y-3">
              {[
                { n: 1, t: "Acesse o site", d: "Clique no botão acima ou entre em preciarte.com.br" },
                { n: 2, t: "Faça login", d: "Use o e-mail que você utilizou na compra" },
                { n: 3, t: "Digite a senha", d: `Insira a senha ${SENHA} e clique em entrar` },
                { n: 4, t: "Comece a usar", d: "Cadastre seus produtos e comece a precificar com lucro" },
              ].map((s) => (
                <div
                  key={s.n}
                  className="flex items-start gap-4 p-4 rounded-xl"
                  style={{ background: "#fff", border: "1px solid rgba(44,44,44,0.08)" }}
                >
                  <div
                    className="flex items-center justify-center w-9 h-9 rounded-full font-bold text-sm flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #8B1A4A, #E07B2A)",
                      color: "#fff",
                    }}
                  >
                    {s.n}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-base mb-0.5" style={{ color: "#2C2C2C" }}>
                      {s.t}
                    </div>
                    <div className="text-sm" style={{ color: "rgba(44,44,44,0.65)" }}>
                      {s.d}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suporte */}
          <div
            className="rounded-2xl p-6 text-center"
            style={{ background: "rgba(139,26,74,0.05)", border: "1px solid rgba(139,26,74,0.15)" }}
          >
            <p className="text-sm md:text-base mb-4" style={{ color: "#2C2C2C" }}>
              <strong>Dúvidas?</strong> Nosso time está pronto para ajudar você a começar.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-transform hover:scale-[1.02]"
              style={{ background: "#25D366", color: "#fff" }}
            >
              <MessageCircle size={18} />
              Falar com o suporte no WhatsApp
            </a>
          </div>

          <div className="text-center mt-8 text-xs" style={{ color: "rgba(44,44,44,0.4)" }}>
            © PreciArte — Bem-vinda(o) à comunidade!
          </div>
        </div>
      </div>
    </>
  );
};

export default Obrigado;
