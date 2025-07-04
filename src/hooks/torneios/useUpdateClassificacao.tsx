import { Classificacao } from "@/@types";
import { updateClassificacao } from "@/_lib/apis/torneios-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateClassificacao(geracao: string, ano: number) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (classificacao: Classificacao[]) =>
      updateClassificacao(classificacao, geracao, ano),

    onSuccess: () => {
      // 🔥 Invalida a query do torneio específico
      queryClient.invalidateQueries({
        queryKey: ["torneio", geracao, ano],
      });
    },

    onError: (error) => {
      console.error("Erro ao atualizar a classificação:", error);
    },
  });

  return mutation;
}
