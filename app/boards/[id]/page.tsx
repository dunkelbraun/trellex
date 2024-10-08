"use server";

import { prisma } from "@db/prisma";
import { ensureUser } from "@lib/user";
import { notFound } from "next/navigation";
import { Board } from "./_components/board";

async function boardData(boardId: number, accountId: string) {
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

export default async function Page({ params }: { params: { id: string } }) {
	const user = await ensureUser();
	let board = (await boardData(parseInt(params.id), user.id))!;

	if (!board) {
		return notFound();
	}

	return <Board board={board} />;
}
