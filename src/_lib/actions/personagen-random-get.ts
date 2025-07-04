"use server";
import { Personagem } from "@/@types/personagem";
import supabase from "../supabase";
import apiError from "@/functions/api-error";
import { ApiResponse } from "@/@types/api";
import { unstable_cache } from "next/cache";

async function randomPersonagemGet(): Promise<ApiResponse<Personagem>> {
  try {
    const { data, error } = await supabase.from("personagens").select("*");

    if (error)
      throw new Error(
        `Não foi possível carregar os Personagens: ${error.message}`,
      );

    if (!data) throw new Error(`Nenhum Personagem encontrado`);

    // Embaralhamento Fisher-Yates para randomização justa
    const shuffled = [...data];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return {
      data: shuffled[0] as Personagem,
      error: "",
      ok: true,
    };
  } catch (error: unknown) {
    const message = apiError(error);
    return {
      ok: false,
      error: message,
      data: null,
    };
  }
}

export const personagemRandomGet = unstable_cache(
  randomPersonagemGet,
  ["get-random-personagem"],
  {
    revalidate: 300, // 5 minutos
  },
);
