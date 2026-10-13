import { useEffect, useRef, useState } from 'react';

/**
 * Diz se a barra fixa de conversão está aparecendo.
 *
 * Vive fora da BarraFixa porque o botão de WhatsApp precisa da mesma
 * resposta: ele sobe quando a barra está lá e desce quando ela some.
 * Sem isso ele fica flutuando alto no meio da seção de preço, cobrindo
 * a lista de benefícios.
 *
 * Depende de três alvos existirem no DOM: #sistema, #planos e footer.
 * Se algum faltar, o observador daquele alvo simplesmente não liga —
 * não quebra, mas a barra pode nunca aparecer ou nunca sumir.
 */
export function useBarraVisivel(): boolean {
  const [visivel, setVisivel] = useState(false);
  const passouHero = useRef(false);
  const nosPlanos = useRef(false);
  const noRodape = useRef(false);

  useEffect(() => {
    const atualiza = () =>
      setVisivel(passouHero.current && !nosPlanos.current && !noRodape.current);

    const obs: IntersectionObserver[] = [];
    const liga = (sel: string, ao: (dentro: boolean) => void) => {
      const alvo = document.querySelector(sel);
      if (!alvo) return;
      const o = new IntersectionObserver(([e]) => { ao(e.isIntersecting); atualiza(); });
      o.observe(alvo);
      obs.push(o);
    };

    liga('#sistema', (dentro) => { if (dentro) passouHero.current = true; });
    liga('#planos', (dentro) => { nosPlanos.current = dentro; });
    liga('footer', (dentro) => { noRodape.current = dentro; });

    return () => obs.forEach((o) => o.disconnect());
  }, []);

  return visivel;
}
