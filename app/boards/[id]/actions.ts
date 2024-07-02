"use server";

import { prisma } from "@db/prisma";
import { getSession } from "@lib/session";
import type { Column, Item } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { columnSchema } from "./_lib/column";
import { itemSchema } from "./_lib/item";

export async function createColumn(column: Column) {
	revalidatePath(`/boards/${column.boardId}`);
	return prisma.column.create({ data: columnSchema.parse(column) });
}

export async function updateBoardName(formData: FormData) {
	const name = String(formData.get("name")!);
	const boardId = parseInt(formData.get("id")!.toString());
	const accountId = (await getSession()).userId!;
	await prisma.board.update({
		where: { id: boardId, accountId: accountId },
		data: { name },
	});
	revalidatePath(`/boards/${boardId}`);
	return { name: name, id: boardId };
}

export async function updateColumnName(formData: FormData) {
	const id = formData.get("id")!.toString();
	const name = String(formData.get("name")!);
	const accountId = (await getSession()).userId!;
	const result = await prisma.column.update({
		where: { id, Board: { accountId } },
		data: { name },
	});
	revalidatePath(`/boards/${result.boardId}`);
	return result;
}

export async function createColumnItem(item: Item) {
	itemSchema.parse(item);
	const accountId = (await getSession()).userId!;
	await prisma.item.upsert({
		where: {
			id: item.id,
			Board: {
				accountId,
			},
		},
		create: item,
		update: item,
	});
	revalidatePath(`/boards/${item.boardId}`, "page");
}

export async function deleteItem(item: Item) {
	itemSchema.parse(item);
	const accountId = (await getSession()).userId!;
	await prisma.item.delete({
		where: { id: item.id, boardId: item.boardId, columnId: item.columnId, Board: { accountId } },
	});
	revalidatePath(`/boards/${item.boardId}`);
}
