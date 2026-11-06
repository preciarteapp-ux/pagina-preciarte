import { useEffect } from 'react';

/**
 * O video da demonstracao — player VTurb (ConverteAI).
 *
 * POR QUE WEB COMPONENT E NAO IFRAME
 * As outras paginas do repo embutem o player por <iframe src=".../embed.html">
 * e precisam grudar `window.location.search` na src na mao, senao as UTMs nao
 * chegam ao ConverteAI. Aqui o player roda DENTRO da pagina, no mesmo
 * documento: ele le a URL sozinho, e o repasse de UTM deixa de ser uma coisa
 * para dar errado. Foi o embed que o Douglas mandou, e e o melhor dos dois.
 *
 * O ELEMENTO VEM ANTES DO SCRIPT, DE PROPOSITO
 * O <vturb-smartplayer> e renderizado pelo React e o player.js so entra no
 * useEffect, ou seja, depois da montagem. Injetar o script antes do elemento
 * existir faz ele procurar um no que ainda nao esta no DOM e nao achar nada —
 * e o resultado e a area do video preta e parada, sem erro no console.
 *
 * A GUARDA DO querySelector
 * Em desenvolvimento o StrictMode monta o componente duas vezes. Sem a guarda,
 * sao dois player.js na pagina e dois players disputando o mesmo elemento.
 */

const CONTA = 'f04f0c1f-d8c5-4ccf-aa51-6f81483a882e';
const PLAYER = '6aee5f9a000a6e12831da62e';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'vturb-smartplayer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { id?: string };
    }
  }
}

const Player = () => {
  useEffect(() => {
    const src = `https://scripts.converteai.net/${CONTA}/players/${PLAYER}/v4/player.js`;
    if (document.querySelector(`script[src="${src}"]`)) return;
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    document.head.appendChild(s);
  }, []);

  return (
    <vturb-smartplayer
      id={`vid-${PLAYER}`}
      style={{ display: 'block', margin: '0 auto', width: '100%' }}
    >
      {/*
        O padding de 56,25% reserva o espaco 16:9 antes do player carregar. Sem
        ele a pagina inteira pula para baixo quando o video entra, e o pulo cai
        justamente em cima do titulo que a pessoa esta lendo.
      */}
      <div
        className="vturb-player-placeholder"
        style={{
          position: 'relative',
          width: '100%',
          padding: '56.25% 0 0',
          zIndex: 0,
          backgroundColor: '#241B20',
        }}
      />
    </vturb-smartplayer>
  );
};

export default Player;
