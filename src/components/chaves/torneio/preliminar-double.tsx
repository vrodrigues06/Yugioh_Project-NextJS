"use client";
import React from "react";
import MatchPreliminarDupla from "@/components/chaves/torneio/match-preliminar-dupla";
import MatchBracket from "@/components/chaves/torneio/match-bracket";
import { Match } from "@/@types"; // ajuste conforme seu projeto
import { Torneio } from "@/@types"; // ajuste conforme seu projeto

interface MatchComPreliminarDuplaProps {
  idx: number;
  roundIdx: number;
  duelo: Match;
  duelosPreliminares: Match[];
  torneio: Torneio;
  isFinal?: boolean;
}

const PreliminarDouble: React.FC<MatchComPreliminarDuplaProps> = ({
  idx,
  roundIdx,
  duelo,
  duelosPreliminares,
  torneio,
  isFinal = false,
}) => {
  return (
    <div className="relative">
      <MatchPreliminarDupla
        roundIdx={roundIdx}
        matchs={duelosPreliminares}
        torneio={torneio}
      />

      <MatchBracket
        duelista1={duelo.duelista1}
        duelista2={duelo.duelista2}
        match={duelo}
        index={idx}
        roundIdx={roundIdx}
        torneio={torneio}
        isFinal={isFinal}
      />
    </div>
  );
};

export default PreliminarDouble;
