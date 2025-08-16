import { Classificacao } from "@/@types";
import { updateClassificacao } from "@/_lib/apis/torneios-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateClassificacao(geracao: string, ano: number) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (classificacao: Classificacao[]) =>
      updateClassificacao(classificacao, geracao, ano),

    onSuccess: () => {
      // Invalida todas as queries relacionadas ao torneio específico
      queryClient.invalidateQueries({
        queryKey: ["torneio", geracao, ano],
      });
      queryClient.invalidateQueries({ queryKey: ["AllTorneios"] });
      queryClient.invalidateQueries({ queryKey: ["TorneiosByGen"] });
      queryClient.invalidateQueries({ queryKey: ["rankingAnual"] });

      // Força refetch imediato das queries principais
      queryClient.refetchQueries({ queryKey: ["torneio", geracao, ano] });
      queryClient.refetchQueries({ queryKey: ["AllTorneios"] });
      queryClient.refetchQueries({ queryKey: ["TorneiosByGen"] });
    },

    onError: (error) => {
      console.error("Erro ao atualizar a classificação:", error);
    },
  });

  return mutation;
}
