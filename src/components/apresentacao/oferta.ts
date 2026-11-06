/**
 * Os numeros da /apresentacao — e de onde eles vieram.
 *
 * Tudo aqui foi LIDO da tabela `planos` do app, nao escolhido para a pagina:
 *
 *   mensal                    → R$  39,90   1x
 *   plano-anual-black-friday  → R$ 117,90   ate 12x, 4% de juros por parcela
 *
 * As parcelas sairam da formula do proprio sistema (`src/lib/precos.ts` do
 * rosa-precifica-facil, Tabela Price: PMT = PV x i / (1 - (1+i)^-n)). Com
 * 11790 centavos, 12 parcelas e 4%, da 1256 — os R$ 12,56 que a pagina mostra
 * sao os que o checkout cobra, nao um arredondamento feito aqui.
 *
 * POR QUE O TOTAL PARCELADO APARECE
 * Parcelar tem juros, entao 12 x 12,56 da R$ 150,72 e nao R$ 117,90. O
 * checkout mostra esse total na hora de pagar. Se a pagina esconder, a pessoa
 * descobre com o cartao na mao — e ai o problema nao e o preco, e a confianca.
 *
 * QUANDO O PRECO MUDAR
 * O id do plano anual e `plano-anual-black-friday` porque e uma oferta de Black
 * Friday. Trocar o plano no banco sem trocar o id daqui faz o botao levar para
 * um plano que nao existe mais, e o checkout cai no primeiro da lista — que e o
 * MENSAL. Mexeu no banco, confere este arquivo.
 */

/** Onde mora o checkout proprio do PreciArte (nao e Hotmart nem OnProfit). */
const ASSINAR = 'https://preciarte.com.br/assinar';

/** O id exato do plano na tabela `planos`. Precisa casar, nao e rotulo. */
export const PLANO_ANUAL = 'plano-anual-black-friday';
export const PLANO_MENSAL = 'mensal';

export const CHECKOUT_ANUAL = `${ASSINAR}?plano=${PLANO_ANUAL}`;
export const CHECKOUT_MENSAL = `${ASSINAR}?plano=${PLANO_MENSAL}`;

export const ANUAL_PARCELA = 'R$ 12,56';
export const ANUAL_PARCELAS = 12;
export const ANUAL_VISTA = 'R$ 117,90';
export const ANUAL_TOTAL_PARCELADO = 'R$ 150,72';

export const MENSAL = 'R$ 39,90';

/** Doze meses de mensal, que e com o que o anual se compara de verdade. */
export const ANCORA_ANO = 'R$ 478,80';
export const ECONOMIA = 'R$ 360,90';
export const DESCONTO = '75%';
