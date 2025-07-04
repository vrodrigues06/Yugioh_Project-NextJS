import { Personagem } from "@/@types/personagem";

export const setMelhoresColocacoes = (
  personagem: Personagem,
  mundial = false,
  ano: number = 2100,
) => {
  if (!personagem) {
    console.error("Argumento não é do tipo Personagem!");
    return [];
  }

  const colocacoes = mundial
    ? personagem.colocacoes_mundial
    : personagem.colocacoes;

  return (
    colocacoes
      ?.filter(
        ({ classificacao, ano: anoColocacao }) =>
          ["Campeao", "Segundo", "Terceiro", "Quarto"].includes(
            classificacao,
          ) && anoColocacao <= ano,
      )
      .sort((a, b) => b.ano - a.ano) || []
  );
};
