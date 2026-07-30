/**
 * Renderiza os mockups de tela do sistema e salva os PNGs finais.
 *
 * Uso:  node mockups/render.mjs            (renderiza todos)
 *       node mockups/render.mjs passo-01   (renderiza um)
 *
 * Requer o Chrome rodando com --remote-debugging-port=9222.
 *
 * Cada arquivo declara sua largura de viewport e, opcionalmente, um par
 * #crop-start / #crop-end. Quando existe, o PNG sai recortado exatamente
 * nessa faixa — que é o mesmo recorte que um print real do celular daria,
 * já que os elementos são contíguos na tela.
 */
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const SAIDA = resolve(AQUI, '../public/lp6');

/** largura de viewport e escala por mockup */
const MOCKUPS = [
  { nome: 'passo-01-material-conversao', vw: 390, dsf: 3 },
  { nome: 'passo-02-item-composicao', vw: 390, dsf: 3 },
  { nome: 'passo-03-margem-colorida', vw: 390, dsf: 3 },
  { nome: 'hero-calculadora-valor-real', vw: 1160, dsf: 2 },
  { nome: 'hero-calculadora-valor-real-mobile', vw: 390, dsf: 3 },

];

const filtro = process.argv[2];
const lista = filtro ? MOCKUPS.filter((m) => m.nome.includes(filtro)) : MOCKUPS;

const alvos = await (await fetch('http://localhost:9222/json/list')).json();
const page = alvos.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pend = new Map();
const cmd = (m, p = {}) =>
  new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pend.has(m.id)) { pend.get(m.id)(m.result); pend.delete(m.id); }
};

const MEDIR = `(() => {
  const s = document.getElementById('crop-start');
  const e = document.getElementById('crop-end');
  const doc = document.documentElement;
  if (!s || !e) return { full: true, w: doc.scrollWidth, h: doc.scrollHeight };
  const a = s.getBoundingClientRect(), b = e.getBoundingClientRect();
  return { full: false, x: 0, y: a.top + window.scrollY, w: doc.scrollWidth, h: b.bottom - a.top };
})()`;

ws.onopen = async () => {
  if (!existsSync(SAIDA)) mkdirSync(SAIDA, { recursive: true });

  for (const mk of lista) {
    const url = 'file://' + resolve(AQUI, (mk.arquivo ?? mk.nome) + '.html');
    await cmd('Page.navigate', { url });
    await new Promise((r) => setTimeout(r, 600));
    // a emulacao precisa ser reaplicada DEPOIS do navigate: aplicada antes,
    // o commit da nova pagina descarta o override e volta para 980px
    await cmd('Emulation.setDeviceMetricsOverride', {
      width: mk.vw, height: 2400, deviceScaleFactor: 1, mobile: false,
    });
    await new Promise((r) => setTimeout(r, 1400)); // espera as fontes

    const { result } = await cmd('Runtime.evaluate', { returnByValue: true, expression: MEDIR });
    const m = result.value;
    // scale no clip faz o papel do retina; DSF fica em 1 para nao multiplicar duas vezes
    const clip = { x: m.x ?? 0, y: m.y ?? 0, width: m.w, height: m.h, scale: mk.dsf };

    const { data } = await cmd('Page.captureScreenshot', {
      format: 'png', clip, captureBeyondViewport: true,
    });
    const arq = resolve(SAIDA, mk.nome + '.png');
    writeFileSync(arq, Buffer.from(data, 'base64'));
    console.log(
      mk.nome.padEnd(34) +
      Math.round(m.w * mk.dsf) + 'x' + Math.round(m.h * mk.dsf) +
      '  (css ' + Math.round(m.w) + 'x' + Math.round(m.h) +
      ', prop ' + (m.w / m.h).toFixed(2) + ')'
    );
  }
  ws.close();
  process.exit(0);
};
