import { Personagem } from "@/@types/personagem";
import { Torneio } from "@/@types/torneio";
import { INICIO_POR_GERACAO } from "@/constants/globals";

export function filtrarPersonagensPorInicio(
  personagens: Personagem[],
  torneios: Torneio[],
): Personagem[] {
  const ultimoAnoPorGeracao: Record<string, number> = {};

  for (const torneio of torneios) {
    const geracao = torneio.geracao;
    const ano = Number(torneio.ano);

    if (!ultimoAnoPorGeracao[geracao] || ano > ultimoAnoPorGeracao[geracao]) {
      ultimoAnoPorGeracao[geracao] = ano;
    }
  }

  return personagens.filter((personagem) => {
    const geracao = personagem.geracao;
    const inicioRaw = personagem.inicio_em;

    // Pega o ano de inicio_em, lidando com string de data ou apenas ano
    const anoInicio = inicioRaw ? new Date(inicioRaw).getFullYear() : null;

    const ultimoAno =
      ultimoAnoPorGeracao[geracao] ?? INICIO_POR_GERACAO[geracao];
    const limiteAno = ultimoAno + 1;

    return anoInicio === null || anoInicio <= limiteAno;
  });
}
