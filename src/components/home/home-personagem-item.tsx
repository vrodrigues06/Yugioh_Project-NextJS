import { useParams } from "next/navigation";
import { Personagem } from "../../@types/personagem";
import { motion } from "framer-motion";
import Link from "next/link";
import Perfil from "../personagens/personagem/perfil";
import { setEmoji } from "@/functions/setEmoji";
import TitulosNacional from "../personagens/personagem/titulos-nacionais";
import TitulosMundial from "../personagens/personagem/titulos-mundiais";

interface IHomePersonagemItem {
  personagem: Personagem;
  delay: number;
}

const HomePersonagemItem = ({ personagem, delay }: IHomePersonagemItem) => {
  const { geracao } = useParams();

  const titulos = personagem.colocacoes.filter(
    (c) => c.classificacao === "Campeao",
  );

  const vices = personagem.colocacoes.filter(
    (c) => c.classificacao === "Segundo",
  );

  const titulosMundial =
    personagem.colocacoes_mundial?.filter(
      (c) => c.classificacao === "Campeao",
    ) || [];

  const vicesMundial =
    personagem.colocacoes_mundial?.filter(
      (c) => c.classificacao === "Segundo",
    ) || [];

  const hasTitulo = titulos.length > 0 || vices.length > 0;

  const hasTituloMundial =
    titulosMundial.length > 0 || vicesMundial?.length > 0;

  return (
    <Link
      href={
        geracao
          ? `${personagem.id}`
          : `personagens/${personagem?.geracao}/${personagem?.id}`
      }
      className="group"
    >
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "linear", delay: delay }}
        className="bg-azul-950 border border-sky-900 py-2 pl-2 sm:p-4 shadow-lg rounded-md flex items-center gap-2 xs:gap-4 transition-all  group-hover:border-orange-500"
      >
        <Perfil size="16" personagem={personagem} />
        <div>
          <p className="mb-1 text-sm">{personagem.nome}</p>

          <span className="block text-xs text-slate-400 mb-1 font-semibold">
            Deck: {personagem.deckName}
          </span>
          <TitulosNacional
            hasTitulo={hasTitulo}
            titulos={titulos}
            vices={vices}
          />
          <TitulosMundial
            hasTitulo={hasTituloMundial}
            titulos={titulosMundial}
            vices={vicesMundial}
          />
        </div>
      </motion.div>
    </Link>
  );
};

export default HomePersonagemItem;
