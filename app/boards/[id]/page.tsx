import { ensureUser } from "@lib/user";
import { notFound } from "next/navigation";
import { Board } from "./_components/board";
import { boardData } from "./_lib/queries";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const user = await ensureUser();
	const board = await boardData(parseInt(id), user.id);
	if (board === null) {
		notFound();
	}
	return <Board board={board} />;
}
