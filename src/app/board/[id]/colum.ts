import { z } from "zod";

export const columnSchema = z.object({
	id: z.string(),
	boardId: z.coerce.number(),
	name: z.string(),
	order: z.coerce.number(),
});

export function parseColumnForm(form: FormData) {
	const data = Object.fromEntries(form.entries());
	return columnSchema.parse(data);
}

export type Column = z.infer<typeof columnSchema>;
