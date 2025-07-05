"use client";
import TorneioForm from "@/components/form/torneio-form";
import Loading from "@/components/loading";
import PainelTorneioModel from "@/components/torneios/painel-torneio/painel-torneio-model";
import TorneiosEmAndamento from "@/components/torneios/torneios-em-andamento";
import { motion } from "framer-motion";

export default function PaineltorneioPage() {
  const {
    register,
    handleSubmit,
    onGerarTorneio,
    errors,
    nomeInput,
    personagens,
    isLoading,
    isLoadingTorneios,
    torneiosEmAndamento,
  } = PainelTorneioModel();

  if (isLoadingTorneios && isLoading) return <Loading />;

  return (
    <section className="font-sans py-4 px-4 sm:px-8 md:px-16 mx-auto">
      <h1 className="text-lg sm:text-2xl text-white font-bold mb-1">
        Painel de Torneios Nacionais
      </h1>
      <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-8">
        Gerencie os torneios desde a sua concepção e desfecho final!.
      </p>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2"
      >
        <TorneioForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onGerarTorneio}
          nomeInput={nomeInput}
          personagens={personagens}
        />
      </motion.div>
      {errors?.geracao?.message && (
        <p className="text-red-500 font-semibold text-sm mt-2 animate-slideDown">
          {errors.geracao?.message as string}
        </p>
      )}
      <TorneiosEmAndamento torneios={torneiosEmAndamento} />
    </section>
  );
}
