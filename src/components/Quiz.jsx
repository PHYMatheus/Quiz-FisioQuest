import { useState } from "react";
import { Check, X, ArrowRight } from "lucide-react";
import { sortearPerguntas } from "../data/perguntas.js";

export default function Quiz({ aoFinalizar }) {
  // Sorteia uma vez, quando o componente monta (ou seja, toda vez que uma
  // nova partida começa) — 5 fáceis + 5 médias + 5 difíceis, embaralhadas.
  const [perguntas] = useState(() => sortearPerguntas(5));
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [selecionada, setSelecionada] = useState(null);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const pergunta = perguntas[indiceAtual];

  function responder(indice) {
    if (mostrarFeedback) return;
    setSelecionada(indice);
    setMostrarFeedback(true);
    if (indice === pergunta.correta) {
      setPontuacao((p) => p + 1);
    }
  }

  async function proxima() {
    // Trava cliques repetidos no botão final — sem isso, um duplo clique (ou
    // um toque "chicletado" na tela) podia salvar o mesmo resultado duas
    // vezes no ranking.
    if (enviando) return;

    if (indiceAtual + 1 < perguntas.length) {
      setMostrarFeedback(false);
      setSelecionada(null);
      setIndiceAtual((i) => i + 1);
    } else {
      setEnviando(true);
      await aoFinalizar(pontuacao, perguntas.length);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#9A9DA6" }}>
          Pergunta {indiceAtual + 1} / {perguntas.length}
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "var(--accent-claro)" }}>
          {pontuacao} pts
        </span>
      </div>

      <div style={{ height: "6px", background: "#0A1F14", borderRadius: "4px", marginBottom: "24px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${((indiceAtual + 1) / perguntas.length) * 100}%`, background: "var(--accent)", transition: "width 0.3s ease" }} />
      </div>

      {/* Se "imagem" for uma URL em vez de emoji, troque esta div por:
          <img src={pergunta.imagem} alt="" style={{ maxWidth: "100%", borderRadius: 12, marginBottom: 12 }} /> */}
      <div style={{ fontSize: "40px", textAlign: "center", marginBottom: "12px" }}>{pergunta.imagem}</div>

      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, textAlign: "center", margin: "0 0 24px", lineHeight: 1.4 }}>
        {pergunta.texto}
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {pergunta.alternativas.map((alt, i) => {
          let bg = "#0A1F14";
          let borderColor = "#245239";
          let icone = null;
          if (mostrarFeedback) {
            if (i === pergunta.correta) {
              bg = "rgba(67, 183, 122, 0.15)";
              borderColor = "#43B77A";
              icone = <Check size={18} color="#43B77A" />;
            } else if (i === selecionada) {
              bg = "rgba(255, 107, 107, 0.15)";
              borderColor = "#FF6B6B";
              icone = <X size={18} color="#FF6B6B" />;
            }
          }
          return (
            <button
              key={i}
              className="qz-btn qz-alt"
              onClick={() => responder(i)}
              disabled={mostrarFeedback}
              style={{
                background: bg, border: `1px solid ${borderColor}`, borderRadius: "12px",
                padding: "15px 16px", color: "#F5F5F2", fontSize: "15px", lineHeight: 1.4,
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px",
                cursor: mostrarFeedback ? "default" : "pointer",
              }}
            >
              <span>{alt}</span>
              {icone}
            </button>
          );
        })}
      </div>

      {mostrarFeedback && (
        <button
          className="qz-btn"
          onClick={proxima}
          disabled={enviando}
          style={{ marginTop: "20px", width: "100%", background: "var(--accent)", color: "#0E0F12", padding: "13px", borderRadius: "12px", fontSize: "15px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", opacity: enviando ? 0.7 : 1 }}
        >
          {enviando ? "Salvando..." : indiceAtual + 1 < perguntas.length ? "Próxima pergunta" : "Ver resultado"} <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}
