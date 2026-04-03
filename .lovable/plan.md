

## Criar LP3 — Nova landing page com identidade visual própria

### Resumo

Criar a rota `/lp3` com uma landing page completa, 12 seções, paleta de cores própria (vinho/grafite/laranja âmbar), animações de scroll, e layout mobile-first (90% do público é celular).

### Paleta de cores LP3

| Papel | Cor | Hex |
|-------|-----|-----|
| Principal | Vinho/Bordô | `#8B1A4A` |
| Secundária | Grafite | `#2C2C2C` |
| Acento/CTA | Laranja âmbar | `#E07B2A` |
| Fundo | Off-white | `#F8F6F3` |
| Texto secundário | Cinza médio | `#6B6B6B` |

A paleta sera aplicada via CSS variables isoladas na propria pagina (wrapper com classes customizadas), sem alterar o tema global.

### Arquivos a criar

**1. `src/pages/LP3.tsx`** — Pagina principal, importa todas as secoes LP3, rota `/lp3`

**2. `src/components/lp3/HeroLP3.tsx`** — Secao 1
- Badge no topo, headline em 2 linhas grandes, subtexto, CTA com seta, trust badges abaixo
- Animacao de fade-in escalonada nos elementos

**3. `src/components/lp3/WhatIsLP3.tsx`** — Secao 2 (O que e o PreciArte)
- Grid de 6 mini-cards com icones representando cada funcionalidade
- Animacao de entrada ao scroll (Intersection Observer)

**4. `src/components/lp3/FeaturesLP3.tsx`** — Secao 3 (8 funcionalidades detalhadas)
- Cards alternados (icone + titulo + descricao longa)
- Cada card anima ao entrar na viewport

**5. `src/components/lp3/AudienceLP3.tsx`** — Secao 4 (Para quem e)
- Grid de tags/chips com emojis para cada nicho
- Texto de fechamento abaixo

**6. `src/components/lp3/PainPointsLP3.tsx`** — Secao 5 (Identificacao)
- Blocos de texto narrativo com destaque em vinho
- Linha final forte: "Nao e falta de esforco. E falta de sistema."

**7. `src/components/lp3/ImpactBlockLP3.tsx`** — Secao 6 (Bloco de impacto)
- Fundo escuro (grafite), texto grande centralizado, 2 linhas

**8. `src/components/lp3/StatsLP3.tsx`** — Secao 7 (Numeros)
- 4 colunas (2x2 no mobile) com contadores animados

**9. `src/components/lp3/TestimonialsLP3.tsx`** — Secao 8 (Prova social)
- 5 depoimentos em cards com aspas, nome, nicho e cidade

**10. `src/components/lp3/ComparisonLP3.tsx`** — Secao 9 (Comparativo)
- Tabela 2 colunas: Sem PreciArte vs Com PreciArte
- Icones X (vermelho) e Check (verde)

**11. `src/components/lp3/ObjectionsLP3.tsx`** — Secao 10 (Objecoes)
- Accordion/FAQ com 6 objecoes e respostas

**12. `src/components/lp3/PricingLP3.tsx`** — Secao 11 (Planos)
- 2 cards: Anual (destaque, primeiro) e Mensal
- Anual: R$ 84,90/ano, 12x R$ 8,03, economia de R$ 394,10
- Mensal: R$ 39,90/mes
- Lista de features inclusa abaixo dos cards
- Links de checkout iguais aos existentes (Hotmart mensal, Kirvano anual)

**13. `src/components/lp3/CTAFinalLP3.tsx`** — Secao 12 (CTA final)
- Headline, subtexto emocional, botao CTA, trust badges, link WhatsApp

### Arquivo a editar

**`src/App.tsx`** — Adicionar rota `/lp3` apontando para `LP3`

### Detalhes tecnicos

- **Mobile-first**: Todos os componentes usam `flex-col` por padrao, expandem em `md:` breakpoints. Fontes maiores no mobile, espacamentos generosos para touch.
- **Animacoes**: Hook customizado `useScrollReveal` usando Intersection Observer para animar elementos ao entrar na viewport. Transicoes CSS com `opacity`, `translateY`, e `scale`. Contadores animados nos stats.
- **Paleta isolada**: Wrapper `div` na LP3 com CSS custom properties, sem afetar outras paginas.
- **Sem dependencias novas**: Usa Tailwind, Lucide icons, e componentes UI existentes (Button, Accordion).
- **Sem discount popup nem social proof notification**: LP3 tera estrutura independente e limpa.

### Precos LP3 (diferentes das outras LPs)

| Plano | Preco | Parcela | Link |
|-------|-------|---------|------|
| Anual | R$ 84,90/ano | 12x R$ 8,03 | `https://pay.onprofit.com.br/CUTCm7GF?off=0jene1` |
| Mensal | R$ 39,90/mes | — | `https://pay.hotmart.com/X105144057Q` |

