import { Mundial, Torneio } from "@/@types";

export const verificarSePodeCriarMundial = (
  allTorneios: Torneio[],
  mundiais: Mundial[],
) => {
  if (!allTorneios || !mundiais) {
    return { liberado: false, motivo: "Dados inválidos." };
  }

  // Agrupar torneios por geração
  const geracoes = [...new Set(allTorneios.map((t) => t.geracao))];

  // Pegar o último torneio de cada geração
  const ultimosTorneios = geracoes.map((geracao) => {
    const torneiosDaGeracao = allTorneios
      .filter((t) => t.geracao === geracao)
      .map((t) => {
        const match = t.nome.match(/\d{4}/); // Extrair o ano do nome do torneio
        const ano = match ? parseInt(match[0], 10) : null;
        return { ...t, ano };
      })
      .filter((t) => t.ano !== null); // Filtrar torneios que possuem ano válido

    if (torneiosDaGeracao.length === 0) {
      return null; // Nenhum torneio encontrado para essa geração
    }

    // Encontrar o torneio com o ano mais recente
    return torneiosDaGeracao.reduce((maisRecente, atual) => {
      const anoAtual = atual.ano ?? 0;
      const anoMaisRecente = maisRecente.ano ?? 0;
      return anoAtual > anoMaisRecente ? atual : maisRecente;
    });
  });

  // 🔸 Verificar se algum torneio não foi encontrado (nulo)
  if (ultimosTorneios.some((t) => t === null)) {
    return {
      liberado: false,
      motivo: "Nem todas as gerações possuem torneios.",
    };
  }

  // 🔸 Garantir que todos os últimos torneios estejam finalizados
  const todosFinalizados = ultimosTorneios.every(
    (t) => t?.status?.toLowerCase() === "finalizado",
  );

  if (!todosFinalizados) {
    return {
      liberado: false,
      motivo: "Nem todos os últimos torneios estão finalizados.",
    };
  }

  // 🔸 Extrair os anos dos últimos torneios (todos não-nulos garantido)
  const anos = ultimosTorneios.map((t) => t!.ano!);

  // 🔸 Verificar se todos os anos são iguais
  const todosMesmoAno = anos.every((ano) => ano === anos[0]);

  if (!todosMesmoAno) {
    return {
      liberado: false,
      motivo: "Os últimos torneios não são do mesmo ano.",
    };
  }

  const anoVerificado = anos[0];

  // 🔸 Verificar se já existe um Mundial criado para esse ano
  const mundialJaExiste = mundiais.some((m) => m.ano === anoVerificado);

  if (mundialJaExiste) {
    return { liberado: false, motivo: `O Mundial ${anoVerificado} já existe.` };
  }

  // 🔸 ✅ Todas as validações passaram. Está liberado!
  return { liberado: true, ano: anoVerificado };
};
