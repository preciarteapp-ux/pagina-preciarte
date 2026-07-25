import { Icon } from '@iconify/react';
import { T, SecondaryButton } from './ui';

const COLUNAS = [
  { titulo: 'Produto', links: [['Recursos', '#recursos'], ['Como funciona', '#como-funciona'], ['Preços', '#precos']] },
  { titulo: 'Empresa', links: [['Perguntas frequentes', '#faq'], ['Programa de Indicação', '#'], ['Contato', '#']] },
  { titulo: 'Legal', links: [['Termos de uso', '#'], ['Política de privacidade', '#']] },
];

export default function FooterLP5() {
  return (
    /* mesmo fundo da dobra 10, sem divisor — as duas leem como uma peça só */
    <footer id="footer" className="bg-lp5n-900 pb-[88px] lg:pb-0">
      <div className="max-w-lp5-container mx-auto px-5 lg:px-[120px] py-[64px] lg:py-[80px]">
        <div className="flex items-center justify-between gap-4">
          <img src="/lp5/logo-preciarte-dark.png" alt="PreciArte" className="h-7 w-auto" loading="lazy" />
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`${T.small} inline-flex items-center gap-3 text-white/[0.65] hover:text-white transition-colors`}
          >
            <span className="hidden sm:inline">Voltar ao topo</span>
            <span className="inline-flex w-11 h-11 items-center justify-center rounded-full border border-white/[0.18]">
              <Icon icon="solar:arrow-up-linear" width={18} />
            </span>
          </button>
        </div>

        <hr className="border-0 h-px bg-white/10 my-10" />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <p className={`${T.h3} text-white`}>Preço certo, orçamento profissional e financeiro no lugar.</p>
            <SecondaryButton
              href="https://wa.me/5511999999999" variant="dark"
              className="mt-5 !h-[44px] !px-[20px] !text-[14px]" trackId="lp5-footer-contato"
            >
              FALE CONOSCO
            </SecondaryButton>
          </div>

          {COLUNAS.map((c) => (
            <div key={c.titulo}>
              <p className={`${T.caption} text-white/50`}>{c.titulo}</p>
              <ul className="mt-2">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className={`${T.small} inline-flex items-center min-h-[44px] text-white/[0.65] hover:text-white transition-colors`}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="border-0 h-px bg-white/10 my-8" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 text-center lg:text-left">
          {/* ⚠ PENDENTE — razão social e CNPJ não fornecidos.
              Placeholder literal de propósito: página com checkout sem CNPJ
              visível aumenta abandono no pagamento. Não inventar dado. */}
          <p className={`${T.small} text-white/50`}>
            © 2026 PreciArte · [RAZÃO SOCIAL] · CNPJ [NÚMERO]
          </p>
          <div className="flex items-center gap-3">
            {[['solar:instagram-linear', 'Instagram'], ['solar:chat-round-line-linear', 'WhatsApp']].map(([icon, label]) => (
              <a
                key={label} href="#" aria-label={label}
                className="inline-flex w-11 h-11 items-center justify-center rounded-full border border-white/[0.18] text-white/[0.65] hover:text-white hover:border-white/40 transition-colors"
              >
                <Icon icon={icon} width={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
