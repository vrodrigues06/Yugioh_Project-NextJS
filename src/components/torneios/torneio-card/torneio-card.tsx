import { Torneio } from "@/@types";
import { torneiosGet } from "@/_lib/actions/torneios-get";
import TorneioCardHeader from "./torneio-card-header";
import TorneioCardPodium from "./torneio-card-podium";
import ButtonDetalhes from "@/components/button-detalhes";
import TorneioCardAnteriores from "./torneio-card-anteriores";
import Error from "@/components/error";
import { randomTorneioGet } from "@/_lib/actions/random-torneio-get";

export default async function TorneioCard() {
  const { data: torneios, error: errorTorneios } = await torneiosGet();
  const { data: randomTorneio, error: errorRandomTorneio } =
    await randomTorneioGet();

  const error = errorTorneios || errorRandomTorneio;

  if (error) return <Error message={error} />;

  if (!randomTorneio || !torneios) return null;

  // const randomTorneio = torneios.find((t) => t.nome === "GX 2023");
  const torneiosAnteriores = torneios?.filter((torneio) => {
    if (torneio.geracao === randomTorneio?.geracao) {
      if (
        torneio.ano === randomTorneio.ano - 2 ||
        torneio.ano === randomTorneio.ano - 1
      )
        return true;
    }
  });

  return (
    <div className="bg-azul-950 shadow-xl rounded-md mb-10 overflow-hidden transition-all hover:ring-1 duration-100 animate-slideRight ">
      <TorneioCardHeader torneio={randomTorneio} />
      <div className="p-4 ">
        <div className="flex justify-between mb-4">
          <TorneioCardPodium randomTorneio={randomTorneio} />
          <ButtonDetalhes torneio={randomTorneio}>Ver Detalhes</ButtonDetalhes>
        </div>
        <TorneioCardAnteriores torneios={torneiosAnteriores} />
      </div>
    </div>
  );
}
