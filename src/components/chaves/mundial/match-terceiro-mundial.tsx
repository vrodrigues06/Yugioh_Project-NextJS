import { Match, Mundial } from "@/@types";
import DuelistItemMundial from "./duelist-item-mundial";
import BracketLine from "../bracket-line";
import ReversedBracketLine from "../reversed-bracket-line";

interface MatchProps {
  duelista1: string | null;
  duelista2: string | null;
  match: Match;
  index: number;
  roundIdx: number;
  isFinal: boolean;
  torneio: Mundial;
}

export default function MatchTerceiroMundial({
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

  console.log(numMatches);

  return (
    <div
      className={`flex flex-col justify-center gap-0.5 absolute ${getBottomClass(
        numMatches,
      )}`}
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 px-4 py-1 rounded-2xl 
                 bg-white/10 backdrop-blur-md shadow-md border border-white/20 
                 text-sky-300 text-sm font-semibold"
        style={{ top: "-42px" }}
      >
        Terceiro
      </div>
      <DuelistItemMundial
        match={match}
        duelista={duelista1}
        identificador="1"
        torneio={torneio}
      />
      <DuelistItemMundial
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
