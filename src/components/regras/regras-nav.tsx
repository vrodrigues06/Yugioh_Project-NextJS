"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTrophy } from "react-icons/fa";
import { TbCardsFilled, TbWorld } from "react-icons/tb";

const categorias = [
  { nome: "Decks", icone: <TbCardsFilled /> },
  { nome: "Torneio", icone: <FaTrophy /> },
  { nome: "Mundial", icone: <TbWorld /> },
];

export default function RegrasNav() {
  const pathname = usePathname();

  return (
    <nav className="sm:bg-azul-800 sm:rounded-sm sm:p-2 sm:h-[115px] sm:min-h-[115px] sm:max-h-[115px]">
      <ul className="flex sm:grid gap-1 sm:gap-2">
        {categorias.map((categoria) => {
          return (
            <li
              key={categoria.nome}
              className="bg-azul-800 rounded-2xl text-xs sm:rounded-md flex items-center"
            >
              <Link
                className={`${
                  pathname.replace("/regras/", "") ===
                  categoria.nome.toLowerCase()
                    ? "text-white font-bold bg-azul-400"
                    : "text-gray-300"
                } w-full h-full flex items-center gap-1.5 px-3 py-1 rounded-2xl sm:rounded-md `}
                href={`/regras/${categoria.nome.toLowerCase()}`}
              >
                {" "}
                {categoria.icone} {categoria.nome}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
