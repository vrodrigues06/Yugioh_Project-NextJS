import { Match } from "@/@types";
import { updateMatches } from "@/_lib/apis/torneios-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateMatches(geracao: string, ano: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (matches: Match[]) => updateMatches(matches, geracao, ano),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["torneio", geracao, ano] });
    },
  });
}
