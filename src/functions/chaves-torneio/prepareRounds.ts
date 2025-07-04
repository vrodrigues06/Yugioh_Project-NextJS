import buildRounds from "./buildRounds";
import { Torneio } from "@/@types"; // ajuste se necessário

export function prepareRounds(torneio: Torneio) {
  const { matches: brackets } = torneio;

  const matchInicial = brackets.find((b) => b.id === 1);
  if (!matchInicial) {
    throw new Error("Match inicial (id: 1) não encontrado.");
  }

  const rodadaInicial = matchInicial.rodada;

  const fasePrincipal = brackets.filter((b) => b.rodada === rodadaInicial);
  const preliminares = brackets.filter((b) => b.rodada === "Primeira Fase");

  const metadeEsquerda = fasePrincipal.slice(0, fasePrincipal.length); // ajuste se necessário

  const rounds = buildRounds(metadeEsquerda, brackets);

  return {
    fasePrincipal,
    preliminares,
    rounds,
    brackets,
  };
}
