import { Icon } from '@iconify/react';
import { APP, useEmCena, useSequencia } from './base';

/**
 * A conversa acontecendo, mensagem a mensagem.
 *
 * Mostra o que o app realmente faz: o botão "Enviar" do orçamento abre a
 * bandeja de compartilhamento do celular e joga o PDF na conversa (Web
 * Share API com canShare de arquivos), e o link do catálogo abre com
 * imagem e título por causa da edge function catalogo-og.
 *
 * Nada de conversa fictícia com IA: quem responde aqui é ela.
 */

type Msg =
  | { de: 'cliente' | 'voce'; tipo: 'texto'; txt: string; hora: string }
  | { de: 'voce'; tipo: 'pdf'; nome: string; sub: string; hora: string }
  | { de: 'voce'; tipo: 'link'; titulo: string; sub: string; hora: string }
  | { de: 'voce'; tipo: 'digitando' };

const CONVERSA: Msg[] = [
  { de: 'cliente', tipo: 'texto', txt: 'Oi! Quanto fica 30 lembrancinhas com o nome dos padrinhos?', hora: '14:02' },
  { de: 'voce', tipo: 'digitando' },
  { de: 'voce', tipo: 'pdf', nome: 'Proposta-ORC20260001.pdf', sub: '1 página · PDF', hora: '14:04' },
  { de: 'voce', tipo: 'texto', txt: 'Mandei a proposta com o valor, o prazo e a chave PIX.', hora: '14:04' },
  { de: 'voce', tipo: 'link', titulo: 'Catálogo · Ateliê da Ana', sub: 'preciarte.com/catalogo/atelie-da-ana', hora: '14:05' },
  { de: 'cliente', tipo: 'texto', txt: 'Que profissional! Fechado, pode fazer', hora: '14:07' },
];

const VERDE = '#D9FDD3';
const FUNDO = '#EFE7DE';

const Balao = ({ m, visivel }: { m: Msg; visivel: boolean }) => {
  const minha = m.de === 'voce';
  const base = 'max-w-[80%] rounded-[12px] px-[10px] py-[7px] text-[13px] leading-[1.4] shadow-[0_1px_1px_rgba(0,0,0,.06)]';
  const anim = 'transition-all duration-[420ms] [transition-timing-function:cubic-bezier(.16,1,.3,1)]';
  const pos = minha ? 'ml-auto' : 'mr-auto';
  const estilo = { background: minha ? VERDE : '#FFFFFF', color: '#111B21' };
  const entrada = visivel
    ? { opacity: 1, transform: 'translateY(0) scale(1)' }
    : { opacity: 0, transform: 'translateY(8px) scale(.97)' };

  if (m.tipo === 'digitando') {
    return (
      <div className={`${base} ${anim} ${pos} w-[58px] flex gap-[4px] items-center`} style={{ ...estilo, ...entrada }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-[6px] h-[6px] rounded-full animate-pulse"
            style={{ background: '#8696A0', animationDelay: `${i * 180}ms` }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`${base} ${anim} ${pos}`} style={{ ...estilo, ...entrada }}>
      {m.tipo === 'texto' && <p>{m.txt}</p>}

      {m.tipo === 'pdf' && (
        <div className="flex items-center gap-[9px] rounded-[8px] p-[7px]" style={{ background: 'rgba(0,0,0,.05)' }}>
          <span className="flex items-center justify-center w-[34px] h-[34px] rounded-[7px] shrink-0" style={{ background: '#EA4335' }}>
            <Icon icon="solar:file-text-bold" width={18} className="text-white" />
          </span>
          <span className="min-w-0">
            <span className="block font-medium truncate text-[12.5px]">{m.nome}</span>
            <span className="block text-[11px]" style={{ color: '#667781' }}>{m.sub}</span>
          </span>
        </div>
      )}

      {m.tipo === 'link' && (
        <div className="rounded-[8px] overflow-hidden" style={{ background: 'rgba(0,0,0,.05)' }}>
          {/* prévia do link: é o que a edge function catalogo-og entrega */}
          <div className="h-[62px] flex items-center justify-center" style={{ background: `linear-gradient(120deg, ${APP.rosa}, #F39AC4)` }}>
            <Icon icon="solar:shop-bold" width={24} className="text-white/90" />
          </div>
          <div className="px-[9px] py-[7px]">
            <span className="block font-medium text-[12.5px]">{m.titulo}</span>
            <span className="block text-[11px] truncate" style={{ color: '#667781' }}>{m.sub}</span>
          </div>
        </div>
      )}

      {m.tipo !== 'digitando' && (
        <span className="flex items-center justify-end gap-1 mt-[2px] text-[10.5px]" style={{ color: '#667781' }}>
          {m.hora}
          {minha && <Icon icon="solar:check-read-linear" width={13} style={{ color: '#53BDEB' }} />}
        </span>
      )}
    </div>
  );
};

const TelaWhatsApp = () => {
  const { ref, ativo } = useEmCena<HTMLDivElement>();
  const passo = useSequencia(CONVERSA.length + 1, ativo, 1150, 3000);

  return (
    <div ref={ref} className="bg-white">
      {/* topo da conversa */}
      <div className="flex items-center gap-[10px] px-4 h-[54px] pt-[6px]" style={{ background: '#F0F2F5' }}>
        <span className="flex items-center justify-center w-[32px] h-[32px] rounded-full text-white text-[13px] font-semibold" style={{ background: APP.rosa }}>
          A
        </span>
        <span className="min-w-0">
          <span className="block text-[14px] font-semibold" style={{ color: '#111B21' }}>Ana Cliente</span>
          <span className="block text-[11px]" style={{ color: '#667781' }}>online</span>
        </span>
      </div>

      {/* conversa */}
      <div className="flex flex-col gap-[7px] px-3 py-4 min-h-[340px]" style={{ background: FUNDO }}>
        {CONVERSA.map((m, i) => (
          <Balao key={i} m={m} visivel={passo > i} />
        ))}
      </div>

      {/* campo de digitação */}
      <div className="flex items-center gap-2 px-3 py-[9px]" style={{ background: '#F0F2F5' }}>
        <span className="flex-1 h-[34px] rounded-full flex items-center px-3 text-[12.5px]" style={{ background: '#fff', color: '#8696A0' }}>
          Mensagem
        </span>
        <span className="flex items-center justify-center w-[34px] h-[34px] rounded-full" style={{ background: '#00A884' }}>
          <Icon icon="solar:microphone-2-bold" width={17} className="text-white" />
        </span>
      </div>
    </div>
  );
};

export default TelaWhatsApp;
