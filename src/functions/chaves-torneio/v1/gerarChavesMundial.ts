import { ParticipantesI } from "@/components/mundial/mundial-page/v1/gerar-mundial";

import { Match } from "@/@types";
import { unificarChaves } from "../unificarChaves";

export function gerarChavesMundial(participantes: ParticipantesI) {
  const participantesAr = [
    ...participantes.campeoes,
    ...participantes.quartos,
    ...participantes.terceiros,
    ...participantes.vices,
  ];

  const totalParticipantes = participantesAr.length;

  const potenciaDe2 = Math.pow(2, Math.floor(Math.log2(totalParticipantes)));

  const { partidas: partidasFasePrincipal, proximoId } =
    gerarChavesFasePrincipalMundial(participantesAr, potenciaDe2, 1);

  const partidasComPrimeiraRodadaPreenchida = preencherPrimeiraRodadaMundial(
    partidasFasePrincipal,
    participantes,
  );

  const todasAsPartidas = unificarChaves(
    [],
    partidasComPrimeiraRodadaPreenchida,
    potenciaDe2,
  );

  return todasAsPartidas;
}

export function gerarChavesFasePrincipalMundial(
  jogadores: string[],
  potenciaDe2: number,
  proximoMatchId: number,
): { partidas: Match[]; proximoId: number } {
  const rodadasLabels = [
    "32 avos",
    "16 avos",
    "Oitavas",
    "Quartas",
    "Semifinal",
    "Final",
  ] as const;

  const totalRodadas = Math.log2(potenciaDe2);
  const rodadasGeradas = rodadasLabels.slice(
    rodadasLabels.length - totalRodadas,
  );

  const partidas: Match[] = [];

  let partidasRodadaAnterior: number[] = [];
  let partidaId = proximoMatchId;
  let numeroPartidaGlobal = 1; // ✅ Controle global da numeração das partidas

  // Gerar as rodadas principais
  for (
    let rodadaIndex = 0;
    rodadaIndex < rodadasGeradas.length;
    rodadaIndex++
  ) {
    const rodadaLabel = rodadasGeradas[rodadaIndex];
    const numPartidas = potenciaDe2 / Math.pow(2, rodadaIndex + 1);

    const partidasRodadaAtual: number[] = [];

    for (let i = 0; i < numPartidas; i++) {
      const match: Match = {
        id: partidaId,
        rodada: rodadaLabel,
        numero_partida: numeroPartidaGlobal, // ✅ Numeração contínua
        duelista1: null,
        duelista2: null,
        vencedor: null,
        status: "pendente",
        proxima_partida_id: null,
      };

      partidas.push(match);
      partidasRodadaAtual.push(partidaId);

      partidaId++;
      numeroPartidaGlobal++; // ✅ Incrementa continuamente
    }

    // Conectar com a próxima rodada
    if (rodadaIndex > 0) {
      partidasRodadaAnterior.forEach((id, index) => {
        const partida = partidas.find((m) => m.id === id);
        const proximaId = partidasRodadaAtual[Math.floor(index / 2)];
        if (partida) partida.proxima_partida_id = proximaId;
      });
    }

    partidasRodadaAnterior = partidasRodadaAtual;
  }

  // Criar a partida de disputa de terceiro lugar
  const semiFinalPartidas = partidas.filter((p) => p.rodada === "Semifinal");
  if (semiFinalPartidas.length === 2) {
    partidas.push({
      id: partidaId,
      rodada: "Disputa 3º Lugar",
      numero_partida: numeroPartidaGlobal, // ✅ Continua a numeração
      duelista1: null,
      duelista2: null,
      vencedor: null,
      status: "pendente",
      proxima_partida_id: null,
    });

    partidaId++;
    numeroPartidaGlobal++; // ✅ Incrementa também aqui
  }

  return { partidas, proximoId: partidaId };
}

export function preencherPrimeiraRodadaMundial(
  partidas: Match[],
  duelistas: ParticipantesI,
) {
  // 1️⃣ Filtrar apenas as partidas da primeira rodada (excluindo "Disputa 3º Lugar")
  const primeiraRodada = partidas.filter(
    (p) => p.rodada === partidas[0].rodada && p.rodada !== "Disputa 3º Lugar",
  );

  // 2️⃣ Criar cópias das listas de duelistas (para não modificar o original)
  //    Agora sem `selecionadosQuartas`, pois não vamos usar mais essa lista.
  const duelistasDisponiveis = {
    campeoes: [...duelistas.campeoes],
    vices: [...duelistas.vices],
    terceiros: [...duelistas.terceiros],
    quartos: [...duelistas.quartos],
  };

  const duelos: [string, string][] = [];

  // 3️⃣ Criar confrontos: Campeão × Quarto
  //    Vamos percorrer todos os campeões e parear com um quarto aleatório.
  while (
    duelistasDisponiveis.campeoes.length > 0 &&
    duelistasDisponiveis.quartos.length > 0
  ) {
    const campeao = removerAleatorio(duelistasDisponiveis.campeoes);
    const quarto = removerAleatorio(duelistasDisponiveis.quartos);
    duelos.push([campeao, quarto]);
  }

  // 4️⃣ Criar confrontos: Vice × Terceiro
  //    Fazemos o mesmo processo para vices contra terceiros.
  while (
    duelistasDisponiveis.vices.length > 0 &&
    duelistasDisponiveis.terceiros.length > 0
  ) {
    const vice = removerAleatorio(duelistasDisponiveis.vices);
    const terceiro = removerAleatorio(duelistasDisponiveis.terceiros);
    duelos.push([vice, terceiro]);
  }

  // 🌀 5️⃣ Embaralhar a ordem dos confrontos (para deixar a chave mais aleatória)
  const duelosEmbaralhados = embaralharArray(duelos);

  // 🏆 6️⃣ Preencher as partidas da primeira rodada com os duelos gerados
  for (let i = 0; i < primeiraRodada.length; i++) {
    const partida = primeiraRodada[i];
    const duelo = duelosEmbaralhados[i];

    if (duelo) {
      partida.duelista1 = duelo[0];
      partida.duelista2 = duelo[1];
    }
  }

  return partidas;
}

// 🔧 Função para remover aleatoriamente de um array
function removerAleatorio(array: string[]): string {
  const index = Math.floor(Math.random() * array.length);
  return array.splice(index, 1)[0];
}

// 🔄 Função para embaralhar um array
function embaralharArray<T>(array: T[]): T[] {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}
