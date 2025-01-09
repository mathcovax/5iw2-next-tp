import { type Type } from "@/api/useQueryGetType";

export function Type(props: Type) {
	const { image } = props;

	return (
		<img
			alt="type"
			className="w-10 h-10"
			src={image}
		/>
	);
}
