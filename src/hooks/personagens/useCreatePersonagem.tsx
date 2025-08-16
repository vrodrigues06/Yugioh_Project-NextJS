import { Personagem } from "@/@types/personagem";
import { createPersonagem } from "@/_lib/apis/personagens-api";
import { PersonagemFormData } from "@/schemas/personagem-schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { invalidatePersonagemQueries } from "@/lib/react-query-config";

export default function useCreatePersonagem() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate } = useMutation<
    PersonagemFormData | undefined,
    Error,
    PersonagemFormData
  >({
    mutationFn: createPersonagem,
    onSuccess: () => {
      toast.success("Personagem Criado com sucesso");

      // Invalida todas as queries relacionadas a personagens usando função utilitária
      invalidatePersonagemQueries(queryClient);
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      toast.error(`Não foi possível criar o Personagem: ${errorMessage}`);
    },
  });

  return { mutate, isCreating };
}
