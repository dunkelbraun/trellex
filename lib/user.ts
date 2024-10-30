import "server-only";

import { prisma } from "@db/prisma";
import { getSession } from "@lib/session";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { redirect } from "next/navigation";
import { cacheTagResolver } from "./cache";

export async function ensureUser() {
	const user = await sessionUser();
	if (user === undefined) {
		return redirect("/");
	}
	return user;
}

export async function ensureNoUser() {
	const user = await sessionUser();
	if (user !== undefined) {
		return redirect("/boards");
	}
	return;
}

async function sessionUser() {
	const session = await getSession();
	const userId = session.userId;
	if (userId === undefined) {
		return;
	}
	return await getUser(userId);
}

async function getUser(userId: string) {
	"use cache";
	cacheLife("days");
	cacheTag(cacheTagResolver.user({ userId }));

	const user = await prisma.account.findUnique({
		where: {
			id: userId,
		},
	});
	if (user === null) {
		return;
	}
	return user;
}
