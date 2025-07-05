"use client";
import { Personagem } from "@/@types/personagem";
import { motion } from "framer-motion";
import { PersonagemListItemModel } from "./personagem-list-item-modal";
import Link from "next/link";
import Perfil from "../personagem/perfil";
import TitulosNacional from "../personagem/titulos-nacionais";
import TitulosMundial from "../personagem/titulos-mundiais";
import PersonagemActions from "../personagem/personagem-actions";
import React from "react";

interface IPersonagensListItem {
  personagem: Personagem;
  delay: number;
  isAtualizar: boolean;
  role: string | undefined;
}

const PersonagensListItem = ({
  personagem,
  delay,
  role,
}: IPersonagensListItem) => {
  const {
    geracao,
    isAtualizar,
    open,
    hasTitulo,
    hasTituloMundial,
    vices,
    titulos,
    titulosMundial,
    vicesMundial,
    handleSetAtualizar,
    handleToggleEditModal,
    handleToggleModal,
  } = PersonagemListItemModel(personagem);

  return (
    <Link
      href={
        geracao
          ? `/personagens/${geracao}/${personagem.id}`
          : `personagens/${personagem?.geracao}/${personagem?.id}`
      }
      className="group"
    >
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "linear", delay: delay }}
        className={`${
          isAtualizar
            ? "bg-gradient-to-r from-orange-400 to-orange-300 border-orange-400"
            : "bg-azul-950 border-sky-900"
        } py-2 pl-2 sm:p-4 shadow-lg rounded-md flex items-center gap-2 xs:gap-4 transition-all group-hover:border-orange-500 relative`}
      >
        <Perfil size="16" personagem={personagem} />
        <div>
          <p className="mb-1 text-sm text-white">{personagem.nome}</p>

          <span className="block text-xs text-slate-400 mb-1 font-semibold">
            Deck: {personagem.deckName}
          </span>
          <TitulosNacional
            hasTitulo={hasTitulo}
            titulos={titulos}
            vices={vices}
          />
          <TitulosMundial
            hasTitulo={hasTituloMundial}
            titulos={titulosMundial}
            vices={vicesMundial}
          />
        </div>
        {role !== "admin" ? (
          ""
        ) : (
          <PersonagemActions
            open={open}
            personagem={personagem}
            isAtualizar={isAtualizar}
            handleSetAtualizar={handleSetAtualizar}
            handleToggleEditModal={handleToggleEditModal}
            handleToggleModal={handleToggleModal}
          />
        )}
        <span
          className={`${
            isAtualizar ? "text-amber-950" : "text-sky-500"
          } text-[12px] absolute right-2 bottom-1`}
        >
          Começo em:{" "}
          <span className="font-semibold">{personagem.inicio_em}</span>
        </span>
      </motion.div>
    </Link>
  );
};

export default PersonagensListItem;
