import { createTorneio } from "@/_lib/apis/torneios-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { invalidateTorneioQueries } from "@/lib/react-query-config";

const useCreateTorneio = () => {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate } = useMutation({
    mutationFn: createTorneio,
    onSuccess: () => {
      toast.success("Torneio Criado com sucesso");

      // Invalida todas as queries relacionadas a torneios usando função utilitária
      invalidateTorneioQueries(queryClient);
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      toast.error(`Não foi possível criar o Torneio: ${errorMessage}`);
    },
  });

  return { mutate, isCreating };
};

export default useCreateTorneio;
