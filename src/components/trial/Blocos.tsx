import { ReactNode } from 'react';
import { T, Reveal, Badge, Chip } from './ui';
import { Celular } from './telas/base';

/** Um bloco da seção creme: texto de um lado, tela viva do outro. */
export type Bloco = {
  badge: string; icone: string; titulo: string; texto: string;
  chips: string[]; tela: ReactNode;
};

export function BlocosAlternados({ blocos, inverteA = false }: { blocos: Bloco[]; inverteA?: boolean }) {
  return (
    <div className="space-y-4 lg:space-y-6 mt-10 lg:mt-16">
      {blocos.map((b, i) => {
        const inverte = inverteA ? i % 2 === 0 : i % 2 === 1;
        return (
          <Reveal key={b.titulo} delay={i * 60}>
            <div className={`grid gap-0 lg:grid-cols-2 lg:gap-6 ${inverte ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <div className="bg-white rounded-t-[28px] lg:rounded-[28px] px-6 pt-8 pb-7 lg:p-12 flex flex-col justify-center">
                <Badge tone="grad" icon={b.icone} className="self-start">{b.badge}</Badge>
                <h3 className={`${T.h2} !text-[26px] lg:!text-[34px] text-lp7-text mt-5 max-w-[18ch]`}>{b.titulo}</h3>
                <p className={`${T.body} text-lp7-muted mt-4 max-w-[46ch]`}>{b.texto}</p>
                <div className="flex flex-col items-start gap-[10px] mt-6 lg:mt-7">
                  {b.chips.map((c) => <Chip key={c}>{c}</Chip>)}
                </div>
              </div>

              <div className="bg-white rounded-b-[28px] lg:rounded-[28px] px-3 pb-3 lg:p-10 flex items-center justify-center">
                <div className="w-full lg:max-w-[300px]">
                  <Celular className="!shadow-[0_30px_70px_-28px_rgba(20,18,26,0.45)]">{b.tela}</Celular>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
