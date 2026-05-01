import { useEffect, useMemo, useRef, useState } from "react";

function QuantidadesPage() {
  // ------------------ ESTADOS PRINCIPAIS ------------------
  const [tipoEvento, setTipoEvento] = useState("cha-casa-nova");
  const [convidados, setConvidados] = useState(50);
  const [estiloServico, setEstiloServico] = useState("tradicional");
  const [mensagemSalvar, setMensagemSalvar] = useState("");
  const [mensagemAplicar, setMensagemAplicar] = useState("");
  const [temRascunhoNaoSalvo, setTemRascunhoNaoSalvo] = useState(false);
  const [quantidades, setQuantidades] = useState({
    docesUnidades: 0,
    salgadosUnidades: 0,
    boloKg: 0,
    aguaLitros: 0,
    refrigeranteLitros: 0,
    sucoLitros: 0,
  });
  const [precos, setPrecos] = useState({
    docesCento: 120,
    salgadosCento: 95,
    boloKg: 75,
    aguaLitro: 3,
    refrigeranteLitro: 8,
    sucoLitro: 12,
  });

  // Evita sobrescrever cálculo salvo no 1º render
  const bloqueioPrimeiraSugestaoRef = useRef(false);

  // ------------------ REGRAS ------------------
  const regras = {
    aniversario: {
      simples: { doces: 4, salgados: 8, boloGramas: 90, aguaMl: 150, refrigeranteMl: 250, sucoMl: 100 },
      tradicional: { doces: 5, salgados: 10, boloGramas: 100, aguaMl: 180, refrigeranteMl: 300, sucoMl: 120 },
      completo: { doces: 6, salgados: 12, boloGramas: 120, aguaMl: 200, refrigeranteMl: 350, sucoMl: 150 },
    },
    "cha-casa-nova": {
      simples: { doces: 3, salgados: 6, boloGramas: 80, aguaMl: 150, refrigeranteMl: 220, sucoMl: 120 },
      tradicional: { doces: 4, salgados: 8, boloGramas: 100, aguaMl: 180, refrigeranteMl: 260, sucoMl: 140 },
      completo: { doces: 5, salgados: 10, boloGramas: 120, aguaMl: 220, refrigeranteMl: 320, sucoMl: 170 },
    },
    "cha-panela": {
      simples: { doces: 3, salgados: 6, boloGramas: 80, aguaMl: 150, refrigeranteMl: 220, sucoMl: 120 },
      tradicional: { doces: 4, salgados: 8, boloGramas: 100, aguaMl: 180, refrigeranteMl: 260, sucoMl: 140 },
      completo: { doces: 5, salgados: 10, boloGramas: 120, aguaMl: 220, refrigeranteMl: 320, sucoMl: 170 },
    },
    noivado: {
      simples: { doces: 4, salgados: 7, boloGramas: 90, aguaMl: 160, refrigeranteMl: 230, sucoMl: 120 },
      tradicional: { doces: 5, salgados: 9, boloGramas: 100, aguaMl: 180, refrigeranteMl: 280, sucoMl: 140 },
      completo: { doces: 6, salgados: 11, boloGramas: 120, aguaMl: 220, refrigeranteMl: 320, sucoMl: 180 },
    },
    casamento: {
      simples: { doces: 5, salgados: 8, boloGramas: 90, aguaMl: 180, refrigeranteMl: 220, sucoMl: 100 },
      tradicional: { doces: 6, salgados: 10, boloGramas: 100, aguaMl: 200, refrigeranteMl: 260, sucoMl: 120 },
      completo: { doces: 8, salgados: 12, boloGramas: 120, aguaMl: 250, refrigeranteMl: 300, sucoMl: 150 },
    },
    batizado: {
      simples: { doces: 3, salgados: 6, boloGramas: 80, aguaMl: 150, refrigeranteMl: 220, sucoMl: 120 },
      tradicional: { doces: 4, salgados: 8, boloGramas: 100, aguaMl: 180, refrigeranteMl: 260, sucoMl: 140 },
      completo: { doces: 5, salgados: 10, boloGramas: 120, aguaMl: 220, refrigeranteMl: 320, sucoMl: 170 },
    },
  };

  const nomeEvento = {
    aniversario: "Aniversário",
    "cha-casa-nova": "Chá de Casa Nova",
    "cha-panela": "Chá de Panela",
    noivado: "Noivado",
    casamento: "Casamento",
    batizado: "Batizado",
  };

  const nomeEstilo = {
    simples: "Simples",
    tradicional: "Tradicional",
    completo: "Completo",
  };

  // ------------------ SUGESTÃO ------------------
  const sugestao = useMemo(() => {
    const base = regras[tipoEvento]?.[estiloServico] ?? regras["cha-casa-nova"].tradicional;
    return {
      docesUnidades: Math.ceil(convidados * base.doces),
      salgadosUnidades: Math.ceil(convidados * base.salgados),
      boloKg: Number(((convidados * base.boloGramas) / 1000).toFixed(1)),
      aguaLitros: Number(((convidados * base.aguaMl) / 1000).toFixed(1)),
      refrigeranteLitros: Number(((convidados * base.refrigeranteMl) / 1000).toFixed(1)),
      sucoLitros: Number(((convidados * base.sucoMl) / 1000).toFixed(1)),
    };
  }, [tipoEvento, convidados, estiloServico]);

  // ------------------ DRAFT / CARREGAMENTO INICIAL ------------------
  const DRAFT_KEY = "exclaCelebraQuantidadesFinanceiras_DRAFT";

  useEffect(() => {
    // 1) tenta rascunho primeiro
    const draftStr = localStorage.getItem(DRAFT_KEY);
    if (draftStr) {
      try {
        const d = JSON.parse(draftStr);
        setTipoEvento(d.tipoEvento ?? "cha-casa-nova");
        setConvidados(Number(d.convidados ?? 50));
        setEstiloServico(d.estiloServico ?? "tradicional");
        setQuantidades(
          d.quantidades ?? {
            docesUnidades: 0,
            salgadosUnidades: 0,
            boloKg: 0,
            aguaLitros: 0,
            refrigeranteLitros: 0,
            sucoLitros: 0,
          }
        );
        setPrecos(
          d.precos ?? {
            docesCento: 120,
            salgadosCento: 95,
            boloKg: 75,
            aguaLitro: 3,
            refrigeranteLitro: 8,
            sucoLitro: 12,
          }
        );
        bloqueioPrimeiraSugestaoRef.current = true;
        return;
      } catch (e) { console.warn("Rascunho inválido:", e); }
    }

    // 2) se não houver rascunho, tente o cálculo salvo
    const dadosSalvos = localStorage.getItem("exclaCelebraQuantidadesFinanceiras");
    if (dadosSalvos) {
      try {
        const dados = JSON.parse(dadosSalvos);
        setTipoEvento(dados.tipoEvento ?? "cha-casa-nova");
        setConvidados(Number(dados.convidados ?? 50));
        setEstiloServico(dados.estiloServico ?? "tradicional");
        setQuantidades(
          dados.quantidades ?? {
            docesUnidades: 0,
            salgadosUnidades: 0,
            boloKg: 0,
            aguaLitros: 0,
            refrigeranteLitros: 0,
            sucoLitros: 0,
          }
        );
        setPrecos(
          dados.precos ?? {
            docesCento: 120,
            salgadosCento: 95,
            boloKg: 75,
            aguaLitro: 3,
            refrigeranteLitro: 8,
            sucoLitro: 12,
          }
        );
        bloqueioPrimeiraSugestaoRef.current = true;
        return;
      } catch (e) { console.error("Erro ao ler cálculo salvo:", e); }
    }

    // 3) fallback: sugere do zero
    setQuantidades(sugestao);
  }, []);

  // atualiza quantidades quando entradas mudam (exceto na 1ª restauração)
  useEffect(() => {
    if (bloqueioPrimeiraSugestaoRef.current) { bloqueioPrimeiraSugestaoRef.current = false; return; }
    setQuantidades(sugestao);
  }, [sugestao]);

  // ------------------ AUTO-SAVE DO RASCUNHO ------------------
  useEffect(() => {
    setTemRascunhoNaoSalvo(true);
    const t = setTimeout(() => {
      const draft = { tipoEvento, convidados, estiloServico, quantidades, precos, atualizadoEm: new Date().toISOString() };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      setTemRascunhoNaoSalvo(false);
    }, 120);
    return () => {
      clearTimeout(t);
      // Force-save on unmount para não perder dados ao navegar
      const draft = { tipoEvento, convidados, estiloServico, quantidades, precos, atualizadoEm: new Date().toISOString() };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    };
  }, [tipoEvento, convidados, estiloServico, quantidades, precos]);

  // ------------------ CUSTOS ------------------
  const custos = useMemo(() => {
    const docesCentos = Number(quantidades.docesUnidades ?? 0) / 100;
    const salgadosCentos = Number(quantidades.salgadosUnidades ?? 0) / 100;
    const doces = docesCentos * Number(precos.docesCento ?? 0);
    const salgados = salgadosCentos * Number(precos.salgadosCento ?? 0);
    const bolo = Number(quantidades.boloKg ?? 0) * Number(precos.boloKg ?? 0);
    const agua = Number(quantidades.aguaLitros ?? 0) * Number(precos.aguaLitro ?? 0);
    const refrigerante = Number(quantidades.refrigeranteLitros ?? 0) * Number(precos.refrigeranteLitro ?? 0);
    const suco = Number(quantidades.sucoLitros ?? 0) * Number(precos.sucoLitro ?? 0);
    return { doces, salgados, bolo, agua, refrigerante, suco, bebidas: agua + refrigerante + suco, total: doces + salgados + bolo + agua + refrigerante + suco };
  }, [quantidades, precos]);

  // ------------------ AUXILIARES ------------------
  const formatarMoeda = (v) => Number(v ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const atualizarQuantidade = (campo, valor) => setQuantidades((p) => ({ ...p, [campo]: Number(valor) ?? 0 }));
  const atualizarPreco = (campo, valor) => setPrecos((p) => ({ ...p, [campo]: Number(valor) ?? 0 }));
  const montarPayload = () => ({
    tipoEvento,
    nomeEvento: nomeEvento[tipoEvento],
    convidados,
    estiloServico,
    nomeEstilo: nomeEstilo[estiloServico],
    quantidades,
    precos,
    custos,
    atualizadoEm: new Date().toISOString(),
  });

  // ------------------ DESTINO FIXO = PREVISTO ------------------
  const DESTINO_CATEGORIAS = "previsto"; // não exibimos seletor; sempre aplica como Previsto

  // ------------------ BOTÕES ------------------
  const salvarCalculo = () => {
    const payload = montarPayload();
    payload.destinoCategorias = DESTINO_CATEGORIAS;
    localStorage.setItem("exclaCelebraQuantidadesFinanceiras", JSON.stringify(payload));
    localStorage.setItem("exclaCelebraQuantidadesFinanceirasAplicadoEm", String(Date.now()));
    localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
    setTemRascunhoNaoSalvo(false);
    setMensagemSalvar("Cálculo salvo na calculadora e na Visão Geral.");
    setMensagemAplicar("");
    setTimeout(() => setMensagemSalvar(""), 3000);
  };

  const limparCalculadora = () => {
    if (!confirm("Limpar calculadora? Isso resetará a sugestão padrão.")) return;
    localStorage.removeItem(DRAFT_KEY);
    localStorage.removeItem("exclaCelebraQuantidadesFinanceiras");
    localStorage.removeItem("exclaCelebraQuantidadesFinanceirasAplicadoEm");
    setTipoEvento("cha-casa-nova");
    setConvidados(50);
    setEstiloServico("tradicional");
    setQuantidades(sugestao);
    setPrecos({
      docesCento: 120,
      salgadosCento: 95,
      boloKg: 75,
      aguaLitro: 3,
      refrigeranteLitro: 8,
      sucoLitro: 12,
    });
    setTemRascunhoNaoSalvo(false);
    setMensagemSalvar("");
    setMensagemAplicar("Calculadora limpa com sucesso.");
    setTimeout(() => setMensagemAplicar(""), 3000);
  };

  // ------------------ UI ------------------
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #F7F4EF 0%, #F8F2EB 100%)", color: "#1B1B1B", fontFamily: "Inter, Arial, sans-serif" }}>
      {/* HEADER */}
      <header style={{ position: "sticky", top: 0, zIndex: 1000, backgroundColor: "rgba(247, 244, 239, 0.92)", backdropFilter: "blur(10px)", borderBottom: "1px solid #EADFD3" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: "1.9rem", marginBottom: "6px", letterSpacing: "-0.03em", fontWeight: 700 }}>
              <span style={{ color: "#2F4F3E" }}>Exclã</span>{" "}
              <span style={{ color: "#C7A15A" }}>Celebra</span>
            </h1>
            <p style={{ color: "#5A5A5A", lineHeight: 1.6, margin: 0 }}>Calculadora de quantidades</p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a href="/app" style={{ textDecoration: "none", backgroundColor: "#FFF8F2", color: "#8A5A44", border: "1px solid #DCCDBE", padding: "12px 18px", borderRadius: "12px", fontWeight: 700 }}>Visão geral</a>
            <a href="/quantidades" style={{ textDecoration: "none", backgroundColor: "#2F4F3E", color: "#F7F4EF", border: "1px solid #2F4F3E", padding: "12px 18px", borderRadius: "12px", fontWeight: 700 }}>Calculadora de quantidades</a>
            <a href="/painel-financeiro" style={{ textDecoration: "none", backgroundColor: "#FFF8F2", color: "#8A5A44", border: "1px solid #DCCDBE", padding: "12px 18px", borderRadius: "12px", fontWeight: 700 }}>Painel financeiro</a>
            <a href="/" style={{ textDecoration: "none", backgroundColor: "#FFF8F2", color: "#2F4F3E", border: "1px solid #DCCDBE", padding: "12px 18px", borderRadius: "12px", fontWeight: 700 }}>Voltar ao site</a>
            <a href="/login" style={{ textDecoration: "none", backgroundColor: "#F3E2D8", color: "#8A5A44", border: "1px solid #E8D3C7", padding: "12px 18px", borderRadius: "12px", fontWeight: 700 }}>Sair</a>
          </div>
        </div>
      </header>

      <div style={{ padding: "32px 24px 40px" }}>
        {/* DADOS DA ESTIMATIVA */}
        <div style={{ maxWidth: "1180px", margin: "0 auto 32px auto", backgroundColor: "#FFFDF9", border: "1px solid #EADFD3", borderRadius: "26px", padding: "30px 32px", boxShadow: "0 10px 24px rgba(27, 27, 27, 0.05)" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "22px", letterSpacing: "-0.02em", fontWeight: 650 }}>Dados da estimativa</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "#444" }}>Tipo de evento</label>
              <select value={tipoEvento} onChange={(e) => setTipoEvento(e.target.value)} style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF", fontSize: "1rem" }}>
                <option value="aniversario">Aniversário</option>
                <option value="cha-casa-nova">Chá de Casa Nova</option>
                <option value="cha-panela">Chá de Panela</option>
                <option value="noivado">Noivado</option>
                <option value="casamento">Casamento</option>
                <option value="batizado">Batizado</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "#444" }}>Convidados</label>
              <input type="number" min="1" value={convidados} onChange={(e) => setConvidados(Number(e.target.value) ?? 0)} style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF", fontSize: "1rem" }} />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "#444" }}>Estilo do serviço</label>
              <select value={estiloServico} onChange={(e) => setEstiloServico(e.target.value)} style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF", fontSize: "1rem" }}>
                <option value="simples">Simples</option>
                <option value="tradicional">Tradicional</option>
                <option value="completo">Completo</option>
              </select>
            </div>
          </div>
        </div>

        {/* COMIDAS & BEBIDAS */}
        <div style={{ maxWidth: "1180px", margin: "0 auto 24px auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
          <div style={{ backgroundColor: "#FFFDF9", border: "1px solid #EADFD3", borderRadius: "26px", padding: "28px", boxShadow: "0 10px 24px rgba(27, 27, 27, 0.05)" }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "18px" }}>Comidas</h3>
            <div style={{ display: "grid", gap: "16px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Doces (unidades)</label>
                <input type="number" value={quantidades.docesUnidades} onChange={(e) => atualizarQuantidade("docesUnidades", e.target.value)} style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Preço do cento de doces</label>
                <input type="number" value={precos.docesCento} onChange={(e) => atualizarPreco("docesCento", e.target.value)} style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Salgados (unidades)</label>
                <input type="number" value={quantidades.salgadosUnidades} onChange={(e) => atualizarQuantidade("salgadosUnidades", e.target.value)} style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Preço do cento de salgados</label>
                <input type="number" value={precos.salgadosCento} onChange={(e) => atualizarPreco("salgadosCento", e.target.value)} style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Bolo (kg)</label>
                <input type="number" step="0.1" value={quantidades.boloKg} onChange={(e) => atualizarQuantidade("boloKg", e.target.value)} style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Preço do bolo por kg</label>
                <input type="number" value={precos.boloKg} onChange={(e) => atualizarPreco("boloKg", e.target.value)} style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF" }} />
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: "#FFFDF9", border: "1px solid #EADFD3", borderRadius: "26px", padding: "28px", boxShadow: "0 10px 24px rgba(27, 27, 27, 0.05)" }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "18px" }}>Bebidas</h3>
            <div style={{ display: "grid", gap: "16px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Água (litros)</label>
                <input type="number" step="0.1" value={quantidades.aguaLitros} onChange={(e) => atualizarQuantidade("aguaLitros", e.target.value)} style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Preço da água por litro</label>
                <input type="number" value={precos.aguaLitro} onChange={(e) => atualizarPreco("aguaLitro", e.target.value)} style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Refrigerante (litros)</label>
                <input type="number" step="0.1" value={quantidades.refrigeranteLitros} onChange={(e) => atualizarQuantidade("refrigeranteLitros", e.target.value)} style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Preço do refrigerante por litro</label>
                <input type="number" value={precos.refrigeranteLitro} onChange={(e) => atualizarPreco("refrigeranteLitro", e.target.value)} style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Suco (litros)</label>
                <input type="number" step="0.1" value={quantidades.sucoLitros} onChange={(e) => atualizarQuantidade("sucoLitros", e.target.value)} style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Preço do suco por litro</label>
                <input type="number" value={precos.sucoLitro} onChange={(e) => atualizarPreco("sucoLitro", e.target.value)} style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF" }} />
              </div>
            </div>
          </div>
        </div>

        {/* AÇÕES */}
        <div style={{ maxWidth: "1180px", margin: "0 auto 16px auto", backgroundColor: "#FFFDF9", border: "1px solid #EADFD3", borderRadius: "18px", padding: "16px 18px", boxShadow: "0 8px 18px rgba(27,27,27,0.05)" }}>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button onClick={salvarCalculo} style={{ backgroundColor: "#C7A15A", color: "#1B1B1B", border: "none", padding: "12px 18px", borderRadius: "12px", fontWeight: 700, cursor: "pointer" }}>Salvar cálculo</button>
            <button onClick={limparCalculadora} style={{ backgroundColor: "#F9EFE7", color: "#8A5A44", border: "1px solid #E8D3C7", padding: "12px 18px", borderRadius: "12px", fontWeight: 700, cursor: "pointer" }}>Limpar calculadora</button>
          </div>
        </div>

        {/* MENSAGENS */}
        {temRascunhoNaoSalvo && (
          <div style={{ maxWidth: "1180px", margin: "0 auto 10px auto", backgroundColor: "#FCE7E7", color: "#C73E3E", border: "1px solid #E8CDCD", padding: "10px 12px", borderRadius: "10px", fontSize: "0.95rem", fontWeight: 600 }}>⚠️ Alterações não salvas... (salvando automaticamente)</div>
        )}
        {mensagemSalvar && (
          <div style={{ maxWidth: "1180px", margin: "0 auto 10px auto", backgroundColor: "#EAF3EE", color: "#2F4F3E", border: "1px solid #DCE8E0", padding: "10px 12px", borderRadius: "10px", fontSize: "0.95rem", fontWeight: 600 }}>{mensagemSalvar}</div>
        )}
        {mensagemAplicar && (
          <div style={{ maxWidth: "1180px", margin: "0 auto 10px auto", backgroundColor: "#FFF7E7", color: "#8A6A1F", border: "1px solid #EADBB5", padding: "10px 12px", borderRadius: "10px", fontSize: "0.95rem", fontWeight: 600 }}>{mensagemAplicar}</div>
        )}

      </div>
    </div>
  );
}

export default QuantidadesPage;