/**
 * Oferta do Esquenta Black Friday — serve /black e /black1.
 *
 * Fonte única dos números e do link. Quando a oferta de R$ 119,90 for
 * criada na plataforma, é só preencher CHECKOUT e PARCELA aqui que as
 * duas páginas acompanham.
 *
 * Não importa CHECKOUT_ANUAL da lp6 de propósito: aquela constante
 * aponta para a oferta vigente de R$ 139,90, e as duas não podem se
 * arrastar quando uma mudar.
 */

/** Vazio até a oferta existir. Os CTAs rolam para #planos enquanto isso. */
export const CHECKOUT = '';

export const PRECO_VISTA = 'R$ 119,90';

/** null enquanto não soubermos a parcela — a linha some sozinha.
 *  Não dá para dividir 119,90 por 12: a plataforma cobra juros. */
export const PRECO_PARCELA: string | null = null;
export const PARCELAS = 12;

/** 12 meses do plano mensal a R$ 39,90. É a âncora honesta. */
export const PRECO_ANCORA = 'R$ 478,80';
export const ECONOMIA = 'R$ 358,90';
export const DESCONTO = '75%';

/** Destino dos CTAs: o checkout se existir, senão a seção de planos. */
export const destinoCta = (): string => CHECKOUT || '#planos';
export const ehCheckout = (): boolean => Boolean(CHECKOUT);
