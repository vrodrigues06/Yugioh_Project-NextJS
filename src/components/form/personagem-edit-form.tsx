import React from "react";
import { Personagem, PersonagemProps } from "../../@types/personagem";
import useEditPersonagem from "@/hooks/personagens/useEditPersonagens";
import { useForm } from "react-hook-form";
import { uploadImagemPerfil } from "@/_lib/apis/personagens-api";
import Perfil from "../personagens/personagem/perfil";
import FileInput from "./file-input";
import { PersonagemFormData } from "@/schemas/personagem-schema";

type PersonagemEditFormProps = {
  personagem: Personagem;
};

type FormData = {
  nome: string;
  deckName: string;
  perfil?: FileList;
};

const PersonagemEditForm = ({ personagem }: PersonagemEditFormProps) => {
  const { mutate, isEditing } = useEditPersonagem();
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PersonagemFormData>({
    defaultValues: {
      nome: personagem.nome,
      deckName: personagem.deckName,
    },
  });

  async function onSubmit(data: PersonagemFormData) {
    try {
      let perfilUrl = personagem.perfil;

      const imagemFile = data.perfil?.[0];

      if (imagemFile instanceof File) {
        const uploadedUrl = await uploadImagemPerfil(imagemFile, data.nome);

        if (!uploadedUrl) {
          throw new Error("Erro ao fazer upload da imagem.");
        }

        perfilUrl = uploadedUrl;
      }

      const personagemAtualizado = {
        nome: personagem.nome,
        geracao: personagem.geracao,
        deckName: data.deckName,
        perfil: perfilUrl,
        inicio_em: personagem.inicio_em,
      };

      mutate(
        { id: personagem.id, personagem: personagemAtualizado },
        {
          onSuccess: () => {
            console.log("Personagem atualizado com sucesso");
          },
        },
      );
    } catch (err) {
      console.error("Erro ao editar personagem:", err);
    }
  }

  return (
    <form className=" bg-azul-950" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-4 items-center text-white font-bold text-lg">
        <Perfil size="16" personagem={personagem} />
        <h3>
          {personagem.nome} ({personagem.geracao.toUpperCase()})
        </h3>
      </div>
      <div className="grid sm:grid-cols-2 gap-2 gap-y-6 border-t border-sky-900 pt-4 items-center sm:w-md mb-4 mt-4">
        <FileInput
          register={register}
          name="perfil"
          errors={errors}
          id="perfil"
        />
        <button
          type="submit"
          disabled={isEditing}
          className="bg-azul-800 cursor-pointer text-sky-600 rounded-sm py-1.5 px-2 sm:py-2 sm:px-3 sm:col-start-1 justify-self-start transition-colors hover:bg-azul-900 hover:text-sky-400"
        >
          {isEditing ? "Editando..." : "Editar Duelista"}
        </button>
      </div>
    </form>
  );
};

export default PersonagemEditForm;
