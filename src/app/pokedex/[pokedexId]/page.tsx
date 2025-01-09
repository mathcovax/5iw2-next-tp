"use client";

import { type Pokemon, useQueryGetPokemon } from "@/api/useQueryGetPokemon";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function pokemon() {
	const { pokedexId } = useParams<{ pokedexId: string }>();

	const { fetchPokemon } = useQueryGetPokemon();

	const [pokemon, setPokemon] = useState<Pokemon | null>(null);

	useEffect(
		() => {
			void fetchPokemon(Number(pokedexId)).then(setPokemon);
		},
		[],
	);

	if (!pokemon) {
		return null;
	}

	return (
		<div>
			{JSON.stringify(pokemon)}
		</div>
	);
}
