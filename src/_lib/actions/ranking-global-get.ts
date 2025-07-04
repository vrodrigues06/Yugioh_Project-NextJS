"use server";
import { RankingData } from "@/@types";
import supabase from "../supabase";
import { sortRanking } from "@/functions/sortRanking";
import apiError from "@/functions/api-error";
import { ApiResponse } from "@/@types/api";

export async function rankingGlobalGet(): Promise<ApiResponse<RankingData>> {
  try {
    const { data, error } = await supabase
      .from("ranking-global")
      .select()
      .eq("id", 1)
      .single();

    if (error)
      throw new Error(`Não foi possivel obter os Rankings: ${error.message}`);

    if (data?.torneio_mundial) {
      data.torneio_mundial = sortRanking(data.torneio_mundial);
    }

    return {
      error: "",
      ok: true,
      data,
    };
  } catch (error: unknown) {
    const message = apiError(error);
    return {
      error: message,
      ok: false,
      data: null,
    };
  }
}
