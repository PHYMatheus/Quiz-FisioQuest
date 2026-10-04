// Paleta fixa em tons de verde.
// Para ajustar as cores do jogo, mude só os valores abaixo — eles se
// propagam para o app inteiro via CSS variables (--accent, --accent-claro, --accent-escuro).
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
