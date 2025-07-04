import { RankingData } from "@/@types";

export const findRankingIndex = (
  n: string,
  geracao: string,
  rankings: RankingData,
  mundial = false,
) => {
  if (!rankings) return null;

  const ranking = mundial
    ? rankings.torneio_mundial
    : rankings[`torneio_${geracao}`];

  if (!ranking || !Array.isArray(ranking)) return null;

  return (
    ranking
      .sort((a, b) => b.pontos - a.pontos)
      .findIndex(({ nome }) => {
        return nome === n;
      }) + 1
  );
};
