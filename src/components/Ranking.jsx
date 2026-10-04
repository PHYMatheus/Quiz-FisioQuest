import { Medal, ArrowLeft } from "lucide-react";

export default function Ranking({ ranking, aoVoltar, aoJogarNovamente }) {
  const rankingOrdenado = [...ranking].sort((a, b) => b.pontos - a.pontos);

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

      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
        <Medal size={20} color="var(--accent)" />
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", fontWeight: 700, margin: 0 }}>
          Ranking
        </h2>
      </div>

      {rankingOrdenado.length === 0 && (
        <p style={{ color: "#9A9DA6", fontSize: "14px", textAlign: "center" }}>
          Ninguém jogou ainda. Seja o primeiro!
        </p>
      )}

      {rankingOrdenado.length > 0 && (
        <>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "6px", marginBottom: "28px", height: "140px" }}>
            {[rankingOrdenado[1], rankingOrdenado[0], rankingOrdenado[2]].map((item, pos) => {
              if (!item) return <div key={pos} style={{ flex: 1 }} />;
              const alturas = [90, 120, 70];
              const medalhas = ["🥈", "🥇", "🥉"];
              const altura = alturas[pos];
              return (
                <div key={pos} style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ fontSize: "20px", marginBottom: "4px" }}>{medalhas[pos]}</div>
                  <div style={{ fontSize: "11px", fontWeight: 600, textAlign: "center", marginBottom: "2px", maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.nome}
                  </div>
                  <div style={{ fontSize: "9px", color: "#9A9DA6", marginBottom: "8px", maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.disciplina}
                  </div>
                  <div style={{
                    width: "100%", height: `${altura}px`, background: pos === 1 ? "var(--accent)" : "var(--accent-escuro)",
                    borderRadius: "8px 8px 0 0", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "8px",
                  }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 600, color: pos === 1 ? "#0E0F12" : "#F5F5F2" }}>
                      {item.pontos}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {rankingOrdenado.slice(3).map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", background: "#0A1F14", borderRadius: "10px" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#63666F", width: "20px" }}>{i + 4}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "13px", fontWeight: 600 }}>{item.nome}</div>
                  <div style={{ fontSize: "11px", color: "#9A9DA6" }}>{item.disciplina}</div>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "var(--accent-claro)" }}>{item.pontos} pts</span>
              </div>
            ))}
          </div>
        </>
      )}

      <button
        className="qz-btn"
        onClick={aoJogarNovamente}
        style={{ width: "100%", background: "var(--accent)", color: "#0E0F12", padding: "13px", borderRadius: "12px", fontSize: "15px", marginTop: "24px" }}
      >
        Jogar novamente
      </button>
    </div>
  );
}
