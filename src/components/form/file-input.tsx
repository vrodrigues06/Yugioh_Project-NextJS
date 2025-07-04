"use client";
import { PersonagemFormData } from "@/schemas/personagem-schema";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { MdAddPhotoAlternate } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface FileInputProps extends React.ComponentProps<"input"> {
  register: UseFormRegister<PersonagemFormData>;
  errors: FieldErrors<PersonagemFormData>;
  id: keyof PersonagemFormData;
}

const FileInput = ({ register, id, errors }: FileInputProps) => {
  const [img, setImg] = React.useState("");

  function handleImgChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImg(URL.createObjectURL(file));
    }
  }

  const registerFile = register(id, {
    onChange: (e) => {
      handleImgChange(e); // Atualiza visual
    },
  });

  return (
    <div className="flex flex-col gap-1  sm:col-span-2 ">
      <div className="flex items-center gap-4">
        {img && (
          <Avatar className="w-18 h-18 border shadow-sm">
            <AvatarImage src={img} alt="Avatar do duelista" />
          </Avatar>
        )}
        <div className="flex-col sm:flex-row">
          <label
            htmlFor={id}
            className="flex items-center gap-1.5 font-semibold text-sky-300 text-sm xs:text-md cursor-pointer transition-all hover:underline hover:text-orange-500"
          >
            <MdAddPhotoAlternate className="text-xl" />{" "}
            {img ? "Trocar Imagem" : "Definir imagem do Perfil"}
          </label>

          <input
            type="file"
            accept="image/*"
            id={id}
            className="hidden"
            {...registerFile}
          />

          {/* Exibição do erro */}
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
      </div>
    </div>
  );
};

export default FileInput;
