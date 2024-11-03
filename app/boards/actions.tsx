"use server";

import { getSession } from "@lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createBoard, deleteBoard } from "./_lib/queries";

export async function createBoardAction(formData: FormData) {
	const session = await getSession();
	let name = String(formData.get("name") || "");
	let color = String(formData.get("color") || "");
	let board = await createBoard(session.userId!, name, color);
	revalidatePath("/boards");
	return redirect(`/boards/${board.id}`);
}

export async function deleteBoardAction(formData: FormData) {
	const session = await getSession();
	let boardId = Number(formData.get("boardId"));
	revalidatePath("/boards");
	await deleteBoard(boardId, session.userId!);
}
