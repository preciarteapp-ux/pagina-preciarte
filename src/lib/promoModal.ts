/**
 * Liga o popup promocional ao banner de desconto do topo.
 *
 * O banner não aparece sozinho: ele espera a pessoa resgatar a oferta no
 * popup. Como os dois vivem em pontos diferentes da árvore, o aviso vai por
 * um evento no window em vez de estado compartilhado.
 */

const CLAIM_EVENT = "promo-discount:claim";

/** Avisa que o usuário resgatou o desconto no popup. */
export const claimDiscount = () => {
  window.dispatchEvent(new CustomEvent(CLAIM_EVENT));
};

/** Escuta o resgate do desconto. Retorna o cleanup. */
export const onDiscountClaim = (cb: () => void) => {
  window.addEventListener(CLAIM_EVENT, cb);
  return () => window.removeEventListener(CLAIM_EVENT, cb);
};
