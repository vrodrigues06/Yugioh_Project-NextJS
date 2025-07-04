import { Colocacao } from "@/@types/personagem";

export const calcularColocacoes = (colocacoes: Colocacao[] | undefined) => {
  if (!colocacoes)
    return {
      titulos: 0,
      vices: 0,
      terceiro: 0,
      quarto: 0,
      vezesFinal: 0,
      vezesPodium: 0,
    };

  return colocacoes.reduce(
    (acc, c) => {
      switch (c.classificacao) {
        case "Campeao":
          acc.titulos += 1;
          break;
        case "Segundo":
          acc.vices += 1;
          break;
        case "Terceiro":
          acc.terceiro += 1;
          break;
        case "Quarto":
          acc.quarto += 1;
          break;
      }
      acc.vezesFinal = acc.titulos + acc.vices;
      acc.vezesPodium = acc.vezesFinal + acc.terceiro + acc.quarto;
      return acc;
    },
    {
      titulos: 0,
      vices: 0,
      terceiro: 0,
      quarto: 0,
      vezesFinal: 0,
      vezesPodium: 0,
    },
  );
};
