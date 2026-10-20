import { Play, Medal, Eye, MessageCircle, Info } from "lucide-react";
import logo from "../assets/logo.png";

// Bolhas decorativas ao redor da logo (posição, tamanho e atraso da animação).
const BOLHAS = [
  { top: "16%", left: "4%", tamanho: 18, atraso: "0s" },
  { top: "12%", right: "4%", tamanho: 28, atraso: "1.2s" },
  { top: "46%", left: "10%", tamanho: 12, atraso: "2.4s" },
  { top: "52%", right: "12%", tamanho: 16, atraso: "0.6s" },
];

const estiloCantoRedondo = {
  position: "absolute", top: 0,
  display: "flex", alignItems: "center", justifyContent: "center",
  background: "rgba(10, 31, 20, 0.7)", border: "1px solid #245239", borderRadius: "999px",
};

export default function Menu({ aoJogar, aoVerRanking, aoVerComentarios, aoVerSobre, visitas = 0 }) {
  const botoesSecundarios = [
    { Icone: Medal, rotulo: "Ver ranking", aoClicar: aoVerRanking, atraso: "0.4s" },
    { Icone: MessageCircle, rotulo: "Comentários", aoClicar: aoVerComentarios, atraso: "0.55s" },
  ];

  return (
    <div className="qz-menu">
      <button
        className="qz-btn"
        onClick={aoVerSobre}
        aria-label="Sobre o projeto"
        title="Sobre o projeto"
        style={{ ...estiloCantoRedondo, left: 0, width: "32px", height: "32px", minHeight: "32px", padding: 0 }}
      >
        <Info size={15} color="var(--accent-claro)" />
      </button>

      <div title="Pessoas alcançadas pelo jogo" style={{ ...estiloCantoRedondo, right: 0, gap: "5px", padding: "6px 10px" }}>
        <Eye size={14} color="var(--accent-claro)" />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#F5F5F2" }}>
          {visitas}
        </span>
      </div>

      <div className="qz-menu-decoracao">
        {BOLHAS.map(({ tamanho, atraso, ...posicao }, i) => (
          <span key={i} className="qz-bolha" style={{ ...posicao, width: tamanho, height: tamanho, "--atraso": atraso }} />
        ))}
      </div>

      <img
        className="qz-flutuar"
        src={logo}
        alt="FisioQuest"
        style={{ display: "block", margin: "8px auto 32px auto", width: "100%", maxWidth: "280px", "--atraso": "0s" }}
      />

      <div className="qz-menu-botoes">
        <button
          className="qz-btn qz-pulsar qz-menu-jogar"
          onClick={aoJogar}
          style={{ color: "#0E0F12", padding: "15px 32px", borderRadius: "14px", fontSize: "17px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "12px", "--atraso": "0.25s" }}
        >
          <Play size={18} fill="#0E0F12" /> Jogar
        </button>

        {botoesSecundarios.map(({ Icone, rotulo, aoClicar, atraso }) => (
          <button
            key={rotulo}
            className="qz-btn qz-entrada qz-menu-secundario"
            onClick={aoClicar}
            style={{ padding: "13px 32px", borderRadius: "14px", fontSize: "15px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "12px", "--atraso": atraso }}
          >
            <Icone size={18} color="var(--accent-claro)" /> {rotulo}
          </button>
        ))}
      </div>
    </div>
  );
}