"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../db/prisma";
import { getSession } from "../../session/session";
import { columnSchema, type Column } from "./colum";
import type { Item } from "./item";

export async function updateBoardName(formData: FormData) {
	const name = String(formData.get("name")!);
	const boardId = parseInt(formData.get("id")!.toString());
	const accountId = (await getSession()).userId!;
	await prisma.board.update({
		where: { id: boardId, accountId: accountId },
		data: { name },
	});
	revalidatePath(`/board/${boardId}`);
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
	revalidatePath(`/board/${result.boardId}`);
	return result;
}

export async function createColumn(column: Column) {
	revalidatePath(`/board/${column.boardId}`);
	return prisma.column.create({ data: columnSchema.parse(column) });
}

export async function getBoardData(boardId: number, accountId: string) {
	return prisma.board.findUnique({
		where: {
			id: boardId,
			accountId: accountId,
		},
		include: {
			columns: { orderBy: { order: "asc" }, include: { items: true } },
		},
	});
}

export async function upsertItem(mutation: Item, accountId: string) {
	return prisma.item.upsert({
		where: {
			id: mutation.id,
			Board: {
				accountId,
			},
		},
		create: mutation,
		update: mutation,
	});
}

export async function deleteCard(id: string, boardId: number, columnId: string, accountId: string) {
	return prisma.item.delete({ where: { id, boardId, columnId, Board: { accountId } } });
}
