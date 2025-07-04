"use server";
import { Torneio } from "@/@types";
import supabase from "../supabase";
import apiError from "@/functions/api-error";
import { ApiResponse } from "@/@types/api";
import { GERACOES } from "@/constants/globals";

export async function torneiosGet(): Promise<ApiResponse<Torneio[]>> {
  const allTorneios: Torneio[] = [];

  try {
    for (const geracao of GERACOES) {
      const { data, error } = await supabase
        .from(`torneio_${geracao}`)
        .select("*");

      if (error)
        throw new Error(
          `Erro ao buscar os torneios da geração ${error.message}`,
        );

      if (data) allTorneios.push(...data);
    }

    return {
      data: allTorneios,
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
