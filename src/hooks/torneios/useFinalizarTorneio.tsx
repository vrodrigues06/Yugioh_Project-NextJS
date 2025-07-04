"use client";
import { Podium } from "@/@types";
import { updatePodiumAndStatus } from "@/_lib/apis/torneios-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type FinalizarTorneioParams = {
  podium: Podium[];
  geracao: string;
  ano: number;
};

export function useFinalizarTorneio() {
  const queryClient = useQueryClient();
  const route = useRouter();

  const mutation = useMutation({
    mutationFn: ({ podium, geracao, ano }: FinalizarTorneioParams) =>
      updatePodiumAndStatus(podium, geracao, ano),

    onSuccess: (_, variables) => {
      const { geracao, ano } = variables;
      queryClient.invalidateQueries({
        queryKey: ["torneio", geracao, ano],
      });
      toast.success("Torneio finalizado com sucesso!");
    },

    onError: (error) => {
      console.error("Erro ao finalizar o torneio:", error);
      toast.error("Erro ao finalizar o torneio. Tente novamente.");
    },
  });

  return mutation;
}
