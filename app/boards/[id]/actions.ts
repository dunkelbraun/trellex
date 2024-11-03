"use server";

import { prisma } from "@db/prisma";
import { cacheTagResolver } from "@lib/cache";
import { getSession } from "@lib/session";
import type { Column, Item } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";
import { columnSchema } from "./_lib/column";
import { itemSchema } from "./_lib/item";

export async function createColumn(column: Column) {
	const accountId = (await getSession()).userId!;
	revalidateTag(cacheTagResolver.userBoard({ userId: accountId, boardId: column.boardId }));
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
	revalidateTag(cacheTagResolver.userBoards({ userId: accountId }));
	revalidateTag(cacheTagResolver.userBoard({ userId: accountId, boardId }));
	revalidatePath("/boards");
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
	revalidateTag(cacheTagResolver.userBoard({ userId: accountId, boardId: result.boardId }));
	revalidatePath(`/boards/${result.boardId}`);
	return result;
}

export async function createColumnItem(item: Item) {
	itemSchema.parse(item);
	const accountId = (await getSession()).userId!;
	revalidateTag(cacheTagResolver.userBoard({ userId: accountId, boardId: item.boardId }));
	revalidatePath(`/boards/${item.boardId}`);

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
}

export async function deleteItem(item: Item) {
	itemSchema.parse(item);
	const accountId = (await getSession()).userId!;
	revalidateTag(cacheTagResolver.userBoard({ userId: accountId, boardId: item.boardId }));
	revalidatePath(`/boards/${item.boardId}`);
	await prisma.item.delete({
		where: { id: item.id, boardId: item.boardId, columnId: item.columnId, Board: { accountId } },
	});
}
