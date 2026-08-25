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
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
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

  return result;
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
      sessionStorage.setItem(ALL_PARAMS_KEY, JSON.stringify({ ...existing, ...found }));
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
    return parsed && typeof parsed === "object" ? parsed : {};
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
