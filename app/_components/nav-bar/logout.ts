"use server";

import { clearSession } from "@lib/session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
	await clearSession(await cookies());
	revalidatePath("/");
	redirect("/");
}
