function App() {
  const whatsappLink =
    "https://wa.me/5541988427128?text=Ol%C3%A1!%20Quero%20conhecer%20o%20Excl%C3%A3%20Celebra.";

  return (
    <div
      style={{
        backgroundColor: "#F7F4EF",
        color: "#1B1B1B",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "rgba(247, 244, 239, 0.9)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #EADFD3",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <a
            href="/"
            style={{
              textDecoration: "none",
              fontSize: "1.35rem",
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            <span style={{ color: "#2F4F3E" }}>Exclã</span>{" "}
            <span style={{ color: "#C7A15A" }}>Celebra</span>
          </a>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <a
              href="/login"
              style={{
                backgroundColor: "#FFF8F2",
                color: "#2F4F3E",
                textDecoration: "none",
                border: "1px solid #DCCDBE",
                padding: "10px 16px",
                fontSize: "0.95rem",
                fontWeight: 700,
                borderRadius: "12px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M10 17v-2h4v-2h-4v-2l-5 3 5 3Zm9-14H9a2 2 0 0 0-2 2v4h2V5h10v14H9v-4H7v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" />
              </svg>
              Acesse aqui
            </a>



            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              style={{
                backgroundColor: "#C7A15A",
                color: "#1B1B1B",
                textDecoration: "none",
                padding: "10px 16px",
                fontSize: "0.95rem",
                fontWeight: 700,
                borderRadius: "12px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 10px 20px rgba(199, 161, 90, 0.18)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.5 0 .17 5.33.17 11.88c0 2.1.55 4.15 1.6 5.96L0 24l6.34-1.66a11.82 11.82 0 0 0 5.7 1.45h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.23-6.14-3.41-8.43ZM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.76.98 1-3.66-.23-.38a9.87 9.87 0 0 1-1.52-5.27c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.98 2.9a9.82 9.82 0 0 1 2.9 6.99c0 5.46-4.44 9.9-9.88 9.9Zm5.43-7.41c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.6.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.24-.24-.58-.49-.5-.68-.51l-.58-.01c-.2 0-.53.08-.8.38-.28.3-1.06 1.03-1.06 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.14 4.54.72.3 1.28.48 1.72.62.72.23 1.37.2 1.89.12.58-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.12-.28-.2-.58-.35Z" />
              </svg>
              Quero meu acesso
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        style={{
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px 24px 56px",
          background:
            "radial-gradient(circle at top, #FFF3E8 0%, #F7F4EF 45%, #F7F4EF 100%)",
        }}
      >
        <div style={{ maxWidth: "900px" }}>
          <div
            style={{
              display: "inline-block",
              marginBottom: "20px",
              padding: "10px 16px",
              borderRadius: "999px",
              backgroundColor: "#F3E2D8",
              color: "#8A5A44",
              fontSize: "0.92rem",
              fontWeight: 600,
              letterSpacing: "0.01em",
            }}
          >
            Mais clareza para celebrar com tranquilidade
          </div>

          <h1
            style={{
              fontSize: "4.4rem",
              lineHeight: 1,
              marginBottom: "24px",
              fontWeight: 700,
              letterSpacing: "-0.05em",
            }}
          >
            <span style={{ color: "#2F4F3E" }}>Exclã</span>{" "}
            <span style={{ color: "#C7A15A" }}>Celebra</span>
          </h1>

          <h2
            style={{
              fontSize: "2.5rem",
              lineHeight: 1.15,
              marginBottom: "20px",
              fontWeight: 650,
              letterSpacing: "-0.04em",
              maxWidth: "820px",
              marginInline: "auto",
            }}
          >
            Organize o orçamento do seu evento com mais leveza e tranquilidade.
          </h2>

          <p
            style={{
              fontSize: "1.12rem",
              lineHeight: 1.8,
              marginBottom: "36px",
              color: "#404040",
              maxWidth: "720px",
              marginInline: "auto",
            }}
          >
            Uma ferramenta para acompanhar custos, visualizar números com
            clareza e planejar cada detalhe com mais segurança do começo ao fim.
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="/#conhecer"
              style={{
                backgroundColor: "#C7A15A",
                color: "#1B1B1B",
                textDecoration: "none",
                padding: "15px 26px",
                fontSize: "1rem",
                fontWeight: 700,
                borderRadius: "14px",
                display: "inline-block",
                boxShadow: "0 12px 24px rgba(199, 161, 90, 0.22)",
              }}
            >
              Quero conhecer
            </a>

            <a
              href="/#demonstracao"
              style={{
                backgroundColor: "#FFF8F2",
                color: "#2F4F3E",
                border: "1px solid #DCCDBE",
                textDecoration: "none",
                padding: "15px 26px",
                fontSize: "1rem",
                fontWeight: 700,
                borderRadius: "14px",
                display: "inline-block",
              }}
            >
              Ver demonstração
            </a>
          </div>
        </div>
      </section>

      {/* NOVA SEÇÃO NARRATIVA */}
      <section
        style={{
          padding: "96px 24px",
          background: "linear-gradient(180deg, #FFF8F2 0%, #F7F4EF 100%)",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              maxWidth: "820px",
              margin: "0 auto 42px auto",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontSize: "2.2rem",
                marginBottom: "18px",
                fontWeight: 650,
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
              }}
            >
              Tem muita coisa para decidir — e tudo isso impacta o seu orçamento.
            </h3>

            <p
              style={{
                fontSize: "1.05rem",
                color: "#4A4A4A",
                lineHeight: 1.75,
                marginBottom: "16px",
              }}
            >
              Convite, decoração, doces, bebidas, quantidade de convidados,
              lista de compras, custos e escolhas do dia a dia. Quando cada
              decisão fica espalhada, organizar o evento pesa mais do que
              deveria.
            </p>

            <p
              style={{
                fontSize: "1.02rem",
                color: "#3F3F3F",
                lineHeight: 1.75,
                margin: 0,
                fontWeight: 500,
              }}
            >
              O Exclã Celebra reúne essas decisões em um só lugar, para você
              planejar com mais tranquilidade, visualizar melhor os custos e
              seguir com mais segurança.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
              alignItems: "stretch",
            }}
          >
            {/* ANTES */}
            <div
              style={{
                backgroundColor: "#FFFDF9",
                border: "1px solid #EADFD3",
                borderRadius: "28px",
                padding: "28px",
                boxShadow: "0 12px 28px rgba(27, 27, 27, 0.05)",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  marginBottom: "18px",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  backgroundColor: "#F3E2D8",
                  color: "#8A5A44",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                }}
              >
                Antes
              </div>

              <div
                style={{
                  minHeight: "220px",
                  borderRadius: "22px",
                  background:
                    "linear-gradient(180deg, #FFF8F2 0%, #FFFDF9 100%)",
                  border: "1px solid #EFE3D7",
                  padding: "22px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "1rem",
                      lineHeight: 1.7,
                      color: "#4A4A4A",
                      marginBottom: "18px",
                    }}
                  >
                    Muitas decisões ao mesmo tempo, tudo em lugares diferentes
                    e a sensação de que sempre tem alguma coisa faltando.
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    {[
                      ["Convite", "#2F4F3E"],
                      ["Decoração", "#C7A15A"],
                      ["Doces", "#D88C6A"],
                      ["Bebidas", "#E3A37A"],
                      ["Convidados", "#2F4F3E"],
                      ["Quantidades", "#C7A15A"],
                      ["Compras", "#D88C6A"],
                      ["Orçamento", "#8A5A44"],
                    ].map(([item, color]) => (
                      <span
                        key={item}
                        style={{
                          display: "inline-block",
                          padding: "9px 12px",
                          borderRadius: "999px",
                          backgroundColor: "#FFFDF9",
                          border: `1px solid ${color}33`,
                          color: "#4A4A4A",
                          fontSize: "0.88rem",
                          fontWeight: 600,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "22px",
                    padding: "14px 16px",
                    borderRadius: "16px",
                    backgroundColor: "#F9EFE7",
                    color: "#8A5A44",
                    fontSize: "0.92rem",
                    lineHeight: 1.6,
                    fontWeight: 600,
                  }}
                >
                  Quando tudo fica solto, decidir pesa mais.
                </div>
              </div>
            </div>

            {/* DEPOIS */}
            <div
              style={{
                backgroundColor: "#FFFDF9",
                border: "1px solid #EADFD3",
                borderRadius: "28px",
                padding: "28px",
                boxShadow: "0 12px 28px rgba(27, 27, 27, 0.05)",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  marginBottom: "18px",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  backgroundColor: "#E8F1EC",
                  color: "#2F4F3E",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                }}
              >
                Com Exclã Celebra
              </div>

              <div
                style={{
                  minHeight: "220px",
                  borderRadius: "22px",
                  background:
                    "linear-gradient(180deg, #F8FBF9 0%, #FFFDF9 100%)",
                  border: "1px solid #E7E3D8",
                  padding: "22px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "1rem",
                      lineHeight: 1.7,
                      color: "#4A4A4A",
                      marginBottom: "18px",
                    }}
                  >
                    As decisões continuam existindo, mas agora elas ficam mais
                    visíveis, organizadas e fáceis de acompanhar.
                  </p>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(2, minmax(120px, 1fr))",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#F3F7F4",
                        border: "1px solid #DCE8E0",
                        borderRadius: "16px",
                        padding: "14px",
                      }}
                    >
                      <p
                        style={{
                          color: "#666",
                          fontSize: "0.85rem",
                          marginBottom: "6px",
                        }}
                      >
                        Orçamento
                      </p>
                      <strong
                        style={{ color: "#2F4F3E", fontSize: "1rem" }}
                      >
                        R$ 4.500
                      </strong>
                    </div>

                    <div
                      style={{
                        backgroundColor: "#FFF8F2",
                        border: "1px solid #EADFD3",
                        borderRadius: "16px",
                        padding: "14px",
                      }}
                    >
                      <p
                        style={{
                          color: "#666",
                          fontSize: "0.85rem",
                          marginBottom: "6px",
                        }}
                      >
                        Gastos
                      </p>
                      <strong
                        style={{ color: "#1B1B1B", fontSize: "1rem" }}
                      >
                        R$ 2.930
                      </strong>
                    </div>

                    <div
                      style={{
                        backgroundColor: "#FFF7E7",
                        border: "1px solid #EADBB5",
                        borderRadius: "16px",
                        padding: "14px",
                      }}
                    >
                      <p
                        style={{
                          color: "#666",
                          fontSize: "0.85rem",
                          marginBottom: "6px",
                        }}
                      >
                        Saldo
                      </p>
                      <strong
                        style={{ color: "#C7A15A", fontSize: "1rem" }}
                      >
                        R$ 1.570
                      </strong>
                    </div>

                    <div
                      style={{
                        backgroundColor: "#F7F4EF",
                        border: "1px solid #E7DDD0",
                        borderRadius: "16px",
                        padding: "14px",
                      }}
                    >
                      <p
                        style={{
                          color: "#666",
                          fontSize: "0.85rem",
                          marginBottom: "6px",
                        }}
                      >
                        Quantidades
                      </p>
                      <strong
                        style={{ color: "#8A5A44", fontSize: "1rem" }}
                      >
                        Planejadas
                      </strong>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "22px",
                    padding: "14px 16px",
                    borderRadius: "16px",
                    backgroundColor: "#EAF3EE",
                    color: "#2F4F3E",
                    fontSize: "0.92rem",
                    lineHeight: 1.6,
                    fontWeight: 600,
                  }}
                >
                  Mais clareza para seguir com tranquilidade.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOR */}
      <section
        style={{
          padding: "88px 24px 96px",
          backgroundColor: "#FFF8F2",
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <h3
            style={{
              fontSize: "2.2rem",
              textAlign: "center",
              marginBottom: "16px",
              fontWeight: 650,
              letterSpacing: "-0.03em",
            }}
          >
            Cuidar do orçamento não precisa ser tão confuso.
          </h3>

          <p
            style={{
              textAlign: "center",
              fontSize: "1.05rem",
              color: "#4A4A4A",
              maxWidth: "760px",
              margin: "0 auto 52px auto",
              lineHeight: 1.75,
            }}
          >
            Quando tudo fica espalhado, acompanhar custos e tomar decisões vira
            uma tarefa mais cansativa do que deveria.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
            }}
          >
            {[
              {
                text: "Planilhas espalhadas.",
                color: "#2F4F3E",
              },
              {
                text: "Decisões por achismo.",
                color: "#C7A15A",
              },
              {
                text: "Orçamento que só aparece quando já estourou.",
                color: "#D88C6A",
              },
            ].map((item) => (
              <div
                key={item.text}
                style={{
                  backgroundColor: "#FFFDF9",
                  border: "1px solid #EADFD3",
                  borderRadius: "22px",
                  overflow: "hidden",
                  boxShadow: "0 10px 24px rgba(27, 27, 27, 0.05)",
                }}
              >
                <div
                  style={{
                    height: "7px",
                    backgroundColor: item.color,
                  }}
                />
                <div
                  style={{
                    minHeight: "168px",
                    padding: "30px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: "1.1rem",
                      lineHeight: 1.65,
                      fontWeight: 500,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section
        id="demonstracao"
        style={{
          padding: "112px 24px 96px",
          background:
            "linear-gradient(180deg, #F7F4EF 0%, #F9F1EA 100%)",
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <h3
            style={{
              fontSize: "2.2rem",
              textAlign: "center",
              marginBottom: "18px",
              fontWeight: 650,
              letterSpacing: "-0.03em",
            }}
          >
            Acompanhe seu orçamento de forma simples e rápida.
          </h3>

          <p
            style={{
              textAlign: "center",
              fontSize: "1.05rem",
              color: "#404040",
              maxWidth: "760px",
              margin: "0 auto 60px auto",
              lineHeight: 1.75,
            }}
          >
            Reúna os números do seu evento em um só lugar e veja tudo com mais
            clareza, segurança e tranquilidade.
          </p>

          <div
            style={{
              backgroundColor: "#FFFDF9",
              border: "1px solid #E7DED0",
              borderRadius: "28px",
              padding: "34px",
              boxShadow: "0 14px 32px rgba(27, 27, 27, 0.06)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px",
                marginBottom: "36px",
              }}
            >
              {[
                {
                  label: "Orçamento previsto",
                  value: "R$ 4.500",
                  color: "#2F4F3E",
                  bg: "#F3F7F4",
                },
                {
                  label: "Total gasto",
                  value: "R$ 2.930",
                  color: "#1B1B1B",
                  bg: "#FFF8F2",
                },
                {
                  label: "Saldo disponível",
                  value: "R$ 1.570",
                  color: "#C7A15A",
                  bg: "#FFF7E7",
                },
              ].map((card) => (
                <div
                  key={card.label}
                  style={{
                    backgroundColor: card.bg,
                    borderRadius: "22px",
                    padding: "24px",
                    border: "1px solid #EADFD3",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "#666",
                      marginBottom: "12px",
                    }}
                  >
                    {card.label}
                  </p>
                  <h4
                    style={{
                      fontSize: "2.35rem",
                      fontWeight: 700,
                      letterSpacing: "-0.04em",
                      color: card.color,
                    }}
                  >
                    {card.value}
                  </h4>
                </div>
              ))}
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.95rem",
                  backgroundColor: "#FFFDF9",
                }}
              >
                <thead>
                  <tr
                    style={{
                      textAlign: "left",
                      borderBottom: "1px solid #E7DED0",
                    }}
                  >
                    <th style={{ padding: "16px 12px", color: "#555" }}>
                      Categoria
                    </th>
                    <th style={{ padding: "16px 12px", color: "#555" }}>
                      Previsto
                    </th>
                    <th style={{ padding: "16px 12px", color: "#555" }}>
                      Real
                    </th>
                    <th style={{ padding: "16px 12px", color: "#555" }}>
                      Diferença
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Espaço", "R$ 1.500", "R$ 1.500", "R$ 0"],
                    ["Buffet", "R$ 1.600", "R$ 980", "R$ 620"],
                    ["Decoração", "R$ 800", "R$ 450", "R$ 350"],
                    ["Outros", "R$ 600", "R$ 0", "R$ 600"],
                  ].map((row) => (
                    <tr
                      key={row[0]}
                      style={{ borderBottom: "1px solid #EFE7DC" }}
                    >
                      <td style={{ padding: "14px 12px" }}>{row[0]}</td>
                      <td style={{ padding: "14px 12px" }}>{row[1]}</td>
                      <td style={{ padding: "14px 12px" }}>{row[2]}</td>
                      <td style={{ padding: "14px 12px" }}>{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p
            style={{
              textAlign: "center",
              fontSize: "1.14rem",
              fontWeight: 500,
              maxWidth: "760px",
              margin: "42px auto 0 auto",
              lineHeight: 1.75,
              color: "#3A3A3A",
            }}
          >
            Quando o orçamento fica mais claro, decidir também fica mais leve.
          </p>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section
        style={{
          padding: "96px 24px",
          backgroundColor: "#FFF8F2",
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <h3
            style={{
              fontSize: "2.2rem",
              textAlign: "center",
              marginBottom: "16px",
              fontWeight: 650,
              letterSpacing: "-0.03em",
            }}
          >
            Tudo para acompanhar seu evento com mais tranquilidade
          </h3>

          <p
            style={{
              textAlign: "center",
              fontSize: "1.05rem",
              color: "#4A4A4A",
              maxWidth: "760px",
              margin: "0 auto 48px auto",
              lineHeight: 1.75,
            }}
          >
            O Exclã Celebra reúne o que você precisa para cuidar do orçamento e
            planejar o evento com mais clareza, segurança e leveza.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
            }}
          >
            {[
              {
                title: "Organize seus custos",
                text: "Registre espaço, buffet, decoração e outros gastos em um só lugar.",
                color: "#2F4F3E",
              },
              {
                title: "Acompanhe os totais",
                text: "Veja quanto já foi gasto e quanto ainda está disponível de forma automática.",
                color: "#C7A15A",
              },
              {
                title: "Mais segurança",
                text: "Mantenha seus números organizados e reduza erros no dia a dia.",
                color: "#D88C6A",
              },
              {
                title: "Planeje quantidades",
                text: "Estime itens como doces, salgados, bolo e bebidas conforme o tipo de evento e o número de convidados.",
                color: "#E3A37A",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  backgroundColor: "#FFFDF9",
                  border: "1px solid #EADFD3",
                  borderRadius: "22px",
                  padding: "28px",
                  boxShadow: "0 10px 24px rgba(27, 27, 27, 0.05)",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "8px",
                    borderRadius: "999px",
                    backgroundColor: item.color,
                    marginBottom: "18px",
                  }}
                />
                <h4
                  style={{
                    fontSize: "1.16rem",
                    marginBottom: "12px",
                    lineHeight: 1.45,
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    color: "#4A4A4A",
                    lineHeight: 1.68,
                    fontSize: "0.98rem",
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        id="conhecer"
        style={{
          padding: "104px 24px 120px",
          background:
            "radial-gradient(circle at bottom, #F3E2D8 0%, #F7F4EF 45%, #F7F4EF 100%)",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            textAlign: "center",
            backgroundColor: "#FFFDF9",
            border: "1px solid #EADFD3",
            borderRadius: "28px",
            padding: "56px 34px",
            boxShadow: "0 14px 32px rgba(27, 27, 27, 0.06)",
          }}
        >
          <div
            style={{
              display: "inline-block",
              marginBottom: "16px",
              padding: "8px 14px",
              borderRadius: "999px",
              backgroundColor: "#F7E8D6",
              color: "#8A5A44",
              fontSize: "0.92rem",
              fontWeight: 600,
            }}
          >
            Um jeito mais leve de cuidar do seu evento
          </div>

          <h3
            style={{
              fontSize: "2.32rem",
              marginBottom: "18px",
              fontWeight: 650,
              letterSpacing: "-0.03em",
            }}
          >
            Leve mais tranquilidade para o orçamento do seu evento.
          </h3>

          <p
            style={{
              fontSize: "1.05rem",
              color: "#3A3A3A",
              lineHeight: 1.8,
              maxWidth: "700px",
              margin: "0 auto 36px auto",
            }}
          >
            Quer conhecer melhor o{" "}
            <span style={{ color: "#2F4F3E", fontWeight: 700 }}>Exclã</span>{" "}
            <span style={{ color: "#C7A15A", fontWeight: 700 }}>Celebra</span>?
            Fale comigo no WhatsApp para solicitar seu acesso ou entre na área
            de login, caso já tenha usuário e senha.
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              style={{
                backgroundColor: "#C7A15A",
                color: "#1B1B1B",
                textDecoration: "none",
                padding: "15px 22px",
                fontSize: "1rem",
                fontWeight: 700,
                borderRadius: "14px",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 12px 24px rgba(199, 161, 90, 0.22)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.5 0 .17 5.33.17 11.88c0 2.1.55 4.15 1.6 5.96L0 24l6.34-1.66a11.82 11.82 0 0 0 5.7 1.45h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.23-6.14-3.41-8.43ZM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.76.98 1-3.66-.23-.38a9.87 9.87 0 0 1-1.52-5.27c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.98 2.9a9.82 9.82 0 0 1 2.9 6.99c0 5.46-4.44 9.9-9.88 9.9Zm5.43-7.41c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.6.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.24-.24-.58-.49-.5-.68-.51l-.58-.01c-.2 0-.53.08-.8.38-.28.3-1.06 1.03-1.06 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.14 4.54.72.3 1.28.48 1.72.62.72.23 1.37.2 1.89.12.58-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.12-.28-.2-.58-.35Z" />
              </svg>
              Quero meu acesso
            </a>

            <a
              href="/login"
              style={{
                backgroundColor: "#2F4F3E",
                color: "#F7F4EF",
                textDecoration: "none",
                border: "1px solid #2F4F3E",
                padding: "15px 22px",
                fontSize: "1rem",
                fontWeight: 700,
                borderRadius: "14px",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 12px 24px rgba(47, 79, 62, 0.16)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M10 17v-2h4v-2h-4v-2l-5 3 5 3Zm9-14H9a2 2 0 0 0-2 2v4h2V5h10v14H9v-4H7v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" />
              </svg>
              Acesse aqui
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;