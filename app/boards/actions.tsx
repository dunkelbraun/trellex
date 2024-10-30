"use server";

import { cacheTagResolver } from "@lib/cache";
import { clearSession, getSession } from "@lib/session";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createBoard, deleteBoard } from "./_lib/queries";

export async function createBoardAction(formData: FormData) {
	const session = await getSession();
	let name = String(formData.get("name") || "");
	let color = String(formData.get("color") || "");
	let board = await createBoard(session.userId!, name, color);
	return redirect(`/boards/${board.id}`);
}

export async function deleteBoardAction(formData: FormData) {
	const session = await getSession();
	let boardId = Number(formData.get("boardId"));
	await deleteBoard(boardId, session.userId!);
}

export async function logout() {
	const session = await getSession();
	revalidateTag(cacheTagResolver.userBoards({ userId: session.userId! }));
	await clearSession(await cookies());
	redirect("/login");
}
