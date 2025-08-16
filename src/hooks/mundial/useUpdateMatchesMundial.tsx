import { Match } from "@/@types";
import { updateMatchesMundial } from "@/_lib/apis/mundial-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateMatchesMundial(ano: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (matches: Match[]) => updateMatchesMundial(matches, ano),
    onSuccess: () => {
      // Invalida todas as queries relacionadas a mundiais
      queryClient.invalidateQueries({ queryKey: ["mundiais"] });
      queryClient.invalidateQueries({ queryKey: ["mundial"] });

      // Força refetch imediato das queries principais
      queryClient.refetchQueries({ queryKey: ["mundiais"] });
    },
  });
}
