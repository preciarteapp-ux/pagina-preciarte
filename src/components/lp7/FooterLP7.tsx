import { Icon } from '@iconify/react';
import { T } from './ui';

const FooterLP7 = () => (
  <footer className="bg-lp7-ink border-t border-white/[0.07] pt-12 pb-[120px] lg:py-14">
    <div className="max-w-lp7-container mx-auto px-5 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <span className="font-lp7 font-semibold text-[20px] text-white">PreciArte</span>
          <p className={`${T.small} text-white/45 mt-2 max-w-[34ch]`}>
            O sistema de quem produz sob encomenda. Preço certo, direto no seu celular.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {[
            { icon: 'ph:instagram-logo', label: 'Instagram' },
            { icon: 'ph:whatsapp-logo', label: 'WhatsApp' },
          ].map(({ icon, label }) => (
            <a
              key={icon}
              href="#planos"
              aria-label={label}
              className="inline-flex items-center justify-center w-[42px] h-[42px] rounded-full border border-white/12 text-white/65 transition-colors hover:border-white/35 hover:text-white"
            >
              <Icon icon={icon} width={19} />
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-10 pt-7 border-t border-white/[0.07]">
        <p className={`${T.small} text-white/35`}>© 2026 PreciArte. Todos os direitos reservados.</p>
        {/* trocar pelo dado real assim que disponível */}
        <p className={`${T.small} text-lp7-violet`}>[NECESSÁRIO: razão social e CNPJ]</p>
      </div>
    </div>
  </footer>
);

export default FooterLP7;
