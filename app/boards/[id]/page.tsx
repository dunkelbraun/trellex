import { prisma } from "@db/prisma";
import { getSession } from "@lib/session";
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
	const userId = (await getSession()).userId!;
	let board = (await boardData(parseInt(params.id), userId))!;

	if (!board) {
		return notFound();
	}

	return <Board board={board} />;
}
