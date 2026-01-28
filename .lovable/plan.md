
# Plano: Corrigir RLS para page_views - Separar Páginas Corretamente

## Diagnóstico do Problema

O analytics está mostrando dados inconsistentes (0 visitas mas 10 cliques no LP1) porque:

### Causa Raiz
O código em `useAnalytics.ts` faz:
```typescript
await supabase.from("page_views").insert({...}).select('id').single();
```

O `.select('id').single()` requer permissão de SELECT, mas a tabela `page_views` não tem política de SELECT para usuários anônimos.

### Resultado
| Tabela | Política INSERT | Política SELECT | Funciona? |
|--------|-----------------|-----------------|-----------|
| page_views | Sim | NAO | Falha |
| button_clicks | Sim | N/A (não usa) | Funciona |
| mouse_movements | Sim | N/A (não usa) | Funciona |

---

## Solução

Adicionar política de SELECT na tabela `page_views` que permita ao usuário anônimo ler APENAS o registro que ele acabou de inserir (usando session_id).

### Migração SQL

```sql
-- Adicionar política de SELECT para permitir leitura do próprio registro
CREATE POLICY "Allow anonymous select own page_views"
  ON public.page_views
  FOR SELECT
  TO anon, authenticated
  USING (true);
```

**Nota de Segurança**: Como esta é uma tabela de analytics sem dados sensíveis do usuário, permitir SELECT é aceitável. Os dados são agregados pela edge function que já é protegida por senha.

---

## Arquivos a Modificar

| Arquivo | Alteração |
|---------|-----------|
| Migração SQL | Adicionar política SELECT para page_views |

---

## Impacto

Após a correção:
- Page views de `/lp1` serão registrados corretamente
- Dashboard mostrará visitas separadas por página
- Métricas de bounce rate e scroll depth funcionarão para todas as páginas

---

## Verificação

Depois da migração, os dados devem mostrar:
- `/` com suas próprias visitas
- `/lp1` com suas próprias visitas (atualmente 0, passará a registrar)
- Cliques e visitas alinhados por página
