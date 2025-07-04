import { RegraItem, ConjuntoRegras } from "@/@types/regras";
import { TbCardsFilled, TbWorld } from "react-icons/tb";
import { FaTrophy } from "react-icons/fa";

interface RegrasListaProps {
  regrasAno: ConjuntoRegras;
}

const categorias: {
  nome: string;
  chave: keyof ConjuntoRegras;
  icone: React.ReactNode;
}[] = [
  {
    nome: "Decks",
    chave: "decks",
    icone: <TbCardsFilled className="text-orange-400 text-lg xs:text-xl" />,
  },
  {
    nome: "Torneio",
    chave: "torneio",
    icone: <FaTrophy className="text-yellow-400 text-lg xs:text-xl" />,
  },
  {
    nome: "Mundial",
    chave: "mundial",
    icone: <TbWorld className="text-blue-400 text-lg xs:text-xl" />,
  },
];

export default function RegrasLista({ regrasAno }: RegrasListaProps) {
  return (
    <>
      {categorias.map(({ nome, chave, icone }) => {
        const regras = regrasAno[chave] as RegraItem[] | undefined;

        if (!regras || regras.length === 0) return null;

        return (
          <div key={nome} className="bg-azul-800 rounded-sm p-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs xs:text-lg font-bold text-white flex items-center gap-2">
                {icone}
                {nome}
              </h2>
              <span className="text-amber-300 text-[10px] xs:text-xs font-mono">
                {regras.length} regra{regras.length > 1 ? "s" : ""}
              </span>
            </div>

            <ul className="list-disc p-3 pl-4 divide-y divide-sky-800/30">
              {regras.map((regra, index) => (
                <li className="text-slate-400 text-xs mb-4 pb-1" key={index}>
                  <strong className="text-white">{regra.titulo}:</strong>{" "}
                  {regra.conteudo}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
}
