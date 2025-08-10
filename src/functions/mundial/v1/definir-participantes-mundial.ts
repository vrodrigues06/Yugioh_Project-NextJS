import { Classificacao, Podium, Torneio } from "@/@types";
import { embaralharArray } from "../../embaralharArray";

export const definirParticipantesMundial = (
  ano: number,
  torneios: Torneio[],
) => {
  if (!ano) return;

  // Filtrar os torneios do ano informado
  const torneiosDoAno = torneios?.filter((t) => t.ano === ano) || [];

  // Inicializar arrays
  const campeoes: string[] = [];
  const vices: string[] = [];
  const terceiros: string[] = [];
  const quartos: string[] = [];

  torneiosDoAno.forEach((torneio) => {
    // Processar o podium
    torneio.podium?.forEach((item: Podium) => {
      switch (item.classificacao) {
        case "Campeao":
          campeoes.push(item.nome);
          break;
        case "Segundo":
          vices.push(item.nome);
          break;
        case "Terceiro":
          terceiros.push(item.nome);
          break;
        case "Quarto":
          quartos.push(item.nome);
          break;
      }
    });
  });

  return {
    campeoes,
    vices,
    terceiros,
    quartos,
  };
};
