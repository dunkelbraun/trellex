import { ensureUser } from "@lib/user";
import { Board } from "./_components/board";
import { boardData } from "./_lib/queries";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const user = await ensureUser();
	return <Board board={boardData(parseInt(id), user.id)} />;
}
