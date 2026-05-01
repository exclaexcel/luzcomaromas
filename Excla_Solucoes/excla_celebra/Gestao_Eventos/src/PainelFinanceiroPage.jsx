import { useEffect, useMemo, useState } from "react";

const CATEGORIAS_PADRAO = [
  { id: 1, nome: "Espaço", previsto: 1500, real: 1500 },
  { id: 2, nome: "Doces", previsto: 0, real: 0 },
  { id: 3, nome: "Salgados", previsto: 0, real: 0 },
  { id: 4, nome: "Bolo", previsto: 0, real: 0 },
  { id: 5, nome: "Bebidas", previsto: 0, real: 0 },
  { id: 6, nome: "Decoração", previsto: 800, real: 450 },
  { id: 7, nome: "Extras", previsto: 400, real: 0 },
];

function PainelFinanceiroPage() {
  const [categorias, setCategorias] = useState(CATEGORIAS_PADRAO);

  useEffect(() => {
    const dadosCategorias = localStorage.getItem("exclaCelebraCategorias");
    if (dadosCategorias) {
      try {
        const categoriasSalvas = JSON.parse(dadosCategorias);
        if (Array.isArray(categoriasSalvas) && categoriasSalvas.length > 0) setCategorias(categoriasSalvas);
      } catch (erro) {
        console.error("Erro ao ler categorias do localStorage:", erro);
      }
    }
  }, []);

  const [baseGrafico, setBaseGrafico] = useState("real"); // "real" | "previsto"

  const totais = useMemo(() => {
    const orcamentoTotal = categorias.reduce((acc, c) => acc + Number(c.previsto ?? 0), 0);
    const totalGasto = categorias.reduce((acc, c) => acc + Number(c.real ?? 0), 0);
    const saldoDisponivel = orcamentoTotal - totalGasto;
    const percentualUsado = orcamentoTotal > 0 ? Math.min(100, Math.round((totalGasto / orcamentoTotal) * 100)) : 0;
    return { orcamentoTotal, totalGasto, saldoDisponivel, percentualUsado };
  }, [categorias]);

  const totalBaseGrafico = useMemo(() => {
    return categorias.reduce((acc, c) => {
      const v = baseGrafico === "real" ? Number(c.real ?? 0) : Number(c.previsto ?? 0);
      return acc + v;
    }, 0);
  }, [categorias, baseGrafico]);

  const formatarMoeda = (v) => Number(v ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const maiorGasto = useMemo(() => {
    if (!categorias.length) return null;
    return [...categorias].sort((a, b) => Number(b.real ?? 0) - Number(a.real ?? 0))[0];
  }, [categorias]);

  const maiorPrevisto = useMemo(() => {
    if (!categorias.length) return null;
    return [...categorias].sort((a, b) => Number(b.previsto ?? 0) - Number(a.previsto ?? 0))[0];
  }, [categorias]);

  const categoriaMaisProximaDoLimite = useMemo(() => {
    if (!categorias.length) return null;
    const comPercentual = categorias.map((c) => {
      const previsto = Number(c.previsto ?? 0);
      const real = Number(c.real ?? 0);
      const percentual = previsto > 0 ? Math.round((real / previsto) * 100) : 0;
      return { ...c, percentual };
    });
    return [...comPercentual].sort((a, b) => b.percentual - a.percentual)[0];
  }, [categorias]);

  const corCategoria = (nome) => {
    const n = nome.toLowerCase();
    if (n.includes("espaço") || n.includes("espaco")) return "#2F4F3E";
    if (n.includes("doc")) return "#2F4F3E";
    if (n.includes("salg")) return "#C7A15A";
    if (n.includes("bolo")) return "#8A5A44";
    if (n.includes("bebida")) return "#D88C6A";
    if (n.includes("decoração") || n.includes("decoracao")) return "#E3A37A";
    if (n.includes("extra")) return "#8A5A44";
    return "#A67C52";
  };

  const cardBase = { borderRadius: "22px", border: "1px solid #E7DDD0", boxShadow: "0 10px 24px rgba(27, 27, 27, 0.04)" };

  const resetarOrcamento = () => {
    if (!confirm("Limpar categorias salvas (orçamento do evento)?")) return;
    localStorage.removeItem("exclaCelebraCategorias");
    setCategorias(CATEGORIAS_PADRAO);
  };

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
            <p style={{ color: "#5A5A5A", lineHeight: 1.6, margin: 0 }}>Painel financeiro</p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            <a href="/app" style={{ textDecoration: "none", backgroundColor: "#FFF8F2", color: "#8A5A44", border: "1px solid #DCCDBE", padding: "12px 18px", borderRadius: "12px", fontWeight: 700 }}>Visão geral</a>
            <a href="/quantidades" style={{ textDecoration: "none", backgroundColor: "#FFF8F2", color: "#8A5A44", border: "1px solid #DCCDBE", padding: "12px 18px", borderRadius: "12px", fontWeight: 700 }}>Calculadora de quantidades</a>
            <a href="/painel-financeiro" style={{ textDecoration: "none", backgroundColor: "#2F4F3E", color: "#F7F4EF", border: "1px solid #2F4F3E", padding: "12px 18px", borderRadius: "12px", fontWeight: 700 }}>Painel financeiro</a>
            <a href="/" style={{ textDecoration: "none", backgroundColor: "#FFF8F2", color: "#2F4F3E", border: "1px solid #DCCDBE", padding: "12px 18px", borderRadius: "12px", fontWeight: 700 }}>Voltar ao site</a>
            <a href="/login" style={{ textDecoration: "none", backgroundColor: "#F3E2D8", color: "#8A5A44", border: "1px solid #E8D3C7", padding: "12px 18px", borderRadius: "12px", fontWeight: 700 }}>Sair</a>
            {/* Reset */}
            <button onClick={resetarOrcamento} style={{ backgroundColor: "#F9EFE7", color: "#8A5A44", border: "1px solid #E8D3C7", padding: "12px 18px", borderRadius: "12px", fontWeight: 700, cursor: "pointer" }}>Resetar orçamento</button>
          </div>
        </div>
      </header>

      <div style={{ padding: "32px 24px 56px" }}>
        {/* CARDS */}
        <div style={{ maxWidth: "1180px", margin: "0 auto 32px auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
          <div style={{ ...cardBase, backgroundColor: "#F3F7F4", borderColor: "#DCE8E0", padding: "24px" }}>
            <p style={{ color: "#5A5A5A", marginBottom: "10px", fontSize: "0.96rem" }}>Orçamento total</p>
            <h3 style={{ fontSize: "2rem", color: "#2F4F3E", letterSpacing: "-0.04em", margin: 0 }}>{formatarMoeda(totais.orcamentoTotal)}</h3>
          </div>
          <div style={{ ...cardBase, backgroundColor: "#FFF8F2", padding: "24px" }}>
            <p style={{ color: "#5A5A5A", marginBottom: "10px", fontSize: "0.96rem" }}>Total gasto</p>
            <h3 style={{ fontSize: "2rem", color: "#1B1B1B", letterSpacing: "-0.04em", margin: 0 }}>{formatarMoeda(totais.totalGasto)}</h3>
          </div>
          <div style={{ ...cardBase, backgroundColor: "#FFF7E7", borderColor: "#EADBB5", padding: "24px" }}>
            <p style={{ color: "#5A5A5A", marginBottom: "10px", fontSize: "0.96rem" }}>Saldo disponível</p>
            <h3 style={{ fontSize: "2rem", color: "#C7A15A", letterSpacing: "-0.04em", margin: 0 }}>{formatarMoeda(totais.saldoDisponivel)}</h3>
          </div>
          <div style={{ ...cardBase, backgroundColor: "#FFFDF9", padding: "24px" }}>
            <p style={{ color: "#5A5A5A", marginBottom: "10px", fontSize: "0.96rem" }}>Orçamento utilizado</p>
            <h3 style={{ fontSize: "2rem", color: "#8A5A44", letterSpacing: "-0.04em", margin: 0 }}>{totais.percentualUsado}%</h3>
          </div>
        </div>

        {/* PROGRESSO */}
        <div style={{ maxWidth: "1180px", margin: "0 auto 32px auto", backgroundColor: "#FFFDF9", border: "1px solid #EADFD3", borderRadius: "26px", padding: "30px 32px", boxShadow: "0 10px 24px rgba(27, 27, 27, 0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", marginBottom: "16px" }}>
            <div>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "8px", letterSpacing: "-0.02em", fontWeight: 650 }}>Progresso do orçamento</h2>
              <p style={{ color: "#555", lineHeight: 1.6, margin: 0 }}>Quanto do orçamento oficial já foi comprometido.</p>
            </div>
            <div style={{ alignSelf: "center", fontWeight: 700, color: "#2F4F3E" }}>{totais.percentualUsado}% utilizado</div>
          </div>
          <div style={{ width: "100%", height: "18px", borderRadius: "999px", backgroundColor: "#EFE5D8", overflow: "hidden" }}>
            <div style={{ width: `${totais.percentualUsado}%`, height: "100%", borderRadius: "999px", background: "linear-gradient(90deg, #2F4F3E 0%, #C7A15A 100%)" }} />
          </div>
        </div>

        {/* GASTOS POR CATEGORIA (com toggle) */}
        <div style={{ maxWidth: "1180px", margin: "0 auto 32px auto", backgroundColor: "#FFFDF9", border: "1px solid #EADFD3", borderRadius: "26px", padding: "30px 32px", boxShadow: "0 10px 24px rgba(27, 27, 27, 0.05)" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "8px", letterSpacing: "-0.02em", fontWeight: 650 }}>
            Quanto cada categoria representa no {baseGrafico === "real" ? "gasto real" : "orçamento previsto"}
          </h2>

          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
            <label style={{ display: "inline-flex", gap: 8, alignItems: "center", cursor: "pointer" }}>
              <input type="radio" name="baseGrafico" value="real" checked={baseGrafico === "real"} onChange={() => setBaseGrafico("real")} />
              Real
            </label>
            <label style={{ display: "inline-flex", gap: 8, alignItems: "center", cursor: "pointer" }}>
              <input type="radio" name="baseGrafico" value="previsto" checked={baseGrafico === "previsto"} onChange={() => setBaseGrafico("previsto")} />
              Previsto
            </label>
          </div>

          <div style={{ display: "grid", gap: "18px" }}>
            {categorias.map((c) => {
              const valorBase = baseGrafico === "real" ? Number(c.real ?? 0) : Number(c.previsto ?? 0);
              const percentual = totalBaseGrafico > 0 ? Math.round((valorBase / totalBaseGrafico) * 100) : 0;
              return (
                <div key={c.id ?? c.nome}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", marginBottom: "8px" }}>
                    <strong>{c.nome}</strong>
                    <span style={{ color: "#555" }}>{formatarMoeda(valorBase)} · {percentual}%</span>
                  </div>
                  <div style={{ width: "100%", height: "14px", borderRadius: "999px", backgroundColor: "#F1E7DB", overflow: "hidden" }}>
                    <div style={{ width: `${percentual}%`, height: "100%", borderRadius: "999px", backgroundColor: corCategoria(c.nome) }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COMPARATIVO */}
        <div style={{ maxWidth: "1180px", margin: "0 auto 32px auto", backgroundColor: "#FFFDF9", border: "1px solid #EADFD3", borderRadius: "26px", padding: "30px 32px", boxShadow: "0 10px 24px rgba(27, 27, 27, 0.05)" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "8px", letterSpacing: "-0.02em", fontWeight: 650 }}>Comparativo previsto x real</h2>
          <p style={{ color: "#555", lineHeight: 1.6, margin: "0 0 24px 0" }}>Leitura analítica do orçamento oficial.</p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.97rem" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid #E7DED0" }}>
                  <th style={{ padding: "16px 12px" }}>Categoria</th>
                  <th style={{ padding: "16px 12px" }}>Previsto</th>
                  <th style={{ padding: "16px 12px" }}>Real</th>
                  <th style={{ padding: "16px 12px" }}>Diferença</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((c) => {
                  const diferenca = Number(c.previsto ?? 0) - Number(c.real ?? 0);
                  return (
                    <tr key={c.id ?? c.nome} style={{ borderBottom: "1px solid #EFE7DC" }}>
                      <td style={{ padding: "14px 12px", fontWeight: 600 }}>{c.nome}</td>
                      <td style={{ padding: "14px 12px" }}>{formatarMoeda(c.previsto)}</td>
                      <td style={{ padding: "14px 12px" }}>{formatarMoeda(c.real)}</td>
                      <td style={{ padding: "14px 12px" }}>{formatarMoeda(diferenca)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* INSIGHTS */}
        <div style={{ maxWidth: "1180px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
          <div style={{ ...cardBase, backgroundColor: "#F3F7F4", borderColor: "#DCE8E0", padding: "24px" }}>
            <p style={{ color: "#666", marginBottom: "10px", fontSize: "0.95rem" }}>Maior gasto atual</p>
            <h3 style={{ fontSize: "1.4rem", color: "#2F4F3E", letterSpacing: "-0.03em", margin: 0 }}>{maiorGasto ? maiorGasto.nome : "-"}</h3>
            <p style={{ color: "#555", marginTop: "10px", lineHeight: 1.6 }}>{maiorGasto ? formatarMoeda(maiorGasto.real) : "-"}</p>
          </div>
          <div style={{ ...cardBase, backgroundColor: "#FFF8F2", padding: "24px" }}>
            <p style={{ color: "#666", marginBottom: "10px", fontSize: "0.95rem" }}>Maior valor previsto</p>
            <h3 style={{ fontSize: "1.4rem", color: "#8A5A44", letterSpacing: "-0.03em", margin: 0 }}>{maiorPrevisto ? maiorPrevisto.nome : "-"}</h3>
            <p style={{ color: "#555", marginTop: "10px", lineHeight: 1.6 }}>{maiorPrevisto ? formatarMoeda(maiorPrevisto.previsto) : "-"}</p>
          </div>
          <div style={{ ...cardBase, backgroundColor: "#FFF7E7", borderColor: "#EADBB5", padding: "24px" }}>
            <p style={{ color: "#666", marginBottom: "10px", fontSize: "0.95rem" }}>Categoria mais próxima do limite</p>
            <h3 style={{ fontSize: "1.4rem", color: "#C7A15A", letterSpacing: "-0.03em", margin: 0 }}>{categoriaMaisProximaDoLimite ? categoriaMaisProximaDoLimite.nome : "-"}</h3>
            <p style={{ color: "#555", marginTop: "10px", lineHeight: 1.6 }}>{categoriaMaisProximaDoLimite ? `${categoriaMaisProximaDoLimite.percentual}% do previsto` : "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PainelFinanceiroPage;