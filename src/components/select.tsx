interface Value {
	value: string;
	name: string;
}

interface Props {
	readonly items: Value[];
	onChange(value: string): void;
	readonly value: string;
}

export function Select(props: Props) {
	const { items, value, onChange } = props;

	return (
		<select
			onChange={(event) => void onChange(event.target.value)}
			value={value}>
			{items.map(
				(item) => (
					<option
						key={item.value}
						value={item.value}
					>
						{item.name}
					</option>
				),
			)}
		</select>
	);
}
