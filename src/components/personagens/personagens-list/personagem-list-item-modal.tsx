import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import useModal from "@/hooks/useModal";
import { changeUpdateNeed } from "@/_lib/apis/personagens-api";
import { Personagem } from "@/@types/personagem";
import { useParams } from "next/navigation";
import { torneiosGet } from "@/_lib/actions/torneios-get";
import { useTorneiosByGen } from "@/hooks/torneios/useTorneiosByGen";
import { invalidatePersonagemQueries } from "@/lib/react-query-config";

export function PersonagemListItemModel(personagem: Personagem) {
  const { id, precisa_atualizar } = personagem;
  const { geracao } = useParams();
  const { handleToggleModal, open } = useModal();
  const [isAtualizar, setIsAtualizar] = React.useState(precisa_atualizar);
  const queryClient = useQueryClient();
  const { data: torneios, error: errorTorneios } = useTorneiosByGen(
    personagem.geracao,
  );

  React.useEffect(() => {
    setIsAtualizar(precisa_atualizar);
  }, [precisa_atualizar]);

  const { titulos, vices, titulosMundial, vicesMundial } = React.useMemo(() => {
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
    return { titulos, vices, titulosMundial, vicesMundial };
  }, [personagem]);

  const hasTitulo = titulos.length > 0 || vices.length > 0;
  const hasTituloMundial = titulosMundial.length > 0 || vicesMundial.length > 0;

  async function handleSetAtualizar(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();
    const novoEstado = !isAtualizar;
    setIsAtualizar(novoEstado);

    // Pega o maior ano da geração

    const ultimoAno =
      torneios.length > 0
        ? Math.max(...torneios.map((t) => t.ano))
        : Number(personagem.inicio_em) - 1;

    // Se não for possível determinar o ano, não faz nada
    if (!ultimoAno) {
      alert("Não foi possível determinar o ano da atualização.");
      setIsAtualizar(!novoEstado);
      return;
    }

    const novoAno = ultimoAno + 1;
    const novoAnoStr = String(novoAno);

    // Verifica se já tem esse ano ou se é igual ao início
    const jaTemAno = personagem.atualizacoes.includes(novoAnoStr);
    const mesmoDoInicio = novoAno === Number(personagem.inicio_em);
    const inicioValido =
      personagem.inicio_em !== null && !isNaN(Number(personagem.inicio_em));
    const novoMaiorQueInicio = inicioValido
      ? novoAno > Number(personagem.inicio_em)
      : true;

    // Só adiciona se for válido
    const atualizacoesAtualizadas =
      !jaTemAno && !mesmoDoInicio && novoMaiorQueInicio
        ? [...personagem.atualizacoes, novoAnoStr]
        : personagem.atualizacoes;

    const response = await changeUpdateNeed(
      novoEstado,
      id,
      atualizacoesAtualizadas,
    );
    if (!response.success) {
      setIsAtualizar(!novoEstado);
      alert("Erro ao atualizar status. Tente novamente.");
    } else {
      // Invalida todas as queries relacionadas a personagens usando função utilitária
      invalidatePersonagemQueries(queryClient);
    }
  }

  function handleToggleEditModal(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    handleToggleModal();
  }

  return {
    geracao,
    open,
    isAtualizar,
    handleToggleEditModal,
    handleSetAtualizar,
    handleToggleModal,
    titulos,
    vices,
    titulosMundial,
    vicesMundial,
    hasTitulo,
    hasTituloMundial,
  };
}
