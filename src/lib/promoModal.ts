/**
 * Coordena os popups da página para que não apareçam sobrepostos.
 *
 * O WeekendPromoPopup é um modal que cobre a tela inteira (z-100) e abre aos
 * 2,5s. O DiscountPopup é o banner do topo (z-50) e abre aos 3s — ou seja,
 * abria por baixo do modal e o usuário só o encontrava depois de fechar tudo.
 *
 * Aqui o modal anuncia quando está aberto e o banner espera a vez.
 */

const EVENT = "promo-modal:change";

let openCount = 0;

export const isPromoModalOpen = () => openCount > 0;

export const setPromoModalOpen = (open: boolean) => {
  openCount = Math.max(0, openCount + (open ? 1 : -1));
  window.dispatchEvent(new CustomEvent(EVENT));
};

/** Registra um callback para quando algum modal abrir/fechar. Retorna o cleanup. */
export const onPromoModalChange = (cb: () => void) => {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
};

const CLAIM_EVENT = "promo-discount:claim";

/**
 * Avisa que o usuário aceitou a oferta do modal. O banner do topo aparece na
 * hora, sem esperar os 3 segundos do fluxo normal, para que a pessoa veja o
 * desconto valendo e siga lendo a página de onde parou.
 */
export const claimDiscount = () => {
  window.dispatchEvent(new CustomEvent(CLAIM_EVENT));
};

export const onDiscountClaim = (cb: () => void) => {
  window.addEventListener(CLAIM_EVENT, cb);
  return () => window.removeEventListener(CLAIM_EVENT, cb);
};
