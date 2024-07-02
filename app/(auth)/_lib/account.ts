import { prisma } from "@db/prisma";
import { pbkdf2Sync, randomBytes } from "crypto";
import "server-only";

export async function createAccount(email: string, password: string) {
	let salt = randomBytes(16).toString("hex");
	let hash = pbkdf2Sync(password, salt, 1000, 64, "sha256").toString("hex");

	return prisma.account.create({
		data: {
			email: email,
			Password: { create: { hash, salt } },
		},
	});
}

export async function accountExists(email: string) {
	let account = await prisma.account.findUnique({
		where: { email: email },
		select: { id: true },
	});

	return Boolean(account);
}

export async function findUser(email: string, password: string) {
	let user = await prisma.account.findUnique({
		where: { email: email },
		include: { Password: true },
	});

	if (!user || !user.Password) {
		return false;
	}

	let hash = pbkdf2Sync(password, user.Password.salt, 1000, 64, "sha256").toString("hex");

	if (hash !== user.Password.hash) {
		return false;
	}

	return user.id;
}
