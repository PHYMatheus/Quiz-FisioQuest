// =============================================================================
// CAMADA DE DADOS
// =============================================================================

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBUGEQeXn-iEIIhW4oYbH_bbEfX3zm7M8U",
  projectId: "quiz-fisioquest",
};

const TOP_RANKING = 20;

const BASE_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_CONFIG.projectId}/databases/default/documents`;
const CHAVE_API = `key=${FIREBASE_CONFIG.apiKey}`;

function obterIdDispositivo() {
  const CHAVE_ID = "quiz_device_id";
  let id = localStorage.getItem(CHAVE_ID);
  if (!id) {
    id = (crypto.randomUUID && crypto.randomUUID()) || `dev-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem(CHAVE_ID, id);
  }
  return id;
}

function paraCamposFirestore(objeto) {
  const campos = {};
  for (const [chave, valor] of Object.entries(objeto)) {
    if (typeof valor === "string") {
      campos[chave] = { stringValue: valor };
    } else if (typeof valor === "number") {
      campos[chave] = Number.isInteger(valor) ? { integerValue: String(valor) } : { doubleValue: valor };
    } else if (typeof valor === "boolean") {
      campos[chave] = { booleanValue: valor };
    } else {
      campos[chave] = { stringValue: String(valor) };
    }
  }
  return campos;
}

function deCamposFirestore(campos) {
  const objeto = {};
  for (const [chave, valorTipado] of Object.entries(campos || {})) {
    if ("stringValue" in valorTipado) objeto[chave] = valorTipado.stringValue;
    else if ("integerValue" in valorTipado) objeto[chave] = Number(valorTipado.integerValue);
    else if ("doubleValue" in valorTipado) objeto[chave] = Number(valorTipado.doubleValue);
    else if ("booleanValue" in valorTipado) objeto[chave] = valorTipado.booleanValue;
    else if ("timestampValue" in valorTipado) objeto[chave] = valorTipado.timestampValue;
  }
  return objeto;
}

async function buscarComTimeout(url, opcoes = {}, tempoLimiteMs = 10000) {
  const controlador = new AbortController();
  const timer = setTimeout(() => controlador.abort(), tempoLimiteMs);
  try {
    const resposta = await fetch(url, { ...opcoes, signal: controlador.signal });
    return resposta;
  } finally {
    clearTimeout(timer);
  }
}

// -----------------------------------------------------------------------------
// RANKING
// -----------------------------------------------------------------------------
export async function carregarRanking() {
  try {
    const resposta = await buscarComTimeout(`${BASE_URL}:runQuery?${CHAVE_API}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: "ranking" }],
          orderBy: [{ field: { fieldPath: "pontos" }, direction: "DESCENDING" }],
          limit: TOP_RANKING,
        },
      }),
    });
    if (!resposta.ok) throw new Error(`Falha na consulta (status ${resposta.status})`);
    const linhas = await resposta.json();
    return linhas.filter((linha) => linha.document).map((linha) => deCamposFirestore(linha.document.fields));
  } catch (erro) {
    console.error("[FIREBASE] ERRO ao buscar ranking:", erro);
    return [];
  }
}

export async function salvarResultado(entrada) {
  let sucesso = false;
  try {
    const resposta = await buscarComTimeout(`${BASE_URL}/ranking?${CHAVE_API}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields: paraCamposFirestore(entrada) }),
    });
    if (!resposta.ok) {
      const detalhe = await resposta.text();
      throw new Error(`Falha ao salvar (status ${resposta.status}): ${detalhe}`);
    }
    sucesso = true;
  } catch (erro) {
    console.error("[FIREBASE] ERRO ao salvar resultado:", erro);
  }
  const ranking = await carregarRanking();
  return { sucesso, ranking };
}

// -----------------------------------------------------------------------------
// CONTADOR DE ALCANCE (visitantes únicos)
// -----------------------------------------------------------------------------
export async function registrarAcesso() {
  try {
    const id = obterIdDispositivo();
    const urlDocumento = `${BASE_URL}/visitantes/${id}?${CHAVE_API}`;

    const respostaBusca = await buscarComTimeout(urlDocumento, { method: "GET" });
    if (respostaBusca.status === 404) {
      await buscarComTimeout(urlDocumento, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields: paraCamposFirestore({ primeiraVisita: new Date().toISOString() }) }),
      });
    }

    const respostaContagem = await buscarComTimeout(`${BASE_URL}:runAggregationQuery?${CHAVE_API}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        structuredAggregationQuery: {
          structuredQuery: { from: [{ collectionId: "visitantes" }] },
          aggregations: [{ alias: "total", count: {} }],
        },
      }),
    });
    const resultado = await respostaContagem.json();
    return Number(resultado?.[0]?.result?.aggregateFields?.total?.integerValue ?? 0);
  } catch (erro) {
    console.error("[FIREBASE] ERRO ao registrar acesso:", erro);
    return 0;
  }
}

// -----------------------------------------------------------------------------
// COMENTÁRIOS
// -----------------------------------------------------------------------------
export async function carregarComentarios() {
  try {
    const resposta = await buscarComTimeout(`${BASE_URL}:runQuery?${CHAVE_API}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        structuredQuery: { from: [{ collectionId: "comentarios" }] },
      }),
    });
    if (!resposta.ok) throw new Error(`Falha ao buscar comentários (status ${resposta.status})`);
    const linhas = await resposta.json();
    const lista = linhas.filter((linha) => linha.document).map((linha) => deCamposFirestore(linha.document.fields));
    return lista.sort((a, b) => new Date(b.data) - new Date(a.data));
  } catch (erro) {
    console.error("[FIREBASE] ERRO ao buscar comentários:", erro);
    return [];
  }
}

export async function salvarComentario(entrada) {
  let sucesso = false;
  try {
    const resposta = await buscarComTimeout(`${BASE_URL}/comentarios?${CHAVE_API}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields: paraCamposFirestore(entrada) }),
    });
    if (!resposta.ok) throw new Error(`Falha ao salvar comentário (status ${resposta.status})`);
    sucesso = true;
  } catch (erro) {
    console.error("[FIREBASE] ERRO ao salvar comentário:", erro);
  }
  const comentarios = await carregarComentarios();
  return { sucesso, comentarios };
}