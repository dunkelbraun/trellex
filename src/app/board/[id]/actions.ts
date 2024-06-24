"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../../session/session";
import { itemSchema, type Item } from "./item";
import { deleteCard, upsertItem } from "./queries";

export async function createColumnItem(item: Item) {
	itemSchema.parse(item);
	const accountId = (await getSession()).userId!;
	await upsertItem(item, accountId);
	revalidatePath(`/board/${item.boardId}`);
}

export async function deleteItem(item: Item) {
	itemSchema.parse(item);
	const accountId = (await getSession()).userId!;
	await deleteCard(item.id, item.boardId, item.columnId, accountId);
	revalidatePath(`/board/${item.boardId}`);
}
