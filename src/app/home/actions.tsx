"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "../session/session";
import { createBoard, deleteBoard } from "./queries";

export async function createBoardAction(formData: FormData) {
	const session = await getSession();
	let name = String(formData.get("name") || "");
	let color = String(formData.get("color") || "");
	let board = await createBoard(session.userId!, name, color);
	return redirect(`/board/${board.id}`);
}

export async function deleteBoardAction(formData: FormData) {
	const session = await getSession();
	let boardId = Number(formData.get("boardId"));
	await deleteBoard(boardId, session.userId!);
	revalidatePath("/home/");
}
