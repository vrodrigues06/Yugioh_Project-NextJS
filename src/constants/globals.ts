export const GERACOES = ["dm"];
export const INICIO_POR_GERACAO: Record<string, number> = {
  dm: 2000,
  // gx: 2005,
  // "5ds": 2009,
};

export const MIN_CONFRONTOS_DESTAQUE = 1;
export const VITORIAS_MUTUAS = false; // se ambos precisam ter ao menos 1 vitória

export const SISTEMAS_PONTUACAO: Record<string, Record<string, number>> = {
  "<8": {
    "primeira fase": 2,
    "32 avos": 2,
    "16 avos": 2,
    oitavas: 3,
    quartas: 4,
    quarto: 7,
    terceiro: 10,
    segundo: 12,
    campeao: 20,
  },
  "8-15": {
    "primeira fase": 1,
    "32 avos": 2,
    "16 avos": 3,
    oitavas: 4,
    quartas: 5,
    quarto: 8,
    terceiro: 11,
    segundo: 14,
    campeao: 25,
  },
  "16-31": {
    "primeira fase": 0,
    "32 avos": 3,
    "16 avos": 4,
    oitavas: 6,
    quartas: 8,
    quarto: 10,
    terceiro: 14,
    segundo: 20,
    campeao: 45,
  },
  "32-63": {
    "primeira fase": 0,
    "32 avos": 3,
    "16 avos": 4,
    oitavas: 7,
    quartas: 10,
    quarto: 13,
    terceiro: 18,
    segundo: 27,
    campeao: 50,
  },
  "64+": {
    "primeira fase": 0,
    "32 avos": 3,
    "16 avos": 4,
    oitavas: 8,
    quartas: 12,
    quarto: 18,
    terceiro: 25,
    segundo: 40,
    campeao: 70,
  },
};
