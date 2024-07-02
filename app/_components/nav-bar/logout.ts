"use server";

import { clearSession } from "@lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function logout() {
	await clearSession();
	revalidatePath("/");
	redirect("/");
}
