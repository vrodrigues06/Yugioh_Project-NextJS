// import { Torneio } from "@/@types";
// import { Personagem, Rivalidades } from "@/@types/personagem";

import { Torneio } from "@/@types";
import { Personagem, Rivalidades } from "@/@types/personagem";

// export function setRivalidades(
//   personagem: Personagem,
//   torneios: Torneio[],
// ): Rivalidades[] {
//   const anosParticipados = personagem.colocacoes.map((c) => Number(c.ano));

//   // Filtra apenas os torneios desses anos e coleta os confrontos
//   const allConfrontos =
//     torneios
//       ?.filter(
//         (torneio) =>
//           anosParticipados.includes(torneio.ano) &&
//           torneio.status === "finalizado",
//       )
//       .flatMap((torneio) =>
//         torneio.matches.filter((match) => match.status === "concluida"),
//       ) ?? [];

//   const confrontosDoDuelista = allConfrontos.filter(
//     (confronto) =>
//       confronto.duelista1 === personagem.nome ||
//       confronto.duelista2 === personagem.nome,
//   );

//   const rivalidades: Rivalidades[] = [];

//   for (const confronto of confrontosDoDuelista) {
//     const { duelista1, duelista2, vencedor } = confronto;
//     if (!duelista1 || !duelista2) continue;

//     const adversario = duelista1 === personagem.nome ? duelista2 : duelista1;

//     // Verifica se já existe essa rivalidade (independente da ordem)
//     const rivalidadeExistente = rivalidades.find(
//       (r) =>
//         (r.duelista1 === personagem.nome && r.duelista2 === adversario) ||
//         (r.duelista1 === adversario && r.duelista2 === personagem.nome),
//     );

//     if (rivalidadeExistente) {
//       rivalidadeExistente.totalConfrontos += 1;

//       if (vencedor === personagem.nome) {
//         if (rivalidadeExistente.duelista1 === personagem.nome) {
//           rivalidadeExistente.vitoriasDuelista1 += 1;
//         } else {
//           rivalidadeExistente.vitoriasDuelista2 += 1;
//         }
//         rivalidadeExistente.ultimaVitoria = personagem.nome;
//       } else if (vencedor === adversario) {
//         if (rivalidadeExistente.duelista1 === adversario) {
//           rivalidadeExistente.vitoriasDuelista1 += 1;
//         } else {
//           rivalidadeExistente.vitoriasDuelista2 += 1;
//         }
//         rivalidadeExistente.ultimaVitoria = adversario;
//       }
//     } else {
//       // Cria novo objeto de rivalidade
//       const novaRivalidade = {
//         duelista1: personagem.nome,
//         duelista2: adversario,
//         totalConfrontos: 1,
//         vitoriasDuelista1: vencedor === personagem.nome ? 1 : 0,
//         vitoriasDuelista2: vencedor === adversario ? 1 : 0,
//         ultimaVitoria: vencedor ?? null,
//       };
//       rivalidades.push(novaRivalidade);
//     }
//   }

//   return rivalidades;
// }

// export function setRivalidades(
//   personagem: Personagem,
//   torneios: Torneio[],
// ): Rivalidades[] {
//   const anosParticipados = personagem.colocacoes.map((c) => Number(c.ano));

//   // Incluímos o ano no match para uso posterior
//   const allConfrontos =
//     torneios
//       ?.filter(
//         (torneio) =>
//           anosParticipados.includes(torneio.ano) &&
//           torneio.status === "finalizado",
//       )
//       .flatMap(
//         (torneio) =>
//           torneio.matches
//             .filter((match) => match.status === "concluida")
//             .map((match) => ({ ...match, ano: torneio.ano })), // <-- inclui o ano
//       ) ?? [];

//   const confrontosDoDuelista = allConfrontos.filter(
//     (confronto) =>
//       confronto.duelista1 === personagem.nome ||
//       confronto.duelista2 === personagem.nome,
//   );

//   const rivalidades: Rivalidades[] = [];

//   for (const confronto of confrontosDoDuelista) {
//     const { duelista1, duelista2, vencedor, ano } = confronto;
//     if (!duelista1 || !duelista2) continue;

//     const adversario = duelista1 === personagem.nome ? duelista2 : duelista1;

//     const rivalidadeExistente = rivalidades.find(
//       (r) =>
//         (r.duelista1 === personagem.nome && r.duelista2 === adversario) ||
//         (r.duelista1 === adversario && r.duelista2 === personagem.nome),
//     );

//     if (rivalidadeExistente) {
//       rivalidadeExistente.totalConfrontos += 1;

//       // Atualiza vitórias
//       if (vencedor === personagem.nome) {
//         if (rivalidadeExistente.duelista1 === personagem.nome) {
//           rivalidadeExistente.vitoriasDuelista1 += 1;
//         } else {
//           rivalidadeExistente.vitoriasDuelista2 += 1;
//         }
//       } else if (vencedor === adversario) {
//         if (rivalidadeExistente.duelista1 === adversario) {
//           rivalidadeExistente.vitoriasDuelista1 += 1;
//         } else {
//           rivalidadeExistente.vitoriasDuelista2 += 1;
//         }
//       }

//       // Atualiza a última vitória apenas se o confronto for mais recente
//       if (
//         !rivalidadeExistente.anoUltimaVitoria ||
//         ano > rivalidadeExistente.anoUltimaVitoria
//       ) {
//         rivalidadeExistente.ultimaVitoria = vencedor ?? null;
//         rivalidadeExistente.anoUltimaVitoria = ano;
//       }

//       // Adiciona o ano, evitando duplicatas
//       if (!rivalidadeExistente.anos.includes(ano)) {
//         rivalidadeExistente.anos.push(ano);
//       }
//     } else {
//       rivalidades.push({
//         duelista1: personagem.nome,
//         duelista2: adversario,
//         totalConfrontos: 1,
//         vitoriasDuelista1: vencedor === personagem.nome ? 1 : 0,
//         vitoriasDuelista2: vencedor === adversario ? 1 : 0,
//         ultimaVitoria: vencedor ?? null,
//         anoUltimaVitoria: ano,
//         anos: [ano],
//       });
//     }
//   }

//   // Remove propriedade auxiliar anoUltimaVitoria antes de retornar
//   return rivalidades.map(({ anoUltimaVitoria, ...r }) => r);
// }

export function setRivalidades(
  personagem: Personagem,
  torneios: Torneio[],
): Rivalidades[] {
  const anosParticipados = personagem.colocacoes.map((c) => Number(c.ano));

  const allConfrontos =
    torneios
      ?.filter(
        (torneio) =>
          anosParticipados.includes(torneio.ano) &&
          torneio.status === "finalizado",
      )
      .flatMap((torneio) =>
        torneio.matches
          .filter((match) => match.status === "concluida")
          .map((match) => ({ ...match, ano: torneio.ano })),
      ) ?? [];

  const confrontosDoDuelista = allConfrontos.filter(
    (confronto) =>
      confronto.duelista1 === personagem.nome ||
      confronto.duelista2 === personagem.nome,
  );

  const rivalidades: Rivalidades[] = [];

  for (const confronto of confrontosDoDuelista) {
    const { duelista1, duelista2, vencedor, ano } = confronto;
    if (!duelista1 || !duelista2) continue;

    const adversario = duelista1 === personagem.nome ? duelista2 : duelista1;

    const rivalidadeExistente = rivalidades.find(
      (r) =>
        (r.duelista1 === personagem.nome && r.duelista2 === adversario) ||
        (r.duelista1 === adversario && r.duelista2 === personagem.nome),
    );

    if (rivalidadeExistente) {
      rivalidadeExistente.totalConfrontos += 1;

      if (vencedor === personagem.nome) {
        if (rivalidadeExistente.duelista1 === personagem.nome) {
          rivalidadeExistente.vitoriasDuelista1 += 1;
        } else {
          rivalidadeExistente.vitoriasDuelista2 += 1;
        }
      } else if (vencedor === adversario) {
        if (rivalidadeExistente.duelista1 === adversario) {
          rivalidadeExistente.vitoriasDuelista1 += 1;
        } else {
          rivalidadeExistente.vitoriasDuelista2 += 1;
        }
      }

      if (
        !rivalidadeExistente.anoUltimaVitoria ||
        ano > rivalidadeExistente.anoUltimaVitoria
      ) {
        rivalidadeExistente.ultimaVitoria = vencedor ?? null;
        rivalidadeExistente.anoUltimaVitoria = ano;
      }

      if (!rivalidadeExistente.anos.includes(ano)) {
        rivalidadeExistente.anos.push(ano);
        rivalidadeExistente.anos.sort((a, b) => b - a); // <-- Ordena decrescentemente
      }
    } else {
      rivalidades.push({
        duelista1: personagem.nome,
        duelista2: adversario,
        totalConfrontos: 1,
        vitoriasDuelista1: vencedor === personagem.nome ? 1 : 0,
        vitoriasDuelista2: vencedor === adversario ? 1 : 0,
        ultimaVitoria: vencedor ?? null,
        anoUltimaVitoria: ano,
        anos: [ano],
      });
    }
  }

  return rivalidades.map(({ anoUltimaVitoria, ...r }) => r);
}
