import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updatePersonagem } from "@/_lib/apis/personagens-api";
import { PersonagemFormData } from "@/schemas/personagem-schema";
import { invalidatePersonagemQueries } from "@/lib/react-query-config";

export default function useEditPersonagem() {
  const queryClient = useQueryClient();
  const { isPending: isEditing, mutate } = useMutation<
    PersonagemFormData | undefined,
    Error,
    { id: number; personagem: PersonagemFormData }
  >({
    mutationFn: ({ id, personagem }) => updatePersonagem(id, personagem),
    onSuccess: () => {
      toast.success("Personagem atualizado com sucesso");

      // Invalida todas as queries relacionadas a personagens usando função utilitária
      invalidatePersonagemQueries(queryClient);
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      toast.error(`Não foi possível atualizar o Personagem: ${errorMessage}`);
    },
  });

  return { mutate, isEditing };
}
