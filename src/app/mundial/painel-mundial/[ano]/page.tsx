"use client";
import React from "react";
import { motion } from "framer-motion";
import useDragTranslate from "@/hooks/useDragTranslate";
import { useMundiais } from "@/hooks/mundial/useMundiais";
import { useParams } from "next/navigation";
import Loading from "@/components/loading";
import buildRounds from "@/functions/chaves-torneio/buildRounds";
import Link from "next/link";
import Identificador from "@/components/chaves/identificador";
import MatchBracketMundial from "@/components/chaves/mundial/match-bracket-mundial";
import MatchTerceiroMundial from "@/components/chaves/mundial/match-terceiro-mundial";

export default function MundialChavesPage() {
  const { ref, events, isDragging } = useDragTranslate();
  const { data: mundiais, isLoading } = useMundiais();

  const { ano = "" } = useParams();

  const edicaoNumber = React.useMemo(() => {
    return mundiais.length;
  }, [mundiais]);

  const torneio = mundiais.find((m) => m.ano === Number(ano));

  if (isLoading) return <Loading />;
  if (!torneio)
    return (
      <div className="container py-6 text-white text-2xl">
        Nenhum torneio encontrado.
      </div>
    );

  const { matches: brackets, nome } = torneio;

  // 1️⃣ pega a rodada “mais antiga” (= onde está o id 1)
  const { rodada: rodadaInicial } = brackets.find((b) => b.id === 1)!;
  const fasePrincipal = brackets.filter((b) => b.rodada === rodadaInicial);

  const metadeEsquerda = fasePrincipal.slice(0, fasePrincipal.length);

  const rounds = buildRounds(metadeEsquerda, brackets);

  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...events}
      className={`overflow-x-hidden  mt-16 py-12 border-t border-slate-700 cursor-${
        isDragging ? "grabbing" : "grab"
      }`}
    >
      <Link
        href={"/mundial/painel-mundial"}
        className="text-orange-500 text-xs hover:underline justify-self-start mb-4 block p-2"
      >
        🠔 Voltar para o Painel Mundial
      </Link>
      <div className="flex flex-col items-center bg-azul-800 p-4 rounded-md overflow-hidden">
        <div className="grid justify-center">
          <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-300 font-bold ">
            {nome}
          </h1>
          <span className="text-slate-400 opacity-70 text-sm text-center">
            Edição #{edicaoNumber}
          </span>
        </div>

        <div className="flex gap-14  ml-6" ref={ref}>
          {rounds.map((round, roundIdx) => (
            <div key={roundIdx} className="grid gap-4 relative">
              <Identificador roundIdx={roundIdx} totalRounds={rounds.length} />
              {round.map((duelo, idx) => {
                const isFinal = roundIdx === rounds.length - 1;

                const matchTerceiro = brackets.find(
                  (partida) => partida.rodada === "Disputa 3º Lugar",
                );

                if (isFinal) {
                  if (!matchTerceiro) return;

                  return (
                    <React.Fragment key={duelo.id}>
                      <MatchBracketMundial
                        duelista1={duelo.duelista1}
                        duelista2={duelo.duelista2}
                        match={duelo}
                        index={idx}
                        roundIdx={roundIdx}
                        isFinal={isFinal}
                        torneio={torneio}
                      />

                      <MatchTerceiroMundial
                        duelista1={matchTerceiro.duelista1}
                        duelista2={matchTerceiro.duelista2}
                        match={matchTerceiro}
                        index={idx}
                        roundIdx={roundIdx}
                        isFinal={isFinal}
                        torneio={torneio}
                      />
                    </React.Fragment>
                  );
                }

                return (
                  <MatchBracketMundial
                    key={duelo.id}
                    duelista1={duelo.duelista1}
                    duelista2={duelo.duelista2}
                    match={duelo}
                    index={idx}
                    roundIdx={roundIdx}
                    isFinal={isFinal}
                    torneio={torneio}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
