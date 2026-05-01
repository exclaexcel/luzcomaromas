# ⚡ VALIDAÇÃO RÁPIDA — 8 MINUTOS

**Tempo:** 8 minutos  
**Servidor:** http://localhost:5174  
**Objective:** Confirmar que sistema de cores está coerente

---

## ✅ CHECKLIST — Marque conforme validar

### Minuto 1-2: HOME PAGE

**Abra:** http://localhost:5174

**Veja:**
- [ ] **Card 1 (Serenidade):** Roxo profundo (#9B6FC4) — vibrante e nítido
- [ ] **Card 2 (Energia):** Laranja QUENTE (#C97A4A) — NOT pálido
- [ ] **Card 3 (Intuição):** Violeta (#9A6A8D) — NOT pink/magenta
- [ ] **Card 4 (Purificação):** Verde menta (#6FA88A) — NOT escuro/azul

**Passe mouse sobre cada card:**
- [ ] Soft color aparece (muito transparente, quase imperceptível)
- [ ] Glow ao redor (brilho sutil)

**Toggle Tema (sun/moon icon):**
- [ ] Modo claro: fundo fica lilás (#F3ECFA)
- [ ] 4 cores primárias MANTÊM (não mudam)
- [ ] Navbar/Footer ficam/permanecem ESCUROS (sem inversão)
- [ ] Transição é SUAVE (não instantânea)
- [ ] Contraste sempre legível

✅ **Home validada:** Siga para próxima

---

### Minuto 3: PÁGINA LOJA

**Clique:** Logo → Loja (ou acesse /loja)

**Veja:**
- [ ] 4 botões de filtro em cores diferentes
  - [ ] Serenidade: roxo (#9B6FC4)
  - [ ] Energia: laranja (#C97A4A) ← **NOVO**
  - [ ] Intuição: violeta (#9A6A8D) ← **ATUALIZADO**
  - [ ] Purificação: verde (#6FA88A) ← **ATUALIZADO**

**Clique em cada filtro:**
- [ ] Botão fica com BG na cor primária (mais opaco)
- [ ] Cards atualizam refletindo coleção

✅ **Loja validada:** Siga para próxima

---

### Minuto 4: PÁGINA PRODUTO

**Clique:** Em qualquer produto Purificação

**Veja:**
- [ ] Badge "Embalagem Vidro": verde (#6FA88A)
  - [ ] Ícone em verde
  - [ ] Texto em verde
  - [ ] BG verde muito leve
  - [ ] Border verde sutil

**Se houver outro produto:**
- [ ] Cor de destaque matches a coleção do produto

✅ **Produto validada:** Siga para próxima

---

### Minuto 5: FOOTER — NEWSLETTER

**Scroll para baixo:**

**Veja:**
- [ ] Título "Receba as chamas..." em OURO (#C9A84A)

**Teste Input de Email:**
- [ ] Border: ouro
- [ ] Digite algo inválido (ex: "teste")
- [ ] Mensagem de erro: VIOLETA (#9A6A8D) ← **VERIFICAR**
- [ ] Cor do texto erro: violeta coerente

✅ **Footer validada:** Siga para próxima

---

### Minuto 6: FOOTER — INSTAGRAM LINK

**Em Footer, localize Instagram:**

**Teste link Instagram:**
- [ ] Estado normal: ícone em cinza claro
- [ ] Hover (mouse sobre): ícone muda para VIOLETA (#9A6A8D)
- [ ] Transição é suave (não "salta")
- [ ] Sobe levemente (transform)

✅ **Instagram validada:** Siga para próxima

---

### Minuto 7: PASSWORD GATE (se houver acesso)

**Acesse:** Página protegida ou tente sem senha

**Teste Input:**
- [ ] Border input: OURO (#C9A84A) por padrão
- [ ] Digite algo errado
- [ ] Border muda para VIOLETA (#9A6A8D)
- [ ] Mensagem de erro: VIOLETA

✅ **Password validada:** Siga para próxima

---

### Minuto 8: CONFIRMAÇÃO FINAL

**Pontos críticos — verifique uma vez:**

1. **Energia:** Laranja QUENTE (não pálido)?
   - [ ] Sim → Certo
   - [ ] Não → Problema

2. **Intuição:** Violeta (não pink)?
   - [ ] Sim → Certo
   - [ ] Não → Problema

3. **Purificação:** Verde menta (não azul/escuro)?
   - [ ] Sim → Certo
   - [ ] Não → Problema

4. **Violeta:** Aparece em erro (footer + password)?
   - [ ] Sim → Certo
   - [ ] Não → Problema

5. **Tema:** Transição suave, navbar sempre escuro?
   - [ ] Sim → Certo
   - [ ] Não → Problema

---

## 🎯 RESULTADO

**Todos os ☑️ marcados?**
```
✅ SIM → VALIDAÇÃO COMPLETA
   Sistema de cores LuzComAromas coerente, consolidado, pronto.

❌ NÃO → Há divergências
   Consulte: TESTE_VISUAL_DETALHADO.md → "Troubleshooting"
```

---

## 🔴 SE ENCONTROU PROBLEMA

**Ação 1:** Anote qual elemento estava errado

**Ação 2:** Abra DevTools (F12) e inspecione elemento

**Ação 3:** Procure em Computed Styles:
- `background-color`
- `color`
- `border-color`
- `box-shadow`

**Ação 4:** Compare com cores canônicas:
```
Serenidade:   #9B6FC4
Energia:      #C97A4A (⚠️ novo)
Intuição:     #9A6A8D (⚠️ atualizado)
Purificação:  #6FA88A (⚠️ atualizado)
```

**Ação 5:** Se estiver diferente, consulte VALIDACAO_CORES.md

---

## ⏱️ Timing

```
Min 1-2:  Home (theme toggle)     → 2 min
Min 3:    Loja (filtros)          → 1 min
Min 4:    Produto (badge)         → 1 min
Min 5:    Footer Newsletter        → 1 min
Min 6:    Footer Instagram        → 1 min
Min 7:    Password (se houver)    → 1 min
Min 8:    Confirmação final       → 1 min
          ────────────────────────
          Total:                   8 min
```

---

## 📋 Antes de Sair

- [ ] Salvou screenshots (se houver problema)
- [ ] Documentou qual elemento estava errado
- [ ] Comparou com ESPERADO_VISUAL.txt
- [ ] Confirmou: ✅ VALIDAÇÃO COMPLETA ou ❌ Há divergências

---

**Status:** Pronto para validação de 8 minutos  
**Servidor:** http://localhost:5174  
**Resultado esperado:** ✅ Sistema coerente
