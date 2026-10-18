// Paleta de Cores escolhida pela turma de Fisioterapia.

export const TEMA = {
  accent: "#43B77A",
  claro: "#8FDBAF",
  escuro: "#1F6B44",
};

export const CORES = {
  fundo: "#0A1F14",
  card: "#123321",
  borda: "#245239",
  texto: "#F5F5F2",
  textoSecundario: "#9A9DA6",
};

export const cssVarsTema = {
  "--accent": TEMA.accent,
  "--accent-claro": TEMA.claro,
  "--accent-escuro": TEMA.escuro,
};

export const TEMAS_RESULTADO = {
  padrao: {
    accent: TEMA.accent,
    claro: TEMA.claro,
    escuro: TEMA.escuro,
    fundoPagina: CORES.fundo,
    fundoCard: CORES.card,
    borda: CORES.borda,
  },
  vermelho: {
    accent: "#FF6B6B",
    claro: "#FFA3A3",
    escuro: "#B83232",
    fundoPagina: "#2A0E0E",
    fundoCard: "#4A1717",
    borda: "#8A3333",
  },
  dourado: {
    accent: "#FFC83D",
    claro: "#FFE08A",
    escuro: "#B8860B",
    fundoPagina: "#261C04",
    fundoCard: "#4A3708",
    borda: "#9A7615",
  },
};

export function cssVarsDoTema(tema) {
  return {
    "--accent": tema.accent,
    "--accent-claro": tema.claro,
    "--accent-escuro": tema.escuro,
  };
}