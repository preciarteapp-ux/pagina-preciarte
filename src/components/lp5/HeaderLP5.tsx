import { useEffect, useState } from 'react';
import { CTAButton } from './ui';

export default function HeaderLP5() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 h-[72px] transition-all duration-[240ms] ${
        solid ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_2px_rgba(33,31,28,0.05)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-lp5-container mx-auto px-5 lg:px-[120px] h-full flex items-center justify-between gap-4">
        <img
          src={solid ? '/lp5/logo-preciarte.png' : '/lp5/logo-preciarte-dark.png'}
          alt="PreciArte"
          className="h-7 lg:h-8 w-auto"
        />
        <CTAButton
          href="#precos" external={false}
          variant={solid ? 'light' : 'dark'}
          className="!h-[44px] !px-[20px] !text-[14px]"
          trackId="lp5-header"
        >
          <span className="hidden sm:inline">COMEÇAR AGORA</span>
          <span className="sm:hidden">Começar</span>
        </CTAButton>
      </div>
    </header>
  );
}
