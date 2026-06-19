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
