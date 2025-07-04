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
      queryClient.invalidateQueries({
        queryKey: ["mundiais"],
      });
      toast.success("Mundial finalizado com sucesso!");
    },

    onError: (error) => {
      console.error("Erro ao finalizar o torneio:", error);
      toast.error("Erro ao finalizar o torneio. Tente novamente.");
    },
  });

  return mutation;
}
