import { z } from "zod";

export const itemSchema = z.object({
	id: z.string(),
	boardId: z.coerce.number(),
	columnId: z.string(),
	order: z.coerce.number(),
	title: z.string(),
	content: z.string().nullable(),
});
