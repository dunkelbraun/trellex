import { ensureUser } from "@lib/user";
import { Suspense } from "react";
import { Board } from "./_components/board";
import { BoardFallBack } from "./_components/board-fallback";
import { boardData } from "./_lib/queries";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const user = await ensureUser();
	return (
		<Suspense fallback={<BoardFallBack />}>
			<Board board={boardData(parseInt(id), user.id)} />
		</Suspense>
	);
}
