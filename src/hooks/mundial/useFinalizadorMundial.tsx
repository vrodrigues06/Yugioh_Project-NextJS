import { Podium } from "@/@types";
import { updatePodiumAndStatusMundial } from "@/_lib/apis/mundial-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type FinalizarTorneioParams = {
  podium: Podium[];
  ano: number;
};

export function useFinalizarMundial() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ podium, ano }: FinalizarTorneioParams) =>
      updatePodiumAndStatusMundial(podium, ano),

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

      toast.success("Mundial finalizado com sucesso!");
    },

    onError: (error) => {
      console.error("Erro ao finalizar o torneio:", error);
      toast.error("Erro ao finalizar o torneio. Tente novamente.");
    },
  });

  return mutation;
}
