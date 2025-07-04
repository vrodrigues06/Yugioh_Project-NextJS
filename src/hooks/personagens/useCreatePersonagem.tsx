import { Personagem } from "@/@types/personagem";
import { createPersonagem } from "@/_lib/apis/personagens-api";
import { PersonagemFormData } from "@/schemas/personagem-schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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

      // Invalida a query para que ela seja refeita
      queryClient.invalidateQueries({ queryKey: ["allPersonagens"] });
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      toast.error(`Não foi possível criar o Personagem: ${errorMessage}`);
    },
  });

  return { mutate, isCreating };
}
