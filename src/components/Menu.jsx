import { Play, Medal, Eye, MessageCircle, Info } from "lucide-react";
import logo from "../assets/logo.png";

export default function Menu({ aoJogar, aoVerRanking, aoVerComentarios, aoVerSobre, visitas = 0 }) {
  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      <button
        className="qz-btn"
        onClick={aoVerSobre}
        aria-label="Sobre o projeto"
        title="Sobre o projeto"
        style={{
          position: "absolute", top: 0, left: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "#0A1F14", border: "1px solid #245239", borderRadius: "999px",
          width: "32px", height: "32px", minHeight: "32px", padding: 0,
        }}
      >
        <Info size={15} color="var(--accent-claro)" />
      </button>

      <div
        title="Pessoas alcançadas pelo jogo"
        style={{
          position: "absolute", top: 0, right: 0,
          display: "flex", alignItems: "center", gap: "5px",
          background: "#0A1F14", border: "1px solid #245239", borderRadius: "999px",
          padding: "6px 10px",
        }}
      >
        <Eye size={14} color="var(--accent-claro)" />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#F5F5F2" }}>
          {visitas}
        </span>
      </div>

      <img
        className="qz-flutuar"
        src={logo}
        alt="FisioQuest"
        style={{ display: "block", margin: "8px auto 32px auto", width: "100%", maxWidth: "280px", "--atraso": "0s" }}
      />
      <button
        className="qz-btn qz-pulsar"
        onClick={aoJogar}
        style={{ background: "var(--accent)", color: "#0E0F12", padding: "14px 32px", borderRadius: "12px", fontSize: "16px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "12px", "--atraso": "0.25s" }}
      >
        <Play size={18} fill="#0E0F12" /> Jogar
      </button>
      <button
        className="qz-btn qz-entrada"
        onClick={aoVerRanking}
        style={{ background: "transparent", color: "#9A9DA6", padding: "13px 32px", borderRadius: "12px", fontSize: "15px", width: "100%", border: "1px solid #245239", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "12px", "--atraso": "0.4s" }}
      >
        <Medal size={18} /> Ver ranking
      </button>
      <button
        className="qz-btn qz-entrada"
        onClick={aoVerComentarios}
        style={{ background: "transparent", color: "#9A9DA6", padding: "13px 32px", borderRadius: "12px", fontSize: "15px", width: "100%", border: "1px solid #245239", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", "--atraso": "0.55s" }}
      >
        <MessageCircle size={18} /> Comentários
      </button>
    </div>
  );
}