"use server";
import supabase from "../supabase";
import apiError from "@/functions/api-error";
import { ApiResponse } from "@/@types/api";
import { Ranking } from "@/@types";

export async function rankingsGet(): Promise<ApiResponse<Ranking[]>> {
  try {
    const { data, error } = await supabase.from("rankings").select("*");

    if (error)
      throw new Error(
        `Não foi possível carregar os Rankings: ${error.message}`,
      );

    return {
      data: data as Ranking[],
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
