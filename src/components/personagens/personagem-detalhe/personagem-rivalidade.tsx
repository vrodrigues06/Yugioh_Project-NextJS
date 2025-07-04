import { Personagem } from "@/@types/personagem";
import { torneiosByGenGet } from "@/_lib/actions/torneios-by-gen-get";
import Error from "@/components/error";
import { MIN_CONFRONTOS_DESTAQUE, VITORIAS_MUTUAS } from "@/constants/globals";
import { setRivalidades } from "@/functions/set-rivalidades";
import React from "react";
import { FaCaretUp } from "react-icons/fa";
import { CiCircleMinus } from "react-icons/ci";
import RivalidadesItem from "./rivalidades-item";
import { filtrarRivalidadesEmDestaque } from "@/functions/filtrar-rivalidades-destaque";

type PersonagemRivalidadeProps = {
  personagem: Personagem;
};

export default async function PersonagemRivalidade({
  personagem,
}: PersonagemRivalidadeProps) {
  const { data: allTorneios, error } = await torneiosByGenGet(
    personagem.geracao,
  );

  if (!personagem && !allTorneios) return;
  if (error) return <Error message={error} />;

  const rivalidades = setRivalidades(personagem, allTorneios!);

  const rivalidadesEmDestaque = filtrarRivalidadesEmDestaque(rivalidades);

  if (!rivalidadesEmDestaque || rivalidadesEmDestaque.length === 0) return null;

  return (
    <div className="mt-6 px-2 sm:px-0">
      <p className="text-xs sm:text-sm text-slate-400 mb-2 md:mb-3 relative">
        <span className="w-6 h-px -top-0.5 absolute bg-gradient-to-t from-azul-800 to-azul-300 rounded-md"></span>
        🆚 Rivalidades em Destaque
      </p>
      <div className="text-xs sm:text-sm text-azul-150 flex flex-col gap-2">
        <RivalidadesItem
          personagemNome={personagem.nome}
          rivalidadesEmDestaque={rivalidadesEmDestaque}
        />
      </div>
    </div>
  );
}
