import { T, Reveal, R, Rotulo, Botao } from './ui';
import Player from './Player';
import { ANUAL_PARCELA } from './oferta';

/**
 * Topo da /apresentacao — o video e o protagonista.
 *
 * O titulo e curto e o texto acima do video tem tres linhas no maximo, porque
 * tudo que entra aqui empurra o player para baixo da dobra. Numa pagina em que
 * o produto E o video, o video tem que aparecer sem rolagem no celular.
 *
 * NAO TEM PRECO AQUI
 * A pagina e demonstrativa: quem chegou quer ver o sistema, nao ser cobrado na
 * primeira tela. O preco aparece depois do video, quando ja da para julgar se
 * vale. O unico numero no topo e o do botao, e ele e ancora — leva para a
 * secao de planos, nao para o checkout.
 */
const Hero = () => (
  // id="topo": e ele que a barra fixa observa para so aparecer depois do video.
  <section id="topo" className="relative overflow-hidden bg-white">
    <div className="ap-malha absolute inset-0 pointer-events-none" aria-hidden="true" />

    <div className="relative max-w-ap-container mx-auto px-5 lg:px-8 pt-5 pb-14 lg:pb-20">
      <nav className="flex items-center justify-between h-[58px]">
        <span className="font-ap font-bold text-[19px] lg:text-[21px] tracking-[-0.02em] text-ap-tinta">
          Preci<span className="text-ap-rosaforte">Arte</span>
        </span>
        <Botao
          href="#planos"
          tone="contorno"
          external={false}
          seta={false}
          trackId="ap-nav"
          className="!h-[38px] !px-[18px] !text-[13px]"
        >
          Ver planos
        </Botao>
      </nav>

      <div className="text-center max-w-ap-prose mx-auto mt-10 lg:mt-14">
        <Reveal>
          <Rotulo icon="solar:play-circle-bold">Demonstração do sistema</Rotulo>
        </Reveal>

        <Reveal delay={80}>
          <h1 className={`${T.h1} text-ap-tinta mt-5`}>
            Olha o PreciArte <R>por dentro</R> antes de assinar.
          </h1>
        </Reveal>

        <Reveal delay={150}>
          <p className={`${T.body} text-ap-suave mt-5 max-w-[54ch] mx-auto`}>
            O vídeo passa pelo sistema tela por tela: cadastrar o material, achar o preço,
            fechar o pedido, cobrar e ver quanto sobrou. Sem corte de mágica no meio.
          </p>
        </Reveal>
      </div>

      <Reveal delay={210} className="mt-9 lg:mt-12">
        <div className="max-w-ap-narrow mx-auto">
          <div className="ap-sombra-video rounded-[16px] lg:rounded-[22px] overflow-hidden bg-ap-tinta">
            <Player />
          </div>
        </div>
      </Reveal>

      <Reveal delay={270}>
        <div className="flex flex-col items-center gap-3 mt-8 lg:mt-10">
          <Botao href="#planos" size="lg" external={false} trackId="ap-hero" className="w-full sm:w-auto">
            Assinar por {ANUAL_PARCELA} por mês
          </Botao>
          <p className={`${T.mini} text-ap-suave`}>
            Pagamento no site do PreciArte, no cartão ou no Pix
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Hero;
