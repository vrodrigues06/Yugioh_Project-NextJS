// utils/personagem.ts

import { RankingData } from "@/@types";
import { Personagem } from "@/@types/personagem";
import { findRankingIndex } from "../findRankingIndex";
import { setMelhoresColocacoes } from "../setMelhoresColocacoes";

export function getResumoPersonagemMundial(
  personagem: Personagem | null,
  rankings: RankingData,
) {
  if (!personagem) {
    return {
      rankingMundial: null,
      melhoresColocacoes: [],
      colocacoesAnteriores: [],
      titulos: [],
      vices: [],
      terceiro: [],
      quarto: [],
      colocacoesAnterioresMundial: [],
      melhoresColocacoesMundial: [],
      hasTitulo: false,
    };
  }

  const rankingMundial = findRankingIndex(
    personagem.nome,
    personagem.geracao,
    rankings,
    true,
  );

  const melhoresColocacoes = setMelhoresColocacoes(personagem);
  const melhoresColocacoesMundial = setMelhoresColocacoes(personagem, true);

  const colocacoesAnteriores = [...personagem.colocacoes]
    .sort((a, b) => b.ano - a.ano)
    .slice(0, 3);

  const colocacoesAnterioresMundial =
    personagem.colocacoes_mundial?.sort((a, b) => b.ano - a.ano).slice(0, 3) ||
    [];

  const titulos =
    personagem.colocacoes_mundial?.filter(
      (c) => c.classificacao === "Campeao",
    ) || [];

  const vices =
    personagem.colocacoes_mundial?.filter(
      (c) => c.classificacao === "Segundo",
    ) || [];

  const terceiro =
    personagem.colocacoes_mundial?.filter(
      (c) => c.classificacao === "Terceiro",
    ) || [];

  const quarto =
    personagem.colocacoes_mundial?.filter(
      (c) => c.classificacao === "Quarto",
    ) || [];

  const hasTitulo =
    titulos.length > 0 ||
    vices.length > 0 ||
    terceiro.length > 0 ||
    quarto.length > 0;

  return {
    rankingMundial,
    melhoresColocacoes,
    colocacoesAnteriores,
    titulos,
    vices,
    terceiro,
    quarto,
    colocacoesAnterioresMundial,
    melhoresColocacoesMundial,
    hasTitulo,
  };
}
