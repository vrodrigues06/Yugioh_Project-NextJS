import { sortRanking } from "@/functions/sortRanking";
import { findRankingIndex } from "@/functions/findRankingIndex";
import { setMelhoresColocacoes } from "@/functions/setMelhoresColocacoes";
import { personagemRandomGet } from "@/_lib/actions/personagen-random-get";
import { rankingGlobalGet } from "@/_lib/actions/ranking-global-get";

export default async function PersonagemCardModel() {
  const { data: randomPersonagem, error } = await personagemRandomGet();
  const { data: rankings, error: errorRanking } = await rankingGlobalGet();

  if (!randomPersonagem || !rankings) {
    return {
      randomPersonagem: null,
      colocacoesAnteriores: null,
      melhoresColocacoes: null,
      melhoresColocacoesMundial: null,
      rankingMundial: null,
      rankingNacional: null,
      error,
      errorRanking,
    };
  }
  if (rankings && Object.keys(rankings).length > 0) {
    const key = `torneio_${randomPersonagem?.geracao}`;

    if (rankings[key] && rankings[key].length > 0) {
      rankings[key] = sortRanking(rankings[key]);
    }
  }

  const rankingMundial = findRankingIndex(
    randomPersonagem.nome,
    randomPersonagem.geracao,
    rankings,
    true,
  );
  const rankingNacional = findRankingIndex(
    randomPersonagem.nome,
    randomPersonagem.geracao,
    rankings,
  );

  const colocacoesAnteriores = randomPersonagem?.colocacoes
    .sort((a, b) => {
      return b.ano - a.ano;
    })
    .slice(0, 3);

  const melhoresColocacoes = setMelhoresColocacoes(randomPersonagem);

  const melhoresColocacoesMundial = setMelhoresColocacoes(
    randomPersonagem,
    true,
  );

  return {
    randomPersonagem,
    colocacoesAnteriores,
    melhoresColocacoes,
    melhoresColocacoesMundial,
    rankingMundial,
    rankingNacional,
    error,
    errorRanking,
  };
}
