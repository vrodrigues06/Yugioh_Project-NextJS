import { Personagem } from "@/@types/personagem";
import toast from "react-hot-toast";
import { formatDate } from "@/functions/date";
import supabase from "../supabase";
import { setDelay } from "@/functions/set-delay";
import { PersonagemFormData } from "@/schemas/personagem-schema";
export async function getAllPersonagens() {
  const { data, error } = await supabase.from("personagens").select("*");

  if (error) throw new Error("Não foi possível carregar todos os Personagens");

  return data.length ? (data as Personagem[]) : null;
}

export async function getPersonagensByGen(geracao: string) {
  const { data, error } = await supabase
    .from("personagens")
    .select()
    .eq("geracao", geracao);

  if (error) throw new Error("Não foi possível carregar os Personagnes");

  return data;
}

export async function PersonagemGet(id: number) {
  const { data, error } = await supabase
    .from("personagens")
    .select()
    .eq("id", id);

  if (error)
    throw new Error(`Não foi possível carregar o Personagem: ${error.message}`);

  if (!data || data.length === 0) return null;

  return data[0];
}

export async function getPersonagemByName(nome: string) {
  const { data, error } = await supabase
    .from("personagens")
    .select()
    .eq("nome", nome);

  if (error)
    throw new Error(`Não foi possível carregar o Personagem: ${error.message}`);

  if (!data || data.length === 0) return null;

  return data[0] as Personagem;
}

export async function getRandomPersonagem(): Promise<Personagem | null> {
  const { data, error } = await supabase.from("personagens").select("*");

  if (error)
    throw new Error(
      `Não foi possível carregar os Personagens: ${error.message}`,
    );

  if (!data || data.length === 0) return null;

  // Embaralhamento Fisher-Yates para randomização justa
  const shuffled = [...data];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled[0] as Personagem;
}

export async function createPersonagem(personagem: PersonagemFormData) {
  try {
    const { data, error } = await supabase
      .from("personagens")
      .insert([personagem])
      .single();

    if (error) throw new Error(error.message);

    return data as Personagem;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Erro inesperado ao criar personagem:", err.message);
      throw err; // <- relança o erro para o react-query tratar
    }
    throw new Error("Erro desconhecido ao criar personagem");
  }
}

export async function updatePersonagem(
  id: number,
  personagem: PersonagemFormData,
) {
  try {
    const { data, error } = await supabase
      .from("personagens")
      .update(personagem)
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);

    return data as Personagem;
  } catch (err) {
    if (err instanceof Error) {
      console.error("Erro inesperado ao atualizar personagem:", err.message);
      throw err; // <- relança o erro para o react-query tratar
    }
    throw new Error("Erro desconhecido ao criar personagem");
  }
}

export async function changeUpdateNeed(
  estado: boolean,
  id: number,
  atualizacoes?: string[],
) {
  try {
    const updateData: { precisa_atualizar: boolean; atualizacoes?: string[] } =
      {
        precisa_atualizar: estado,
      };

    // Se atualizacoes foram passadas, adiciona ao objeto de update
    if (Array.isArray(atualizacoes)) {
      updateData.atualizacoes = atualizacoes;
    }

    const { error } = await supabase
      .from("personagens")
      .update(updateData)
      .eq("id", id);

    if (error) {
      console.error("Erro ao atualizar status:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Erro inesperado:", err);
    return { success: false, error: "Erro inesperado ao atualizar o status" };
  }
}

export async function getUpdateNeed(id: number) {
  try {
    const { data, error } = await supabase
      .from("personagens")
      .select("precisa_atualizar")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Erro ao buscar status:", error.message);
      return { success: false, error: error.message, data: null };
    }

    return { success: true, data: data?.precisa_atualizar ?? false };
  } catch (err) {
    console.error("Erro inesperado ao buscar status:", err);
    return {
      success: false,
      error: "Erro inesperado ao buscar o status",
      data: null,
    };
  }
}

// export async function editPersonagem(id: number, geracao: string) {

//   try {
//  const { data, error } = await supabase
//       .from("personagens")
//       .update([personagem])
//       .single();

//     if (error) throw new Error("Não foi possível editar o Personagem");
//   } catch (err) {
//     console.error("Erro tentar editar o personagem:", err);
//   }

// }

export async function addRanking(
  colocacoes: { ano: string; classificacao: string },
  pontuacao: number,
  id: number,
) {
  // Update Pontos
  const { data, error } = await supabase
    .from("personagens")
    .update({ pontuacao })
    .eq("id", id);

  if (error) {
    console.error("Erro ao atualizar a pontuação:", error);
    return;
  }

  const { data: personagem, error: fetchError } = await supabase
    .from("personagens")
    .select("colocacoes")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error("Erro ao buscar personagem:", fetchError);
    return;
  }

  const novasColocacoes = personagem?.colocacoes
    ? [...personagem.colocacoes, colocacoes]
    : [colocacoes];

  // Update Colocacao
  const { data: colocacao } = await supabase
    .from("personagens")
    .update({ colocacoes: novasColocacoes })
    .eq("id", id);

  return data;
}

export async function addRankingMundial(
  colocacoes: { ano: string; classificacao: string },
  participacoes_mundial: number,
  pontuacao_mundial: number,
  id: number,
) {
  // Update Pontuacao
  const { data: personagemPontos, error: fetchPontos } = await supabase
    .from("personagens")
    .update({ pontuacao_mundial })
    .eq("id", id);

  if (fetchPontos) {
    console.error("Erro ao atualizar a participação:", fetchPontos);
    return;
  }

  // Update Participacao
  const { data, error } = await supabase
    .from("personagens")
    .update({ participacoes_mundial })
    .eq("id", id);

  if (error) {
    console.error("Erro ao atualizar a participação:", error);
    return;
  }

  const { data: personagem, error: fetchError } = await supabase
    .from("personagens")
    .select("colocacoes_mundial")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error("Erro ao buscar personagem:", fetchError);
    return;
  }

  const novasColocacoes = personagem?.colocacoes_mundial
    ? [...personagem.colocacoes_mundial, colocacoes]
    : [colocacoes];

  // Update Colocacao
  const { data: colocacao } = await supabase
    .from("personagens")
    .update({ colocacoes_mundial: novasColocacoes })
    .eq("id", id);

  return data;
}

export async function uploadImagemPerfil(file: File, nomePersonagem: string) {
  const fileName = `${formatDate()}-${nomePersonagem
    .trim()
    .replace(/\s+/g, "")}`;

  const { data, error } = await supabase.storage
    .from("perfis")
    .upload(`/${fileName}`, file);

  if (error) {
    console.error("Erro ao enviar imagem:", error.message);
    toast.error("Erro ao enviar imagem. Tente novamente.");
    return null;
  }

  // Retorna a URL pública da imagem
  return `${
    supabase.storage.from("perfis").getPublicUrl(`/${fileName}`).data.publicUrl
  }`;
}

// export async function editImagemPerfil(file: File, personagem: Personagem) {
//   const fileName = `${formatDate()}-${personagem.nome
//     .trim()
//     .replace(/\s+/g, "")}`;

//   if (personagem.perfil) {
//     try {
//       // A URL pública deve conter o caminho relativo do arquivo dentro do bucket "perfis"
//       // Supondo que a URL seja algo como "https://.../perfis/arquivo.jpg"
//       // Precisamos extrair a parte "arquivo.jpg" para passar para o delete()
//       const url = new URL(personagem.perfil);
//       const path = url.pathname.split("/perfis/")[1].replace("/", ""); // obtém o caminho relativo

//       if (path) {
//         const { error: deleteError } = await supabase.storage
//           .from("perfis")
//           .remove([path]);

//         if (deleteError) {
//           console.warn("Erro ao deletar imagem antiga:", deleteError.message);
//           // Aqui você pode decidir se quer continuar ou abortar o upload
//         }
//       }
//     } catch (e) {
//       console.warn("Erro ao processar link da imagem antiga:", e);
//     }
//   }

//   // Agora faz o upload da nova imagem
//   const { data, error } = await supabase.storage
//     .from("perfis")
//     .upload(`/${fileName}`, file);

//   if (error) {
//     console.error("Erro ao enviar imagem:", error.message);
//     toast.error("Erro ao enviar imagem. Tente novamente.");
//     return null;
//   }

//   // Retorna a URL pública da imagem nova
//   return supabase.storage.from("perfis").getPublicUrl(`/${fileName}`).data
//     .publicUrl;
// }

export async function editImagemPerfil(file: File, personagem: Personagem) {
  const fileName = `${formatDate()}-${personagem.nome
    .trim()
    .replace(/\s+/g, "")}`;

  // Deleta imagem antiga se existir
  if (personagem.perfil) {
    try {
      const url = new URL(personagem.perfil);
      let path = url.pathname.split("/perfis/")[1];

      // Remove barras iniciais, se houver
      if (path?.startsWith("/")) {
        path = path.slice(1);
      }

      if (path) {
        const { error: deleteError } = await supabase.storage
          .from("perfis")

          .remove([path]);

        if (deleteError) {
          console.warn("Erro ao deletar imagem antiga:", deleteError.message);
        }
      }
    } catch (e) {
      console.warn("Erro ao processar link da imagem antiga:", e);
    }
  }

  // Upload da nova imagem — SEM BARRA INICIAL
  const { data, error } = await supabase.storage
    .from("perfis")
    .upload(`${fileName}`, file); // 👈 sem barra inicial

  if (error) {
    console.error("Erro ao enviar imagem:", error.message);
    toast.error("Erro ao enviar imagem. Tente novamente.");
    return null;
  }

  // Retorna a nova URL pública
  return supabase.storage.from("perfis").getPublicUrl(`${fileName}`).data
    .publicUrl;
}
