"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { MdDashboardCustomize } from "react-icons/md";

type NenhumTorneioProps = {
  mundial?: boolean;
};

const NenhumTorneio = ({ mundial = false }: NenhumTorneioProps) => {
  const [role, setRole] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    fetch("/api/user-role")
      .then((res) => res.json())
      .then((data) => setRole(data.role));
  }, []);

  return (
    <>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center mt-16 justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 p-6 text-center text-white shadow-lg backdrop-blur"
      >
        <div className="flex gap-4 items-center">
          <h2 className="text-xl font-semibold">
            Nenhum Torneio disponível para exibir
          </h2>
          {role === "admin" && mundial && (
            // Mundial
            <Link
              href={`/mundial/painel-mundial`}
              title="Painel Mundial"
              className="bg-azul-950 rounded-sm size-8 sm:size-9 cursor-pointer hover:bg-azul-800 transition-all duration-200 flex items-center justify-center"
            >
              <MdDashboardCustomize className="text-orange-500 text-lg sm:text-2xl" />
            </Link>
          )}

          {role === "admin" && !mundial && (
            <Link
              href={`/torneios/painel-torneio`}
              title="Painel Torneios"
              className="bg-azul-950 rounded-sm size-8 sm:size-9 cursor-pointer hover:bg-azul-800 transition-all duration-200 flex items-center justify-center"
            >
              <MdDashboardCustomize className="text-orange-500 text-lg sm:text-2xl" />
            </Link>
          )}
        </div>
        <p className="text-sm text-white/70">
          Algum torneio será exibido assim que pelo menos um torneio estiver
          finalizado
        </p>
      </motion.div>
    </>
  );
};

export default NenhumTorneio;
