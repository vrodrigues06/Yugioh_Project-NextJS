import { Match, Torneio } from "@/@types";
import DuelistItem from "./duelist-item";
import BracketLine from "../bracket-line";
import ReversedBracketLine from "../reversed-bracket-line";

interface MatchProps {
  duelista1: string | null;
  duelista2: string | null;
  match: Match;
  index: number;
  roundIdx: number;
  isFinal: boolean;
  torneio: Torneio;
}

export default function MatchTerceiro({
  duelista1,
  duelista2,
  match,
  index,
  roundIdx,
  torneio,
  isFinal,
}: MatchProps) {
  const isEven = index % 2 === 0;

  const numMatches = torneio.matches.length;

  return (
    <div
      className={`flex flex-col justify-center gap-0.5 absolute ${getBottomClass(
        numMatches,
      )}`}
    >
      <DuelistItem
        match={match}
        duelista={duelista1}
        identificador="1"
        torneio={torneio}
      />
      <DuelistItem
        match={match}
        duelista={duelista2}
        identificador="2"
        torneio={torneio}
      />
      <span className="absolute top-1/2 -left-6 -translate-y-1/2 text-xs text-slate-500">
        {match.numero_partida}
      </span>

      {!isFinal &&
        (isEven ? (
          <BracketLine roundIdx={roundIdx} />
        ) : (
          <ReversedBracketLine roundIdx={roundIdx} />
        ))}
    </div>
  );
}

const getBottomClass = (numMatches: number) => {
  if (numMatches < 8) return "-bottom-16";
  if (numMatches >= 8 && numMatches < 16) return "-bottom-8";
  if (numMatches >= 16 && numMatches < 32) return "bottom-32";
  if (numMatches >= 32 && numMatches < 64) return "bottom-58";
  return "bottom-24";
};
