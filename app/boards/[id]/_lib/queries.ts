import { prisma } from "@db/prisma";
import { cacheTagResolver } from "@lib/cache";
import { ensureUser } from "@lib/user";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

export async function boardData(params: Promise<{ id: string }>) {
	const { id } = await params;
	const user = await ensureUser();
	return userBoard(user.id, parseInt(id));
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
