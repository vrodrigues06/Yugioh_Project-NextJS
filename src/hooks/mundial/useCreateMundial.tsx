import { createMundial } from "@/_lib/apis/mundial-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useCreateMundial = () => {
  const queryClient = useQueryClient();

  const {
    isPending: isCreating,
    mutateAsync,
    isError,
    error,
  } = useMutation({
    mutationFn: createMundial,
    onSuccess: (data) => {
      toast.success("Torneio criado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["mundiais"] });
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      toast.error(`Não foi possível criar o Torneio: ${errorMessage}`);
    },
  });

  return { isCreating, mutateAsync, isError, error };
};

export default useCreateMundial;
