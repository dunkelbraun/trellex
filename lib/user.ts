import "server-only";

import { prisma } from "@db/prisma";
import { getSession } from "@lib/session";
import { redirect } from "next/navigation";

export async function dbUserOrRedirectToLogin() {
	const user = await dbUserFromSession();
	if (user === null) return redirect("/login");
	return user;
}

export async function dbUser() {
	return await dbUserFromSession();
}

async function dbUserFromSession() {
	const session = await getSession();
	return await prisma.account.findUnique({
		where: {
			id: session.userId,
		},
	});
}
