import { Trophy, AlertTriangle } from "lucide-react";

export default function Resultado({ nome, pontuacao, total, erroAoSalvar, aoVerRanking, aoJogarNovamente }) {
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

      {erroAoSalvar && (
        <div style={{
          display: "flex", alignItems: "flex-start", gap: "8px", textAlign: "left",
          background: "rgba(255, 107, 107, 0.12)", border: "1px solid rgba(255, 107, 107, 0.4)",
          borderRadius: "10px", padding: "12px", marginBottom: "20px",
        }}>
          <AlertTriangle size={18} color="#FF6B6B" style={{ flexShrink: 0, marginTop: "1px" }} />
          <p style={{ fontSize: "12.5px", color: "#F5F5F2", margin: 0, lineHeight: 1.4 }}>
            Não conseguimos salvar seu resultado no ranking agora (provavelmente uma falha de conexão).
            Sua pontuação acima ainda é válida — se quiser, tenta jogar de novo em alguns instantes.
          </p>
        </div>
      )}

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