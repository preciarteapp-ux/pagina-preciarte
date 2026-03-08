

## LP2 - Variante A/B com Foco em Conversao

### Diagnostico da LP1 (por que nao converte)
- Hero generico, nao ataca a dor diretamente
- Muitas secoes com layout identico (grids de cards) - cansa o usuario
- Testimonials aparecem DEPOIS do pricing (erro classico)
- 10 features listadas = sobrecarga cognitiva
- Falta de urgencia real e prova social com numeros
- Nenhuma secao de "antes vs depois" ou transformacao

### Estrategia da LP2
Estrutura PAS (Problema → Agitacao → Solucao) com design mais ousado e direto.

### Estrutura da pagina

1. **HeroLP2** - Hero focado na DOR com headline mais agressiva
   - Headline: "Voce Esta Perdendo Dinheiro na Sua Papelaria (E Nem Sabe)"
   - Sub: lista 3 dores especificas com icones X vermelho
   - VSL (mesmo player do ConverteAI)
   - CTA grande
   - Barra de numeros abaixo: "+2.500 papelarias", "40% mais lucro", "2 min por orcamento"

2. **ProblemSection** - Secao "Antes vs Depois" lado a lado
   - Coluna esquerda: "Sem PreciArte" com itens negativos (vermelho)
   - Coluna direita: "Com PreciArte" com itens positivos (verde)
   - Visual forte de contraste

3. **FeaturesLP2** - Top 5 features com layout alternado (imagem/texto zigzag)
   - Cada feature ocupa largura total com icone grande + texto descritivo
   - Layout mais visual, menos "grid de cards"

4. **TestimonialsLP2** - Depoimentos com destaque maior ANTES do pricing
   - Cards maiores com foto, estrelas e resultado mensuravel
   - Reutiliza os mesmos dados/imagens

5. **PricingLP2** - Pricing com garantia integrada
   - Mesmos planos e links (Semestral, Mensal, Anual)
   - Badge de garantia 7 dias proeminente
   - Selo de seguranca visual

6. **CTALP2** - CTA final com urgencia
   - Contador de vagas regressivo
   - Frase de escassez

7. Reutiliza: Footer, WhatsAppButton, DiscountPopup, SocialProofNotification, SEOHead

### Arquivos a criar
- `src/pages/LP2.tsx` - Pagina principal
- `src/components/HeroLP2.tsx` - Hero focado em dor
- `src/components/ProblemSection.tsx` - Antes vs Depois
- `src/components/FeaturesLP2.tsx` - Features alternadas
- `src/components/TestimonialsLP2.tsx` - Depoimentos destacados
- `src/components/PricingLP2.tsx` - Pricing com garantia
- `src/components/CTALP2.tsx` - CTA com urgencia

### Arquivo a editar
- `src/App.tsx` - Adicionar rota `/lp2`

### Design
- Mesmo sistema de cores (primary rosa/magenta)
- Mais uso de gradientes e contraste
- Espacamento mais generoso
- Tipografia maior e mais bold
- Animacoes sutis de entrada (fade-in on scroll)

