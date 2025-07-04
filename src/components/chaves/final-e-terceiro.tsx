"use client";
import React from "react";
import MatchBracket from "@/components/chaves/torneio/match-bracket";
import MatchTerceiro from "@/components/chaves/torneio/match-terceiro";
import { Match } from "@/@types";
import { Torneio } from "@/@types";

interface FinalETerceiroLugarProps {
  duelo: Match;
  matchTerceiro?: Match;
  idx: number;
  roundIdx: number;
  isFinal: boolean;
  torneio: Torneio;
}

const FinalETerceiroLugar: React.FC<FinalETerceiroLugarProps> = ({
  duelo,
  matchTerceiro,
  idx,
  roundIdx,
  isFinal,
  torneio,
}) => {
  if (!matchTerceiro) return null;

  return (
    <>
      <MatchBracket
        duelista1={duelo.duelista1}
        duelista2={duelo.duelista2}
        match={duelo}
        index={idx}
        roundIdx={roundIdx}
        isFinal={isFinal}
        torneio={torneio}
      />

      <MatchTerceiro
        duelista1={matchTerceiro.duelista1}
        duelista2={matchTerceiro.duelista2}
        match={matchTerceiro}
        index={idx}
        roundIdx={roundIdx}
        isFinal={isFinal}
        torneio={torneio}
      />
    </>
  );
};

export default FinalETerceiroLugar;
