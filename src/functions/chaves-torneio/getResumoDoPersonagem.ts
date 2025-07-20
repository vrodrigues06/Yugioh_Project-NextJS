import { Ranking } from "@/@types";
import { Personagem } from "@/@types/personagem";
import { findRankingIndex } from "../findRankingIndex";
import { setMelhoresColocacoes } from "../setMelhoresColocacoes";

export function getResumoPersonagem(
  personagem: Personagem | null,
  ranking: Ranking | null,
  torneioAno: number,
) {
  if (!personagem || !ranking) {
    return {
      rankingNacional: null,
      melhoresColocacoes: [],
      colocacoesAnteriores: [],
      titulos: [],
      vices: [],
      terceiro: [],
      quarto: [],
      hasTitulo: false,
    };
  }

  const rankingNacional =
    ranking.ranking
      .sort((a, b) => b.pontos - a.pontos)
      .findIndex(({ nome }) => {
        return nome === personagem.nome;
      }) + 1;

  const melhoresColocacoes = setMelhoresColocacoes(
    personagem,
    false,
    torneioAno - 1,
  );

  const colocacoesAnteriores = [...personagem.colocacoes]
    .filter((c) => c.ano < torneioAno)
    .sort((a, b) => b.ano - a.ano)
    .slice(0, 5);

  const titulos = personagem.colocacoes.filter(
    (c) => c.classificacao === "Campeao" && c.ano < torneioAno,
  );

  const vices = personagem.colocacoes.filter(
    (c) => c.classificacao === "Segundo" && c.ano < torneioAno,
  );

  const terceiro = personagem.colocacoes.filter(
    (c) => c.classificacao === "Terceiro" && c.ano < torneioAno,
  );

  const quarto = personagem.colocacoes.filter(
    (c) => c.classificacao === "Quarto" && c.ano < torneioAno,
  );

  const hasTitulo =
    titulos.length > 0 ||
    vices.length > 0 ||
    terceiro.length > 0 ||
    quarto.length > 0;

  return {
    rankingNacional,
    melhoresColocacoes,
    colocacoesAnteriores,
    titulos,
    vices,
    terceiro,
    quarto,
    hasTitulo,
  };
}
