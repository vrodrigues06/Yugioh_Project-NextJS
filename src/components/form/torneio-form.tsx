"use client";

import { motion } from "framer-motion";
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { GERACOES } from "@/constants/globals";
import React from "react";
import GenericSelect from "./generic-select";
import Button from "./button-form";

type TorneioFormProps = {
  nomeInput: string;
  personagens: { nome: string }[];
  onSubmit: () => void;
  handleSubmit: UseFormHandleSubmit<FieldValues, FieldValues>;
  register: UseFormRegister<FieldValues>;
};

const TorneioForm = ({
  nomeInput,
  personagens,
  onSubmit,
  handleSubmit,
  register,
}: TorneioFormProps) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2 text-md xs:text-lg text-orange-500 font-semibold">
        <h3 className="text-slate-500 text-sm">
          Selecione o Torneio:{" "}
          <span className="text-md xs:text-lg text-azul-700 font-semibold">
            {nomeInput}
          </span>
        </h3>
      </div>

      <div className="flex mb-1 gap-4 border-t border-sky-900 pt-4">
        <GenericSelect
          options={GERACOES}
          label="Geração"
          id="geracao"
          register={register}
        />
        <input type="hidden" {...register("ano")} />
      </div>

      {personagens.length > 0 && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <h3 className="text-md sm:text-lg text-sky-200 mb-1">
            Nº de Duelistas:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-300 font-bold">
              {personagens.length}
            </span>
          </h3>
        </motion.div>
      )}

      {personagens.length > 0 && (
        <Button type="submit" disabled={false}>
          Gerar Torneio
        </Button>
      )}
    </form>
  );
};

export default TorneioForm;
