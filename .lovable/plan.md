

## Ajustes na LP3

### 1. Remover seção "Dúvidas frequentes" (ObjectionsLP3)
- Remover import e uso de `ObjectionsLP3` em `src/pages/LP3.tsx`

### 2. Remover referências a "teste grátis"
- **HeroLP3.tsx**: Trocar "Teste grátis por 7 dias" por "Quero começar agora" (ou similar CTA de compra). Remover linha "Sem cartão · Acesso imediato · Cancele quando quiser"
- **CTAFinalLP3.tsx**: Trocar "Quero testar grátis por 7 dias" por "Quero começar agora". Remover "Sem cartão · Acesso imediato · Cancele quando quiser"
- **PricingLP3.tsx**: Remover menção de "7 dias de garantia incondicional" ou ajustar para "Garantia de 7 dias"

### 3. Adicionar WhatsApp flutuante
- Importar e renderizar `WhatsAppButton` em `LP3.tsx`

### 4. Adicionar banner de desconto automático
- Importar `DiscountPopup` em `LP3.tsx` com a mesma lógica do Index (state `discountApplied`, toast, `handleClaimDiscount`)
- Adicionar `pt-12` ao wrapper para espaço do banner fixo no topo

### 5. Adicionar notificações de social proof
- Importar `SocialProofNotification` em `LP3.tsx` (mesmo componente das outras páginas — nomes simulados + contador de vagas)

### 6. Corrigir WhatsApp no CTA final
- Atualizar link WhatsApp de `5511999999999` para `5564996259223` (número correto)

### Arquivos modificados
- `src/pages/LP3.tsx` — adicionar imports (WhatsAppButton, DiscountPopup, SocialProofNotification), state, handler, pt-12
- `src/components/lp3/HeroLP3.tsx` — remover "teste grátis" do CTA e trust badges
- `src/components/lp3/CTAFinalLP3.tsx` — remover "teste grátis", corrigir WhatsApp number
- `src/components/lp3/PricingLP3.tsx` — ajustar texto de garantia

