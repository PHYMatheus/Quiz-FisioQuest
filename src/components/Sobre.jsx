import { ArrowLeft, Info } from "lucide-react";

const ETIQUETA = "Turma 2° Periodo - Fisioterapia";
const TEXTO_SOBRE =
  "Este quiz foi criado pela turma de Fisioterapia como um projeto para revisar " +
  "conteúdos das disciplinas do curso de forma leve e interativa. Cada partida " +
  "sorteia perguntas fáceis, médias e difíceis, e o ranking mostra quem mais se destacou.";


const INTEGRANTES = ["Manuella Yasmim de Paula Santos", 
  "Pedro Esterban Richard bruce", 
  "Iara Vitória de Araújo Santana", 
  "João Lucas Gonçalves Simplicio", 
  "Suzana Gabriele de Araújo Silva", 
  "Matheus Henrique Fortunato de Melo da Silva", 
  "Felipe Augusto Marinho de Oliveira" ];

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

        <p style={{ fontSize: "12px", color: "#9A9DA6", margin: "20px 0 8px" }}>Integrantes:</p>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {INTEGRANTES.map((integrante) => (
            <li
              key={integrante}
              style={{
                background: "#123321", border: "1px solid #245239", borderRadius: "999px",
                padding: "6px 12px", fontSize: "13px", color: "#F5F5F2",
              }}
            >
              {integrante}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}