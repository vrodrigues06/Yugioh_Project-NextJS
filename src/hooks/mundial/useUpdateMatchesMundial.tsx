import { Match } from "@/@types";
import { updateMatchesMundial } from "@/_lib/apis/mundial-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateMatchesMundial(ano: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (matches: Match[]) => updateMatchesMundial(matches, ano),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mundiais"] });
    },
  });
}
