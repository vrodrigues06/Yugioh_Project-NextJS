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
    const anoInicio = Number(personagem.inicio_em);
    const estaUsandoUltimoAno = geracao in ultimoAnoPorGeracao;

    const ultimoAno = estaUsandoUltimoAno
      ? ultimoAnoPorGeracao[geracao]
      : INICIO_POR_GERACAO[geracao];

    const limiteAno = estaUsandoUltimoAno ? ultimoAno + 1 : ultimoAno; // não soma nada se veio de INICIO_POR_GERACAO

    return anoInicio === null || anoInicio <= limiteAno;
  });
}
