"use client";

import { useQueryGetPokemon } from "@/api/useQueryGetPokemons";
import { useQueryGetType } from "@/api/useQueryGetType";
import { Select } from "@/components/select";
import { Type } from "@/components/type";
import Link from "next/link";
import { type UIEventHandler, useMemo } from "react";

const limitItems = ["10", "20", "50", "100"].map(
	(value) => ({
		value,
		name: value,
	}),
);

export default function pokedex() {
	const { pokemons, queryPokemon, setQueryPokemon, onFetching } = useQueryGetPokemon();
	const { types } = useQueryGetType();

	const typesItems = useMemo(
		() => types.map(
			(type) => ({
				value: type.id.toString(),
				name: type.name,
			}),
		),
		[types, queryPokemon],
	);

	function onScroll(event: Parameters<UIEventHandler<HTMLDivElement>>[0]) {
		const { currentTarget } = event;
		const isBottom = currentTarget.scrollHeight - currentTarget.scrollTop <= currentTarget.offsetHeight + 100;

		if (isBottom && !onFetching) {
			setQueryPokemon({
				...queryPokemon,
				page: queryPokemon.page + 1,
			});
		}
	}

	return (
		<div
			className="p-10 flex gap-3 flex-col class w-full h-[100vh] overflow-hidden"
		>
			<div className="sticky top-0 flex gap-5 bg-white p-10 shrink-0">
				<input
					className="border"
					onChange={(event) => void setQueryPokemon({
						...queryPokemon,
						name: event.target.value,
					})}
					type="text"
					value={queryPokemon.name}
				/>

				<Select
					items={limitItems}
					onChange={(value) => void setQueryPokemon({
						...queryPokemon,
						limit: Number(value),
					})}
					value={queryPokemon.limit.toString()}
				/>

				<Select
					items={typesItems}
					onChange={(value) => void setQueryPokemon({
						...queryPokemon,
						type: Number(value),
					})}
					value={queryPokemon.type.toString()}
				/>
			</div>

			<div
				className="w-full h-full grid grid-cols-6 gap-[10px] overflow-y-auto grow"
				onScroll={onScroll}
			>
				{
					pokemons.map(
						(pokemon) => (
							<Link
								className="col-span-1 border flex flex-col p-3"
								href={`/pokedex/${pokemon.pokedexId}`}
								key={pokemon.pokedexId}
							>
								<span className="self-end">
									{pokemon.pokedexId}
								</span>

								<span>
									{pokemon.name}
								</span>

								<img
									alt={pokemon.name}
									src={pokemon.image}
								/>

								<div className="flex">
									{
										pokemon.types.map(
											(type) => (
												<Type
													key={type.id}
													{...type} />
											),
										)
									}
								</div>

							</Link>
						),
					)
				}
			</div>
		</div>
	);
}
