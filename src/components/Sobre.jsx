import { ArrowLeft, Info } from "lucide-react";

// Edite o texto abaixo com as informações reais da turma. O "badge" (a
// etiqueta verde) é pensado pra ficar curto — nome da turma/curso — e o
// parágrafo abaixo dele pode ter mais detalhes (instituição, disciplina,
// semestre, integrantes etc.)
const ETIQUETA = "Turma de Fisioterapia";
const TEXTO_SOBRE =
  "Este quiz foi criado pela turma de Fisioterapia como um projeto para revisar " +
  "conteúdos das disciplinas do curso de forma leve e interativa. Cada partida " +
  "sorteia perguntas fáceis, médias e difíceis, e o ranking mostra quem mais se destacou.";

export default function Sobre({ aoVoltar }) {
  return (
    <div>
      <button
        className="qz-btn"
        onClick={aoVoltar}
        aria-label="Voltar ao menu"
        style={{
          background: "#0A1F14", border: "1px solid #245239", borderRadius: "10px",
          width: "42px", height: "42px", minHeight: "42px", padding: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#F5F5F2", marginBottom: "16px",
        }}
      >
        <ArrowLeft size={20} />
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
        <Info size={20} color="var(--accent)" />
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", fontWeight: 700, margin: 0 }}>
          Sobre o projeto
        </h2>
      </div>

      <div style={{ background: "#0A1F14", border: "1px solid #245239", borderRadius: "14px", padding: "20px" }}>
        <span
          style={{
            display: "inline-block", background: "rgba(67, 183, 122, 0.18)", border: "1px solid var(--accent)",
            color: "var(--accent-claro)", fontSize: "12px", fontWeight: 600, padding: "5px 12px",
            borderRadius: "999px", marginBottom: "14px",
          }}
        >
          {ETIQUETA}
        </span>

        <p style={{ fontSize: "14px", color: "#D5D8DC", lineHeight: 1.6, margin: 0 }}>
          {TEXTO_SOBRE}
        </p>
      </div>
    </div>
  );
}
