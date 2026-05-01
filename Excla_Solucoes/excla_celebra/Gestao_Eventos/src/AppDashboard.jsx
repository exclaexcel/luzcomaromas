import { useEffect, useMemo, useRef, useState } from "react";
import Calendario from "./Calendario";

// ===================== PADRÕES =====================
const EVENTO_PADRAO = {
  nome: "Chá de Casa Nova",
  data: "",
  horario: "",
  convidados: 50,
  orcamentoTeto: 0, // orçamento total (teto) manual
};

const CATEGORIAS_PADRAO = [
  { id: 1, nome: "Espaço", previsto: 0, real: 0, status: "Pendente" },
  { id: 2, nome: "Doces", previsto: 0, real: 0, status: "Pendente" },
  { id: 3, nome: "Salgados", previsto: 0, real: 0, status: "Pendente" },
  { id: 4, nome: "Bolo", previsto: 0, real: 0, status: "Pendente" },
  { id: 5, nome: "Bebidas", previsto: 0, real: 0, status: "Pendente" },
  { id: 6, nome: "Decoração", previsto: 0, real: 0, status: "Pendente" },
  { id: 7, nome: "Extras", previsto: 0, real: 0, status: "Pendente" },
];

// ===================== KEYS =====================
const K_EVENTO = "exclaCelebraEvento";
const K_CATEGORIAS = "exclaCelebraCategorias";
const K_CALC = "exclaCelebraQuantidadesFinanceiras";
const K_CALC_APLICADO_EM = "exclaCelebraQuantidadesFinanceirasAplicadoEm";
// marcadores de edição manual
const K_CATS_EDITED_AT = "exclaCelebraCategoriasLastEditedAt";
const K_EVENTO_EDITED_AT = "exclaCelebraEventoLastEditedAt";
// lock opcional p/ impedir que calculadora sobreponha manual
const K_CATS_LOCK = "exclaCelebraCategoriasLocked";
const K_CONVIDADOS = "exclaCelebraConvidados";

function AppDashboard() {
  const [evento, setEvento] = useState(EVENTO_PADRAO);
  const [categorias, setCategorias] = useState(CATEGORIAS_PADRAO);
  const [novaCategoria, setNovaCategoria] = useState({
    nome: "",
    previsto: "",
    real: "",
    status: "Pendente",
  });
  const [resumoCalculadora, setResumoCalculadora] = useState(null);
  const [convidados, setConvidados] = useState([]);
  const [novoConvidado, setNovoConvidado] = useState({
    nome: "",
    telefone: "",
    email: "",
    observacao: "",
  });
  const [editandoConvidadoId, setEditandoConvidadoId] = useState(null);
  const [toast, setToast] = useState("");
  const carregadoRef = useRef(false);
  const [mostrando, setMostrando] = useState("dashboard");

  // ===================== HELPERS =====================
  const formatarMoeda = (v) =>
    Number(v ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const formatarData = (valor) => {
    if (!valor) return "-";
    const [ano, mes, dia] = valor.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const statusStyle = (status) => {
    if (status === "Fechado") return { backgroundColor: "#E6F2EB", color: "#2F4F3E" };
    if (status === "Em andamento") return { backgroundColor: "#FFF3D9", color: "#8A6A1F" };
    return { backgroundColor: "#F3E2D8", color: "#8A5A44" };
  };

  const iconeCategoria = (nome) => {
    const n = String(nome).toLowerCase();
    if (n.includes("espaço") || n.includes("espaco")) return "📍";
    if (n.includes("bebida")) return "🥤";
    if (n.includes("decoração") || n.includes("decoracao")) return "🎀";
    if (n.includes("extra")) return "✨";
    if (n.includes("bolo")) return "🎂";
    if (n.includes("doce")) return "🍬";
    if (n.includes("salgado")) return "🥟";
    if (n.includes("lembr")) return "🎁";
    return "🗂️";
  };

  const norm = (s) =>
    String(s ?? "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // remove diacríticos

  // timestamps e lock
  const markCatsEdited = () => localStorage.setItem(K_CATS_EDITED_AT, String(Date.now()));
  const markEventoEdited = () => localStorage.setItem(K_EVENTO_EDITED_AT, String(Date.now()));
  const lockCategorias = () => localStorage.setItem(K_CATS_LOCK, "1");
  const unlockCategorias = () => localStorage.removeItem(K_CATS_LOCK);
  const isLockedCategorias = () => localStorage.getItem(K_CATS_LOCK) === "1";

  // ===================== SYNC CALCULADORA + MANUAL =====================
  const mergeCategoriasComCalculadora = (catsAtuais, calculadoraDados) => {
    if (!calculadoraDados || !calculadoraDados.custos) return catsAtuais;

    const alvo = {
      Doces: Number(calculadoraDados.custos?.doces ?? 0),
      Salgados: Number(calculadoraDados.custos?.salgados ?? 0),
      Bolo: Number(calculadoraDados.custos?.bolo ?? 0),
      Bebidas: Number(calculadoraDados.custos?.bebidas ?? 0),
    };

    const mapa = new Map(catsAtuais.map((c, i) => [norm(c.nome), i]));
    const out = [...catsAtuais];
    let mudou = false;

    for (const [nome, previstoNovo] of Object.entries(alvo)) {
      const i = mapa.get(norm(nome));
      if (i !== undefined) {
        const previstoAtual = Number(out[i].previsto ?? 0);
        if (previstoAtual !== previstoNovo) {
          out[i] = { ...out[i], previsto: previstoNovo };
          mudou = true;
        }
      } else {
        out.push({
          id: Date.now() + Math.floor(Math.random() * 100000),
          nome,
          previsto: previstoNovo,
          real: 0,
          status: "Pendente",
        });
        mudou = true;
      }
    }

    return mudou ? out : catsAtuais;
  };

  // ===================== AÇÕES MANUAIS =====================
  const atualizarEvento = (campo, valor) => {
    setEvento((p) => ({
      ...p,
      [campo]: campo === "convidados" || campo === "orcamentoTeto" ? Number(valor) ?? 0 : valor,
    }));
    markEventoEdited();
  };

  const atualizarCategoria = (id, campo, valor) => {
    setCategorias((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              [campo]: campo === "previsto" || campo === "real" ? Number(valor) ?? 0 : valor,
            }
          : c
      )
    );
    markCatsEdited();
  };

  const adicionarCategoria = () => {
    if (!novaCategoria.nome.trim()) return;
    const nova = {
      id: Date.now(),
      nome: novaCategoria.nome.trim(),
      previsto: Number(novaCategoria.previsto) ?? 0,
      real: Number(novaCategoria.real) ?? 0,
      status: novaCategoria.status,
    };
    setCategorias((prev) => [...prev, nova]);
    setNovaCategoria({ nome: "", previsto: "", real: "", status: "Pendente" });
    markCatsEdited();
  };

  const removerCategoria = (id) => {
    setCategorias((prev) => prev.filter((c) => c.id !== id));
    markCatsEdited();
  };

  // botão SALVAR (crava tudo, inclusive orcamentoTeto)
  const salvarAlteracoes = () => {
    const dadosCalc = localStorage.getItem(K_CALC);
    const calculadora = dadosCalc ? JSON.parse(dadosCalc) : null;
    const categoriasAtualizadas = calculadora ? mergeCategoriasComCalculadora(categorias, calculadora) : categorias;

    setCategorias(categoriasAtualizadas);

    localStorage.setItem(K_EVENTO, JSON.stringify(evento));
    localStorage.setItem(K_CATEGORIAS, JSON.stringify(categoriasAtualizadas));
    localStorage.setItem(K_CONVIDADOS, JSON.stringify(convidados));
    localStorage.setItem(K_EVENTO_EDITED_AT, String(Date.now()));
    localStorage.setItem(K_CATS_EDITED_AT, String(Date.now()));
    lockCategorias(); // impede auto-override até você decidir
    setToast("Alterações salvas.");
    setTimeout(() => setToast(""), 2200);
  };

  // ===================== MÉTODOS DE CONVIDADOS =====================
  const adicionarOuEditarConvidado = () => {
    if (!novoConvidado.nome.trim() || !novoConvidado.telefone.trim()) {
      setToast("Nome e telefone são obrigatórios");
      setTimeout(() => setToast(""), 2200);
      return;
    }

    if (editandoConvidadoId) {
      setConvidados((prev) =>
        prev.map((c) =>
          c.id === editandoConvidadoId
            ? { ...c, ...novoConvidado }
            : c
        )
      );
      setToast("Convidado atualizado");
      setEditandoConvidadoId(null);
    } else {
      setConvidados((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...novoConvidado,
          confirmado: false,
        },
      ]);
      setToast("Convidado adicionado");
    }

    setNovoConvidado({ nome: "", telefone: "", email: "", observacao: "" });
    setTimeout(() => setToast(""), 2200);
  };

  const editarConvidado = (convidado) => {
    setNovoConvidado({
      nome: convidado.nome,
      telefone: convidado.telefone,
      email: convidado.email,
      observacao: convidado.observacao,
    });
    setEditandoConvidadoId(convidado.id);
  };

  const removerConvidado = (id) => {
    setConvidados((prev) => prev.filter((c) => c.id !== id));
    setToast("Convidado removido");
    setTimeout(() => setToast(""), 2200);
  };

  const marcarConfirmado = (id) => {
    setConvidados((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, confirmado: !c.confirmado } : c
      )
    );
  };

  const enviarWhatsApp = (convidado) => {
    const dataEvento = evento.data ? formatarData(evento.data) : "em breve";
    const nomeEvento = evento.nome || "nosso evento";
    const mensagem = `Olá ${convidado.nome}! Seu convite para ${nomeEvento} em ${dataEvento} está confirmado! Falta menos para você nos acompanhar.`;
    const tel = convidado.telefone.replace(/\D/g, "");
    const url = `https://wa.me/55${tel}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  };

  const whatsappEmMassa = () => {
    const confirmados = convidados.filter((c) => c.confirmado);
    if (confirmados.length === 0) {
      setToast("Nenhum convidado confirmado");
      setTimeout(() => setToast(""), 2200);
      return;
    }
    confirmados.forEach((c) => {
      setTimeout(() => enviarWhatsApp(c), 500);
    });
    setToast(`Abrindo WhatsApp para ${confirmados.length} convidado(s)...`);
    setTimeout(() => setToast(""), 3000);
  };

  // ===================== TOTAIS =====================
  const totais = useMemo(() => {
    const orcamentoPrevisto = categorias.reduce((acc, c) => acc + Number(c.previsto ?? 0), 0);
    const totalGasto = categorias.reduce((acc, c) => acc + Number(c.real ?? 0), 0);
    const saldoDisponivel = orcamentoPrevisto - totalGasto;
    const diferencaTetoPrevisto = Number(evento.orcamentoTeto ?? 0) - orcamentoPrevisto;
    return { orcamentoPrevisto, totalGasto, saldoDisponivel, diferencaTetoPrevisto };
  }, [categorias, evento.orcamentoTeto]);

  // ===================== SYNC COM A CALCULADORA (respeita manual) =====================
  const aplicarCalculadoraEmCategorias = (origem = "AUTO") => {
    const dadosStr = localStorage.getItem(K_CALC);
    if (!dadosStr) return;

    try {
      const dados = JSON.parse(dadosStr);
      const aplicadoEm = Number(localStorage.getItem(K_CALC_APLICADO_EM) ?? 0);
      const catsEditedAt = Number(localStorage.getItem(K_CATS_EDITED_AT) ?? 0);
      const locked = isLockedCategorias();

      setResumoCalculadora(dados);

      // atualiza apenas convidados (não toca nome/data/horário/orcamentoTeto)
      setEvento((prev) => ({
        ...prev,
        convidados: Number(dados.convidados ?? prev.convidados),
      }));

      const alvo = {
        Doces: Number(dados.custos?.doces ?? 0),
        Salgados: Number(dados.custos?.salgados ?? 0),
        Bolo: Number(dados.custos?.bolo ?? 0),
        Bebidas: Number(dados.custos?.bebidas ?? 0),
      };

      const forcarOverride = aplicadoEm > catsEditedAt; // Aplicar depois de editar manual

      setCategorias((prev) => {
        const mapa = new Map(prev.map((c, i) => [norm(c.nome), i]));
        const out = [...prev];
        let mudou = false;

        for (const [nome, previstoNovo] of Object.entries(alvo)) {
          const i = mapa.get(norm(nome));
          if (i !== undefined) {
            const previstoAtual = Number(out[i].previsto ?? 0);
            const podeAplicar = forcarOverride ? true : !locked && previstoAtual === 0;
            if (podeAplicar && previstoAtual !== previstoNovo) {
              out[i] = { ...out[i], previsto: previstoNovo };
              mudou = true;
            }
          } else {
            out.push({
              id: Date.now() + Math.floor(Math.random() * 100000),
              nome,
              previsto: previstoNovo,
              real: 0,
              status: "Pendente",
            });
            mudou = true;
          }
        }
        return mudou ? out : prev;
      });
    } catch (e) {
      console.error("Erro ao aplicar cálculo da calculadora:", e);
    }
  };

  // ===================== CARREGAR + APLICAR =====================
  useEffect(() => {
    try {
      const eventoSalvo = localStorage.getItem(K_EVENTO);
      const categoriasSalvas = localStorage.getItem(K_CATEGORIAS);
      const calculadoraSalva = localStorage.getItem(K_CALC);
      const convidadosSalvos = localStorage.getItem(K_CONVIDADOS);

      if (eventoSalvo) setEvento(JSON.parse(eventoSalvo));

      if (categoriasSalvas) {
        const parsed = JSON.parse(categoriasSalvas);
        if (Array.isArray(parsed) && parsed.length > 0) setCategorias(parsed);
      }

      if (calculadoraSalva) setResumoCalculadora(JSON.parse(calculadoraSalva));
      
      if (convidadosSalvos) {
        try {
          const parsed = JSON.parse(convidadosSalvos);
          if (Array.isArray(parsed)) setConvidados(parsed);
        } catch (e) {
          console.error("Erro ao carregar convidados:", e);
        }
      }

      carregadoRef.current = true;
    } catch (e) {
      console.error("Erro ao carregar dados iniciais:", e);
      carregadoRef.current = true;
    }
    aplicarCalculadoraEmCategorias("MOUNT");
  }, []);

  // ===================== PERSISTÊNCIA (EVENTO/CATEGORIAS) =====================
  useEffect(() => {
    if (!carregadoRef.current) return;
    localStorage.setItem(K_EVENTO, JSON.stringify(evento));
  }, [evento]);

  useEffect(() => {
    if (!carregadoRef.current) return;
    localStorage.setItem(K_CATEGORIAS, JSON.stringify(categorias));
  }, [categorias]);

  useEffect(() => {
    if (!carregadoRef.current) return;
    localStorage.setItem(K_CONVIDADOS, JSON.stringify(convidados));
  }, [convidados]);

  // aplicar ao voltar foco
  useEffect(() => {
    const aoVoltar = () => aplicarCalculadoraEmCategorias("FOCUS");
    window.addEventListener("focus", aoVoltar);
    return () => window.removeEventListener("focus", aoVoltar);
  }, []);

  // ===================== LIMPAR TUDO =====================
  const limparTudo = () => {
    if (!confirm("Novo evento: limpar evento, categorias e cálculo aplicado?")) return;
    [K_EVENTO, K_CATEGORIAS, K_CALC, K_CALC_APLICADO_EM, K_CATS_EDITED_AT, K_EVENTO_EDITED_AT, K_CATS_LOCK, K_CONVIDADOS].forEach((k) =>
      localStorage.removeItem(k)
    );
    setEvento(EVENTO_PADRAO);
    setCategorias(CATEGORIAS_PADRAO);
    setConvidados([]);
    setResumoCalculadora(null);
    setToast("Dados do evento redefinidos.");
    setTimeout(() => setToast(""), 2200);
  };

  // ===================== UI =====================
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F7F4EF", color: "#1B1B1B", fontFamily: "Inter, Arial, sans-serif" }}>
      {/* HEADER */}
      <header style={{ position: "sticky", top: 0, zIndex: 1000, backgroundColor: "rgba(247, 244, 239, 0.92)", backdropFilter: "blur(10px)", borderBottom: "1px solid #EADFD3" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: "1.9rem", marginBottom: "6px", letterSpacing: "-0.03em", fontWeight: 700 }}>
              <span style={{ color: "#2F4F3E" }}>Exclã</span>{" "}
              <span style={{ color: "#C7A15A" }}>Celebra</span>
            </h1>
            <p style={{ color: "#555", lineHeight: 1.6, margin: 0 }}>Visão geral do evento</p>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            <button onClick={() => setMostrando("dashboard")} style={{ textDecoration: "none", backgroundColor: mostrando === "dashboard" ? "#2F4F3E" : "#FFF8F2", color: mostrando === "dashboard" ? "#F7F4EF" : "#8A5A44", border: "1px solid #DCCDBE", padding: "12px 18px", borderRadius: "12px", fontWeight: 700, cursor: "pointer" }}>Visão geral</button>
            <a href="/quantidades" style={{ textDecoration: "none", backgroundColor: "#FFF8F2", color: "#8A5A44", border: "1px solid #DCCDBE", padding: "12px 18px", borderRadius: "12px", fontWeight: 700 }}>Calculadora de quantidades</a>
            <a href="/painel-financeiro" style={{ textDecoration: "none", backgroundColor: "#FFF8F2", color: "#8A5A44", border: "1px solid #DCCDBE", padding: "12px 18px", borderRadius: "12px", fontWeight: 700 }}>Painel financeiro</a>
            <button onClick={() => setMostrando("calendario")} style={{ textDecoration: "none", backgroundColor: mostrando === "calendario" ? "#2F4F3E" : "#FFF8F2", color: mostrando === "calendario" ? "#F7F4EF" : "#8A5A44", border: "1px solid #DCCDBE", padding: "12px 18px", borderRadius: "12px", fontWeight: 700, cursor: "pointer" }}>Calendário</button>
            <a href="/" style={{ textDecoration: "none", backgroundColor: "#FFF8F2", color: "#2F4F3E", border: "1px solid #DCCDBE", padding: "12px 18px", borderRadius: "12px", fontWeight: 700 }}>Voltar ao site</a>
            <a href="/login" style={{ textDecoration: "none", backgroundColor: "#F3E2D8", color: "#8A5A44", border: "1px solid #E8D3C7", padding: "12px 18px", borderRadius: "12px", fontWeight: 700 }}>Sair</a>

            <button onClick={salvarAlteracoes} style={{ backgroundColor: "#2F4F3E", color: "#F7F4EF", border: "1px solid #2F4F3E", padding: "10px 14px", borderRadius: "10px", fontWeight: 700, cursor: "pointer" }}>Salvar alterações</button>
            <button onClick={unlockCategorias} title="Permitir que a calculadora preencha onde for 0 novamente" style={{ backgroundColor: "#F3F7F4", color: "#2F4F3E", border: "1px solid #DCE8E0", padding: "10px 14px", borderRadius: "10px", fontWeight: 700, cursor: "pointer" }}>Desbloquear categorias</button>
            <button onClick={limparTudo} style={{ backgroundColor: "#FFECEC", color: "#7A1F1F", border: "1px solid #F3C0C0", padding: "10px 14px", borderRadius: "10px", fontWeight: 700, cursor: "pointer" }}>Novo evento (limpar tudo)</button>
          </div>
        </div>
      </header>

      {toast && (
        <div style={{ maxWidth: "1180px", margin: "10px auto 0 auto", background: "#EAF3EE", color: "#2F4F3E", border: "1px solid #DCE8E0", padding: "10px 12px", borderRadius: "10px", fontWeight: 600 }}>{toast}</div>
      )}

      {mostrando === 'calendario' ? (
        <Calendario />
      ) : (
        <div style={{ padding: "32px 24px 48px" }}>
          {/* DADOS DO EVENTO */}
          <div style={{ maxWidth: "1180px", margin: "0 auto 32px auto", backgroundColor: "#FFFDF9", border: "1px solid #EADFD3", borderRadius: "24px", padding: "28px", boxShadow: "0 10px 24px rgba(27, 27, 27, 0.05)" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "20px", letterSpacing: "-0.02em" }}>Dados do evento</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "#444" }}>Nome do evento</label>
                <input type="text" value={evento.nome} onChange={(e) => atualizarEvento("nome", e.target.value)} style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF", fontSize: "1rem", outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "#444" }}>Data</label>
                <input type="date" value={evento.data} onChange={(e) => atualizarEvento("data", e.target.value)} style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF", fontSize: "1rem", outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "#444" }}>Horário</label>
                <input type="time" value={evento.horario} onChange={(e) => atualizarEvento("horario", e.target.value)} style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF", fontSize: "1rem", outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "#444" }}>Convidados previstos</label>
                <input type="number" min="0" value={evento.convidados} onChange={(e) => atualizarEvento("convidados", e.target.value)} style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF", fontSize: "1rem", outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "#444" }}>Orçamento total (teto)</label>
                <input type="number" min="0" value={evento.orcamentoTeto} onChange={(e) => atualizarEvento("orcamentoTeto", e.target.value)} placeholder="0" style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF", fontSize: "1rem", outline: "none" }} />
              </div>
            </div>
          </div>

          {/* CONVIDADOS CONFIRMADOS */}
          <div style={{ maxWidth: "1180px", margin: "0 auto 32px auto", backgroundColor: "#FFFDF9", border: "1px solid #EADFD3", borderRadius: "24px", padding: "28px", boxShadow: "0 10px 24px rgba(27, 27, 27, 0.05)" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "20px", letterSpacing: "-0.02em" }}>Convidados confirmados ({convidados.filter(c => c.confirmado).length}/{convidados.length})</h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "22px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "#444" }}>Nome</label>
                <input type="text" value={novoConvidado.nome} onChange={(e) => setNovoConvidado((p) => ({ ...p, nome: e.target.value }))} placeholder="Ex: Maria Silva" style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF", fontSize: "1rem", outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "#444" }}>Telefone</label>
                <input type="tel" value={novoConvidado.telefone} onChange={(e) => setNovoConvidado((p) => ({ ...p, telefone: e.target.value }))} placeholder="(11) 99999-9999" style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF", fontSize: "1rem", outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "#444" }}>Email</label>
                <input type="email" value={novoConvidado.email} onChange={(e) => setNovoConvidado((p) => ({ ...p, email: e.target.value }))} placeholder="email@example.com" style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF", fontSize: "1rem", outline: "none" }} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "#444" }}>Observações</label>
                <input type="text" value={novoConvidado.observacao} onChange={(e) => setNovoConvidado((p) => ({ ...p, observacao: e.target.value }))} placeholder="Ex: Vegano, alérgico..." style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF", fontSize: "1rem", outline: "none" }} />
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button onClick={adicionarOuEditarConvidado} style={{ backgroundColor: "#2F4F3E", color: "#F7F4EF", border: "none", padding: "12px 18px", borderRadius: "12px", fontWeight: 700, cursor: "pointer" }}>
                {editandoConvidadoId ? "Atualizar convidado" : "+ Adicionar convidado"}
              </button>
              {editandoConvidadoId && (
                <button onClick={() => { setEditandoConvidadoId(null); setNovoConvidado({ nome: "", telefone: "", email: "", observacao: "" }); }} style={{ backgroundColor: "#F3E2D8", color: "#8A5A44", border: "1px solid #E8D3C7", padding: "12px 18px", borderRadius: "12px", fontWeight: 700, cursor: "pointer" }}>
                  Cancelar edição
                </button>
              )}
              {convidados.filter(c => c.confirmado).length > 0 && (
                <button onClick={whatsappEmMassa} style={{ backgroundColor: "#25D366", color: "#FFF", border: "none", padding: "12px 18px", borderRadius: "12px", fontWeight: 700, cursor: "pointer" }}>
                  📱 WhatsApp em massa ({convidados.filter(c => c.confirmado).length})
                </button>
              )}
            </div>

            {convidados.length > 0 && (
              <div style={{ marginTop: "22px", borderTop: "1px solid #EADFD3", paddingTop: "22px" }}>
                <h3 style={{ marginTop: 0, fontSize: "1.1rem", marginBottom: "16px" }}>Lista de convidados</h3>
                <div style={{ display: "grid", gap: "12px" }}>
                  {convidados.map((conv) => (
                    <div key={conv.id} style={{ backgroundColor: "#F7F4EF", border: "1px solid #DCCDBE", borderRadius: "12px", padding: "16px", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "12px" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                          <input type="checkbox" checked={conv.confirmado} onChange={() => marcarConfirmado(conv.id)} style={{ cursor: "pointer", width: "18px", height: "18px" }} />
                          <strong style={{ textDecoration: conv.confirmado ? "none" : "line-through", color: conv.confirmado ? "#2F4F3E" : "#999" }}>{conv.nome}</strong>
                          <span style={{ backgroundColor: conv.confirmado ? "#E6F2EB" : "#FFF3D9", color: conv.confirmado ? "#2F4F3E" : "#8A6A1F", padding: "2px 8px", borderRadius: "6px", fontSize: "0.85rem", fontWeight: 600 }}>
                            {conv.confirmado ? "Confirmado" : "Pendente"}
                          </span>
                        </div>
                        <div style={{ color: "#555", fontSize: "0.9rem" }}>
                          📞 {conv.telefone}{conv.email ? ` • 📧 ${conv.email}` : ""}{conv.observacao ? ` • ${conv.observacao}` : ""}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "6px", flexDirection: "column" }}>
                        <button onClick={() => editarConvidado(conv)} style={{ backgroundColor: "#C7A15A", color: "#FFF", border: "none", borderRadius: "8px", padding: "6px 12px", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}>
                          Editar
                        </button>
                        <button onClick={() => removerConvidado(conv.id)} style={{ backgroundColor: "#F3C0C0", color: "#7A1F1F", border: "none", borderRadius: "8px", padding: "6px 12px", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}>
                          Remover
                        </button>
                        {conv.confirmado && (
                          <button onClick={() => enviarWhatsApp(conv)} style={{ backgroundColor: "#25D366", color: "#FFF", border: "none", borderRadius: "8px", padding: "6px 12px", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}>
                            WhatsApp
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RESUMO FINANCEIRO */}
          <div style={{ maxWidth: "1180px", margin: "0 auto 32px auto" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "20px", letterSpacing: "-0.02em" }}>Resumo financeiro</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
              <div style={{ backgroundColor: "#F3F7F4", border: "1px solid #DCE8E0", borderRadius: "22px", padding: "24px", boxShadow: "0 10px 24px rgba(27, 27, 27, 0.04)" }}>
                <p style={{ color: "#5A5A5A", marginBottom: "10px" }}>Orçamento previsto (soma das categorias)</p>
                <h3 style={{ fontSize: "2rem", color: "#2F4F3E", letterSpacing: "-0.04em" }}>{formatarMoeda(totais.orcamentoPrevisto)}</h3>
              </div>
              <div style={{ backgroundColor: "#FFF8F2", border: "1px solid #EADFD3", borderRadius: "22px", padding: "24px", boxShadow: "0 10px 24px rgba(27, 27, 27, 0.04)" }}>
                <p style={{ color: "#5A5A5A", marginBottom: "10px" }}>Total gasto</p>
                <h3 style={{ fontSize: "2rem", color: "#1B1B1B", letterSpacing: "-0.04em" }}>{formatarMoeda(totais.totalGasto)}</h3>
              </div>
              <div style={{ backgroundColor: "#FFF7E7", border: "1px solid #EADBB5", borderRadius: "22px", padding: "24px", boxShadow: "0 10px 24px rgba(27, 27, 27, 0.04)" }}>
                <p style={{ color: "#5A5A5A", marginBottom: "10px" }}>Saldo disponível (previsto − gasto)</p>
                <h3 style={{ fontSize: "2rem", color: "#C7A15A", letterSpacing: "-0.04em" }}>{formatarMoeda(totais.saldoDisponivel)}</h3>
              </div>

              {Number(evento.orcamentoTeto ?? 0) > 0 && (
                <div style={{ backgroundColor: "#EEF7FF", border: "1px solid #CFE7FF", borderRadius: "22px", padding: "24px", boxShadow: "0 10px 24px rgba(27, 27, 27, 0.04)" }}>
                  <p style={{ color: "#4A6075", marginBottom: "10px" }}>Orçamento total (teto)</p>
                  <h3 style={{ fontSize: "2rem", color: "#1B3B5A", letterSpacing: "-0.04em" }}>{formatarMoeda(evento.orcamentoTeto)}</h3>
                  <p style={{ marginTop: "10px", color: totais.diferencaTetoPrevisto >= 0 ? "#2F4F3E" : "#8A1F1F" }}>
                    {totais.diferencaTetoPrevisto >= 0 ? "Folga vs previsto: " : "Estouro vs previsto: "}
                    <strong>{formatarMoeda(Math.abs(totais.diferencaTetoPrevisto))}</strong>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RESUMO DA CALCULADORA */}
          <div style={{ maxWidth: "1180px", margin: "0 auto 32px auto", backgroundColor: "#FFF8F2", border: "1px solid #EADFD3", borderRadius: "24px", padding: "28px", boxShadow: "0 10px 24px rgba(27, 27, 27, 0.05)" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "18px", letterSpacing: "-0.02em" }}>Resumo da calculadora</h2>
            {resumoCalculadora ? (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                  <div><strong>Doces:</strong> {resumoCalculadora.quantidades?.docesUnidades ?? 0} un.</div>
                  <div><strong>Salgados:</strong> {resumoCalculadora.quantidades?.salgadosUnidades ?? 0} un.</div>
                  <div><strong>Bolo:</strong> {resumoCalculadora.quantidades?.boloKg ?? 0} kg</div>
                  <div><strong>Água:</strong> {resumoCalculadora.quantidades?.aguaLitros ?? 0} L</div>
                  <div><strong>Refrigerante:</strong> {resumoCalculadora.quantidades?.refrigeranteLitros ?? 0} L</div>
                  <div><strong>Suco:</strong> {resumoCalculadora.quantidades?.sucoLitros ?? 0} L</div>
                </div>

                <div style={{ marginTop: "18px", padding: "16px 18px", backgroundColor: "#FFFDF9", border: "1px solid #EADFD3", borderRadius: "16px" }}>
                  <p style={{ margin: 0, color: "#666", fontSize: "0.95rem" }}>Total estimado da calculadora</p>
                  <h3 style={{ marginTop: "8px", marginBottom: 0, fontSize: "1.8rem", color: "#2F4F3E" }}>{formatarMoeda(resumoCalculadora.custos?.total ?? 0)}</h3>
                </div>
              </>
            ) : (
              <p style={{ color: "#666", margin: 0 }}>Ainda não existe cálculo salvo/aplicado na calculadora.</p>
            )}
          </div>

          {/* NOVA CATEGORIA */}
          <div style={{ maxWidth: "1180px", margin: "0 auto 32px auto", backgroundColor: "#FFFDF9", border: "1px solid #EADFD3", borderRadius: "24px", padding: "28px", boxShadow: "0 10px 24px rgba(27, 27, 27, 0.05)" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "20px", letterSpacing: "-0.02em" }}>Adicionar nova categoria</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", alignItems: "end" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "#444" }}>Nome</label>
                <input type="text" value={novaCategoria.nome} onChange={(e) => setNovaCategoria((p) => ({ ...p, nome: e.target.value }))} placeholder="Ex.: Lembrancinhas" style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF", fontSize: "1rem", outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "#444" }}>Previsto</label>
                <input type="number" min="0" value={novaCategoria.previsto} onChange={(e) => setNovaCategoria((p) => ({ ...p, previsto: e.target.value }))} placeholder="0" style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF", fontSize: "1rem", outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "#444" }}>Real</label>
                <input type="number" min="0" value={novaCategoria.real} onChange={(e) => setNovaCategoria((p) => ({ ...p, real: e.target.value }))} placeholder="0" style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF", fontSize: "1rem", outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "#444" }}>Status</label>
                <select value={novaCategoria.status} onChange={(e) => setNovaCategoria((p) => ({ ...p, status: e.target.value }))} style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF", fontSize: "1rem", outline: "none" }}>
                  <option value="Pendente">Pendente</option>
                  <option value="Em andamento">Em andamento</option>
                  <option value="Fechado">Fechado</option>
                </select>
              </div>
              <button onClick={() => { adicionarCategoria(); }} style={{ backgroundColor: "#C7A15A", color: "#1B1B1B", border: "none", padding: "14px 18px", borderRadius: "12px", fontWeight: 700, cursor: "pointer", height: "50px" }}>+ Adicionar</button>
            </div>
          </div>

          {/* TABELA CATEGORIAS */}
          <div style={{ maxWidth: "1180px", margin: "0 auto", backgroundColor: "#FFFDF9", border: "1px solid #EADFD3", borderRadius: "24px", padding: "28px", boxShadow: "0 10px 24px rgba(27, 27, 27, 0.05)" }}>
            <h2 style={{ fontSize: "1.4rem", letterSpacing: "-0.02em", marginBottom: "20px" }}>Categorias do orçamento</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.97rem" }}>
                <thead>
                  <tr style={{ textAlign: "left", borderBottom: "1px solid #E7DED0" }}>
                    <th style={{ padding: "16px 12px" }}>Categoria</th>
                    <th style={{ padding: "16px 12px" }}>Previsto</th>
                    <th style={{ padding: "16px 12px" }}>Real</th>
                    <th style={{ padding: "16px 12px" }}>Diferença</th>
                    <th style={{ padding: "16px 12px" }}>Status</th>
                    <th style={{ padding: "16px 12px" }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {categorias.map((c) => {
                    const diferenca = Number(c.previsto ?? 0) - Number(c.real ?? 0);
                    return (
                      <tr key={c.id} style={{ borderBottom: "1px solid #EFE7DC" }}>
                        <td style={{ padding: "14px 12px", fontWeight: 600 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{ fontSize: "1.15rem" }}>{iconeCategoria(c.nome)}</span>
                            <input type="text" value={c.nome} onChange={(e) => atualizarCategoria(c.id, "nome", e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: "12px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF", fontSize: "0.95rem", outline: "none" }} />
                          </div>
                        </td>
                        <td style={{ padding: "14px 12px" }}>
                          <input type="number" min="0" value={c.previsto} onChange={(e) => atualizarCategoria(c.id, "previsto", e.target.value)} style={{ width: "120px", padding: "10px 12px", borderRadius: "12px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF", fontSize: "0.95rem", outline: "none" }} />
                        </td>
                        <td style={{ padding: "14px 12px" }}>
                          <input type="number" min="0" value={c.real} onChange={(e) => atualizarCategoria(c.id, "real", e.target.value)} style={{ width: "120px", padding: "10px 12px", borderRadius: "12px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF", fontSize: "0.95rem", outline: "none" }} />
                        </td>
                        <td style={{ padding: "14px 12px", fontWeight: 600 }}>{formatarMoeda(diferenca)}</td>
                        <td style={{ padding: "14px 12px" }}>
                          <select value={c.status} onChange={(e) => atualizarCategoria(c.id, "status", e.target.value)} style={{ padding: "10px 12px", borderRadius: "12px", border: "1px solid #DCCDBE", backgroundColor: "#F7F4EF", fontSize: "0.9rem", outline: "none" }}>
                            <option value="Pendente">Pendente</option>
                            <option value="Em andamento">Em andamento</option>
                            <option value="Fechado">Fechado</option>
                          </select>
                          <div style={{ marginTop: "8px" }}>
                            <span style={{ display: "inline-block", padding: "7px 10px", borderRadius: "999px", fontSize: "0.82rem", fontWeight: 700, ...statusStyle(c.status) }}>{c.status}</span>
                          </div>
                        </td>
                        <td style={{ padding: "14px 12px" }}>
                          <button onClick={() => removerCategoria(c.id)} style={{ backgroundColor: "#F9EFE7", color: "#8A5A44", border: "1px solid #E8D3C7", padding: "10px 12px", borderRadius: "12px", fontWeight: 700, cursor: "pointer" }}>Remover</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppDashboard;
