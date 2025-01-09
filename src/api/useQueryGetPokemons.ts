"use client";

import { useEffect, useState } from "react";
import { type z } from "zod";
import { httpClient } from ".";
import { pokemonSchema } from "./useQueryGetPokemon";

export const pokemonsSchema = pokemonSchema.array();

type Pokemons = z.infer<typeof pokemonsSchema>;

interface Query {
	limit: number;
	type: number;
	name: string;
	page: number;
}

export function useQueryGetPokemon() {
	const [pokemons, setPokemons] = useState<Pokemons>([]);

	const [queryPokemon, setQueryPokemon] = useState<Query>({
		limit: 50,
		type: -1,
		name: "",
		page: 1,
	});

	const [onFetching, setOnFetching] = useState(false);

	function fetchPokemons(limit: number, type: number, name: string, page: number) {
		setOnFetching(true);
		return httpClient.get(
			"/pokemons",
			{
				mode: "cors",
				query: {
					limit,
					typeId: type === -1 ? undefined : type,
					name: name || undefined,
					page,
				},
			},
		)
			.then((res) => res.body)
			.then(pokemonsSchema.parse)
			.finally(() => {
				setOnFetching(false);
			});
	}

	function queryGetPokemon() {
		if (onFetching) {
			return;
		}

		void fetchPokemons(
			queryPokemon.limit,
			queryPokemon.type,
			queryPokemon.name,
			queryPokemon.page,
		)
			.then((data) => {
				if (queryPokemon.page > 1) {
					setPokemons([...pokemons, ...data]);
				} else {
					setPokemons(data);
				}
			});
	}

	useEffect(
		() => {
			queryGetPokemon();
		},
		[queryPokemon],
	);

	return {
		queryGetPokemon,
		pokemons,
		queryPokemon,
		setQueryPokemon,
		onFetching,
	};
}
