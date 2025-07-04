"use client";
import { Geracao, TorneioInput } from "@/@types";
import { INICIO_POR_GERACAO } from "@/constants/globals";
import { gerarChavesTorneio } from "@/functions/chaves-torneio/gerarChavesTorneio";
import { setAnos } from "@/functions/setAnos";
import usePersonagensByGen from "@/hooks/personagens/usePersonagensByGen";
import { useAllTorneios } from "@/hooks/torneios/useAllTorneios";
import useCreateTorneio from "@/hooks/torneios/useCreateTorneio";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export type createTorneioData = {
  ano: string;
  geracao: string;
  nome: string;
};

const PainelTorneioModel = () => {
  const { mutate } = useCreateTorneio();
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
    setValue,
    setError,
    clearErrors,
  } = useForm();

  const geracaoInput = watch("geracao");
  const anoInput = watch("ano");
  const nomeInput = watch("nome");

  React.useEffect(() => {
    if (geracaoInput && anoInput) {
      setValue("nome", `${geracaoInput.toUpperCase()} ${anoInput}`);
    }
  }, [geracaoInput, anoInput, setValue]);

  const { data: personagens = [], isLoading } =
    usePersonagensByGen(geracaoInput);

  const anoDoTorneio = Number(anoInput) || 0;

  const personagensFiltrados = personagens.filter((p) => {
    if (!p.inicio_em) return true; // aceita nulos
    const anoInicio = new Date(p.inicio_em).getFullYear();
    return anoInicio <= anoDoTorneio;
  });

  const { data: allTorneios = [], isLoading: isLoadingTorneios } =
    useAllTorneios();

  const torneiosEmAndamento = allTorneios.filter(
    (t) => t.status === "em_andamento",
  );

  const torneiosGeracao = allTorneios.filter(
    (torneio) => torneio.geracao === geracaoInput,
  );

  let anoDisponivel: number;

  if (torneiosGeracao.length > 0) {
    const ultimoAno = Math.max(...torneiosGeracao.map((t) => t.ano));
    anoDisponivel = ultimoAno + 1;
  } else {
    anoDisponivel = INICIO_POR_GERACAO[geracaoInput] || 2000;
  }

  const onGerarTorneio = () => {
    clearErrors();

    const jaExiste = torneiosGeracao.some((t) => t.ano === Number(anoInput));

    if (jaExiste) {
      setError("ano", {
        type: "manual",
        message: "Já existe um torneio dessa geração com esse ano cadastrado.",
      });
      return;
    }

    const precisaAtualizar = personagens.some((p) => p.precisa_atualizar);
    if (precisaAtualizar) {
      setError("geracao", {
        type: "manual",
        message: "Existem personagens que precisam ser atualizados.",
      });
      return;
    }

    const participantesNome = personagens.map((p) => p.nome);

    if (participantesNome.length < 8) {
      setError("geracao", {
        type: "manual",
        message:
          "O torneio precisa ter pelo menos 8 personagens participantes.",
      });
      return;
    }

    const chaves = gerarChavesTorneio(participantesNome, torneiosGeracao);

    const torneio: TorneioInput = {
      ano: Number(anoInput),
      geracao: geracaoInput,
      nome: nomeInput,
      status: "em_andamento",
      matches: chaves,
    };

    mutate(torneio);

    reset();
  };

  React.useEffect(() => {
    if (geracaoInput) {
      const torneiosGeracao = allTorneios.filter(
        (torneio) => torneio.geracao === geracaoInput,
      );

      let ano;
      if (torneiosGeracao.length > 0) {
        const ultimoAno = Math.max(...torneiosGeracao.map((t) => t.ano));
        ano = ultimoAno + 1;
      } else {
        ano = INICIO_POR_GERACAO[geracaoInput] || 2000;
      }

      setValue("ano", String(ano));
    }
  }, [geracaoInput, allTorneios, setValue]);

  return {
    register,
    errors,
    handleSubmit,
    onGerarTorneio,
    geracaoInput,
    anoInput,
    nomeInput,
    personagens: personagensFiltrados,
    isLoading,
    isLoadingTorneios,
    anoDisponivel,
    torneiosEmAndamento,
  };
};

export default PainelTorneioModel;
