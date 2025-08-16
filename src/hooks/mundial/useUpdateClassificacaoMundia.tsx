import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Classificacao } from "@/@types";
import { updateClassificacaoMundial } from "@/_lib/apis/mundial-api";

export function useUpdateClassificacaoMundial(ano: number) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (classificacao: Classificacao[]) =>
      updateClassificacaoMundial(classificacao, ano),

    onSuccess: () => {
      // Invalida todas as queries relacionadas a mundiais
      queryClient.invalidateQueries({
        queryKey: ["mundiais"],
      });
      queryClient.invalidateQueries({ queryKey: ["mundial"] });
      queryClient.invalidateQueries({ queryKey: ["rankingAnual"] });

      // Força refetch imediato das queries principais
      queryClient.refetchQueries({ queryKey: ["mundiais"] });
      queryClient.refetchQueries({ queryKey: ["rankingAnual"] });
    },

    onError: (error) => {
      console.error("Erro ao atualizar a classificação:", error);
    },
  });

  return mutation;
}
