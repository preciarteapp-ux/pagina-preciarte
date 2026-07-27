import { Icon } from '@iconify/react';
import { T } from './ui';

/**
 * RODAPÉ
 *
 * O placeholder de CNPJ fica visível de propósito até o dado real chegar:
 * página de venda sem CNPJ no rodapé gera desconfiança e prejudica na
 * comparação com concorrente que tem.
 */

const COLUNAS = [
  {
    titulo: 'Produto',
    links: [
      { label: 'Como funciona', href: '#problema' },
      { label: 'Planos', href: '#planos' },
      { label: 'Perguntas frequentes', href: '#planos' },
    ],
  },
  {
    titulo: 'Ajuda',
    links: [
      { label: 'Suporte no WhatsApp', href: '#planos' },
      { label: 'E-mail de suporte', href: '#planos' },
    ],
  },
  {
    titulo: 'Legal',
    links: [
      { label: 'Termos de uso', href: '#planos' },
      { label: 'Política de privacidade', href: '#planos' },
    ],
  },
];

const FooterLP6 = () => (
  <footer className="bg-lp6-ink-deep py-14 lg:py-16">
    <div className="max-w-lp6-container mx-auto px-6 lg:px-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-12">
        <div>
          <span className="font-lp6 font-bold text-[24px] text-white">PreciArte</span>
          <p className={`${T.small} text-white/60 mt-3 max-w-[32ch]`}>
            Preço certo para quem produz sob encomenda.
          </p>
        </div>

        {COLUNAS.map((c) => (
          <div key={c.titulo}>
            <h3 className="font-lp6 font-semibold text-[15px] text-white">{c.titulo}</h3>
            <ul className="mt-4 space-y-2">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className={`${T.small} text-white/60 hover:text-white transition-colors duration-200`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 pt-8 border-t border-white/[0.10]">
        <div className="text-center sm:text-left">
          <p className={`${T.small} text-white/[0.45]`}>
            © 2026 PreciArte. Todos os direitos reservados.
          </p>
          {/* trocar pelo dado real assim que disponível */}
          <p className={`${T.small} text-lp6-300 mt-1`}>[NECESSÁRIO: razão social e CNPJ]</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Solar é set de UI e não tem logo de marca — brand icons vêm do Phosphor */}
          {[
            { icon: 'ph:instagram-logo', label: 'Instagram' },
            { icon: 'ph:whatsapp-logo', label: 'WhatsApp' },
          ].map(({ icon, label }) => (
            <a
              key={icon}
              href="#planos"
              aria-label={label}
              className="inline-flex items-center justify-center w-[40px] h-[40px] rounded-full border border-white/[0.12] text-white/70 transition-colors hover:border-white/30 hover:text-white"
            >
              <Icon icon={icon} width={18} />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default FooterLP6;
