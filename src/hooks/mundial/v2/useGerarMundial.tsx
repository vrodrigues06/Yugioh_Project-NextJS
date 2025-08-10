import { ParticipantesI } from "@/components/mundial/mundial-page/v2/gerar-mundial";
import useCreateMundial from "../useCreateMundial";
import { useRouter } from "next/navigation";
import { Mundial } from "@/@types";
import { gerarChavesMundial } from "@/functions/chaves-torneio/v1/gerarChavesMundial";

type useHandleMatchMundialProps = {
  participantes: ParticipantesI | null | undefined;
  ano: number | undefined;
};

export const useGerarMundial = ({
  participantes,
  ano = 0,
}: useHandleMatchMundialProps) => {
  const { mutateAsync: createMundial, isCreating } = useCreateMundial();
  const router = useRouter();
  if (!ano) return {};
  if (!participantes) return {};

  async function onGerarMundial() {
    // Atribuir uma Participação do mundial em cada personagem

    const chaves = gerarChavesMundial(participantes as ParticipantesI);

    const mundial: Mundial = {
      ano,
      nome: `Mundial ${ano}`,
      status: "em_andamento",
      matches: chaves,
      classificacao: [],
      podium: [],
    };

    await createMundial(mundial);

    setTimeout(() => {
      router.push(`/mundial/painel-mundial/${ano}`);
    }, 1000);
  }

  return {
    onGerarMundial,
  };
};
