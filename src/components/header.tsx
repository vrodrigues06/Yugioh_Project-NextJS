import { getAllPersonagens } from "@/_lib/apis/personagens-api";
import { getAllTorneios } from "@/_lib/apis/torneios-api";
import Logo from "./logo";
import Nav from "./nav";
import { allPersonagensGet } from "@/_lib/actions/all-personagens-get";
import { torneiosGet } from "@/_lib/actions/torneios-get";

export default async function Header() {
  const { data: personagens } = await allPersonagensGet();
  const { data: torneios } = await torneiosGet();

  return (
    <header className="bg-azul-950 relative font-sans  pb-2 border-b border-b-blue-950 text-white max-lg:pb-3 ">
      <div className="flex px-4 sm:px-8 md:px-16 lg:container mx-auto justify-between gap-4 items-center flex-wrap max-md:gap-y-8 max-lg:gap-1">
        <Logo />
        <Nav personagens={personagens} torneios={torneios} />
      </div>
    </header>
  );
}
