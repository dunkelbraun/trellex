import { prisma } from "@db/prisma";
import { cacheTagResolver } from "@lib/cache";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

export async function boardData(params: { id: string; userId: string }) {
	const { id, userId } = params;
	return userBoard(userId, parseInt(id));
}

async function userBoard(userId: string, boardId: number) {
	"use cache";
	cacheLife("days");
	cacheTag(cacheTagResolver.userBoard({ userId, boardId }));

	return await prisma.board.findUnique({
		where: {
			id: boardId,
			accountId: userId,
		},
		include: {
			columns: { orderBy: { order: "asc" }, include: { items: true } },
		},
	});
}
