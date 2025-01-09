"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { httpClient } from ".";

export const typesSchema = z.object({
	id: z.number(),
	name: z.string(),
	image: z.string(),
});

export type Type = z.infer<typeof typesSchema>;

export function useQueryGetType() {
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
