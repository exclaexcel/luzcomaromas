import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleEntrar = (e) => {
    e.preventDefault();

    if (senha === "1234") {
      setErro("");
      navigate("/app");
    } else {
      setErro("Senha incorreta. Tente novamente.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #F7F4EF 0%, #F8F2EB 100%)",
        color: "#1B1B1B",
        fontFamily: "Inter, Arial, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          backgroundColor: "#FFFDF9",
          border: "1px solid #EADFD3",
          borderRadius: "28px",
          padding: "36px 32px",
          boxShadow: "0 14px 32px rgba(27, 27, 27, 0.06)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "28px",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              marginBottom: "10px",
              letterSpacing: "-0.03em",
            }}
          >
            <span style={{ color: "#2F4F3E" }}>Exclã</span>{" "}
            <span style={{ color: "#C7A15A" }}>Celebra</span>
          </h1>

          <p
            style={{
              color: "#5A5A5A",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Acesse com seu usuário e senha para entrar no app.
          </p>
        </div>

        <form
          onSubmit={handleEntrar}
          style={{
            display: "grid",
            gap: "16px",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: 600,
                color: "#444",
              }}
            >
              E-mail ou usuário
            </label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Digite seu e-mail ou usuário"
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "14px",
                border: "1px solid #DCCDBE",
                backgroundColor: "#F7F4EF",
                fontSize: "1rem",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: 600,
                color: "#444",
              }}
            >
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "14px",
                border: "1px solid #DCCDBE",
                backgroundColor: "#F7F4EF",
                fontSize: "1rem",
                outline: "none",
              }}
            />
          </div>

          {erro && (
            <div
              style={{
                backgroundColor: "#F9EFE7",
                color: "#8A5A44",
                border: "1px solid #E8D3C7",
                padding: "12px 14px",
                borderRadius: "12px",
                fontSize: "0.95rem",
                fontWeight: 600,
              }}
            >
              {erro}
            </div>
          )}

          <button
            type="submit"
            style={{
              marginTop: "8px",
              backgroundColor: "#2F4F3E",
              color: "#F7F4EF",
              border: "none",
              padding: "14px 18px",
              borderRadius: "14px",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
              boxShadow: "0 12px 24px rgba(47, 79, 62, 0.16)",
            }}
          >
            Entrar
          </button>
        </form>

        <div
          style={{
            marginTop: "22px",
            textAlign: "center",
          }}
        >
          <a
            href="/"
            style={{
              color: "#8A5A44",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Voltar para o site
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;