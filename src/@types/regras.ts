export type RegraItem = {
  titulo: string;
  conteudo: string;
};

export type ConjuntoRegras = {
  ano: number;
  decks: RegraItem[];
  torneio: RegraItem[];
  mundial: RegraItem[];
  titulo: string;
};
