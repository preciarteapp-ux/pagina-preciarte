import { useEffect, useRef, useState } from 'react';

/**
 * Diz se a barra fixa da /apresentacao deve aparecer.
 *
 * POR QUE NAO REAPROVEITA `useBarraVisivel` DA BLACK
 * Aquele hook liga a barra quando `#sistema` encosta na viewport. Nas paginas
 * da Black o hero e bem mais alto que a tela, entao `#sistema` so encosta
 * depois de uma rolagem inteira. Aqui o hero tem 813px num celular de 844px:
 * `#sistema` ja esta na tela com a pagina no topo, e a barra nascia por cima
 * do proprio botao do hero — medido no Chrome, nao suposto.
 *
 * A regra daqui e outra: a barra so aparece quando o HERO saiu de vista. Ou
 * seja, depois que a pessoa passou do video. Enquanto o video esta na tela, o
 * CTA que vale e o de baixo dele.
 *
 * Depende de #topo, #planos e footer existirem. Faltando algum, o observador
 * daquele alvo nao liga — nao quebra, mas a barra pode nunca aparecer.
 */
export function useBarraAp(): boolean {
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

    liga('#topo', (dentro) => { passouHero.current = !dentro; });
    liga('#planos', (dentro) => { nosPlanos.current = dentro; });
    liga('footer', (dentro) => { noRodape.current = dentro; });

    return () => obs.forEach((o) => o.disconnect());
  }, []);

  return visivel;
}
