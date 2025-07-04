"use server";

import { unstable_cache } from "next/cache";
import { torneiosGet } from "./torneios-get";
import { Torneio } from "@/@types";
import apiError from "@/functions/api-error";
import { ApiResponse } from "@/@types/api";

async function getRandomTorneio(): Promise<ApiResponse<Torneio>> {
  try {
    const { data: torneios, error } = await torneiosGet();

    if (error || !torneios?.length)
      throw new Error(`Não foi possível buscar um torneio: ${error}`);

    const randomIndex = Math.floor(Math.random() * torneios.length);
    const randomTorneio = torneios[randomIndex];

    return {
      ok: true,
      error: "",
      data: randomTorneio as Torneio,
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

export const randomTorneioGet = unstable_cache(
  getRandomTorneio,
  ["random-torneio"],
  { revalidate: 300 }, // 5 minutos
);
