import React from "react";
import Perfil from "../personagens/personagem/perfil";
import { Personagem } from "@/@types/personagem";
import { RankingPontuacao } from "@/@types";

type HomeRankingsPersonagemItemProps = {
  personagem: Personagem;
  index: number;
  ranking: RankingPontuacao;
};

export default function HomeRankingsPersonagemItem({
  index,
  personagem,
  ranking,
}: HomeRankingsPersonagemItemProps) {
  return (
    <>
      <div className="flex gap-2 items-center text-sm sm:text-md">
        <span>{index + 1}</span>
        <Perfil size="10" personagem={personagem} />
        <span>{ranking.nome}</span>
      </div>

      <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent text-sm sm:text-md">
        {ranking.pontos}Pts
      </span>
    </>
  );
}
