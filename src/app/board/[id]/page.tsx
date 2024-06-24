"use server";

import { notFound } from "next/navigation";
import { getSession } from "../../session/session";
import { Board } from "./components/board";
import { getBoardData } from "./queries";

export default async function Page({ params }: { params: { id: string } }) {
	const userId = (await getSession()).userId!;
	let board = (await getBoardData(parseInt(params.id), userId))!;

	if (!board) {
		return notFound();
	}
	return <Board board={board} />;
}
