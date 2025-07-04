"use client";
import React from "react";
import { motion } from "framer-motion";
import { Personagem } from "../../@types/personagem";
import useAllRankings from "@/hooks/rankings/useAllRankings";
import Error from "@/components/error";
import HomeRankingsPersonagemItem from "./home-rankings-personagem-item";

interface ITorneiosRankingOverview {
  geracao: string;
  personagens: Personagem[];
  error: string | null;
  isLoading: boolean;
}

const HomeRankingsOverview = ({
  geracao,
  personagens,
  error: errorPersonagem,
}: ITorneiosRankingOverview) => {
  const { data: rankings, error: errorRanking } = useAllRankings();

  const personagensMap = React.useMemo(() => {
    return personagens?.reduce((acc, personagem) => {
      acc[personagem.nome] = personagem;
      return acc;
    }, {} as Record<string, (typeof personagens)[0]>);
  }, [personagens]);

  const rankingsFilted = React.useMemo(() => {
    const rankingsAll = Object.entries(rankings)
      .filter(
        (objArr) => objArr[0] !== "torneio_mundial" && Array.isArray(objArr[1]),
      )
      .map((objArr) => objArr[1])
      .flat();

    const filtered =
      geracao === "Todos"
        ? rankingsAll
        : rankings[`torneio_${geracao.toLowerCase()}`] || [];

    return filtered.sort((a, b) => b.pontos - a.pontos);
  }, [geracao, rankings]);

  if (!personagens?.length) return null;

  const error = errorPersonagem || errorRanking;

  if (error) return <Error message={error} />;

  return (
    <div className="bg-azul-950  pt-2 px-4 sm:pt-4 rounded-md border border-blue-950">
      <h3 className="text-md sm:text-lg font-bold mb-4">Ranking da Geração</h3>
      {!rankingsFilted.length && (
        <div className="p-2 bg-azul-800 rounded-md text-slate-400 mb-6">
          Ainda não há ranking para está geração.
        </div>
      )}
      {rankingsFilted.map((ranking, index) => {
        const personagem = personagensMap[ranking.nome];
        if (index > 7 || personagem === undefined) return null;
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            key={ranking.nome}
            className="bg-azul-800 p-2 flex justify-between items-center mb-2 sm:mb-3 rounded-md"
          >
            <HomeRankingsPersonagemItem
              ranking={ranking}
              personagem={personagem}
              index={index}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default HomeRankingsOverview;
