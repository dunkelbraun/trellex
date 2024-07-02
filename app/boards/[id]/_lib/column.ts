import type { Column, Item } from "@prisma/client";
import { z } from "zod";

export type ColumnWithItems = Column & { items: Item[] };

export const columnSchema = z.object({
	id: z.string(),
	boardId: z.coerce.number(),
	name: z.string(),
	order: z.coerce.number(),
});
