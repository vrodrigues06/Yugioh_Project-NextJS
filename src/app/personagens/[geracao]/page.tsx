"use client";
import React, { Suspense } from "react";
import { IoMdAdd } from "react-icons/io";
import { useParams } from "next/navigation";
import useModal from "@/hooks/useModal";
import Modal from "@/components/modal";
import PersonagensListByGen from "@/components/personagens/personagens-list/personagens-list-by-gen";
import PersonagensListSkeleton from "./loading";
import PersonagemForm from "@/components/form/personagem-form";
import useAllPersonagens from "@/hooks/personagens/useAllPersonagens";

const PersonagensByGenPage = () => {
  const { geracao } = useParams();
  const { handleToggleModal, open } = useModal();
  const [role, setRole] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    fetch("/api/user-role")
      .then((res) => res.json())
      .then((data) => setRole(data.role));
  }, []);

  if (!geracao || typeof geracao !== "string") return;

  return (
    <>
      {role !== "admin" ? (
        ""
      ) : (
        <button
          title="criar personagem"
          className="bg-azul-950 rounded-sm size-8 sm:size-9 cursor-pointer hover:bg-azul-800 transition-all duration-200 justify-self-end self-center"
          onClick={handleToggleModal}
        >
          <Modal handleToggleModal={handleToggleModal} isOpen={open}>
            <PersonagemForm geracao={geracao} closeModal={handleToggleModal} />
          </Modal>
          <span className="flex items-center justify-center">
            <IoMdAdd className="text-orange-500 text-lg sm:text-2xl" />
          </span>
        </button>
      )}
      <div className="bg-azul-950 shadow rounded-md p-4 col-span-2">
        <Suspense fallback={<PersonagensListSkeleton />}>
          <PersonagensListByGen geracao={geracao} role={role} />
        </Suspense>
      </div>
    </>
  );
};

export default PersonagensByGenPage;
