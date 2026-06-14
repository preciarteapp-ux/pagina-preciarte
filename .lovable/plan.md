## Página de Obrigado (Thank You)

### Objetivo
Criar uma página de confirmação pós-compra que entregue as credenciais de acesso ao PreciArte de forma clara e direta.

### Roteamento
- Nova rota: `/obrigado`
- Registro em `App.tsx`

### Conteúdo da página
1. **Hero de confirmação**
   - Headline: "Parabéns! Seu acesso ao PreciArte está confirmado"
   - Subheadline com ícone de check animado
   - CTA principal: botão grande para acessar https://preciarte.com.br/

2. **Card de credenciais**
   - Instrução: "Use o mesmo e-mail da sua compra"
   - Senha exibida em destaque: `preci123@`
   - Botão de copiar senha para área de transferência

3. **Passo a passo visual**
   - 3 passos numerados:
     1. Acesse o link preciarte.com.br
     2. Faça login com seu e-mail de compra
     3. Digite a senha e comece a usar

4. **Suporte**
   - Link/botão para WhatsApp de suporte (se existir)
   - Mensagem: "Dúvidas? Nosso time está aqui para ajudar"

### Design
- Manter consistência visual com LP3 (fundo #F8F6F3, tipografia existente)
- Usar a cor primária do projeto (rosa/bordô) para CTAs
- Layout centrado, limpo, sem distrações — foco 100% nas instruções de acesso
- Card de credenciais com destaque visual (borda sutil, sombra leve)
- Ícones de check nos passos para reforçar progresso

### SEO / Meta
- Title: "Acesso Confirmado - PreciArte"
- Meta description: "Seu acesso ao PreciArte foi confirmado. Faça login agora e comece a precificar seus produtos."
- Sem indexação (opcional, pode usar noindex se desejado)

### Técnico
- Página React funcional em `src/pages/Obrigado.tsx`
- Componente interno, sem necessidade de separar em sub-componentes (página é simples)
- Adicionar `useEffect` para tracking de PageView (Meta Pixel) se existir no projeto
- Sem dependências externas novas

### Arquivos modificados/criados
- `src/pages/Obrigado.tsx` (novo)
- `src/App.tsx` (adicionar rota /obrigado)
- `public/` — verificar se há favicon.png (já existe)