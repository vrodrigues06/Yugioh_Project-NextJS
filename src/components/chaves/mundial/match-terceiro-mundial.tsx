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

  return (
    <div className="flex flex-col justify-center gap-0.5 absolute bottom-57">
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
