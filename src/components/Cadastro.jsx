import { useState } from "react";

export default function Cadastro({ aoConfirmar }) {
  const [nome, setNome] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [erro, setErro] = useState("");

  function confirmar() {
    if (!nome.trim() || !disciplina.trim()) {
      setErro("Preencha nome e disciplina para continuar.");
      return;
    }
    setErro("");
    aoConfirmar({ nome: nome.trim(), disciplina: disciplina.trim() });
  }

  return (
    <div>
      <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "22px", fontWeight: 700, margin: "0 0 6px" }}>
        Antes de começar
      </h2>
      <p style={{ color: "#9A9DA6", fontSize: "14px", margin: "0 0 24px" }}>
        Conta pra gente quem está jogando
      </p>

      <label style={{ fontSize: "13px", color: "#9A9DA6", display: "block", marginBottom: "6px" }}>Nome</label>
      <input
        className="qz-input"
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Seu nome"
        maxLength={40}
        style={{ width: "100%", padding: "14px", borderRadius: "10px", border: "1px solid #245239", background: "#0A1F14", color: "#F5F5F2", fontSize: "16px", marginBottom: "16px", boxSizing: "border-box" }}
      />

      <label style={{ fontSize: "13px", color: "#9A9DA6", display: "block", marginBottom: "6px" }}>Disciplina que cursa</label>
      <input
        className="qz-input"
        type="text"
        value={disciplina}
        onChange={(e) => setDisciplina(e.target.value)}
        placeholder="Ex: Engenharia de Software"
        maxLength={40}
        style={{ width: "100%", padding: "14px", borderRadius: "10px", border: "1px solid #245239", background: "#0A1F14", color: "#F5F5F2", fontSize: "16px", marginBottom: erro ? "8px" : "24px", boxSizing: "border-box" }}
      />

      {erro && <p style={{ color: "#FF6B6B", fontSize: "13px", margin: "0 0 16px" }}>{erro}</p>}

      <button
        className="qz-btn"
        onClick={confirmar}
        style={{ background: "var(--accent)", color: "#0E0F12", padding: "13px", borderRadius: "12px", fontSize: "15px", width: "100%" }}
      >
        Começar o quiz
      </button>
    </div>
  );
}
