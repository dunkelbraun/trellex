import { z } from "zod";

export interface RenderedItem {
	id: string;
	title: string;
	order: number;
	content?: string | null;
	columnId: string;
	boardId: number;
	status?: "pending" | "created" | "deleted" | "moved";
}

export const itemSchema = z.object({
	id: z.string(),
	boardId: z.coerce.number(),
	columnId: z.string(),
	order: z.coerce.number(),
	title: z.string(),
	content: z.string().optional().nullable(),
});

export function parseItemForm(form: FormData) {
	const data = Object.fromEntries(form.entries());
	return itemSchema.parse(data);
}

export type Item = z.infer<typeof itemSchema>;
