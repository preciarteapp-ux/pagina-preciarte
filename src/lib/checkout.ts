// Utilitário para propagar UTMs e click IDs até os links de checkout (Hotmart, OnProfit, etc.)

const TRACKING_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "sck",
  "xcod",
  "src",
  "gclid",
  "fbclid",
] as const;

const STORAGE_KEY = "preciarte_tracking_params";

/* ────────────────────────────────────────────────────────────────
   O `src` do VTurb nao e vendedor

   O player de video esta configurado com `conversion: ["src"]` — da
   para ver no proprio player.js. Isso faz o VTurb usar o parametro
   `src` para atribuir conversao ao video, e ele grava ali um valor
   no formato:

     v3_<sessao-uuid>_<id-do-player>_0_s-1

   O problema e que `src` e exatamente o parametro que diz QUAL
   VENDEDORA trouxe a pessoa. Quando o VTurb escreve o dele, o app
   guarda esse lixo como se fosse vendedora — e, como a regra la e
   "primeiro contato ganha", o link de verdade que a vendedora mandar
   DEPOIS passa a ser ignorado. Foi assim que o `?src=talita` sumiu.

   Duas assinaturas e duas empresas ja entraram com esse valor; o
   id de player dentro deles bate com o video da /apresentacao.

   Aqui a gente so se recusa a propagar. O conserto de raiz e trocar
   o parametro de conversao no painel do VTurb, de `src` para
   qualquer outro nome — enquanto isso nao acontece, esta guarda
   impede que o lixo chegue ao checkout.
   ──────────────────────────────────────────────────────────────── */
const SRC_DE_VIDEO = /^v\d+_[0-9a-f-]{20,}_[0-9a-f]{20,}_/i;

/** true quando o `src` foi escrito pelo player, e nao por um link de vendedora. */
export const ehSrcDeVideo = (valor: string | null | undefined): boolean =>
  !!valor && SRC_DE_VIDEO.test(valor);

/**
 * Tira do conjunto o `src` que veio do player.
 *
 * Apagar a chave em vez de deixar vazia e de proposito: `src=` vazio no
 * destino ainda e um `src` presente, e o app do outro lado trata presenca,
 * nao conteudo.
 */
const semSrcDeVideo = <T extends Record<string, string>>(params: T): T => {
  if (ehSrcDeVideo(params.src)) {
    const { src: _descartado, ...resto } = params;
    return resto as T;
  }
  return params;
};

/**
 * Salva no sessionStorage as UTMs/click IDs presentes na URL atual.
 * Deve ser chamado uma vez no boot do app, antes de qualquer navegação interna.
 */
export const persistUtmsFromUrl = () => {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    TRACKING_KEYS.forEach((key) => {
      const value = params.get(key);
      if (value) found[key] = value;
    });
    if (Object.keys(found).length > 0) {
      // Mescla com o que já estiver salvo (URL atual tem prioridade)
      const existing = getStoredUtms();
      const merged = { ...existing, ...found };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(semSrcDeVideo(merged)));
    }
  } catch {
    // ignore
  }
};

/**
 * Lê UTMs/click IDs: prioriza a URL atual; faz fallback para sessionStorage.
 */
export const getStoredUtms = (): Record<string, string> => {
  if (typeof window === "undefined") return {};
  const result: Record<string, string> = {};

  // 1) sessionStorage (persistido na primeira carga)
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        Object.assign(result, parsed);
      }
    }
  } catch {
    // ignore
  }

  // 2) URL atual (sobrescreve qualquer valor anterior)
  try {
    const params = new URLSearchParams(window.location.search);
    TRACKING_KEYS.forEach((key) => {
      const value = params.get(key);
      if (value) result[key] = value;
    });
  } catch {
    // ignore
  }

  // Filtra na leitura tambem, e nao so na gravacao: quem ja estava com a
  // aba aberta tem o lixo no sessionStorage de antes desta versao.
  return semSrcDeVideo(result);
};

/**
 * Monta o sck composto no formato Hotmart:
 *   sck = utm_source|utm_medium|utm_campaign|utm_content|utm_term
 * Mantém pipes mesmo com campos vazios para preservar o parsing da Hotmart.
 * Retorna null se TODOS os campos estiverem vazios (não faz sentido enviar pipes vazios).
 */
const buildHotmartSck = (utms: Record<string, string>): string | null => {
  const parts = [
    utms.utm_source ?? "",
    utms.utm_medium ?? "",
    utms.utm_campaign ?? "",
    utms.utm_content ?? "",
    utms.utm_term ?? "",
  ];
  if (parts.every((p) => !p)) return null;
  return parts.join("|");
};

/**
 * Recebe a URL base do checkout e retorna a URL com as UTMs mescladas,
 * preservando o querystring existente (ex.: ?off=moc4qfni).
 *
 * Para checkouts da Hotmart, monta automaticamente o parâmetro `sck`
 * (código de rastreio) no formato esperado pelo painel da Hotmart.
 */
export const buildCheckoutUrl = (baseUrl: string): string => {
  if (!baseUrl) return baseUrl;
  try {
    const url = new URL(baseUrl);
    const utms = getStoredUtms();
    const isHotmart = /(^|\.)hotmart\.com$/i.test(url.hostname);

    // Para Hotmart, sempre monta o sck composto (junção de todas as UTMs) e
    // sobrescreve qualquer sck anterior. Se não houver nenhuma UTM, preserva o
    // sck que já vier na URL base (se houver).
    if (isHotmart) {
      const composedSck = buildHotmartSck(utms);
      if (composedSck) {
        url.searchParams.set("sck", composedSck);
        utms.sck = composedSck;
      }
    }

    Object.entries(utms).forEach(([key, value]) => {
      if (!url.searchParams.has(key)) {
        url.searchParams.set(key, value);
      }
    });
    return url.toString();
  } catch {
    // Se a URL for inválida por algum motivo, devolve a original
    return baseUrl;
  }
};

/**
 * Abre o checkout em outra aba, já com as UTMs anexadas.
 *
 * Usa window.open em vez de <a target="_blank"> de propósito: o pixel da
 * Utmify intercepta cliques em link de checkout e redispara o evento, o que faz
 * o navegador perder a ativação do usuário e ignorar o _blank — a pessoa acaba
 * saindo da landing em vez de abrir o checkout ao lado.
 */
export const openCheckout = (baseUrl: string) => {
  window.open(buildCheckoutUrl(baseUrl), "_blank", "noopener,noreferrer");
};

/* ────────────────────────────────────────────────────────────────
   Passagem completa de parâmetros para domínio externo (/trial)

   O buildCheckoutUrl acima usa uma allowlist de 10 chaves, que dá
   conta dos checkouts. Para o teste grátis o destino é outro domínio
   (preciarte.com.br), e ali a atribuição depende de chegar TUDO que
   veio do anúncio — inclusive o que o Meta manda em parâmetro
   dinâmico (ad_id, adset_id, campaign_id, placement) e os click IDs
   de outras redes (ttclid, msclkid, wbraid, gbraid).

   Por isso aqui não há allowlist: repassa a query string inteira.
   Nada disso toca o buildCheckoutUrl, que continua servindo as
   outras doze chamadas do projeto.
   ──────────────────────────────────────────────────────────────── */

const ALL_PARAMS_KEY = "preciarte_all_params";

/**
 * Guarda a query string INTEIRA da primeira carga, sem filtrar nada.
 * Roda junto com persistUtmsFromUrl(), no boot do App.
 */
export const persistAllParamsFromUrl = () => {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    params.forEach((value, key) => {
      if (value) found[key] = value;
    });
    if (Object.keys(found).length > 0) {
      const existing = getStoredAllParams();
      sessionStorage.setItem(
        ALL_PARAMS_KEY,
        JSON.stringify(semSrcDeVideo({ ...existing, ...found })),
      );
    }
  } catch {
    // ignore
  }
};

/** Lê o que foi guardado no boot. */
const getStoredAllParams = (): Record<string, string> => {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(ALL_PARAMS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? semSrcDeVideo(parsed) : {};
  } catch {
    return {};
  }
};

/**
 * Lê os cookies que o pixel do Meta cria neste navegador.
 *
 * Como o destino é outro domínio, o pixel de lá começa do zero e a
 * conversão pode não casar com o anúncio. Levando _fbp e _fbc na URL,
 * a página de destino consegue reconstruir a ligação — desde que ela
 * seja programada para ler.
 */
const getMetaCookies = (): Record<string, string> => {
  if (typeof document === "undefined") return {};
  const out: Record<string, string> = {};
  try {
    document.cookie.split(";").forEach((parte) => {
      const [nome, ...resto] = parte.trim().split("=");
      const valor = resto.join("=");
      if (!valor) return;
      if (nome === "_fbp") out.fbp = decodeURIComponent(valor);
      if (nome === "_fbc") out.fbc = decodeURIComponent(valor);
    });
  } catch {
    // ignore
  }
  return out;
};

/**
 * Monta a URL do teste grátis carregando tudo que dá para carregar.
 *
 * Ordem de precedência: query guardada no boot → query da URL atual
 * (vence, porque é a mais recente) → cookies do Meta. Parâmetro que
 * já exista na URL base nunca é sobrescrito.
 */
export const buildTrialUrl = (baseUrl: string): string => {
  if (!baseUrl) return baseUrl;
  try {
    const url = new URL(baseUrl);
    const tudo: Record<string, string> = { ...getStoredAllParams() };

    // URL atual tem prioridade sobre o que foi guardado
    new URLSearchParams(window.location.search).forEach((value, key) => {
      if (value) tudo[key] = value;
    });

    Object.assign(tudo, getMetaCookies());

    // A URL atual vence o que foi guardado, entao o `src` do player so morre
    // de vez aqui, depois de tudo mesclado.
    if (ehSrcDeVideo(tudo.src)) delete tudo.src;

    // O script da Utmify reescreve o href depois do render: ele gruda o
    // fbclid dentro do utm_content (vira "criativo01::ABC123::") e injeta
    // UTMs que guardou de visitas anteriores. Isso é atribuição dele e
    // não dá para desligar por aqui. Levamos junto uma cópia intacta do
    // utm_content para quem precisar do valor original do anúncio.
    if (tudo.utm_content && !url.searchParams.has('utm_content_original')) {
      url.searchParams.set('utm_content_original', tudo.utm_content);
    }

    Object.entries(tudo).forEach(([key, value]) => {
      if (!url.searchParams.has(key)) {
        url.searchParams.set(key, value);
      }
    });
    return url.toString();
  } catch {
    return baseUrl;
  }
};

/**
 * O mesmo repasse do teste gratis, com o nome do que ele faz na /apresentacao.
 *
 * A /apresentacao manda para o checkout PROPRIO (preciarte.com.br/assinar), e
 * nao para a Hotmart ou a OnProfit. Precisa levar a query inteira pelo mesmo
 * motivo do trial: o destino e outro dominio, entao sessionStorage e cookie
 * nao atravessam — o que nao for na URL nao chega.
 *
 * E uma referencia, nao uma copia: `buildTrialUrl` continua servindo /trial, e
 * duplicar a funcao seria criar duas versoes da mesma regra para divergirem
 * depois. O comportamento e identico de proposito.
 *
 * O QUE ISSO AINDA NAO RESOLVE
 * Do outro lado, o app guarda a origem com a regra "primeiro contato ganha"
 * (lib/origem.ts do rosa-precifica-facil): quem ja visitou preciarte.com.br
 * antes tem origem gravada no localStorage, e as UTMs que chegarem depois sao
 * descartadas. Ou seja, a venda de quem conheceu o sistema por um anuncio e
 * so DEPOIS passou pela /apresentacao fica no credito do anuncio. Os cliques
 * daqui aparecem no Utmify e no pixel; a atribuicao final e do app.
 */
export const buildAssinarUrl = buildTrialUrl;

/**
 * O checkout PROPRIO do plano mensal.
 *
 * Desde 25/11/2026 o mensal nao vai mais para a Lastlink: vai para a nossa
 * propria tela de pagamento, a mesma que a /apresentacao ja usava. O anual
 * continua onde estava em cada pagina — a troca foi so do mensal.
 *
 * `?plano=mensal` e o ID EXATO da linha na tabela `planos`, nao um rotulo. O
 * Assinar.tsx faz `planos.find(p => p.id === planoId)` e, quando nao casa, cai
 * no primeiro plano da lista. Errar aqui nao mostra erro de tela nenhum: manda
 * a pessoa para o plano errado em silencio.
 *
 * Mora aqui, e nao copiado em cada pagina, porque a versao anterior estava
 * repetida em nove arquivos — e trocar nove strings na mao e como uma pagina
 * fica para tras no dia em que o link mudar.
 *
 * Use com `buildAssinarUrl`, nunca com `buildCheckoutUrl`: o destino e
 * preciarte.com.br, onde a atribuicao depende de chegar a query inteira e os
 * cookies do Meta — e nao as dez chaves da allowlist.
 */
export const CHECKOUT_MENSAL_PROPRIO = "https://preciarte.com.br/assinar?plano=mensal";

/**
 * Abre o checkout proprio em outra aba, com a query inteira junto.
 *
 * Gemeo do `openCheckout`, e usa window.open pelo mesmo motivo que ele: o pixel
 * da Utmify intercepta clique em link de checkout e redispara o evento, o que
 * faz o navegador perder a ativacao do usuario e ignorar o _blank — a pessoa
 * sai da landing em vez de abrir o checkout ao lado.
 *
 * A diferenca e so o construtor da URL: `buildAssinarUrl` em vez de
 * `buildCheckoutUrl`, porque o destino e preciarte.com.br.
 */
export const abrirAssinatura = (baseUrl: string) => {
  window.open(buildAssinarUrl(baseUrl), "_blank", "noopener,noreferrer");
};
