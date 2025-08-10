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
  const quartas: string[] = [];

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

    // Processar quem chegou nas Quartas
    const classificadosQuartas =
      torneio.classificacao
        ?.filter((c: Classificacao) => c.classificacao === "Quartas")
        .map((c: Classificacao) => c.nome) || [];

    quartas.push(...classificadosQuartas);
  });

  // Embaralhar a lista (permite duplicatas)
  const embaralhado = embaralharArray([...quartas]);

  // Selecionar 4 aleatórios
  const selecionadosQuartas = embaralhado.slice(0, 4);

  // Restantes
  const restantesQuartas = embaralhado.slice(4);

  return {
    campeoes,
    vices,
    terceiros,
    quartos,
    selecionadosQuartas,
    restantesQuartas,
  };
};
