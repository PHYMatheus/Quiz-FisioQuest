import { useState, useEffect } from "react";
import { cssVarsTema } from "./theme.js";
import { carregarRanking, salvarResultado, registrarAcesso } from "./firebase.js";
import Menu from "./components/Menu.jsx";
import Cadastro from "./components/Cadastro.jsx";
import Quiz from "./components/Quiz.jsx";
import Resultado from "./components/Resultado.jsx";
import Ranking from "./components/Ranking.jsx";
import Comentarios from "./components/Comentarios.jsx";
import Sobre from "./components/Sobre.jsx";

export default function App() {
  const [tela, setTela] = useState("menu");
  const [nome, setNome] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [pontuacao, setPontuacao] = useState(0);
  const [totalPerguntas, setTotalPerguntas] = useState(15);
  const [ranking, setRanking] = useState([]);
  const [visitas, setVisitas] = useState(0);
  const [erroAoSalvar, setErroAoSalvar] = useState(false);

  useEffect(() => {
    carregarRanking().then(setRanking);
    registrarAcesso().then(setVisitas);
  }, []);

  function irParaRanking() {
    carregarRanking().then(setRanking);
    setTela("ranking");
  }

  function confirmarCadastro({ nome, disciplina }) {
    setNome(nome);
    setDisciplina(disciplina);
    setTela("quiz");
  }

    async function finalizarQuiz(pontos, total) {
    setPontuacao(pontos);
    setTotalPerguntas(total);
    const resultado = { nome, disciplina, pontos, total, data: new Date().toISOString() };
    const { sucesso, ranking } = await salvarResultado(resultado);
    setRanking(ranking);
    setErroAoSalvar(!sucesso);
    setTela("resultado");
  }

  function reiniciar() {
    setNome("");
    setDisciplina("");
    setPontuacao(0);
    setErroAoSalvar(false);
    setTela("menu");
  }

  function reiniciar() {
    setNome("");
    setDisciplina("");
    setPontuacao(0);
    setTela("menu");
  }

  return (
    <div style={{ ...cssVarsTema, minHeight: "100dvh", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
      <div className="qz-wrap">
        <div className="qz-card" style={{ width: "100%", background: "#123321", borderRadius: "20px", padding: "36px 28px", boxSizing: "border-box" }}>
          {tela === "menu" && (
            <Menu
              aoJogar={() => setTela("cadastro")}
              aoVerRanking={irParaRanking}
              aoVerComentarios={() => setTela("comentarios")}
              aoVerSobre={() => setTela("sobre")}
              visitas={visitas}
            />
          )}
          {tela === "cadastro" && <Cadastro aoConfirmar={confirmarCadastro} />}
          {tela === "quiz" && <Quiz aoFinalizar={finalizarQuiz} />}
          {tela === "resultado" && (
            <Resultado
              nome={nome}
              pontuacao={pontuacao}
              total={totalPerguntas}
              erroAoSalvar={erroAoSalvar}
              aoVerRanking={irParaRanking}
              aoJogarNovamente={reiniciar}
            />
          )}
          {tela === "ranking" && <Ranking ranking={ranking} aoVoltar={() => setTela("menu")} aoJogarNovamente={reiniciar} />}
          {tela === "comentarios" && <Comentarios aoVoltar={() => setTela("menu")} />}
          {tela === "sobre" && <Sobre aoVoltar={() => setTela("menu")} />}
        </div>
      </div>
    </div>
  );
}
