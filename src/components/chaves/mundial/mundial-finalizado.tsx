import { motion } from "framer-motion";
import React from "react";
import { Mundial } from "../../../@types";
import ChavesFinalMundial from "./chaves-mundial-final";

const MundialFinalizado = ({ torneio }: { torneio: Mundial }) => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-azul-950 rounded-md p-4 shadow text-white overflow-hidden"
    >
      <div className="flex justify-between items-center mb-4 ">
        <h3 className="font-bold uppercase self-start relative">
          <span className="w-8 h-px -bottom-0 absolute bg-gradient-to-b from-orange-800 to-orange-300 "></span>
          Chaves
        </h3>
      </div>
      <ChavesFinalMundial torneio={torneio} />
    </motion.div>
  );
};

export default MundialFinalizado;
