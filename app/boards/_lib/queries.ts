import { prisma } from "@db/prisma";
import { cacheTagResolver } from "@lib/cache";
import { ensureUser } from "@lib/user";
import { revalidateTag } from "next/cache";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

import "server-only";

export async function deleteBoard(boardId: number, accountId: string) {
	revalidateTag(cacheTagResolver.userBoards({ userId: accountId }));
	revalidateTag(cacheTagResolver.userBoard({ userId: accountId, boardId }));
	return prisma.board.delete({
		where: { id: boardId, accountId },
	});
}

export async function createBoard(userId: string, name: string, color: string) {
	revalidateTag(cacheTagResolver.userBoards({ userId }));
	return prisma.board.create({
		data: {
			name,
			color,
			Account: {
				connect: {
					id: userId,
				},
			},
		},
	});
}

export async function getHomeData() {
	const user = await ensureUser();
	return userBoards(user.id);
}

async function userBoards(userId: string) {
	"use cache";
	cacheLife("days");
	cacheTag(cacheTagResolver.userBoards({ userId }));

	return await prisma.board.findMany({
		where: {
			accountId: userId,
		},
	});
}
