"use client";

import Link from "next/link";
import { Torneio } from "@/@types"; // Ajuste se o tipo estiver em outro lugar

type TorneiosEmAndamentoProps = {
  torneios: Torneio[];
};

const TorneiosEmAndamento = ({ torneios }: TorneiosEmAndamentoProps) => {
  if (torneios.length === 0) return null;

  return (
    <div className="border-t border-sky-900 mt-2 pt-4">
      <h3 className="text-slate-500 text-sm mb-4">Torneios em Andamento:</h3>
      <div className="flex gap-4 flex-wrap">
        {torneios.map((t) => (
          <Link
            key={t.nome}
            href={`/torneios/painel-torneio/${t.geracao}-${t.ano}`}
          >
            <div className="text-white bg-azul-950 text-md p-2 flex gap-1.5 items-center shadow-2xl transition-all hover:scale-110 border border-transparent rounded-sm hover:border-orange-500">
              {t.nome}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TorneiosEmAndamento;
