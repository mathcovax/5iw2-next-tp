"use client";

import { z } from "zod";
import { httpClient } from ".";
import { typesSchema } from "./useQueryGetType";

export const pokemonSchema = z.object({
	name: z.string(),
	pokedexId: z.number(),
	image: z.string(),
	types: typesSchema.array(),
});

export type Pokemon = z.infer<typeof pokemonSchema>;

export function useQueryGetPokemon() {
	function fetchPokemon(pokedexId: number) {
		return httpClient.get(
			"/pokemons/{pokedexId}",
			{
				mode: "cors",
				params: { pokedexId },
			},
		)
			.then((res) => res.body)
			.then(pokemonSchema.parse);
	}

	return {
		fetchPokemon,
	};
}
