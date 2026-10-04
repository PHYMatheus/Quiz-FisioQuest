import { useState, useEffect } from "react";
import { ArrowLeft, MessageCircle, Send } from "lucide-react";
import { carregarComentarios, salvarComentario } from "../firebase.js";

const REACOES = ["😍", "😄", "👍", "😐", "😕"];

export default function Comentarios({ aoVoltar }) {
  const [comentarios, setComentarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [nome, setNome] = useState("");
  const [reacao, setReacao] = useState(null);
  const [texto, setTexto] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    carregarComentarios().then((lista) => {
      setComentarios(lista);
      setCarregando(false);
    });
  }, []);

  async function enviar() {
    if (!reacao) {
      setErro("Escolha uma reação antes de enviar.");
      return;
    }
    if (!texto.trim()) {
      setErro("Escreve um comentário rapidinho antes de enviar.");
      return;
    }
    setErro("");
    setEnviando(true);
    const entrada = {
      nome: nome.trim() || "Anônimo",
      reacao,
      texto: texto.trim(),
      data: new Date().toISOString(),
    };
    const atualizado = await salvarComentario(entrada);
    setComentarios(atualizado);
    setEnviando(false);
    setEnviado(true);
    setNome("");
    setReacao(null);
    setTexto("");
    setTimeout(() => setEnviado(false), 2500);
  }

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
        <MessageCircle size={20} color="var(--accent)" />
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", fontWeight: 700, margin: 0 }}>
          Comentários
        </h2>
      </div>

      {/* Formulário */}
      <div style={{ background: "#0A1F14", border: "1px solid #245239", borderRadius: "14px", padding: "16px", marginBottom: "24px" }}>
        <p style={{ fontSize: "13px", color: "#9A9DA6", margin: "0 0 10px" }}>O que achou do jogo?</p>

        <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
          {REACOES.map((r) => (
            <button
              key={r}
              className="qz-btn"
              onClick={() => setReacao(r)}
              style={{
                flex: 1, fontSize: "22px", padding: "8px 0", borderRadius: "10px",
                background: reacao === r ? "rgba(67, 183, 122, 0.18)" : "#123321",
                border: reacao === r ? "1px solid var(--accent)" : "1px solid #245239",
              }}
            >
              {r}
            </button>
          ))}
        </div>

        <input
          className="qz-input"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome (opcional)"
          style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #245239", background: "#123321", color: "#F5F5F2", fontSize: "16px", marginBottom: "10px", boxSizing: "border-box" }}
        />

        <textarea
          className="qz-input"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Conta pra gente o que achou do quiz..."
          rows={3}
          style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #245239", background: "#123321", color: "#F5F5F2", fontSize: "15px", marginBottom: erro ? "8px" : "12px", boxSizing: "border-box", resize: "vertical", fontFamily: "'Inter', sans-serif" }}
        />

        {erro && <p style={{ color: "#FF6B6B", fontSize: "13px", margin: "0 0 10px" }}>{erro}</p>}
        {enviado && <p style={{ color: "var(--accent-claro)", fontSize: "13px", margin: "0 0 10px" }}>Valeu pelo feedback! 🙌</p>}

        <button
          className="qz-btn"
          onClick={enviar}
          disabled={enviando}
          style={{ width: "100%", background: "var(--accent)", color: "#0E0F12", padding: "12px", borderRadius: "10px", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", opacity: enviando ? 0.7 : 1 }}
        >
          {enviando ? "Enviando..." : "Enviar comentário"} <Send size={15} />
        </button>
      </div>

      {/* Lista de comentários */}
      <p style={{ fontSize: "13px", color: "#9A9DA6", margin: "0 0 10px" }}>
        {comentarios.length > 0 ? `${comentarios.length} comentário${comentarios.length > 1 ? "s" : ""}` : "Comentários dos jogadores"}
      </p>

      {carregando && <p style={{ color: "#9A9DA6", fontSize: "14px", textAlign: "center" }}>Carregando...</p>}

      {!carregando && comentarios.length === 0 && (
        <p style={{ color: "#9A9DA6", fontSize: "14px", textAlign: "center" }}>Ainda não tem comentários. Seja o primeiro!</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "260px", overflowY: "auto" }}>
        {comentarios.map((c, i) => (
          <div key={i} style={{ display: "flex", gap: "10px", padding: "12px", background: "#0A1F14", borderRadius: "10px" }}>
            <span style={{ fontSize: "22px", lineHeight: 1 }}>{c.reacao}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "2px" }}>{c.nome}</div>
              <div style={{ fontSize: "13px", color: "#D5D8DC", lineHeight: 1.4, wordBreak: "break-word" }}>{c.texto}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
