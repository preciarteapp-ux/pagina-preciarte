/**
 * Oferta do Esquenta Black Friday — serve /black e /black1.
 *
 * Fonte única dos números e do link. A parcela é o número herói aqui
 * (decisão do Douglas), então a âncora é mês contra mês: R$ 39,90 do
 * plano mensal contra R$ 12,56. Mesma unidade, comparação imediata.
 *
 * Não importa CHECKOUT_ANUAL da lp6 de propósito: aquela constante
 * aponta para a oferta vigente de R$ 139,90. Esta é outra oferta do
 * mesmo produto (off=ewuHKU) e as duas não podem se arrastar.
 */

export const CHECKOUT = 'https://pay.onprofit.com.br/CUTCm7GF?off=ewuHKU';

/** O número que lidera a página. */
export const PRECO_PARCELA = 'R$ 12,56';
export const PARCELAS = 12;

/** Secundário: sai mais barato ainda, mas assusta mais no primeiro olhar. */
export const PRECO_VISTA = 'R$ 117,90';

/** Âncora mês a mês — é o que a pessoa paga hoje no plano mensal. */
export const PRECO_ANCORA_MES = 'R$ 39,90';
export const PRECO_ANCORA_ANO = 'R$ 478,80';

/** 12 × 39,90 = 478,80 contra 12 × 12,56 = 150,72. */
export const ECONOMIA = 'R$ 328,08';
export const DESCONTO = '69%';

/* ── Plano mensal ────────────────────────────────────────────────
   Mesmo link que todas as outras landings usam. A campanha de Black
   Friday criou oferta própria só para o anual (off=ewuHKU); o mensal
   segue no preço de tabela. Se um dia houver oferta mensal de BF, é
   trocar aqui. */
export const CHECKOUT_MENSAL = 'https://lastlink.com/p/C637D294C/checkout-payment/';
export const PRECO_MENSAL = 'R$ 39,90';

export const destinoCta = (): string => CHECKOUT || '#planos';
export const ehCheckout = (): boolean => Boolean(CHECKOUT);
