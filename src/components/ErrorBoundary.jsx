import { Component } from "react";

// Rede de segurança contra "tela branca da morte": se qualquer erro
// inesperado acontecer em algum componente (ex: dado vindo nulo/undefined
// de algum lugar, algo que não previmos), em vez da tela inteira sumir sem
// nenhuma explicação, mostramos uma mensagem simples com um botão pra
// recarregar. Essencial numa demonstração ao vivo pra turma.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { temErro: false };
  }

  static getDerivedStateFromError() {
    return { temErro: true };
  }

  componentDidCatch(erro, infoDoComponente) {
    console.error("[ERRO INESPERADO]", erro, infoDoComponente);
  }

  render() {
    if (this.state.temErro) {
      return (
        <div
          style={{
            minHeight: "100dvh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "24px",
            fontFamily: "'Inter', sans-serif",
            color: "#F5F5F2",
            background: "#0E0F12",
          }}
        >
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", marginBottom: "8px" }}>
            Ops, algo deu errado 😕
          </h2>
          <p style={{ color: "#9A9DA6", fontSize: "14px", marginBottom: "20px", maxWidth: "320px", lineHeight: 1.5 }}>
            Encontramos um erro inesperado. Recarrega a página pra tentar de novo — seu ranking e comentários salvos
            continuam intactos.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: "#43B77A",
              color: "#0E0F12",
              border: "none",
              padding: "12px 24px",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Recarregar página
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}