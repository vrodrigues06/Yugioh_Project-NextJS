import { Classificacao, Match, Ranking, Torneio } from "@/@types";
import useAllPersonagens from "../personagens/useAllPersonagens";
import setPontos from "@/functions/setPontos";
import setClassificacao from "@/functions/setClassificacao";
import setPodium from "@/functions/setPodium";
import { createRanking, updateRankingGlobal } from "@/_lib/apis/rankings-api";
import { addRanking } from "@/_lib/apis/personagens-api";
import { useUpdateClassificacao } from "./useUpdateClassificacao";
import { useUpdateMatches } from "./useUpdateMatches";
import { useFinalizarTorneio } from "./useFinalizarTorneio";

type UseHandleMatchProps = {
  duelista: string | null;
  match: Match;
  torneio: Torneio;
};

export const useHandleMatch = ({
  duelista,
  match,
  torneio,
}: UseHandleMatchProps) => {
  const { data: personagens } = useAllPersonagens();
  const { mutate: atualizarClassificacao } = useUpdateClassificacao(
    torneio.geracao,
    torneio.ano,
  );

  const { mutate: atualizarMatches } = useUpdateMatches(
    torneio.geracao,
    torneio.ano,
  );
  const { mutate: finalizarTorneio } = useFinalizarTorneio();

  const handleMatch = (duelAmazing: boolean) => {
    if (torneio.status !== "em_andamento") return;

    const oponente = getOponente();
    if (!oponente) return;

    if (isEliminado(duelista) || isEliminado(oponente)) {
      console.log("⚠️ Partida já foi decidida.");
      return;
    }

    switch (match.rodada.toLowerCase()) {
      case "final":
        if (!processarFinal(oponente)) return;
        break;
      case "disputa 3º lugar":
        processarTerceiroLugar(oponente);
        break;
      default:
        processarOutrasRodadas(oponente);
        break;
    }

    atualizarStatusPartidas(duelAmazing);
  };

  /** === FUNÇÕES AUXILIARES === */

  const getOponente = () =>
    match.duelista1 === duelista ? match.duelista2 : match.duelista1;

  const isEliminado = (nome: string | null) =>
    torneio.classificacao.some((item) => item.nome === nome);

  const atualizarStatusPartidas = (duelAmazing: boolean) => {
    const partidaConcluida: Match = {
      ...match,
      status: "concluida",
      vencedor: duelista,
      isDueloAmazing: duelAmazing,
    };

    let matchesAtualizadas = torneio.matches.map((m) =>
      m.id === match.id ? partidaConcluida : m,
    );

    matchesAtualizadas = atualizarProximaPartida(matchesAtualizadas);
    matchesAtualizadas = atualizarDisputaTerceiroLugar(matchesAtualizadas);

    torneio.matches = matchesAtualizadas;
    atualizarMatches(matchesAtualizadas);
  };

  const processarFinal = (oponente: string) => {
    const partidaTerceiro = torneio.matches.find(
      (m) => m.rodada.toLowerCase() === "disputa 3º lugar",
    );

    if (partidaTerceiro && partidaTerceiro.status !== "concluida") {
      alert("⚠️ Finalize a disputa de 3º lugar antes da final.");
      return false;
    }

    torneio.classificacao.push(
      {
        nome: duelista as string,
        pontos: setPontos("campeao", torneio.matches.length),
        classificacao: setClassificacao("campeao"),
        eliminadoPor: null,
      },
      {
        nome: oponente,
        pontos: setPontos("segundo", torneio.matches.length),
        classificacao: setClassificacao("segundo"),
        eliminadoPor: duelista,
      },
    );

    atualizarClassificacao(torneio.classificacao);

    const podium = setPodium(torneio.classificacao);
    torneio.status = "finalizado";

    const rankingAtual: Ranking = {
      ano: torneio.ano,
      geracao: torneio.geracao,
      ranking: torneio.classificacao
        .map(({ nome, pontos }) => ({
          nome,
          pontos,
        }))
        .sort((a, b) => b.pontos - a.pontos), // ordena do maior para o menor
    };

    updateRankingGlobal(torneio.geracao, torneio.classificacao);
    createRanking(rankingAtual);

    personagens.forEach(({ nome, id, pontuacao }) => {
      const registro = torneio.classificacao.find((c) => c.nome === nome);
      if (registro) {
        const novaPontuacao = registro.pontos + pontuacao;
        const colocacao = {
          ano: torneio.ano.toString(),
          classificacao: registro.classificacao,
        };
        addRanking(colocacao, novaPontuacao, id);
      }
    });

    finalizarTorneio({ podium, geracao: torneio.geracao, ano: torneio.ano });

    return true;
  };

  const processarTerceiroLugar = (oponente: string) => {
    if (!duelista) return;

    // Encontrar de quais partidas vieram os perdedores
    const partidaTerceiro = torneio.matches.find(
      (m) => m.rodada.toLowerCase() === "disputa 3º lugar",
    );

    if (!partidaTerceiro) {
      console.warn("Partida de 3º lugar não encontrada.");
      return;
    }

    // Extrair números das partidas de origem dos dois duelistas
    const numeroPartida1 = Number(
      partidaTerceiro.origemDuelista1?.replace(/\D/g, ""),
    );
    const numeroPartida2 = Number(
      partidaTerceiro.origemDuelista2?.replace(/\D/g, ""),
    );

    // Encontrar as partidas de semifinal de onde vieram
    const partidaOrigem1 = torneio.matches.find(
      (m) => m.numero_partida === numeroPartida1,
    );
    const partidaOrigem2 = torneio.matches.find(
      (m) => m.numero_partida === numeroPartida2,
    );

    if (!partidaOrigem1 || !partidaOrigem2) {
      console.warn("Partidas de origem para disputa de 3º não encontradas.");
      return;
    }

    // Quem venceu as semifinais foi quem eliminou quem está no 3º lugar
    const eliminadorDuelista = partidaOrigem1 && partidaOrigem1.vencedor;

    const eliminadorOponente = partidaOrigem2 && partidaOrigem2.vencedor;

    torneio.classificacao.push(
      {
        nome: duelista,
        pontos: setPontos("terceiro", torneio.matches.length),
        classificacao: setClassificacao("terceiro"),
        eliminadoPor: eliminadorDuelista,
      },
      {
        nome: oponente,
        pontos: setPontos("quarto", torneio.matches.length),
        classificacao: setClassificacao("quarto"),
        eliminadoPor: eliminadorOponente,
      },
    );

    atualizarClassificacao(torneio.classificacao);
  };

  const processarOutrasRodadas = (oponente: string) => {
    if (match.rodada === "Semifinal") return;

    torneio.classificacao.push({
      nome: oponente,
      pontos: setPontos(match.rodada, torneio.matches.length),
      classificacao: setClassificacao(match.rodada),
      eliminadoPor: duelista,
    });

    atualizarClassificacao(torneio.classificacao);
  };

  /** === ATUALIZANDO PRÓXIMAS PARTIDAS === */

  const atualizarProximaPartida = (matches: Match[]) => {
    if (!match.proxima_partida_id) return matches;

    const proxima = matches.find((m) => m.id === match.proxima_partida_id);
    if (!proxima) return matches;

    const origemDuelista1 = proxima.origemDuelista1;
    const origemDuelista2 = proxima.origemDuelista2;

    const descricaoVencedor = `Vencedor da Partida ${match.numero_partida}`;
    const descricaoPreliminar = `Preliminar ${match.numero_partida}`;

    const atualizada: Match = {
      ...proxima,
      duelista1:
        origemDuelista1 === descricaoVencedor ||
        origemDuelista1 === descricaoPreliminar
          ? duelista
          : proxima.duelista1,
      duelista2:
        origemDuelista2 === descricaoVencedor ||
        origemDuelista2 === descricaoPreliminar
          ? duelista
          : proxima.duelista2,
    };

    return matches.map((m) => (m.id === proxima.id ? atualizada : m));
  };

  const atualizarDisputaTerceiroLugar = (matches: Match[]) => {
    if (match.rodada.toLowerCase() !== "semifinal") return matches;

    const partidaTerceiro = matches.find(
      (m) => m.id === match.proxima_partida_id! + 1,
    );
    if (!partidaTerceiro) return matches;

    const oponente = getOponente();
    const descricaoPerdedor = `Perdedor da Partida ${match.numero_partida}`;

    const atualizada: Match = {
      ...partidaTerceiro,
      duelista1:
        partidaTerceiro.origemDuelista1 === descricaoPerdedor
          ? oponente!
          : partidaTerceiro.duelista1,
      duelista2:
        partidaTerceiro.origemDuelista2 === descricaoPerdedor
          ? oponente!
          : partidaTerceiro.duelista2,
    };

    return matches.map((m) => (m.id === partidaTerceiro.id ? atualizada : m));
  };

  /** === RETURN === */

  return {
    handleMatch,
  };
};
