

# Plano: Reverter Links de Checkout na Pagina Principal

## Alteracao

Restaurar os 3 links de checkout originais no arquivo `src/components/Pricing.tsx`.

| Plano | Link Atual (LP1) | Link Original (restaurar) |
|-------|-------------------|--------------------------|
| Mensal | `b11cd8e9-d117-424b-bc61-a50432c25223` | `c5f5c9e6-2f78-4483-bb05-528374e6fd8e` |
| Semestral | `6218afc2-10ac-479b-8518-7c3f63acd28c` | `5df8d83f-b84d-4b4c-bc6a-da17c7cf455d` |
| Anual | `0d6d3def-b7cc-40c0-8ad5-cdffcb6d6eb3` | `6b173399-70ce-4166-bbed-c70b5558c32a` |

## Arquivo

**`src/components/Pricing.tsx`** - Linhas 25, 49 e 73: reverter os URLs dos 3 planos para os valores anteriores.

