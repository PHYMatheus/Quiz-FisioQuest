// =============================================================================
// CAMADA DE DADOS (ranking + contador de alcance)
// =============================================================================
// Hoje (por padrão) tudo é salvo no localStorage do navegador — funciona pra
// testar sozinho, mas cada dispositivo tem seus próprios dados, sem
// compartilhar com os outros.
//
// Para deixar ONLINE e compartilhado entre todos os alunos:
//
//   1. Crie um projeto em https://console.firebase.google.com
//   2. Ative o "Firestore Database" (modo de teste é suficiente pra começar)
//   3. Em "Configurações do projeto" copie o objeto de configuração (firebaseConfig)
//   4. Cole esse objeto na constante FIREBASE_CONFIG logo abaixo
//   5. Comente o bloco "VERSÃO LOCAL (localStorage)" e descomente o bloco
//      "VERSÃO ONLINE (Firestore)" mais abaixo neste arquivo
//   6. Rode "npm install" novamente (o firebase já está no package.json)
//
// Nenhum outro arquivo do projeto precisa mudar — todos os componentes só
// chamam carregarRanking(), salvarResultado(), registrarAcesso(),
// carregarComentarios() e salvarComentario(), então a troca é só aqui.
//
// SOBRE O LIMITE DO RANKING (TOP_RANKING):
// carregarRanking() só traz os melhores colocados, não a lista inteira. Isso
// importa principalmente na versão Firestore: sem esse limite, toda vez que
// alguém abre a tela de Ranking o app baixaria TODOS os resultados já
// salvos — com poucos jogadores não faz diferença, mas com uma turma grande
// jogando ao mesmo tempo isso fica lento e consome a cota gratuita de
// leituras rapidinho. Com o limite, cada consulta já pede só os TOP_RANKING
// melhores direto no servidor.
//
// SOBRE O CONTADOR DE ALCANCE:
// Como o jogo não tem login, "reconhecer a mesma pessoa" é feito através de
// um identificador salvo no próprio navegador do aluno (device id). Na
// primeira vez que ele abre o link, o contador soma 1 e esse id fica salvo.
// Nas próximas vezes, o id já existe e o contador NÃO soma de novo. A
// limitação (inevitável sem login) é que, se o aluno limpar os dados do
// navegador ou abrir em outro navegador/celular, ele conta como uma nova
// pessoa.
// =============================================================================

const FIREBASE_CONFIG = {
  apiKey: "COLE_AQUI",
  authDomain: "COLE_AQUI",
  projectId: "COLE_AQUI",
  storageBucket: "COLE_AQUI",
  messagingSenderId: "COLE_AQUI",
  appId: "COLE_AQUI",
};

// Quantos colocados o ranking mostra no máximo (ver nota acima).
const TOP_RANKING = 20;

// Gera (ou reaproveita) um identificador único e persistente para este
// navegador/dispositivo. É a base de como sabemos "é a mesma pessoa".
function obterIdDispositivo() {
  const CHAVE_ID = "quiz_device_id";
  let id = localStorage.getItem(CHAVE_ID);
  if (!id) {
    id = (crypto.randomUUID && crypto.randomUUID()) || `dev-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem(CHAVE_ID, id);
  }
  return id;
}

// -----------------------------------------------------------------------------
// VERSÃO LOCAL (localStorage) — ativa por padrão
// -----------------------------------------------------------------------------
const CHAVE_RANKING = "quiz_ranking";
const CHAVE_CONTADOR = "quiz_visitas";
const CHAVE_JA_CONTADO = "quiz_ja_contado";
const CHAVE_COMENTARIOS = "quiz_comentarios";

export async function carregarRanking() {
  try {
    const dados = localStorage.getItem(CHAVE_RANKING);
    const lista = dados ? JSON.parse(dados) : [];
    return lista.sort((a, b) => b.pontos - a.pontos).slice(0, TOP_RANKING);
  } catch {
    return [];
  }
}

export async function salvarResultado(entrada) {
  const atual = await carregarRanking();
  const novo = [...atual, entrada];
  localStorage.setItem(CHAVE_RANKING, JSON.stringify(novo));
  return novo;
}

// Comentários/feedbacks deixados pelos jogadores (reação em emoji + texto).
export async function carregarComentarios() {
  try {
    const dados = localStorage.getItem(CHAVE_COMENTARIOS);
    return dados ? JSON.parse(dados) : [];
  } catch {
    return [];
  }
}

export async function salvarComentario(entrada) {
  const atual = await carregarComentarios();
  const novo = [entrada, ...atual]; // mais recente primeiro
  localStorage.setItem(CHAVE_COMENTARIOS, JSON.stringify(novo));
  return novo;
}

// Chame isso uma vez quando o app abrir. Soma 1 no contador apenas se este
// dispositivo/navegador ainda não tiver sido contado antes; caso contrário,
// só devolve o total atual sem incrementar.
export async function registrarAcesso() {
  try {
    obterIdDispositivo(); // garante que o id exista, mesmo sem uso direto aqui
    const jaContado = localStorage.getItem(CHAVE_JA_CONTADO);
    const atual = Number(localStorage.getItem(CHAVE_CONTADOR) || "0");

    if (jaContado) {
      return atual;
    }

    const novo = atual + 1;
    localStorage.setItem(CHAVE_CONTADOR, String(novo));
    localStorage.setItem(CHAVE_JA_CONTADO, "1");
    return novo;
  } catch {
    return 0;
  }
}

// -----------------------------------------------------------------------------
// VERSÃO ONLINE (Firestore) — descomente este bloco e apague o bloco acima
// depois de preencher o FIREBASE_CONFIG lá em cima.
// -----------------------------------------------------------------------------
/*
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  doc,
  getDoc,
  setDoc,
  getCountFromServer,
} from "firebase/firestore";

const app = initializeApp(FIREBASE_CONFIG);
const db = getFirestore(app);
const NOME_COLECAO_RANKING = "ranking";
const NOME_COLECAO_VISITANTES = "visitantes";
const NOME_COLECAO_COMENTARIOS = "comentarios";

// orderBy + limit aqui significam que o Firestore já devolve só os
// TOP_RANKING melhores, direto do servidor — em vez de baixar a coleção
// inteira e ordenar no navegador de cada jogador.
export async function carregarRanking() {
  const consulta = query(collection(db, NOME_COLECAO_RANKING), orderBy("pontos", "desc"), limit(TOP_RANKING));
  const snapshot = await getDocs(consulta);
  return snapshot.docs.map((doc) => doc.data());
}

export async function salvarResultado(entrada) {
  await addDoc(collection(db, NOME_COLECAO_RANKING), entrada);
  return carregarRanking();
}

// Cada dispositivo vira UM documento (id = device id). Salvar de novo o
// mesmo id apenas atualiza o mesmo documento (não duplica), então o total
// de documentos na coleção sempre representa visitantes únicos.
export async function registrarAcesso() {
  const id = obterIdDispositivo();
  const refDoc = doc(db, NOME_COLECAO_VISITANTES, id);
  const snap = await getDoc(refDoc);
  if (!snap.exists()) {
    await setDoc(refDoc, { primeiraVisita: new Date().toISOString() });
  }
  const contagem = await getCountFromServer(collection(db, NOME_COLECAO_VISITANTES));
  return contagem.data().count;
}

export async function carregarComentarios() {
  const snapshot = await getDocs(collection(db, NOME_COLECAO_COMENTARIOS));
  const lista = snapshot.docs.map((doc) => doc.data());
  return lista.sort((a, b) => new Date(b.data) - new Date(a.data));
}

export async function salvarComentario(entrada) {
  await addDoc(collection(db, NOME_COLECAO_COMENTARIOS), entrada);
  return carregarComentarios();
}
*/
