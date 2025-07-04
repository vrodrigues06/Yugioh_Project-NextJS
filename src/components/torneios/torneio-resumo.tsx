import { motion } from "framer-motion";
import React from "react";
import { Torneio } from "@/@types";
import useAllPersonagens from "@/hooks/personagens/useAllPersonagens";
import Error from "../error";
import { findPodium } from "@/functions/findPodium";
import Campeao from "../colocacoes/campeao";
import Vice from "../colocacoes/vice";
import PodiumItem from "../colocacoes/podium-item";
import OutrasColocacoes from "../colocacoes/outras-colocacoes";

const TorneioResumo = ({ torneio, ano }: { torneio: Torneio; ano: number }) => {
  const { data: personagens, error } = useAllPersonagens();

  if (error) return <Error message={error} />;

  const { campeao, vice, terceiro, quarto } = findPodium(personagens, torneio);

  if (!campeao || !vice || !terceiro || !quarto) return;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-azul-950 rounded-md p-4 shadow text-white"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold uppercase self-start relative">
          <span className="w-8 h-px -bottom-0 absolute bg-gradient-to-b from-orange-800 to-orange-300 "></span>
          Podium{" "}
        </h3>
        <div className="flex sm:flex-col gap-1 sm:gap-0 items-center sm:p-3 sm:shadow sm:rounded-sm sm:border sm:border-sky-900 text-slate-400">
          <span className="font-bold text-orange-500">
            {torneio.classificacao.length}
          </span>
          <span className="">Duelistas</span>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Campeao campeao={campeao} ano={ano} geracao={campeao.geracao} />
        <Vice duelista={vice} ano={ano} geracao={vice.geracao} />
        <PodiumItem
          duelista={terceiro}
          ano={ano}
          geracao={terceiro.geracao}
          posicao="Terceiro"
        />
        <PodiumItem
          duelista={quarto}
          ano={ano}
          geracao={quarto.geracao}
          posicao="Quarto"
        />
        <OutrasColocacoes torneio={torneio} />
      </div>
    </motion.div>
  );
};

export default TorneioResumo;
