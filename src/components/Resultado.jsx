import { Trophy } from "lucide-react";

export default function Resultado({ nome, pontuacao, total, aoVerRanking, aoJogarNovamente }) {
  return (
    <div style={{ textAlign: "center" }}>
      <Trophy size={44} color="var(--accent)" style={{ marginBottom: "12px" }} />
      <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "22px", fontWeight: 700, margin: "0 0 4px" }}>
        Quiz concluído!
      </h2>
      <p style={{ color: "#9A9DA6", fontSize: "14px", margin: "0 0 20px" }}>{nome}, aqui está seu resultado</p>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "44px", fontWeight: 600, color: "var(--accent)", marginBottom: "24px" }}>
        {pontuacao}<span style={{ fontSize: "20px", color: "#9A9DA6" }}> / {total}</span>
      </div>
      <button
        className="qz-btn"
        onClick={aoVerRanking}
        style={{ width: "100%", background: "var(--accent)", color: "#0E0F12", padding: "13px", borderRadius: "12px", fontSize: "15px", marginBottom: "10px" }}
      >
        Ver ranking
      </button>
      <button
        className="qz-btn"
        onClick={aoJogarNovamente}
        style={{ width: "100%", background: "transparent", color: "#9A9DA6", padding: "13px", borderRadius: "12px", fontSize: "14px", border: "1px solid #245239" }}
      >
        Jogar novamente
      </button>
    </div>
  );
}
