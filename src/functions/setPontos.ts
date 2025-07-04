import { SISTEMAS_PONTUACAO } from "@/constants/globals";

export default function setPontos(
  rodada: string,
  numParticipantes: number,
): number {
  let sistemaKey: keyof typeof SISTEMAS_PONTUACAO;

  if (numParticipantes < 8) {
    sistemaKey = "<8";
  } else if (numParticipantes < 16) {
    sistemaKey = "8-15";
  } else if (numParticipantes < 32) {
    sistemaKey = "16-31";
  } else if (numParticipantes < 64) {
    sistemaKey = "32-63";
  } else {
    sistemaKey = "64+";
  }

  const sistema = SISTEMAS_PONTUACAO[sistemaKey];
  const pontos = sistema[rodada.toLowerCase()];

  if (pontos === undefined) {
    throw new Error(`Rodada "${rodada}" inválida para sistema ${sistemaKey}`);
  }

  return pontos;
}
