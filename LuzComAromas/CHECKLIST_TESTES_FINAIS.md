# ✅ CHECKLIST DE TESTES FINAIS — LuzComAromas

**Data:** 2026-04-30  
**Servidor:** http://localhost:5174  
**Duração estimada:** 15-20 minutos

---

## 📋 Instruções Gerais

1. **Abra o navegador** em http://localhost:5174
2. **Teste cada seção** conforme abaixo
3. **Marque ☑️** conforme valida cada ponto
4. **Tome screenshots** se encontrar algo errado
5. **Reporte** qualquer divergência

---

## 🎨 SEÇÃO 1: CORES E VISUAL

### 1.1 Página `/colecoes` — Cards de Coleção

- [ ] **Card 1 (Serenidade):** Roxo profundo (`#9B6FC4`) — background visível, não transparente
- [ ] **Card 2 (Energia):** Laranja quente (`#C97A4A`) — quente/vibrante, não pálido
- [ ] **Card 3 (Intuição):** Violeta (`#9A6A8D`) — violeta, não pink/magenta
- [ ] **Card 4 (Purificação):** Verde menta (`#6FA88A`) — verde menta, não azul escuro
- [ ] **Hover nos cards:** Soft color (muito transparente) aparece suavemente
- [ ] **Glow ao redor:** Sutil mas perceptível

### 1.2 Página Home — Cards na Seção "Coleções"

- [ ] **4 cards aparecem** com cores distintas
- [ ] **Cores iguais** às da página `/colecoes`
- [ ] **Backgrounds coloridos** (não há NaN ou transparência)

### 1.3 Modo Claro — Theme Toggle

- [ ] **Home:** Clique no ícone sol/lua no header
- [ ] **Background:** Muda de roxo escuro para lilás claro (`#F3ECFA`)
- [ ] **Cores primárias:** Mantêm (roxo, laranja, violeta, verde)
- [ ] **Navbar:** Continua escuro (sem inversão)
- [ ] **Footer:** Continua escuro (sem inversão)
- [ ] **Transição:** Suave (não "pisca")
- [ ] **Contraste:** Sempre legível

---

## 🔤 SEÇÃO 2: TEXTOS E CTAs

### 2.1 Home — CTA "Descobrir as Coleções"

- [ ] **Texto:** "Descobrir as Coleções" (em dourado no topo)
- [ ] **Rota:** Clique nele → navegue para `/colecoes` (não `/loja`)
- [ ] **Hover:** Efeito visual (sobe, muda sombra)

### 2.2 Página Colecões — CTAs Oficiais

- [ ] **Serenidade:** "Permita a pausa" (não "Viver a pausa")
- [ ] **Energia:** "Acenda sua intenção" (não "Acender a intenção")
- [ ] **Intuição:** "Escute com presença" (não "Escutar o interior")
- [ ] **Purificação:** "Renove o espaço" (não "Renovar o espaço")

### 2.3 Página Sobre — Gênero

- [ ] **Seção Intuição:** "para ouvir a si **mesma**" (não "mesmo")
- [ ] **Contexto:** Marca feminina/acolhedora mantida

---

## 📬 SEÇÃO 3: ACESSIBILIDADE

### 3.1 Formulário Contato

- [ ] **Label "Nome":** Clique → foca no input (htmlFor conectada)
- [ ] **Label "Email":** Clique → foca no input
- [ ] **Label "Coleção de Interesse":** Clique → abre dropdown
- [ ] **Label "Mensagem":** Clique → foca no textarea
- [ ] **Submeter:** Envia sem erros

### 3.2 Newsletter (Footer)

- [ ] **Label "Email":** Clique → foca no input
- [ ] **Email válido:** Inscreve com sucesso
- [ ] **Email inválido:** Mostra erro em violeta (`#9A6A8D`)
- [ ] **Aria-label nos links:** Instagram e WhatsApp têm labels

### 3.3 SVGs Decorativos

- [ ] **DevTools (F12):** Inspecione ícones Instagram/WhatsApp
- [ ] **Atributo:** `aria-hidden="true"` presente
- [ ] **Propósito:** Não interfere com leitores de tela

---

## 📅 SEÇÃO 4: FOOTER

### 4.1 Copyright

- [ ] **Texto:** `© 2026 LuzComAromas · Aromas que acendem momentos`
- [ ] **Ano:** Dinâmico (2026 se for testado em 2026, muda a cada ano)

### 4.2 Links Sociais

- [ ] **Instagram:** Hover → muda para violeta (`#9A6A8D`), sobe levemente
- [ ] **WhatsApp:** Hover → muda para verde WhatsApp (`#25D366`), sobe levemente

---

## 🎯 SEÇÃO 5: VALIDAÇÃO VISUAL COMPLET A

### Checklist Visual Rápido (2 minutos)

- [ ] **Nenhuma cor aparece como NaN ou `rgba(NaN...)`**
  - DevTools → inspecione qualquer card → **Computed Styles**
  - Procure por `rgba(NaN, ...` — não deve haver
  
- [ ] **Nenhuma cor "piscando" ou mudando abruptamente**
  - Navegue entre páginas lentamente
  - Toggle tema algumas vezes
  
- [ ] **Soft colors aparecem suavemente** (muito transparentes)
  - Passe mouse sobre cards em `/colecoes`
  - Deve haver um "brilho" sutil

- [ ] **Todas as 4 coleções distintas em cores**
  - Home, `/colecoes`, `/loja`
  - Mesmas cores em todos os lugares

---

## 🚀 SEÇÃO 6: TESTES AVANÇADOS (opcional)

### 6.1 Responsividade

- [ ] **Mobile (375px):** Cards stackam corretamente
- [ ] **Tablet (768px):** Grid 2 colunas (se aplicável)
- [ ] **Desktop (1440px):** Layout original

### 6.2 Performance

- [ ] **Carregamento:** Página carrega em < 3s
- [ ] **Transições:** Suaves (sem lag ou jank)
- [ ] **Hover:** Instant (sem delay perceptível)

### 6.3 Consistência Mirror

Se quiser validar que `luz-com-aromas/src/` está sincronizado:

- [ ] **Abra os mesmos arquivos** em ambos os diretórios
- [ ] **Compare mudanças:** `/colecoes`, Footer, CTAs
- [ ] **Mesmos valores de cor**

---

## 📸 PROBLEMAS ENCONTRADOS

### Se algo parecer errado:

1. **Tire um screenshot** (Win + Shift + S)
2. **Anote o elemento:** Qual componente/página?
3. **Inspecione com DevTools (F12):**
   - Clique no elemento → **Computed Styles**
   - Procure por `background-color`, `color`, `border-color`
   - Copie o valor exato
4. **Compare com esperado:**
   - Serenidade: `#9B6FC4`
   - Energia: `#C97A4A`
   - Intuição: `#9A6A8D`
   - Purificação: `#6FA88A`
5. **Reporte:**
   - Elemento: (ex: "Card Energia em /colecoes")
   - Valor encontrado: (ex: "#C48B3A")
   - Valor esperado: (ex: "#C97A4A")
   - Screenshot anexado

---

## ✅ RESULTADO FINAL

### Quando terminar, responda:

```
Validação Visual: ☑️ COMPLETA / ❌ Há divergências

Problemas encontrados: (número)
- Problema 1: ...
- Problema 2: ...
- (etc)

Screenshots anexados: Sim / Não

Observações gerais:
(espaço livre para comentários)
```

---

## 🎨 RESUMO DE CORES CANÔNICAS

Para referência rápida enquanto testa:

| Coleção | Cor | Hex |
|---------|-----|-----|
| **Serenidade** | Roxo profundo | `#9B6FC4` |
| **Energia** | Laranja quente | `#C97A4A` |
| **Intuição** | Violeta suave | `#9A6A8D` |
| **Purificação** | Verde menta | `#6FA88A` |

---

## 🔗 ACESSO RÁPIDO

- **App:** http://localhost:5174
- **Colecoes:** http://localhost:5174/colecoes
- **Loja:** http://localhost:5174/loja
- **DevTools:** F12 ou Ctrl+Shift+I

---

**Tempo estimado:** 15-20 minutos  
**Próximo passo:** Reportar resultados ou corrigir divergências  
**Status:** Aguardando validação visual

