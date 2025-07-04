import { Rivalidades } from "@/@types/personagem";
import { MIN_CONFRONTOS_DESTAQUE, VITORIAS_MUTUAS } from "@/constants/globals";

export function filtrarRivalidadesEmDestaque(
  rivalidades: Rivalidades[],
): Rivalidades[] {
  return rivalidades.filter((r) => {
    const temMinimoDeConfrontos = r.totalConfrontos >= MIN_CONFRONTOS_DESTAQUE;
    const ambosVenceram = r.vitoriasDuelista1 > 0 && r.vitoriasDuelista2 > 0;

    return VITORIAS_MUTUAS
      ? temMinimoDeConfrontos && ambosVenceram
      : temMinimoDeConfrontos;
  });
}
