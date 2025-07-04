"use client";
import React from "react";
import MatchPreliminar from "@/components/chaves/torneio/match-preliminar";
import MatchBracket from "@/components/chaves/torneio/match-bracket";
import { Match, Torneio } from "@/@types"; // ajuste os caminhos conforme seu projeto

interface PreliminarSingleProps {
  idx: number;
  roundIdx: number;
  duelo: Match;
  dueloPreliminar: Match;
  torneio: Torneio;
  isFinal?: boolean;
}

const PreliminarSingle: React.FC<PreliminarSingleProps> = ({
  idx,
  roundIdx,
  duelo,
  dueloPreliminar,
  torneio,
  isFinal = false,
}) => {
  return (
    <div className="relative">
      <MatchPreliminar
        key={dueloPreliminar.id}
        duelista1={dueloPreliminar.duelista1}
        duelista2={dueloPreliminar.duelista2}
        match={dueloPreliminar}
        index={idx}
        roundIdx={roundIdx}
        torneio={torneio}
      />

      <MatchBracket
        key={duelo.id}
        duelista1={duelo.duelista1}
        duelista2={duelo.duelista2}
        match={duelo}
        index={idx}
        roundIdx={roundIdx}
        isFinal={isFinal}
        torneio={torneio}
      />
    </div>
  );
};

export default PreliminarSingle;
