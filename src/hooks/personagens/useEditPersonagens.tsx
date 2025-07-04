import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updatePersonagem } from "@/_lib/apis/personagens-api";
import { PersonagemFormData } from "@/schemas/personagem-schema";

export default function useEditPersonagem() {
  const { isPending: isEditing, mutate } = useMutation<
    PersonagemFormData | undefined,
    Error,
    { id: number; personagem: PersonagemFormData }
  >({
    mutationFn: ({ id, personagem }) => updatePersonagem(id, personagem),
    onSuccess: () => {
      toast.success("Personagem atualizado com sucesso");
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      toast.error(`Não foi possível atualizar o Personagem: ${errorMessage}`);
    },
  });

  return { mutate, isEditing };
}
