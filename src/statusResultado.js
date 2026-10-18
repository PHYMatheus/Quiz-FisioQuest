import { TEMAS_RESULTADO } from "./theme.js";

const PONTOS_MINIMOS_BOM = 5;
const PONTOS_MINIMOS_MUITO_BOM = 8;

export function obterStatus(pontos, total) {
  if (pontos === total) {
    return { emoji: "🏆", texto: "Espetacular! Você zerou o game!", tamanhoTexto: 26, destaque: true, tema: TEMAS_RESULTADO.dourado };
  }
  if (pontos >= PONTOS_MINIMOS_MUITO_BOM) {
    return { emoji: "👏", texto: "Muito bom!", tamanhoTexto: 16, destaque: false, tema: TEMAS_RESULTADO.padrao };
  }
  if (pontos >= PONTOS_MINIMOS_BOM) {
    return { emoji: "🙂", texto: "Bom! Mas pode melhorar.", tamanhoTexto: 16, destaque: false, tema: TEMAS_RESULTADO.padrao };
  }
  return { emoji: "📚", texto: "Ixi! Precisa estudar um pouco mais.", tamanhoTexto: 22, destaque: false, tema: TEMAS_RESULTADO.vermelho };
}