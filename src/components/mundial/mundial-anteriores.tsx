import React from "react";
import { useMundiais } from "@/hooks/mundial/useMundiais";
import Error from "@/components/error";
import MundialAnterioresItem from "./mundial-page/mundial-anteriores-item";

interface ITorneiosAnteriores {
  ano: number;
}

const MundialAnteriores = ({ ano }: ITorneiosAnteriores) => {
  const { data: mundiais, error } = useMundiais();

  if (!mundiais) return;

  const torneiosAnteriores = mundiais
    .filter((torneio) => {
      if (
        torneio.ano === ano - 3 ||
        torneio.ano === ano - 2 ||
        torneio.ano === ano - 1
      )
        return true;
    })
    .reverse();

  if (error) return <Error message={error} />;

  return (
    <section className="bg-azul-950 rounded-md p-4 shadow text-white">
      <h3 className="font-bold uppercase relative mb-4">
        {" "}
        <span className="w-8 h-px -bottom-0 absolute bg-gradient-to-b from-orange-800 to-orange-300 "></span>
        Torneios Anteriores
      </h3>
      <div className="grid gap-6  lg:grid-cols-3 sm:grid-cols-2">
        {torneiosAnteriores.length ? (
          torneiosAnteriores.map((torneio) => {
            return (
              <MundialAnterioresItem key={torneio.nome} torneio={torneio} />
            );
          })
        ) : (
          <p className="text-slate-400">Sem Histórico Anterior.</p>
        )}
      </div>
    </section>
  );
};

export default MundialAnteriores;
