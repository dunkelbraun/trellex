import { getIronSession } from "iron-session";
import { cookies } from "next/headers.js";

let secret = process.env.COOKIE_SECRET || "default";
if (secret === "default") {
	console.warn(
		"🚨 No COOKIE_SECRET environment variable set, using default. The app is insecure in production.",
	);
	secret = "password-must-be-at-least-32-characters-long";
}

export async function setSession(userId: string) {
	const session = await getIronSession<{ userId?: string }>(cookies(), {
		password: secret,
		cookieName: "auth",
	});
	session.userId = userId;
	await session.save();
}

export async function getSession() {
	const session = await getIronSession<{ userId?: string }>(cookies(), {
		password: secret,
		cookieName: "auth",
	});
	return session;
}
