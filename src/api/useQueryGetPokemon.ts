"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { httpClient } from ".";
import { typesSchema } from "./useQueryGetType";

export const pokemonSchema = z.object({
	name: z.string(),
	pokedexId: z.number(),
	image: z.string(),
	types: typesSchema.array(),
});

export type Type = z.infer<typeof typesSchema>;

export function useQueryGetPokemon() {
	const [types, setTypes] = useState<Type[]>([]);

	function fetchTypes() {
		return httpClient.get(
			"/types",
			{
				mode: "cors",
			},
		)
			.then((res) => res.body)
			.then(typesSchema.array().parse);
	}

	useEffect(
		() => {
			void fetchTypes()
				.then((data) => {
					setTypes([
						{
							id: -1,
							name: "all",
							image: "",
						},
						...data,
					]);
				});
		},
		[],
	);

	return {
		types,
	};
}
