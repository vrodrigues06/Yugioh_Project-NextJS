import { Mundial, Torneio } from "@/@types";
import { Personagem } from "@/@types/personagem";

export function findPodium(
  personagens: Personagem[],
  torneio: Torneio | Mundial,
) {
  const campeao = personagens.find(
    (personagem) =>
      torneio.podium.find((p) => p.classificacao === "Campeao")?.nome ===
      personagem.nome,
  );

  const vice = personagens.find(
    (personagem) =>
      torneio.podium.find((p) => p.classificacao === "Segundo")?.nome ===
      personagem.nome,
  );

  const terceiro = personagens.find(
    (personagem) =>
      torneio.podium.find((p) => p.classificacao === "Terceiro")?.nome ===
      personagem.nome,
  );

  const quarto = personagens.find(
    (personagem) =>
      torneio.podium.find((p) => p.classificacao === "Quarto")?.nome ===
      personagem.nome,
  );

  return {
    campeao,
    vice,
    terceiro,
    quarto,
  };
}
