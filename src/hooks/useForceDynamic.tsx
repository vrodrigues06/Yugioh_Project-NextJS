import { useQueryClient } from "@tanstack/react-query";
import {
  invalidatePersonagemQueries,
  invalidateTorneioQueries,
  invalidateMundialQueries,
} from "@/lib/react-query-config";

// Hook personalizado para gerenciar force-dynamic
export const useForceDynamic = () => {
  const queryClient = useQueryClient();

  const invalidatePersonagens = () => {
    invalidatePersonagemQueries(queryClient);
  };

  const invalidateTorneios = () => {
    invalidateTorneioQueries(queryClient);
  };

  const invalidateMundiais = () => {
    invalidateMundialQueries(queryClient);
  };

  const invalidateAll = () => {
    invalidatePersonagens();
    invalidateTorneios();
    invalidateMundiais();
  };

  return {
    invalidatePersonagens,
    invalidateTorneios,
    invalidateMundiais,
    invalidateAll,
  };
};
