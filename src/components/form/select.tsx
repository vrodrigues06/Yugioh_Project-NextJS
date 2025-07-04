import React from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { motion } from "framer-motion";
import { PersonagemFormData } from "@/schemas/personagem-schema";
import { createTorneioData } from "../torneios/painel-torneio/painel-torneio-model";

interface SelectProps extends React.ComponentProps<"select"> {
  options: string[];
  label: string;
  register: UseFormRegister<PersonagemFormData>;
  errors: FieldErrors<PersonagemFormData>;
  id: keyof PersonagemFormData;
  geracao?: string;
}

const Select = ({
  options,
  label,
  id,
  register,
  geracao,
  errors,
}: SelectProps) => {
  return (
    <div className="h-10 sm:h-16">
      <div className="flex items-center gap-2">
        <label
          className="font-semibold text-sky-300 text-sm xs:text-md "
          htmlFor={id}
        >
          {label}
        </label>
        <select
          id={id}
          {...register(id)}
          className="bg-azul-800 py-1 outline outline-sky-800 text-sky-300 rounded-md text-xs xs:text-md"
        >
          <option value={geracao}>{geracao?.toUpperCase()}</option>
          {options.map((item) => {
            if (item === geracao) return;
            return (
              <option key={item} value={item}>
                {item.toUpperCase()}
              </option>
            );
          })}
        </select>
      </div>
      {errors[id] && (
        <motion.span
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="text-red-500 mt-2 block text-xs xs:text-sm"
        >
          {typeof errors[id]?.message === "string" && errors[id]?.message}
        </motion.span>
      )}
    </div>
  );
};

export default Select;
