import { ensureUser } from "@lib/user";
import { Board } from "./_components/board";
import { boardData } from "./_lib/queries";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	return <Board board={boardData({ id: (await params).id, userId: (await ensureUser()).id })} />;
}
