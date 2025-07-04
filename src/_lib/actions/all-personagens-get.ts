"use server";
import { Personagem } from "@/@types/personagem";
import supabase from "../supabase";
import apiError from "@/functions/api-error";
import { ApiResponse } from "@/@types/api";

export async function allPersonagensGet(): Promise<ApiResponse<Personagem[]>> {
  try {
    const { data, error } = await supabase.from("personagens").select("*");

    if (error)
      throw new Error(
        `Não foi possível carregar todos os Personagens: ${error.message}`,
      );

    return {
      data: data as Personagem[],
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
